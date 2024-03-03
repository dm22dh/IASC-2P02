import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


// // Set up Three.js scene
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create sphere geometries
// var sphereGeometry1 = new THREE.SphereGeometry(1, 32, 32);
// var sphereGeometry2 = new THREE.SphereGeometry(0.3, 16, 16);

// // Create materials
// var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// // Create meshes
// var sphere1 = new THREE.Mesh(sphereGeometry1, material);
// var sphere2 = new THREE.Mesh(sphereGeometry2, material2);

// // Position spheres
// sphere1.position.set(0, 0, 0);
// sphere2.position.set(3, 0, 0);

// // Add spheres to scene
// scene.add(sphere1);
// scene.add(sphere2);

// // Rotate sphere1 vertically
// function rotateSphere1() {
//     sphere1.rotation.y += 0.01;
// }

// // Revolve sphere2 around sphere1
// function revolveSphere2() {
//     var angle = Date.now() * 0.001; // Adjust speed of revolution
//     var radius = 3; // Distance from center
//     sphere2.position.x = Math.cos(angle) * radius;
//     sphere2.position.z = Math.sin(angle) * radius;
// }

// // Render loop
// function animate() {
//     requestAnimationFrame(animate);
//     rotateSphere1();
//     revolveSphere2();
//     renderer.render(scene, camera);
// }
// animate();

// // Set camera position
// camera.position.z = 5;





// Set up Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create materials
var stickMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color for stick
var candyMaterial = new THREE.MeshBasicMaterial({ color: 0xFF69B4 }); // Pink color for candy

// Create stick geometry and mesh
var stickGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 32);
var stickMesh = new THREE.Mesh(stickGeometry, stickMaterial);
stickMesh.position.y = 1.5; // Adjust position of stick to center it

// Create candy geometry and mesh
var candyGeometry = new THREE.SphereGeometry(1, 32, 32);
var candyMesh = new THREE.Mesh(candyGeometry, candyMaterial);

// Position candy above stick
candyMesh.position.y = 3;

// Add stick and candy to scene
scene.add(stickMesh);
scene.add(candyMesh);

// Set camera position
camera.position.z = 5;

// Add rotation animation
function animate() {
    requestAnimationFrame(animate);
    stickMesh.rotation.y += 0.01; // Rotate stick
    renderer.render(scene, camera);
}
animate();

