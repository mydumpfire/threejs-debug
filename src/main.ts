import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import doorColor from "static/door.jpg";

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial();
const textureLoader = new THREE.TextureLoader();
material.map = textureLoader.load(doorColor);
material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 16, 32),
	material,
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerHeight / window.innerHeight,
	0.1,
	100,
);

camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		renderer.domElement.requestFullscreen();
	} else {
		document.exitFullscreen;
	}
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();
