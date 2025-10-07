import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

function degToRad(degrees: number) {
  return degrees * (Math.PI / 180);
}

const SCENE_WIDTH = 80;
const SCENE_HEIGHT = 45;

/**
 * Creates floor and tiles, returning arrays of objects for cleanup
 */
function createFloor(scene: THREE.Scene) {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const meshes: THREE.Mesh[] = [];

  // Create floor (rotate to be horizontal)
  const floorGeometry = new THREE.PlaneGeometry(SCENE_WIDTH, SCENE_HEIGHT);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = 0;
  floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal (facing up)
  scene.add(floor);

  // Track objects for cleanup
  geometries.push(floorGeometry);
  materials.push(floorMaterial);
  meshes.push(floor);

  // Create tiles dynamically (also rotate to be horizontal)
  const tileGeometry = new THREE.PlaneGeometry(0.9, 0.9);
  geometries.push(tileGeometry);

  // Define the gradient colors as RGB values
  const centerColor = { r: 0xef / 255, g: 0xec / 255, b: 0xdd / 255 }; // #efecdd
  const edgeColor = { r: 0xde / 255, g: 0xe3 / 255, b: 0xde / 255 };   // #dee3de
  
  // Calculate maximum distance from center for normalization
  const maxDistance = Math.sqrt(Math.pow(16 * 1.2, 2) + Math.pow(10 * 1.2, 2));

  for (let i = 0; i < SCENE_WIDTH / 2; i++) {
    for (let j = 0; j < SCENE_HEIGHT / 2; j++) {
      const absolutePosition = i - j;
      const rotation = 10;
      const gap = 0.61;

      for (let topBot = 0; topBot < 2; topBot++) {
        for (let leftRight = 0; leftRight < 2; leftRight++) {
          // Mirror the tiles by flipping x and z for left/right
          const lrMirror = leftRight === 0 ? 1 : -1;
          const tbMirror = topBot === 0 ? 1 : -1;
          
          // Calculate tile position
          const x = (gap * lrMirror) + i * 1.2 * lrMirror;
          const z = (gap * tbMirror) + j * 1.2 * tbMirror;
          
          // Calculate distance from center (0, 0)
          const distance = Math.sqrt(x * x + z * z);
          
          // Normalize distance to 0-1 range
          const normalizedDistance = Math.min(distance / maxDistance, 1);
          
          // Interpolate between center and edge colors
          const interpolatedColor = {
            r: centerColor.r + (edgeColor.r - centerColor.r) * normalizedDistance,
            g: centerColor.g + (edgeColor.g - centerColor.g) * normalizedDistance,
            b: centerColor.b + (edgeColor.b - centerColor.b) * normalizedDistance
          };
          
          const tileMaterial = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b)
          });
          const tile = new THREE.Mesh(tileGeometry, tileMaterial);
          
          tile.position.x = x;
          tile.position.y = 0.01; // Slightly above floor to avoid z-fighting
          tile.position.z = z;
          tile.rotation.x = degToRad(-90); // Rotate to be horizontal (facing up)
          tile.rotation.z = degToRad(45 + absolutePosition * rotation) * lrMirror * tbMirror; // Mirror rotation as well
          scene.add(tile);

          // Track each object
          materials.push(tileMaterial);
          meshes.push(tile);
        }
      }
    }
  }

  // Return cleanup function
  return () => {
    meshes.forEach(mesh => {
      scene.remove(mesh);
    });
    geometries.forEach(geom => geom.dispose());
    materials.forEach(material => material.dispose());
  };
}

/**
 * MiiPlaza component - A Three.js scene with a rotating green cube
 * 
 * This component demonstrates proper Three.js integration with React Router SSR:
 * - Uses client-side state to prevent hydration mismatches
 * - Creates a full-screen 3D scene with a rotating cube
 * - Handles window resizing and proper cleanup
 */
export function MiiPlaza() {
  const mountRef = useRef<HTMLDivElement>(null);
  // Track client-side hydration to prevent SSR mismatches
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

    // Set up Three.js scene only after client-side hydration
  useEffect(() => {
    if (!mountRef.current || !isClient) return;

    // Create Three.js core objects
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Create dynamic objects and get cleanup function
    const cleanupFloor = createFloor(scene);

    // Position camera for top-down perspective with slight upward rotation
    camera.position.x = 0;
    camera.position.y = 10; // Height above the scene
    camera.position.z = 1.75; // Distance back from the scene
    
    // Set camera rotation manually (lookAt was overriding manual rotation)
    camera.rotation.x = degToRad(-80);
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Mouse drag controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const dragSensitivity = 0.02;

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = -1 * (event.clientY - previousMousePosition.y);

      // Move camera based on mouse movement
      camera.position.x -= deltaX * dragSensitivity;
      camera.position.z += deltaY * dragSensitivity;

      // Constrain camera position to scene bounds
      const halfWidth = SCENE_WIDTH / 2;
      const halfHeight = SCENE_HEIGHT / 2;
      camera.position.x = Math.max(-halfWidth, Math.min(halfWidth, camera.position.x));
      camera.position.z = Math.max(-halfHeight, Math.min(halfHeight, camera.position.z));

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    // Add mouse event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseUp);
    renderer.domElement.style.cursor = 'grab';

    // Animation function - rotates the cube each frame
    const animate = () => {
      renderer.render(scene, camera);
    };

    // Set up animation loop using requestAnimationFrame
    const animationId = requestAnimationFrame(function loop() {
      animate();
      requestAnimationFrame(loop); // Schedule next frame
    });

    // Handle window resize events
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup function - prevents memory leaks
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      // Remove mouse event listeners
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mouseleave', handleMouseUp);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up dynamic objects
      cleanupFloor();
      
      // Dispose of renderer
      renderer.dispose();
    };
  }, [isClient]);

  return (
    <div 
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        // Show loading background until client-side hydration
        background: isClient ? 'transparent' : '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Show loading message during SSR and initial hydration */}
      {!isClient && (
        <div style={{ color: '#fff' }}>Loading Mii Plaza...</div>
      )}
    </div>
  );
}
