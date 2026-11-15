
import * as THREE from "three";

// Load the Mars image from your own project.
// This avoids the cross-origin error from the external website.
const MARS_COLOR_MAP = "./assets/textures/2k_mars.jpg";

const PLANET_RADIUS = 5;

// --------------------------------------------------
// PROCEDURAL FALLBACK TEXTURE
// Used automatically if the local image cannot load.
// --------------------------------------------------

function createProceduralMarsTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    // Base rusty-red surface
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#713b32");
    gradient.addColorStop(0.5, "#b65d42");
    gradient.addColorStop(1, "#713c35");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add natural-looking surface regions
    for (let i = 0; i < 450; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 10 + Math.random() * 100;

        const region = ctx.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        const shade = Math.random() > 0.5
            ? "rgba(65, 35, 29, 0.28)"
            : "rgba(230, 137, 91, 0.22)";

        region.addColorStop(0, shade);
        region.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = region;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Small surface craters
    for (let i = 0; i < 700; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 2 + Math.random() * 12;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 25, 22, 0.18)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
            x - radius * 0.2,
            y - radius * 0.2,
            radius * 0.65,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "rgba(235, 151, 110, 0.12)";
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
}

// --------------------------------------------------
// CREATE MARS
// --------------------------------------------------

export function createMars(scene) {
    const marsGroup = new THREE.Group();
    marsGroup.name = "Mars";

    // Planet geometry
    const geometry = new THREE.SphereGeometry(
        PLANET_RADIUS,
        256,
        256
    );

    // Procedural texture is available immediately.
    const fallbackTexture = createProceduralMarsTexture();

    const material = new THREE.MeshStandardMaterial({
        map: fallbackTexture,
        roughness: 1,
        metalness: 0,
        bumpMap: fallbackTexture,
        bumpScale: 0.045
    });

    const mars = new THREE.Mesh(geometry, material);
    mars.name = "Mars Planet";
    mars.castShadow = true;
    mars.receiveShadow = true;

    marsGroup.add(mars);

    // --------------------------------------------------
    // LOAD LOCAL MARS COLOUR MAP
    // --------------------------------------------------

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
        MARS_COLOR_MAP,

        (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;

            material.map = texture;
            material.bumpMap = texture;
            material.bumpScale = 0.045;

            material.needsUpdate = true;

            console.log("Local Mars colour map loaded successfully.");
        },

        undefined,

        (error) => {
            console.warn(
                "Local Mars image could not be loaded. Procedural texture remains active.",
                error
            );
        }
    );

    // --------------------------------------------------
    // MARS ATMOSPHERE
    // --------------------------------------------------

    const atmosphereGeometry = new THREE.SphereGeometry(
        PLANET_RADIUS * 1.035,
        128,
        128
    );

    const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;

            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

                vNormal = normalize(normalMatrix * normal);
                vViewPosition = -mvPosition.xyz;

                gl_Position = projectionMatrix * mvPosition;
            }
        `,

        fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;

            void main() {
                float intensity = pow(
                    0.65 - dot(
                        normalize(vNormal),
                        normalize(vViewPosition)
                    ),
                    3.0
                );

                vec3 atmosphereColor = vec3(0.85, 0.32, 0.16);

                gl_FragColor = vec4(
                    atmosphereColor,
                    intensity * 0.42
                );
            }
        `,

        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false
    });

    const atmosphere = new THREE.Mesh(
        atmosphereGeometry,
        atmosphereMaterial
    );

    atmosphere.name = "Mars Atmosphere";
    marsGroup.add(atmosphere);

    // Add Mars to the scene
    scene.add(marsGroup);

    console.log("Mars planet created.");

    return marsGroup;
}
