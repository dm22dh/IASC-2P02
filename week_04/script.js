import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


// SETUP

// SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect_ratio: window.innerWidth / window.innerHeight
}

/* CREATING SCENE */

// CANVAS
const canvas = document.querySelector('.webgl')

// SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// CAMERA

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspect_ratio,
    0.1,
    100
)
camera.position.set(2, 2, 4)
scene.add(camera)

// RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// CONTROLS

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// MESHES

// Clipping Plane

const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

// PLANE

const plane_geometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const plane_material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true

})

const plane = new THREE.Mesh(plane_geometry, plane_material)

// plane.position.set(0, 0, -5)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)


// test sphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial({
    clippingPlanes: [ clippingPlane ]
})
const testSphere = new THREE.Mesh(geometry, material)

// CylinderGeometry

const cylinder_geometry = new THREE.CylinderGeometry( 5, 5, 14, 20, 42 ); 
const cylinder_material = new THREE.MeshBasicMaterial(); 
const cylinder = new THREE.Mesh( cylinder_geometry, cylinder_material ); 

scene.add( cylinder );


// const torus_geometry = new THREE.TorusGeometry()
// const torus = new THREE.Mesh(torus_geometry, material)

// torus.position.z = -5
// scene.add(testSphere)

// ADDING UI

// UI Object

const ui = new dat.GUI()

const uiObject = {}
uiObject.play = false
uiObject.speed = 0.5
uiObject.distance = 2

// uiObject.reset = () =>{

// }

// Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(plane_material, 'wireframe')

// Sphere UI
const sphereFolder = ui.addFolder('Sphere')

sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Height')

sphereFolder
    .add(uiObject, 'play')
    .name('Animate sphere')

sphereFolder
    .add(renderer, 'localClippingEnabled')
    .name('Clip')

// ANIMATE

const clock = new THREE.Clock()

const animation = () => {
    
    // return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate sphere
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * 0.5) * 2
    }

    // controls
    controls.update()

    // rotate plane
    // plane.rotation.x = Math.PI * elapsedTime * 0.1

    // update renderer
    renderer.render(scene, camera)

    // request next frame
    window.requestAnimationFrame(animation)
}

animation()