import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createCamera(renderer) {
    const camera = new THREE.PerspectiveCamera(
        45,
        renderer.domElement.clientWidth / renderer.domElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1, 16);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.minDistance = 5.8;
    controls.maxDistance = 25;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.8;
    controls.target.set(0, 0, 0);
    controls.update();

    return { camera, controls };
}

function moveVector(target, destination, duration = 1.4) {
    if (window.gsap) {
        window.gsap.to(target, {
            x: destination.x, y: destination.y, z: destination.z,
            duration, ease: "power3.inOut"
        });
    } else {
        target.copy(destination);
    }
}

export function zoomToMarker(camera, controls, markerPosition, distance = 7.6) {
    const direction = new THREE.Vector3()
        .subVectors(camera.position, controls.target)
        .normalize();
    if (direction.lengthSq() === 0) direction.set(0, 0.35, 1);

    const target = markerPosition.clone();
    const destination = target.clone().add(direction.multiplyScalar(distance));

    moveVector(camera.position, destination, 1.6);

    if (window.gsap) {
        window.gsap.to(controls.target, {
            x: target.x, y: target.y, z: target.z,
            duration: 1.6, ease: "power3.inOut",
            onUpdate: () => controls.update()
        });
    } else {
        controls.target.copy(target);
        controls.update();
    }
}

export function resetCamera(camera, controls) {
    moveVector(camera.position, new THREE.Vector3(0, 1, 16), 1.2);
    if (window.gsap) {
        window.gsap.to(controls.target, {
            x: 0, y: 0, z: 0, duration: 1.2,
            ease: "power3.inOut", onUpdate: () => controls.update()
        });
    } else {
        controls.target.set(0, 0, 0);
        controls.update();
    }
}
