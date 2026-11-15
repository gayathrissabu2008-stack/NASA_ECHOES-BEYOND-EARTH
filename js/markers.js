
import * as THREE from "three";

const MOON_RADIUS = 5.10;


export function latLonToVector3(
    latitude,
    longitude,
    radius = MOON_RADIUS
) {

    const lat = THREE.MathUtils.degToRad(latitude);
    const lon = THREE.MathUtils.degToRad(longitude);

    return new THREE.Vector3(
        radius * Math.cos(lat) * Math.sin(lon),
        radius * Math.sin(lat),
        radius * Math.cos(lat) * Math.cos(lon)
    );

}


export function createMarkers(moon, artifacts) {

    const markers = [];

    artifacts.forEach((artifact) => {

        const color =
            artifact.type === "Landing hardware"
            ? 0xd7b77a
            : 0x8ebbd0;

        const position = latLonToVector3(
            artifact.latitude,
            artifact.longitude
        );

        // Main marker

        const marker = new THREE.Mesh(

            new THREE.SphereGeometry(0.075, 20, 20),

            new THREE.MeshBasicMaterial({
                color,
                depthTest: true
            })

        );

        marker.position.copy(position);

        marker.userData.artifact = artifact;

        moon.add(marker);


        // Outer location ring

        const ring = new THREE.Mesh(

            new THREE.RingGeometry(0.12, 0.17, 32),

            new THREE.MeshBasicMaterial({
                color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.85,
                depthTest: true
            })

        );

        ring.position.copy(
            position.clone().multiplyScalar(1.012)
        );

        ring.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            position.clone().normalize()
        );

        ring.userData.artifact = artifact;

        moon.add(ring);

        markers.push(marker);

    });

    return markers;

}
