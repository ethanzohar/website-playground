import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

const NUM_POINTS = 70;
const MIN_DIST = 30;
const MAX_DIST = 70;
const FILL_ASCII_ARRAY = ["*", "&", "#", "+"]
const ASCII_ARRAY = ["-", ...FILL_ASCII_ARRAY];
const FONT_LOADER = new FontLoader();

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random points uniformly in spherical volume
const generatePoints = (n: number, minDist: number, maxDist: number): [number, number, number][] => {
  const points: [number, number, number][] = [];

  for (let i = 0; i < n; i++) {
    const theta = Math.random() * 2 * Math.PI; // azimuth
    const phi = Math.acos(2 * Math.random() - 1); // polar
    const r = getRndInteger(minDist, maxDist); // distance

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    points.push([x, y, z]);
  }

  return points;
};

// Create ASCII line meshes and return them
function createAsciiLineMeshes(
  start: [number, number, number],
  end: [number, number, number],
  font: THREE.Font,
  material: THREE.Material,
  spacing = 0.8
): THREE.Mesh[] {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const meshes: THREE.Mesh[] = [];

  // Temporary geometry, we will swap later with precomputed ones
  const geometry = new TextGeometry("-", { font, size: 1, depth: 0.05 });
  geometry.computeBoundingBox();
  geometry.center();

  const distance = startVec.distanceTo(endVec);
  const steps = Math.floor(distance / spacing);

  for (let i = 2; i <= steps; i++) {
    const t = i / steps;
    const pos = new THREE.Vector3().lerpVectors(startVec, endVec, t);

    const mesh = new THREE.Mesh(geometry.clone(), material);
    mesh.position.copy(pos);
    mesh.lookAt(0, 0, 0);
    mesh.rotateY(Math.PI / 2);
    meshes.push(mesh);
  }

  return meshes;
}

export function ImageExplode() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(20, 20, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Precompute all ASCII geometries
    const font = FONT_LOADER.parse(helvetiker);

    const charGeometries: Record<string, TextGeometry> = {};

    ASCII_ARRAY.forEach((c) => {
      const g = new TextGeometry(c, { font, size: 1, depth: 0.05 });
      g.computeBoundingBox();
      g.center();
      
      charGeometries[c] = g;
    });

    // Material
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    // Generate points and create meshes
    const center: [number, number, number] = [0, 0, 0];
    const points = generatePoints(NUM_POINTS, MIN_DIST, MAX_DIST);
    const allMeshes: THREE.Mesh[] = [];
    
    type AsciiLine = {
      meshes: THREE.Mesh[];
      shift: number;
      charString: string;
    };
    
    const lines: AsciiLine[] = [];
    

    const maxGap = 20;
    const minGap = 5;
    points.forEach((p) => {
      const meshes = createAsciiLineMeshes(center, p, font, material);
      meshes.forEach((m) => scene.add(m));
      allMeshes.push(...meshes);
      lines.push({
        meshes: meshes,
        shift: getRndInteger(0, ASCII_ARRAY.length),
        charString: "-".repeat(getRndInteger(minGap, maxGap)) + "*" + "-".repeat(getRndInteger(minGap, maxGap))
      });
    });

    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      if (frame % 5 === 0) {
        lines.forEach((line) => {
          line.meshes.forEach((mesh, i) => {
            if (i < line.meshes.length - 1 && line.meshes[i + 1].geometry) {
              mesh.geometry = line.meshes[i + 1].geometry
            } else {
              const randScore = Math.random();
              let c = "-";

              if (randScore < 0.03) {
                c = "*";
              }
              
              mesh.geometry = charGeometries[c]
            }
          })
        });
      }

      renderer.render(scene, camera);
      frame++;
    };
    animate();

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
