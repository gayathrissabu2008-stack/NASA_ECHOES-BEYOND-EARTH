import * as THREE from "three";

const MAT = {
    gold: new THREE.MeshStandardMaterial({ color: 0xb48a4b, roughness: 0.8, metalness: 0.3 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xb8b8b0, roughness: 0.7, metalness: 0.45 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x242a30, roughness: 0.9 }),
    solar: new THREE.MeshStandardMaterial({ color: 0x172b46, roughness: 0.55, metalness: 0.45 }),
    white: new THREE.MeshStandardMaterial({ color: 0xd5d1c5, roughness: 0.8 })
};

function addBox(parent, size, position, material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
}

function addStrut(parent, a, b, radius = 0.012) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const direction = end.clone().sub(start);
    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, direction.length(), 8),
        MAT.metal
    );
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    parent.add(mesh);
}

function addWheel(parent, x, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.055, 16), MAT.dark);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, 0.085, z);
    parent.add(mesh);
    for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.012, 0.018), MAT.metal);
        ridge.position.set(x + Math.cos(a) * 0.083, 0.085 + Math.sin(a) * 0.083, z);
        ridge.rotation.z = a;
        parent.add(ridge);
    }
}

function createRover(small = false) {
    const rover = new THREE.Group();
    addBox(rover, [0.34, 0.12, 0.28], [0, 0.23, 0], MAT.gold);
    addBox(rover, [0.27, 0.025, 0.23], [0, 0.305, 0], MAT.solar);

    for (const x of [-0.21, 0.21]) {
        for (const z of [-0.18, 0, 0.18]) {
            addWheel(rover, x, z);
            addStrut(rover, [x * 0.55, 0.22, z * 0.45], [x, 0.085, z]);
        }
    }

    addStrut(rover, [0, 0.29, 0], [0, 0.55, 0], 0.018);
    addBox(rover, [0.14, 0.09, 0.10], [0, 0.57, 0], MAT.white);

    for (const x of [-0.045, 0.045]) {
        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12), MAT.dark);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(x, 0.57, 0.055);
        rover.add(lens);
    }

    addStrut(rover, [0.11, 0.29, -0.08], [0.17, 0.48, -0.08], 0.006);
    const antenna = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 10), MAT.metal);
    antenna.position.set(0.17, 0.48, -0.08);
    rover.add(antenna);

    rover.scale.setScalar(small ? 0.72 : 1);
    return rover;
}

function latLonToVector3(lat, lon, radius) {
    const phi = THREE.MathUtils.degToRad(lat);
    const theta = THREE.MathUtils.degToRad(lon);
    return new THREE.Vector3(
        radius * Math.cos(phi) * Math.sin(theta),
        radius * Math.sin(phi),
        radius * Math.cos(phi) * Math.cos(theta)
    );
}

export function createMarsEquipment(mars, artifacts) {
    const groups = [];
    artifacts.forEach((artifact) => {
        const model = createRover(artifact.model === "sojourner");
        const position = latLonToVector3(artifact.latitude, artifact.longitude, 5.10);
        model.position.copy(position);
        model.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());
        model.rotateY(artifact.id === "pathfinder-sojourner" ? 0.4 : 1.0);
        model.traverse((child) => {
            if (child.isMesh) {
                child.userData.artifact = artifact;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        model.userData.artifact = artifact;
        mars.add(model);
        groups.push(model);
    });
    return groups;
}
