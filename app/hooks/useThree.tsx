import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interface for Three.js objects that components can return from their initialization function
 */
interface ThreeObjects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animate?: () => void;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
}

/**
 * Internal interface for storing Three.js objects and cleanup references
 */
interface SceneRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animationId: number;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  animate?: () => void;
}

/**
 * Custom hook for integrating Three.js with React components
 * 
 * @param initFn - Function that creates and returns Three.js objects
 * @param deps - Dependency array for the useEffect (defaults to empty array)
 * @returns ref to mount the Three.js canvas element
 */
export function useThree(initFn: () => ThreeObjects | null, deps: any[] = []) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRef | null>(null);

  useEffect(() => {
    // Early return if not in browser or no mount element
    if (!mountRef.current || typeof window === 'undefined') return;

    // Initialize Three.js scene using the provided function
    const threeObjects = initFn();
    if (!threeObjects) return;

    const { scene, camera, renderer, animate, geometry, material } = threeObjects;

    // Configure renderer and append to DOM
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Set up animation loop using requestAnimationFrame
    let animationId: number;
    function loop() {
      animate?.(); // Call custom animation function if provided
      renderer.render(scene, camera); // Render the scene
      animationId = requestAnimationFrame(loop); // Schedule next frame
    }
    animationId = requestAnimationFrame(loop);

    // Handle window resize events
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Store references for cleanup
    sceneRef.current = { 
      scene, 
      camera, 
      renderer, 
      animationId, 
      geometry, 
      material, 
      animate 
    };

    // Cleanup function - runs when component unmounts or deps change
    return () => {
      if (sceneRef.current) {
        // Stop animation loop
        cancelAnimationFrame(sceneRef.current.animationId);
        window.removeEventListener('resize', handleResize);
        
        // Remove canvas from DOM
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        
        // Dispose of Three.js objects to prevent memory leaks
        sceneRef.current.renderer.dispose();
        if (sceneRef.current.geometry) {
          sceneRef.current.geometry.dispose();
        }
        if (sceneRef.current.material) {
          sceneRef.current.material.dispose();
        }
      }
    };
  }, deps);

  return mountRef;
}
