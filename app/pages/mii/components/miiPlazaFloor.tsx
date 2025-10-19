import { useEffect, useRef } from "react";
import * as THREE from "three";
import { degToRad } from "../helpers";

interface MiiProps {
  scene: THREE.Scene;
}

const SCENE_WIDTH = 80;
const SCENE_HEIGHT = 45;

export function MiiPlazaFloor ({ scene }: MiiProps) {
    const createFloor = () => {
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
    }

  useEffect(() => {
    if (!scene) return;
  
    requestAnimationFrame(() => {
        createFloor();
    });
  }, [scene]);

  return null; // This component doesn't render JSX, it just adds to the Three.js scene
}
