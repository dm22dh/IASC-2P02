// Define the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cone parameters
const radius = 5;
const height = -10; // Inverted cone, so height is positive
const radialSegments = 32;
const heightSegments = 1;
const openEnded = false;

// Create cone geometry
const coneGeometry = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, openEnded);

// Create basic material
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// Create mesh using cone geometry and material
const coneMesh = new THREE.Mesh(coneGeometry, material);

// Add cone mesh to the scene
scene.add(coneMesh);

// Position the camera
camera.position.z = 20;

// Animation parameters
const animationDuration = 2000; // in milliseconds
const targetRotationX = Math.PI; // 180 degrees

let startTime = null;

// Create a function to animate the scene
function animate(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    const elapsed = timestamp - startTime;
    const progress = elapsed / animationDuration;
    
    if (progress < 1) {
        // Interpolate rotation between 0 and 180 degrees
        coneMesh.rotation.x = progress * targetRotationX;
        
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
}

// Call the animate function to start the animation loop
requestAnimationFrame(animate);
