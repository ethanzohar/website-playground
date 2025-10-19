import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {colorFromHex} from "../helpers";

import { Mii } from "../components/mii";
import { MiiPlazaFloor } from "../components/miiPlazaFloor";

export function MiiBuilder() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [sceneReady, setSceneReady] = useState<boolean>(false);
  const [miiUrl, setMiiUrl] = useState<string>(
    "https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=JasmineChlora&texResolution=256&resourceType=middle"
  );

  let currentShadowModel: THREE.Mesh | null = null;

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
    const camera = new THREE.PerspectiveCamera(15,
      container.clientWidth / container.clientHeight, 10, 3000);
    camera.position.set(0.0, 20.0, 60);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 8;
    controls.maxDistance = 2000;
    controls.target.set(0, 8.0, 0);
    controls.update();

    // Basic resize handler.
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    controlsRef.current = controls;
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
  
    // if (mixer) {
    //   animClockDelta += clock.getDelta();
    //   (mixer as THREE.AnimationMixer).setTime(animClockDelta);
    // }
    
    controlsRef.current?.update();

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }

  const init = (container: any) => {
    initRendererAndScene(container);

    currentShadowModel = createShadowModel();

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

  const updateMii = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const urlInput = form.elements.namedItem("modelUrl") as HTMLInputElement;
    if (urlInput && urlInput.value) {
      setMiiUrl(urlInput.value); // This updates state and re-renders <Mii>
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Scene container */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {sceneReady && sceneRef.current && (
        <>
          {/* Add the plaza floor */}
          <MiiPlazaFloor scene={sceneRef.current} />

          {/* Add the Mii model */}
          {miiUrl && <Mii scene={sceneRef.current} miiUrl={miiUrl} position={[0, 0, 0]} scale={0.12} />}
        </>
      )}

      {/* Floating UI */}
      <div
        id="ui"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(255,255,255,0.8)",
          padding: "10px",
          borderRadius: "4px",
          fontFamily: "Arial, sans-serif",
          width: "180px",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          zIndex: 10,
        }}
      >
        <form
          id="modelForm"
          onSubmit={updateMii}
        >
          <label htmlFor="modelUrl">Head URL:</label>
          <input
            type="text"
            id="modelUrl"
            name="modelUrl"
            defaultValue={miiUrl}
            style={{ width: "100%", margin: "5px 0" }}
          />
          <small style={{ fontSize: "12px", color: "gray" }}>
            Hint: Go to{" "}
            <a
              href="https://mii-unsecure.ariankordi.net"
              target="_blank"
              rel="noreferrer"
            >
              the Mii renderer site
            </a>
            , copy your Mii’s image URL, then replace ".png" with ".glb".
          </small>
          <button type="submit" style={{ marginTop: "10px", width: "100%" }}>
            Load Models
          </button>
        </form>
      </div>
    </div>
  );
}
