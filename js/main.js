
import * as THREE from "three";

import { createRenderer } from "./renderer.js";
import { createMoon } from "./moon.js";
import { createMars } from "./mars.js";

import {
    createCamera,
    zoomToMarker,
    resetCamera
} from "./camera.js";

import {
    createMarkers,
    latLonToVector3
} from "./markers.js";

import { createEquipment } from "./equipment.js";
import { createMarsEquipment } from "./mars-equipment.js";

import { artifacts, marsArtifacts } from "./data.js";

import {
    renderArtifactCards,
    showArtifactPanel,
    closeArtifactPanel
} from "./artifacts.js";


// --------------------------------------------------
// DOM ELEMENTS
// --------------------------------------------------

const container = document.getElementById("space-container");
const loadingScreen = document.getElementById("loading-screen");

const latitudeDisplay = document.getElementById("latitude");
const longitudeDisplay = document.getElementById("longitude");

const siteContext = document.getElementById("site-context");

if (!container) {
    throw new Error("Missing #space-container in index.html");
}


// --------------------------------------------------
// SCENE AND RENDERER
// --------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03050b);

const renderer = createRenderer(container);
const { camera, controls } = createCamera(renderer);


// --------------------------------------------------
// LIGHTING
// --------------------------------------------------

scene.add(
    new THREE.AmbientLight(0xffffff, 0.42)
);

const sunlight = new THREE.DirectionalLight(
    0xffffff,
    2.6
);

sunlight.position.set(-10, 5, 8);
sunlight.castShadow = true;

scene.add(sunlight);


// --------------------------------------------------
// STARS
// --------------------------------------------------

function createStars() {

    const count = 2600;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        positions[i * 3] =
            (Math.random() - 0.5) * 220;

        positions[i * 3 + 1] =
            (Math.random() - 0.5) * 220;

        positions[i * 3 + 2] =
            (Math.random() - 0.5) * 220;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const stars = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.12,
            transparent: true,
            opacity: 0.82
        })
    );

    scene.add(stars);
}

createStars();


// --------------------------------------------------
// CREATE MOON
// --------------------------------------------------

const moon = createMoon(scene);

const moonMarkers = createMarkers(
    moon,
    artifacts
);

const moonEquipment = createEquipment(
    moon,
    artifacts
);


// --------------------------------------------------
// CREATE MARS
// --------------------------------------------------

const mars = createMars(scene);

const marsMarkers = createMarkers(
    mars,
    marsArtifacts
);

const marsEquipment = createMarsEquipment(
    mars,
    marsArtifacts
);

mars.visible = false;


// --------------------------------------------------
// PLANET CONFIGURATION
// --------------------------------------------------

const worlds = {

    moon: {
        object: moon,
        markers: moonMarkers,
        equipment: moonEquipment,
        artifacts: artifacts,

        title: "THE<br><span>MOON.</span>",

        description:
            "A world we visited, explored and left behind. Discover the machines that changed our understanding of Earth's closest neighbour.",

        destination: "DESTINATION 001",
        mode: "LUNAR EXPLORATION MODE",

        distance: "384,400 <small>KM</small>",
        diameter: "3,474 <small>KM</small>",

        thirdStat: "06",
        thirdLabel: "CREWED LANDINGS",

        missionCount: "06",
        destinationLabel: "EARTH'S MOON",

        archiveHeading: "MISSION ARCHIVE",
        artifactHeading: "LUNAR ARTIFACTS",

        footer: "NASA LUNAR EXPLORATION ARCHIVE"
    },

    mars: {
        object: mars,
        markers: marsMarkers,
        equipment: marsEquipment,
        artifacts: marsArtifacts,

        title: "THE<br><span>MARS.</span>",

        description:
            "A world of ancient rivers, volcanic plains and robotic explorers. Discover the machines that transformed our understanding of the Red Planet.",

        destination: "DESTINATION 002",
        mode: "MARTIAN EXPLORATION MODE",

        distance: "225,000,000 <small>KM</small>",
        diameter: "6,779 <small>KM</small>",

        thirdStat: "03",
        thirdLabel: "ROVERS FEATURED",

        missionCount: "03",
        destinationLabel: "THE RED PLANET",

        archiveHeading: "MARTIAN ARCHIVE",
        artifactHeading: "MARTIAN ARTIFACTS",

        footer: "NASA MARS EXPLORATION ARCHIVE"
    }

};

let activeKey = "moon";
let activeWorld = worlds.moon;


// --------------------------------------------------
// UI HELPERS
// --------------------------------------------------

function setHTML(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.innerHTML = value;
    }
}


// --------------------------------------------------
// COORDINATE DISPLAY HELPERS
// --------------------------------------------------

function resetCoordinates() {

    if (latitudeDisplay) {
        latitudeDisplay.textContent = "00.000°";
    }

    if (longitudeDisplay) {
        longitudeDisplay.textContent = "00.000°";
    }
}


function updateCoordinates(artifact) {

    const lat = Number(artifact.latitude);
    const lon = Number(artifact.longitude);

    if (latitudeDisplay) {

        latitudeDisplay.textContent = Number.isFinite(lat)
            ? `${Math.abs(lat).toFixed(4)}° ${lat < 0 ? "S" : "N"}`
            : "--";
    }

    if (longitudeDisplay) {

        longitudeDisplay.textContent = Number.isFinite(lon)
            ? `${Math.abs(lon).toFixed(4)}° ${lon < 0 ? "W" : "E"}`
            : "--";
    }
}


// --------------------------------------------------
// UPDATE WORLD UI
// --------------------------------------------------

function updateWorldUI(key) {

    const world = worlds[key];

    setHTML("mode-label", world.mode);
    setHTML("destination-number", world.destination);
    setHTML("planet-title", world.title);
    setHTML("planet-description", world.description);

    setHTML("planet-distance", world.distance);
    setHTML("planet-diameter", world.diameter);

    setHTML("planet-stat-third", world.thirdStat);
    setHTML("planet-stat-label", world.thirdLabel);

    setHTML("mission-count", world.missionCount);

    setHTML(
        "artifact-total",
        String(world.artifacts.length).padStart(2, "0")
    );

    setHTML("destination-label", world.destinationLabel);
    setHTML("archive-heading", world.archiveHeading);
    setHTML("artifact-heading", world.artifactHeading);
    setHTML("footer-archive", world.footer);

    setHTML(
        "artifact-count",
        `${String(world.artifacts.length).padStart(2, "0")} DISCOVERIES`
    );

    document
        .getElementById("moon-button")
        ?.classList.toggle("active", key === "moon");

    document
        .getElementById("mars-button")
        ?.classList.toggle("active", key === "mars");

    const legend = document.getElementById("planet-legend");

    if (legend) {

        legend.innerHTML = key === "moon"
            ? `
                <div><span class="legend-dot"></span> Apollo landing sites</div>
                <div><span class="legend-dot passive"></span> Scientific equipment</div>
              `
            : `
                <div><span class="legend-dot"></span> Rover landing sites</div>
                <div><span class="legend-dot passive"></span> Robotic explorers</div>
              `;
    }

    renderArtifactCards(
        world.artifacts,
        selectArtifact
    );

    closeArtifactPanel();

    if (siteContext) {
        siteContext.hidden = true;
    }

    resetCoordinates();

    resetCamera(camera, controls);
}


// --------------------------------------------------
// PLANET SWITCHING
// --------------------------------------------------

function switchWorld(key) {

    if (!worlds[key] || key === activeKey) {
        return;
    }

    activeKey = key;
    activeWorld = worlds[key];

    Object.entries(worlds).forEach(([worldKey, world]) => {

        world.object.visible = worldKey === key;

    });

    updateWorldUI(key);
}


document
    .getElementById("moon-button")
    ?.addEventListener("click", () => {
        switchWorld("moon");
    });


document
    .getElementById("mars-button")
    ?.addEventListener("click", () => {
        switchWorld("mars");
    });


// --------------------------------------------------
// GET ARTIFACT POSITION
// --------------------------------------------------

function getArtifactPosition(artifact) {

    const equipment = activeWorld.equipment.find(
        (group) => group.userData.artifact?.id === artifact.id
    );

    if (equipment) {

        const position = new THREE.Vector3();

        equipment.getWorldPosition(position);

        return position;
    }

    const marker = activeWorld.markers.find(
        (item) => item.userData.artifact?.id === artifact.id
    );

    if (marker) {

        const position = new THREE.Vector3();

        marker.getWorldPosition(position);

        return position;
    }

    const localPosition = latLonToVector3(
        Number(artifact.latitude),
        Number(artifact.longitude),
        5.08
    );

    return activeWorld.object.localToWorld(localPosition);
}


// --------------------------------------------------
// SELECT ARTIFACT
// --------------------------------------------------

function selectArtifact(artifact) {

    if (!artifact) return;

    showArtifactPanel(artifact);

    const position = getArtifactPosition(artifact);

    zoomToMarker(
        camera,
        controls,
        position,
        7.6
    );

    updateCoordinates(artifact);

    if (siteContext) {

        siteContext.hidden = false;

        setHTML(
            "site-context-name",
            (artifact.location || "Unknown location").toUpperCase()
        );

        setHTML(
            "site-context-mission",
            `${artifact.mission || "MISSION"} · ${artifact.name || "Artifact"}`
        );
    }

    console.log(
        "Selected artifact:",
        artifact.name,
        "Coordinates:",
        artifact.latitude,
        artifact.longitude
    );
}


// --------------------------------------------------
// INITIAL ARTIFACT CARDS
// --------------------------------------------------

renderArtifactCards(
    activeWorld.artifacts,
    selectArtifact
);


// --------------------------------------------------
// RAYCASTER — CLICK 3D OBJECTS
// --------------------------------------------------

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let pointerStart = null;

container.addEventListener("pointerdown", (event) => {

    pointerStart = {
        x: event.clientX,
        y: event.clientY
    };

});


container.addEventListener("pointerup", (event) => {

    if (!pointerStart) return;

    const moved = Math.hypot(
        event.clientX - pointerStart.x,
        event.clientY - pointerStart.y
    );

    pointerStart = null;

    // Ignore drag gestures
    if (moved > 6) return;

    const rect = container.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    pointer.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    pointer.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObject(
        activeWorld.object,
        true
    );

    // Search clicked object and its parents for artifact data
    let selectedArtifact = null;

    for (const hit of hits) {

        let object = hit.object;

        while (object && object !== activeWorld.object) {

            if (object.userData?.artifact) {

                selectedArtifact = object.userData.artifact;
                break;
            }

            object = object.parent;
        }

        if (selectedArtifact) break;
    }

    if (selectedArtifact) {

        selectArtifact(selectedArtifact);
    }

});


// --------------------------------------------------
// ZOOM CONTROLS
// --------------------------------------------------

document.getElementById("zoom-in")?.addEventListener("click", () => {

    const direction = new THREE.Vector3()
        .subVectors(controls.target, camera.position)
        .normalize();

    camera.position.add(
        direction.multiplyScalar(1.25)
    );

});


document.getElementById("zoom-out")?.addEventListener("click", () => {

    const direction = new THREE.Vector3()
        .subVectors(camera.position, controls.target)
        .normalize();

    camera.position.add(
        direction.multiplyScalar(1.5)
    );

});


// --------------------------------------------------
// RETURN TO GLOBAL VIEW
// --------------------------------------------------

function returnToGlobalView() {

    resetCamera(camera, controls);

    closeArtifactPanel();

    if (siteContext) {
        siteContext.hidden = true;
    }

    resetCoordinates();
}


document
    .getElementById("reset-view")
    ?.addEventListener("click", returnToGlobalView);


document
    .getElementById("return-global")
    ?.addEventListener("click", returnToGlobalView);


document
    .getElementById("close-panel")
    ?.addEventListener("click", closeArtifactPanel);


document
    .getElementById("panel-overlay")
    ?.addEventListener("click", closeArtifactPanel);


// --------------------------------------------------
// HIDE / SHOW ARTIFACT ARCHIVE
// --------------------------------------------------

const archiveToggle = document.getElementById("toggle-artifacts");
const archiveReveal = document.getElementById("show-artifacts");


function setArchiveCollapsed(collapsed) {

    document.body.classList.toggle(
        "artifacts-collapsed",
        collapsed
    );

    if (archiveToggle) {

        archiveToggle.setAttribute(
            "aria-expanded",
            String(!collapsed)
        );

        archiveToggle.textContent =
            collapsed ? "＋ SHOW ARCHIVE" : "− HIDE ARCHIVE";
    }

    if (archiveReveal) {

        archiveReveal.hidden = !collapsed;

        archiveReveal.setAttribute(
            "aria-hidden",
            String(!collapsed)
        );
    }
}


archiveToggle?.addEventListener("click", () => {

    const collapsed =
        document.body.classList.contains("artifacts-collapsed");

    setArchiveCollapsed(!collapsed);

});


archiveReveal?.addEventListener("click", () => {

    setArchiveCollapsed(false);

});


// --------------------------------------------------
// WINDOW RESIZE
// --------------------------------------------------

window.addEventListener("resize", () => {

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

});


// --------------------------------------------------
// ANIMATION
// --------------------------------------------------

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (activeKey === "moon") {
        moon.rotation.y += delta * 0.010;
    }

    if (activeKey === "mars") {
        mars.rotation.y += delta * 0.006;
    }

    controls.update();

    renderer.render(scene, camera);
}

animate();


// --------------------------------------------------
// LOADING SCREEN
// --------------------------------------------------

window.addEventListener("load", () => {

    if (!loadingScreen) return;

    const paragraph = loadingScreen.querySelector("p");
    const subtitle = loadingScreen.querySelector("span");

    if (paragraph) {
        paragraph.textContent = "INITIALIZING PLANETARY ARCHIVE";
    }

    if (subtitle) {
        subtitle.textContent = "PREPARING MOON AND MARS EXPLORATION";
    }

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(() => {

            loadingScreen.style.display = "none";

        }, 800);

    }, 450);

});
