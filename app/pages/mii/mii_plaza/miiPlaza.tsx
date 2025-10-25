import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { colorFromHex, degToRad } from "../helpers";

import { Mii } from "../components/mii";
import { MiiPlazaFloor } from "../components/miiPlazaFloor";

interface Mii {
  miiUrl: string,
  redirect: string,
  position: [number, number, number],
  overrides?: {
    height?: number;
    build?: number;
    favoriteColor?: number;
    gender?: number;
  };
}

const MIIs: Mii[] = [
  {
    miiUrl: "https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=JasmineChlora&texResolution=256&resourceType=middle",
    redirect: "dummy",
    position: [0, 0, 0],
    overrides: {
      // build: 500,
      // height: 10,
      favoriteColor: 0xffd820
    }
  },
  {
    miiUrl: "https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=Pompeyed&data=AwAAQIDDGQSA5EBQ1DCu7iAsjUgCugAAAFRQAG8AbQBwAGUAeQBlAGQAAAAAAEBnJgAeBSBpRBimNEYUhxIhaA0AKCkAUkhQRQBkAGQAaQBlAAAAAAAAAAAAAAAAADF0&type=face&width=270",
    redirect: "dummy",
    position: [4, 0, 4],
    overrides: {
      // build: 300,
      // height: 101,
      // favoriteColor: 0xffd820
    }
  },
  {
    miiUrl: "https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=Yokaiwatcher888&data=AwAAEPBBGKRApABAhGhediyc9OGcEwAAkVlMAHkAbABhAAAAAAAAAAAAAAAAAAB%2FBAA9AgppRRjNNEYUgRIAaAwAMCkwUkhQQQBsAGwAYQBuAAAAAAAAAAAAAAAAAPp4&type=face&width=270",
    redirect: "dummy",
    position: [-4, 0, 4]
  }
]

export function MiiPlaza() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [sceneReady, setSceneReady] = useState<boolean>(false);

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  const dragSensitivity = 0.02;

  const handleMouseDown = (event: MouseEvent) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    rendererRef.current!.domElement.style.cursor = 'grabbing';
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = -1 * (event.clientY - previousMousePosition.y);

    // Move camera based on mouse movement
    cameraRef.current!.position.x -= deltaX * dragSensitivity;
    cameraRef.current!.position.z += deltaY * dragSensitivity;

    // Constrain camera position to scene bounds
    const halfWidth = containerRef.current!.clientWidth / 2;
    const halfHeight = containerRef.current!.clientHeight / 2;
    cameraRef.current!.position.x = Math.max(-halfWidth, Math.min(halfWidth, cameraRef.current!.position.x));
    cameraRef.current!.position.z = Math.max(-halfHeight, Math.min(halfHeight, cameraRef.current!.position.z));

    previousMousePosition = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging = false;
    rendererRef.current!.domElement.style.cursor = 'grab';
  };

  const addLightsToScene = (scene: THREE.Scene) => {
    const intensity = Number(THREE.REVISION) >= 155 ? Math.PI : 1.0;
    const ambientLight = new THREE.AmbientLight(new THREE.Color(0.73, 0.73, 0.73), intensity);
    const directionalLight = new THREE.DirectionalLight(
      new THREE.Color(0.60, 0.60, 0.60), intensity);
    directionalLight.position.set(-0.455, 0.348, 0.5);
    scene.add(ambientLight, directionalLight);
  }

  const initRendererAndScene = (container: any) => {
    // Create and initialize scene.
    const scene = new THREE.Scene();
    scene.background = colorFromHex(0xE6E6FA);

    // Create the WebGLRenderer with antialiasing for more visual appeal.
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    addLightsToScene(scene);

    // Opt-out of color management and stick with sRGB.
    if (THREE.ColorManagement) {
      THREE.ColorManagement.enabled = false; // Ensures Color3s will be treated as sRGB.
    }
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // Makes shaders work in sRGB

    // Create camera.
    const camera = new THREE.PerspectiveCamera(75,
      container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0.0, 10, 1.75);
    camera.rotation.set(degToRad(-70), 0, 0);

    // Basic resize handler.
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
  }

  const createShadowModel = () => {
    // const geometry = new THREE.PlaneGeometry(7.5); // Not quite right.
    // Vertex data for the shadow_model from MiiTop.bfres.
    const position = new Float32Array([
      -3.75, 0, -3.75,
      3.75, 0, 3.75,
      3.75, 0, -3.75,
      -3.75, 0, 3.75
    ]);
    const uv = new Float32Array([
      0, 0,
      2, 2,
      2, 0,
      0, 2
    ]);
    const index = new Uint8Array([0, 1, 2, 3, 1, 0]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geometry.setIndex(new THREE.Uint8BufferAttribute(index, 1));
  
    // The shadow texture, black = alpha, 32x32. Originally a BC4 texture in MiiTop.bfres.
    // It represents a radial gradient originating from the bottom right. SVG approximation:
    /*
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" baseProfile="tiny" style="transform:rotate(180deg)" version="1.2"><defs><radialGradient id="a" cx="0" cy="0" r="32" gradientUnits="userSpaceOnUse"><stop offset=".25" stop-color="#fff"/><stop offset="1"/></radialGradient></defs><rect fill="url(#a)" height="32" width="32" x="0" y="0"/></svg>
    */
    const shadowImageDataUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAACXBIWXMAAA3XAAAN1wFCKJt4AAABJUlEQVQ4y3WTSXLDMAwEgdmo/784B4iUnDg4+IKunoHK7Pp/0N3V33dNEI3/AFEkgO7uL4AliQS/G+wbINCo3wY6Q/DO+GVwEtuWKPAP0FlJYsuidsvX2WtlbcXc8WHAuoZwLG/gMWBd61onZGp2t3b+uh5iDgGBrg1kvQjHkgg+Bq9PwtaUuA1MVvIQcwiBbXCStW5iasjTUnuf5E1MTWAibL+ICYmkbfBMkpVcp4bE2yD5OO6Y+Vpkt6okyXokhxCJVhUlyZYdexNZsQdozVgfjixbQqu4Rzo5udaVRAJUuJdbEydrCLNKRYA8lCVvwlVVKIAAwYeanNkX0GgA2J5JcuL9/h7iqEjJrwfa88ZeKkp8A9XPbOH5r1Z1dVVX9/PTfYAfsQsMgS5LNfoAAAAASUVORK5CYII=';
  
    // Load texture and set mirrored repeat wrapping.
    const shadowTexture = new THREE.TextureLoader().load(
      shadowImageDataUrl,
      (t) => {
        t.wrapS = THREE.MirroredRepeatWrapping;
        t.wrapT = THREE.MirroredRepeatWrapping;
        t.flipY = false; // Using GX2 coordinate system.
        t.needsUpdate = true;
      }
    );
  
    // From mt_shadow:
    // diffuse = 0.0, 0.0, 0.0
    // opacity = 0.2980392, 0.2980392, 0.2980392
    // ambient = 0.4, 0.4, 0.4
    // specular = 1.0, 1.0, 1.0
    const material = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.SubtractiveBlending,
      color: 0x666666 // 0.29804
    });
  
    return new THREE.Mesh(geometry, material);
  }

  const animate = () => {
    requestAnimationFrame(animate);

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }

  const init = (container: any) => {
    initRendererAndScene(container);

    createShadowModel();

    // Add mouse event listeners
    rendererRef.current!.domElement.addEventListener('mousedown', handleMouseDown);
    rendererRef.current!.domElement.addEventListener('mousemove', handleMouseMove);
    rendererRef.current!.domElement.addEventListener('mouseup', handleMouseUp);
    rendererRef.current!.domElement.addEventListener('mouseleave', handleMouseUp);
    rendererRef.current!.domElement.style.cursor = 'grab';

    requestAnimationFrame(animate);
  }

  useEffect(() => {
    // Initialize your Three.js scene once
    init(containerRef.current);
    setSceneReady(true);

    // Cleanup when React unmounts
    return () => {
      rendererRef.current?.dispose();
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Scene container */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {sceneReady && sceneRef.current && (
        <>
          {/* Add the plaza floor */}
          <MiiPlazaFloor scene={sceneRef.current} />

          {/* Add the Mii model */}
          {MIIs.map((mii, i) => (
            <Mii key={i} scene={sceneRef.current!} miiUrl={mii.miiUrl} position={mii.position} overrides={mii.overrides} scale={0.15} />
          ))}
        </>
      )}
    </div>
  );
}
