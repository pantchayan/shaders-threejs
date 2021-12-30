import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import testVertexShader from "./shaders/test/vertex.js";
import testFragmentShader from "./shaders/test/fragment.js";
const textureLoader = new THREE.TextureLoader();

let bgTexture = textureLoader.load("./orange-bg.jpg");

const canvas = document.querySelector("canvas");
const sizes = { width: window.innerWidth, height: window.innerHeight };
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

const scene = new THREE.Scene();
scene.background = bgTexture; //new THREE.Color('orange')

const sphereGeometry = new THREE.IcosahedronBufferGeometry(2, 4); // 2 to 7
const count = sphereGeometry.attributes.position.count;
// console.log(count);
const randoms = new Float32Array(count);
for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}
// console.log(sphereGeometry);
sphereGeometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
sphereGeometry.setAttribute("aColor", new THREE.BufferAttribute(randoms, 1));


const sphereMaterial = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
});

// sphereMaterial.wireframe = true;

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 0;
scene.add(sphere);

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(100, 100, 100, 100),
  new THREE.MeshStandardMaterial({ color: "white", flatShading: true })
);
plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

// const directionalLight1 = new THREE.DirectionalLight(
//   new THREE.Color("red"),
//   0.5
// );
// directionalLight1.position.x = 5;
// directionalLight1.position.y = 2;
// directionalLight1.position.z = 3;
// scene.add(directionalLight1);

// const directionalLight2 = new THREE.DirectionalLight(
//   new THREE.Color("blue"),
//   1
// );
// directionalLight2.position.x = -5;
// directionalLight2.position.y = -2;
// scene.add(directionalLight2);

const ambientLight = new THREE.AmbientLight(new THREE.Color("white"), 1);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  55,
  sizes.width / sizes.height,
  0.1,
  500
);
camera.position.z = 10;
camera.position.y = 0;

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();
let animate = () => {
  let elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = elapsedTime * 1;
  sphere.rotation.z = elapsedTime * 1;
  // sphere.rotation.x = elapsedTime * 1;
  for (let i = 0; i < count; i++) {
    randoms[i] += Math.sin(elapsedTime) * i * 0.009;
  }
  sphereGeometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  let randomColor = new Float32Array(count);
  // for (let i = 0; i < count; i++) {
  //   randomColor[i] = lerp(elapsedTime) * i /500
  // }
  // sphereGeometry.setAttribute("aColor", new THREE.BufferAttribute(randomColor, 1));
  sphere.geometry.verticesNeedsUpdates = true;
  sphere.geometry.normalNeedsUpdates = true;
  sphere.geometry.computeVertexNormals();
  sphere.geometry.computeVertexNormals();
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
};

animate();
