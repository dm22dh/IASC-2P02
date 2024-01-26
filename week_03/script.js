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

//scene.add(testsphere)

// adding cube

// test cube

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshNormalMaterial()

const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

const testCube2 = new THREE.Mesh(cubeGeometry, cubeMaterial)


scene.add(testCube)

scene.add(testCube2)


//adding torus

const torusGeometry = new THREE.TorusGeometry(2.5, 0.2, 300, 100)
const torusMaterial = new THREE.MeshBasicMaterial()
const testTorus = new THREE.Mesh(torusGeometry, torusMaterial)

// scene.add(testTorus)

/* Animation Loop */

const clock = new THREE.Clock()

// Animate
const animation = () =>{

    // return elapsed time
    const elapsedTime = clock.getElapsedTime()


    //animate test cube
    testCube.rotation.x = elapsedTime
    testCube.rotation.y = elapsedTime
    testCube.rotation.z = elapsedTime


    testCube2.rotation.x = elapsedTime
    testCube2.rotation.y = elapsedTime
    testCube2.rotation.z = elapsedTime

    //scale cube - increasing the size of the cube gradually
    // testCube.scale.x = Math.sin(elapsedTime * 0.5) * 2
    // testCube.scale.y = Math.sin(elapsedTime * 0.5) * 2
    // testCube.scale.z = Math.sin(elapsedTime * 0.5) * 2


    //animate torus
    // testTorus.scale.x = elapsedTime
    // testTorus.scale.y = elapsedTime
    // testTorus.scale.z = elapsedTime

    //rotate torus
    testTorus.rotation.y = elapsedTime



    // Animate testsphere
    testsphere.position.z = Math.sin(elapsedTime * 2) * 3 //elapsed time times 2 makes the object go faster within the place, for the object to go further it is the formula times the number

    testCube.position.x = -2
    testCube2.position.x = 2


    // renderer
    renderer.render(scene, camera)

    // request next frame
    window.requestAnimationFrame(animation)
}

animation()