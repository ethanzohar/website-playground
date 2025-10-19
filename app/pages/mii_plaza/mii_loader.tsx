'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const bodyURL = "https://cdn.jsdelivr.net/gh/ariankordi/ffl-raylib-samples@latest/models/miibodymiddle%20male%20test.glb";

export function MiiLoader() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 110);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    // Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Hardcoded Mii URL
    const miiURL = "https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=JasmineChlora&texResolution=256&resourceType=middle";

    // Load Mii
    const loader = new GLTFLoader();
    // loader.load(miiURL, (gltf) => {
    //   const model = gltf.scene;

    //   // Make all meshes visible and add basic materials
    //   model.traverse((child) => {
    //     if ((child as THREE.Mesh).isMesh) {
    //       const mesh = child as THREE.Mesh;
    //       mesh.visible = true;
    //       if (!mesh.material) {
    //         mesh.material = new THREE.MeshStandardMaterial({ color: 0xffc07f, roughness: 0.7 });
    //       }
    //       mesh.castShadow = true;
    //       mesh.receiveShadow = true;
    //     }
    //   });

    //   // Optional: scale and center
    //   model.scale.set(0.5, 0.5, 0.5);
    //   model.position.set(0, 0, 0);

    //   scene.add(model);
    // });

    // Load body
    loader.load(bodyURL, (bodyGltf) => {
      const body = bodyGltf.scene;

      // Optional: scale and position to match head
      body.scale.set(0.5, 0.5, 0.5);
      body.position.set(0, 0, 0);

      // Make all meshes cast/receive shadows
      body.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      // Add body to scene
      scene.add(body);
    });

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "600px" }} />;
}
