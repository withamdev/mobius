import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const torusGeometry = new THREE.TorusGeometry(4, 0.2, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0xd00000,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);
torus.position.y = 10;

const brickNormal = new THREE.TextureLoader().load("bricknormal.jpg");

const pyrGeometry = new THREE.ConeGeometry(15, 12, 4);
const pyrMaterial = new THREE.MeshStandardMaterial({
  color: 0xf6ca83,
  normalMap: brickNormal,
});
const pyr = new THREE.Mesh(pyrGeometry, pyrMaterial);
scene.add(pyr);
pyr.position.y = -5;

const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const sphGeometry = new THREE.SphereGeometry(2);
const sphMaterial = new THREE.MeshStandardMaterial({
  color: 0x477998,
  normalMap: normalTexture,
});
const sph = new THREE.Mesh(sphGeometry, sphMaterial);
scene.add(sph);
sph.position.y = 10;

const pointLight = new THREE.PointLight(0xfdf4dc);
pointLight.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xfdf4dc, 0.2);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const skyBox = new THREE.TextureLoader().load("jameswebb.jpg");
scene.background = skyBox;

let xRight = true;

function animate() {
  requestAnimationFrame(animate);

  if (xRight) {
    torus.rotation.x += 0.01;
    if (torus.rotation.x >= 10) {
      xRight = false;
    }
  } else {
    torus.rotation.x -= 0.01;
    if (torus.rotation.x <= -10) {
      xRight = true;
    }
  }
  torus.rotation.y += 0.01;
  pyr.rotation.y += 0.02;
  sph.rotation.y -= 0.005;

  //controls.update();

  renderer.render(scene, camera);
}

animate();
