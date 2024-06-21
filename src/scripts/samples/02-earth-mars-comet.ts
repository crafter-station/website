import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { $ } from "../utils";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  const canvas = $<HTMLDivElement>(".three-scene");

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );

  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(sizes.width, sizes.height);
  canvas.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Planets
  const createPlanet = (
    radius: number,
    color: number,
    position: [number, number, number]
  ) => {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(...position);
    scene.add(planet);
    return planet;
  };

  const earth = createPlanet(0.5, 0x0077ff, [1, 0, 0]);
  const mars = createPlanet(0.3, 0xff4500, [-1.5, 0.5, -1]);

  // Comet
  const cometGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const cometMaterial = new THREE.MeshStandardMaterial({ color: 0xff9f00 });
  const comet = new THREE.Mesh(cometGeometry, cometMaterial);
  scene.add(comet);

  // Camera Positioning
  camera.position.z = 5;

  // Orbit Controls (optional, for camera movement)
  const controls = new OrbitControls(camera, renderer.domElement);

  // Animation with GSAP
  gsap.to(earth.position, {
    duration: 5,
    x: 2,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });
  gsap.to(mars.position, {
    duration: 7,
    y: 1,
    yoyo: true,
    repeat: -1,
    delay: 1,
    ease: "power1.inOut",
  });
  gsap.to(comet.position, {
    duration: 10,
    x: 4,
    y: 2,
    z: 2,
    repeat: -1,
    ease: "power1.inOut",
    onUpdate: () => {
      comet.rotation.x += 0.1;
      comet.rotation.y += 0.1;
    },
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Responsiveness
  window.addEventListener("resize", () => {
    renderer.setSize(sizes.width, sizes.height);
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  });
}
