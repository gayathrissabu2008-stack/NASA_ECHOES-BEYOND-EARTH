
import * as THREE from "three";

const GOLD = new THREE.MeshStandardMaterial({
    color: 0xb89a63, roughness: 0.8, metalness: 0.4
});
const GOLD_DARK = new THREE.MeshStandardMaterial({
    color: 0x806743, roughness: 0.85, metalness: 0.3
});
const METAL = new THREE.MeshStandardMaterial({
    color: 0xaaa9a2, roughness: 0.65, metalness: 0.55
});
const DARK = new THREE.MeshStandardMaterial({
    color: 0x34383b, roughness: 0.9
});
const WHITE = new THREE.MeshStandardMaterial({
    color: 0xd8d5c9, roughness: 0.75
});
const BLACK = new THREE.MeshStandardMaterial({
    color: 0x17191b, roughness: 0.95
});

function box(parent, size, position, material) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(...size),
        material
    );
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
}

function cylinder(parent, rt, rb, height, position, material, segments = 12) {
    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(rt, rb, height, segments),
        material
    );
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
}

function strut(parent, start, end, radius, material) {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = b.clone().sub(a);

    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius,
            radius,
            direction.length(),
            8
        ),
        material
    );

    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );

    parent.add(mesh);
    return mesh;
}

// --------------------------------------------------
// APOLLO LUNAR MODULE
// --------------------------------------------------

function createLunarModule() {
    const group = new THREE.Group();

    cylinder(group, 0.145, 0.145, 0.09, [0, 0.17, 0], GOLD, 8);
    box(group, [0.19, 0.035, 0.19], [0, 0.23, 0], GOLD_DARK);
    cylinder(group, 0.035, 0.055, 0.09, [0, 0.095, 0], DARK, 12);

    for (const [x, z] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
        const start = [x * 0.095, 0.16, z * 0.095];
        const end = [x * 0.17, 0.025, z * 0.17];

        strut(group, start, end, 0.009, METAL);
        cylinder(group, 0.035, 0.035, 0.012,
            [end[0], 0.018, end[2]], DARK);

        box(group, [0.065, 0.075, 0.012],
            [x * 0.09, 0.17, z * 0.09], GOLD);
    }

    strut(group, [0.13, 0.20, 0.14], [0.17, 0.025, 0.17], 0.004, METAL);
    strut(group, [0.155, 0.20, 0.13], [0.195, 0.025, 0.16], 0.004, METAL);

    for (let i = 0; i < 6; i++) {
        const y = 0.04 + i * 0.027;
        strut(group, [0.13, y, 0.14], [0.155, y, 0.13], 0.003, METAL);
    }

    return group;
}

// --------------------------------------------------
// APOLLO 11 LASER RETROREFLECTOR
// --------------------------------------------------

function createRetroreflector() {
    const group = new THREE.Group();

    strut(group, [0, 0.02, 0], [0, 0.13, 0], 0.008, METAL);
    box(group, [0.17, 0.025, 0.14], [0, 0.15, 0], DARK);

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cube = box(
                group,
                [0.018, 0.008, 0.018],
                [(col - 2) * 0.026, 0.168, (row - 2) * 0.026],
                WHITE
            );
            cube.rotation.y = Math.PI / 4;
        }
    }

    strut(group, [0, 0.04, 0], [-0.07, 0.01, 0.06], 0.005, METAL);
    strut(group, [0, 0.04, 0], [0.07, 0.01, 0.06], 0.005, METAL);

    return group;
}

// --------------------------------------------------
// APOLLO 15 ALSEP
// --------------------------------------------------

function createALSEP() {
    const group = new THREE.Group();

    box(group, [0.11, 0.075, 0.09], [0, 0.065, 0], GOLD);
    strut(group, [0, 0.10, 0], [0, 0.30, 0], 0.004, METAL);

    const dish = new THREE.Mesh(
        new THREE.ConeGeometry(0.045, 0.025, 20, 1, true),
        WHITE
    );
    dish.position.set(0, 0.29, 0);
    dish.rotation.x = Math.PI;
    group.add(dish);

    const instruments = [
        [-0.19,0.04,0.02],
        [0.19,0.04,0.02],
        [0,0.04,-0.20],
        [0,0.04,0.20]
    ];

    instruments.forEach((p, i) => {
        box(group, [0.075,0.07,0.075], p, i % 2 === 0 ? WHITE : GOLD);
        box(group, [0.025,0.012,0.025],
            [p[0],p[1]+0.041,p[2]], DARK);
        strut(group, [0,0.06,0], p, 0.0025, METAL);
    });

    box(group, [0.13,0.008,0.07], [0.24,0.08,-0.14], DARK);

    for (let i = 0; i < 4; i++) {
        box(group, [0.002,0.01,0.07],
            [0.19+i*0.033,0.087,-0.14], METAL);
    }

    return group;
}

// --------------------------------------------------
// APOLLO 15 LUNAR ROVING VEHICLE
// --------------------------------------------------

function createLunarRover() {
    const group = new THREE.Group();

    // Main chassis
    box(group, [0.38, 0.045, 0.25], [0, 0.19, 0], GOLD_DARK);

    // Lower frame
    box(group, [0.43, 0.025, 0.29], [0, 0.14, 0], METAL);

    // Four wheels
    for (const x of [-1, 1]) {
        for (const z of [-1, 1]) {
            const wheel = new THREE.Mesh(
                new THREE.TorusGeometry(0.075, 0.022, 8, 16),
                BLACK
            );

            wheel.position.set(x * 0.235, 0.11, z * 0.17);
            wheel.rotation.y = Math.PI / 2;
            group.add(wheel);

            // Wheel hub
            cylinder(
                group,
                0.025, 0.025, 0.025,
                [x * 0.235, 0.11, z * 0.17],
                METAL
            );

            // Wheel support
            strut(
                group,
                [x * 0.17, 0.17, z * 0.10],
                [x * 0.235, 0.11, z * 0.17],
                0.009,
                METAL
            );
        }
    }

    // Two astronaut seats
    for (const x of [-0.09, 0.09]) {
        box(group, [0.075, 0.018, 0.085],
            [x, 0.25, -0.025], GOLD);

        box(group, [0.075, 0.10, 0.018],
            [x, 0.30, -0.07], GOLD_DARK);

        strut(
            group,
            [x, 0.20, 0.02],
            [x, 0.25, -0.025],
            0.004,
            METAL
        );
    }

    // Front control console
    box(group, [0.12, 0.045, 0.07],
        [0, 0.25, 0.105], DARK);

    box(group, [0.10, 0.008, 0.055],
        [0, 0.278, 0.105], WHITE);

    // Antenna mast and dish
    strut(group, [0, 0.21, -0.10], [0, 0.48, -0.10], 0.005, METAL);

    const dish = new THREE.Mesh(
        new THREE.ConeGeometry(0.055, 0.025, 16, 1, true),
        WHITE
    );
    dish.position.set(0, 0.48, -0.10);
    dish.rotation.x = Math.PI;
    group.add(dish);

    // Rear equipment box
    box(group, [0.11, 0.08, 0.09],
        [0, 0.25, -0.14], GOLD);

    // Front camera
    box(group, [0.045, 0.035, 0.025],
        [0, 0.22, 0.15], DARK);

    return group;
}

// --------------------------------------------------
// SURVEYOR 3 LUNAR LANDER
// --------------------------------------------------

function createSurveyor() {
    const group = new THREE.Group();

    // Main lander body
    cylinder(group, 0.13, 0.16, 0.13,
        [0, 0.30, 0], GOLD_DARK, 8);

    // Upper equipment deck
    cylinder(group, 0.11, 0.11, 0.035,
        [0, 0.385, 0], GOLD, 8);

    // Central instrument housing
    box(group, [0.12, 0.09, 0.12],
        [0, 0.45, 0], WHITE);

    // Three landing legs and footpads
    for (let i = 0; i < 3; i++) {
        const angle = i * (Math.PI * 2 / 3);

        const x = Math.cos(angle);
        const z = Math.sin(angle);

        const upper = [
            x * 0.09, 0.28, z * 0.09
        ];

        const lower = [
            x * 0.27, 0.035, z * 0.27
        ];

        strut(group, upper, lower, 0.012, METAL);

        strut(
            group,
            [x * 0.09, 0.28, z * 0.09],
            [x * 0.22, 0.12, z * 0.22],
            0.008,
            GOLD
        );

        cylinder(
            group,
            0.055, 0.055, 0.018,
            [x * 0.27, 0.018, z * 0.27],
            DARK,
            12
        );
    }

    // Antenna mast
    strut(group, [0, 0.44, 0], [0, 0.67, 0],
        0.004, METAL);

    // Antenna dish
    const dish = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.035, 16, 1, true),
        WHITE
    );
    dish.position.set(0, 0.67, 0);
    dish.rotation.x = Math.PI;
    group.add(dish);

    // Solar panel
    box(group, [0.20, 0.012, 0.12],
        [0.20, 0.34, 0], GOLD_DARK);

    for (let i = 0; i < 5; i++) {
        box(
            group,
            [0.003, 0.014, 0.12],
            [0.12 + i * 0.04, 0.35, 0],
            METAL
        );
    }

    // Camera/instrument arm
    strut(
        group,
        [0.10, 0.35, 0],
        [0.23, 0.25, 0.08],
        0.006,
        METAL
    );

    box(group, [0.055, 0.055, 0.055],
        [0.24, 0.24, 0.08], DARK);

    return group;
}

// --------------------------------------------------
// IDENTIFY ARTIFACT TYPE
// --------------------------------------------------

function getType(artifact) {
    const text = [
        artifact.id,
        artifact.name,
        artifact.shortName,
        artifact.type,
        artifact.mission
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    if (text.includes("retro") || text.includes("laser ranging")) {
        return "reflector";
    }

    if (text.includes("alsep")) {
        return "alsep";
    }

    if (
        text.includes("roving vehicle") ||
        text.includes("lunar rover") ||
        text.includes("lrv")
    ) {
        return "rover";
    }

    if (text.includes("surveyor")) {
        return "surveyor";
    }

    if (
        text.includes("descent stage") ||
        text.includes("lunar module")
    ) {
        return "module";
    }

    return null;
}

// --------------------------------------------------
// LATITUDE / LONGITUDE POSITION
// --------------------------------------------------

function toVector(lat, lon, radius) {
    const phi = THREE.MathUtils.degToRad(lat);
    const theta = THREE.MathUtils.degToRad(lon);

    return new THREE.Vector3(
        radius * Math.cos(phi) * Math.sin(theta),
        radius * Math.sin(phi),
        radius * Math.cos(phi) * Math.cos(theta)
    );
}

// --------------------------------------------------
// CREATE ALL LUNAR EQUIPMENT
// --------------------------------------------------

export function createEquipment(moon, artifacts) {
    const groups = [];

    artifacts.forEach((artifact) => {
        const type = getType(artifact);

        if (!type) return;

        let model;

        switch (type) {
            case "module":
                model = createLunarModule();
                break;

            case "reflector":
                model = createRetroreflector();
                break;

            case "alsep":
                model = createALSEP();
                break;

            case "rover":
                model = createLunarRover();
                break;

            case "surveyor":
                model = createSurveyor();
                break;

            default:
                return;
        }

        const lat = Number(artifact.latitude ?? artifact.lat);
        const lon = Number(artifact.longitude ?? artifact.lon);

        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
            console.warn("Invalid lunar equipment coordinates:", artifact.id);
            return;
        }

        const position = toVector(lat, lon, 5.105);

        // Separate nearby Apollo 11 reflector
        if (type === "reflector") {
            const theta = THREE.MathUtils.degToRad(lon);
            const east = new THREE.Vector3(
                Math.cos(theta), 0, -Math.sin(theta)
            );

            position.add(east.multiplyScalar(0.34));
            model.scale.setScalar(2.6);
        } else {
            const scale =
                type === "alsep" ? 1.65 :
                type === "rover" ? 1.65 :
                type === "surveyor" ? 1.8 :
                2.0;

            model.scale.setScalar(scale);
        }

        // Slightly offset the rover from the ALSEP at Apollo 15
        if (type === "rover") {
            const theta = THREE.MathUtils.degToRad(lon);
            const east = new THREE.Vector3(
                Math.cos(theta), 0, -Math.sin(theta)
            );

            position.add(east.multiplyScalar(0.30));
        }

        model.position.copy(position);

        model.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            position.clone().normalize()
        );

        model.rotateY(
            artifact.id === "apollo11-retro" ? 0.55 : 0.2
        );

        model.traverse((child) => {
            if (child.isMesh) {
                child.userData.artifact = artifact;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        model.userData.artifact = artifact;

        moon.add(model);
        groups.push(model);

        console.log("Lunar equipment added:", artifact.id);
    });

    return groups;
}
