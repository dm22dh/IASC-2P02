import * as THREE from "three"

console.log(THREE)

/* Scene */

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


/* Animation Loop */

const clock = new THREE.Clock()

// Animate
const animation = () =>{

    // return elapsed time
    const elapsedTime = clock.getElapsedTime()


    // renderer
    renderer.render(scene, camera)

    // request next frame
    window.requestAnimationFrame(animation)
}