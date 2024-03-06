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
const caveWallGeometry = new THREE.PlaneGeometry(10, 10)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -4, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -5, 0)
scene.add(caveFloor)

// OBJECTS

//sphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(5, 0.5, 0)
sphere.castShadow = true
scene.add(sphere)

//sphere 2
const sphere_2_Geometry = new THREE.SphereGeometry(1)
const sphere_2_Material = new THREE.MeshNormalMaterial()
const sphere_2 = new THREE.Mesh(sphere_2_Geometry, sphere_2_Material)
sphere_2.position.set(5, 0.5, 1.5)
sphere_2.castShadow = true

//cone
const geometry = new THREE.ConeGeometry(1, -2, 32, 1, false);
const material = new THREE.MeshNormalMaterial({});
const cone = new THREE.Mesh(geometry, material ); 
cone.position.set(5, -0.8, 0)
cone.castShadow = true
scene.add( cone );

//cone 2
const cone_2_geometry = new THREE.ConeGeometry(1, -2, 32, 1, false);
const cone_2_material = new THREE.MeshNormalMaterial({});
const cone_2 = new THREE.Mesh(cone_2_geometry, cone_2_material); 
cone_2.position.set(5, -0.8, 1.5)
cone_2.castShadow = true

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

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 0.7, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

/*********************
** DOM INTERACTIONS **
**********************/
// domObject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
	fifthChange: false
}

// continue-reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
	window.scrollTo(0, 0);
}

// restart
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

	location.reload();
	window.scrollTo(0, 0);
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

// third change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

// fourth change
document.querySelector('#fifth-change').onclick = function() {
    domObject.fifthChange = true
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

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    // Controls
    controls.update()

    // DOM INTERACTIONS
    // part 1
    if(domObject.part === 1){
		camera.position.set(4.1, 0.3, 4.3)
        camera.lookAt(-5, 0.2, 4.5)
    }

    // part 2
    if(domObject.part === 2){
		camera.position.set(17.5, 5, 12.5)
        camera.lookAt(1, 2.5, 8)
    }

    // first-change
    if(domObject.firstChange){
        console.log("first change clicked")
        cone.position.y = Math.sin(elapsedTime) * 2

        if(cone.position.y > 0){
            console.log("up")
			cone.position.y = Math.sin(elapsedTime) * 2
            cone.rotation.z = Math.sin(elapsedTime * 1) * -Math.PI
        }
        else if(cone.position.y < 0){
            console.log("down")
            cone.position.y = Math.sin(elapsedTime) * 1
            cone.rotation.z = Math.sin(elapsedTime * 1) * 0.01
        }
    }

    // second-change
    if(domObject.secondChange){
		//whimsical cone
		cone.position.y = 2
		cone.rotation.z = -Math.PI
		cone.rotation.x = Math.sin(elapsedTime) * 0.3
		cone.position.z = Math.sin(elapsedTime) * 0.5
    }

	//third-change
	if(domObject.thirdChange){

		scene.add(sphere_2)
		scene.add(cone_2)
		sphere.position.y = -1
		sphere.position.z = -1.5
		cone.position.y = 0.4
		cone.position.z = -1.5
		cone.rotation.z = -Math.PI
		cone.rotation.x = 0
    }

    // fourth-change
    if(domObject.fourthChange){
		cone.position.z = Math.sin(elapsedTime) * 3
		sphere.position.z = Math.sin(elapsedTime) * 3

		cone_2.position.z = 1
		sphere_2.position.z = 1
    }

    // fifth-change
    if(domObject.fifthChange){
		cone_2.position.z = 0
		sphere_2.position.z = 0
		directionalLight.position.z = Math.sin(elapsedTime) * 3
    }
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()