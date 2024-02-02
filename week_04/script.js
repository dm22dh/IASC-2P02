import * as THREE from "three"
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

// PLANE

const plane_geometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const plane_material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true

})

const plane = new THREE.Mesh(plane_geometry, plane_material)

// plane.position.set(0, 0, -5)
plane.rotation.x = Math.PI * 0.51

scene.add(plane)


// test sphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(geometry, material)


// const torus_geometry = new THREE.TorusGeometry()
// const torus = new THREE.Mesh(torus_geometry, material)

// torus.position.z = -5
scene.add(testSphere)

// ANIMATE

const clock = new THREE.Clock()

const animation = () => {
    
    // return elapsedTime
    const elapsedTime = clock.getElapsedTime()

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