import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.9, 3.5, 10.5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// torusKnot
// const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
// const torusKnotMaterial = new THREE.MeshNormalMaterial()
// const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
// torusKnot.position.set(6, 1.5, 0)
// torusKnot.castShadow = true
// scene.add(torusKnot)


//sphere

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(5, 1.5, 0)
sphere.castShadow = true
scene.add(sphere)


//sphere 2

// const sphereGeometry_2 = new THREE.SphereGeometry(1)
// const sphereMaterial_2 = new THREE.MeshNormalMaterial()
// const sphere_2 = new THREE.Mesh(sphereGeometry, sphereMaterial2)
// sphere_2.position.set(1, 1.5, 3)
// sphere_2.castShadow = true
// scene.add(sphere_2)

//cone
// const radius = 5;
// const height = -10; // Negative value for an inverted cone
// const radialSegments = 32;
// const heightSegments = 1;
// const openEnded = false;

// const geometry = new THREE.ConeGeometry(1, -2, 32, 1, false);
const geometry = new THREE.ConeGeometry(1, 2, 32, 1, false);
const material = new THREE.MeshNormalMaterial({});
const cone = new THREE.Mesh(geometry, material ); 
cone.position.set(5, 0.5, 0)
cone.castShadow = true
scene.add( cone );


// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/***********
** LIGHTS **
************/
/*
// Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 2.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

// Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*******
** UI **
********/
/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')
*/

/*********************
** DOM INTERACTIONS **
**********************/
// domObject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// continue-reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    // reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false

    // reset directionalLight
    directionalLight.position.set(10, 2.5, 0)
}

// first change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()


// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 2

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    // Controls
    controls.update()

    // DOM INTERACTIONS
    // part 1
    if(domObject.part === 1){
        camera.position.set(1.1, 0.3, 1.3)
        camera.lookAt(-5, 0, 1.5)
    }

    // part 2
    if(domObject.part === 2){
        camera.position.set(9.9, 3.5, 10.5)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange){
    //    sphere.rotation.x = elapsedTime
        // cone.rotation.x = Math.sin(elapsedTime * 1) * -2 
        cone.position.y = Math.sin(elapsedTime) * 1
        // cone.position.z = Math.sin(elapsedTime * 1) * 2
    }
    // second-change
    if(domObject.secondChange){
        cone.position.y = Math.sin(elapsedTime * 0.5) * 6
    }

    // third-change
    if(domObject.thirdChange){
        cone.position.y = 2
    }

    // fourth-change
    if(domObject.fourthChange){
        directionalLight.position.y -= 0.05
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

// Create a function to animate the scene
function cone_animate(timestamp) {
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
requestAnimationFrame(cone_animate);

animation()