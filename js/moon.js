
import * as THREE from "three";

export function createMoon(scene) {

    // Higher geometry resolution allows finer terrain displacement
    const geometry = new THREE.SphereGeometry(5, 512, 512);

    const textureLoader = new THREE.TextureLoader();

    const colorMap = textureLoader.load(
        "./assets/textures/lunar-color.jpg"
    );

    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.anisotropy = 8;

    const heightMap = textureLoader.load(
        "./assets/textures/lunar-height.jpg"
    );

    heightMap.colorSpace = THREE.NoColorSpace;
    heightMap.anisotropy = 8;

    const material = new THREE.MeshStandardMaterial({

        // Actual lunar surface appearance
        map: colorMap,

        // Physical vertex displacement
        displacementMap: heightMap,
        displacementScale: 0.055,
        displacementBias: -0.0275,

        // Additional fine surface shading
        bumpMap: heightMap,
        bumpScale: 0.025,

        roughness: 1,
        metalness: 0
    });

    const moon = new THREE.Mesh(geometry, material);

    moon.castShadow = true;
    moon.receiveShadow = true;

    scene.add(moon);

    return moon;
}
