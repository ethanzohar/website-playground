"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function MiiLoader({ message }: { message: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // === Basic setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.set(0, 1.4, 110);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.4, 0);
    controls.update();

    // === Lights ===
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(2, 5, 3);
    scene.add(ambient, dir);

    // === Load Mii model ===
    const loader = new GLTFLoader();
    const miiURL =
      "https://mii-unsecure.ariankordi.net/miis/image.glb?nnid=JasmineChlora&texResolution=256&resourceType=middle";

    loader.load(
      miiURL,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        scene.add(model);

        // simple ground shadow
        const plane = new THREE.Mesh(
          new THREE.CircleGeometry(0.7, 32),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.25,
          })
        );
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = 0;
        scene.add(plane);
      },
      undefined,
      (err) => console.error("Failed to load Mii:", err)
    );

    // === Resize handler ===
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // === Animation loop ===
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "#111",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {message}
      </div>
    </div>
  );
}
