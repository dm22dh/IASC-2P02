import * as THREE from "three"

console.log(THREE)

/* Scene */

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)

scene.add(camera)



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)

/* MESHES */

// testsphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testsphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testsphere)



/* Animation Loop */

const clock = new THREE.Clock()

// Animate
const animation = () =>{

    // return elapsed time
    const elapsedTime = clock.getElapsedTime()

    // Animate testsphere
    testsphere.position.z = Math.sin(elapsedTime)


    // renderer
    renderer.render(scene, camera)

    // request next frame
    window.requestAnimationFrame(animation)
}

animation()