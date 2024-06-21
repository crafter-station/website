import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { $ } from "./utils";

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

  const pointLight = new THREE.PointLight(0xffffff, 0.7);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

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

  // Background Stars
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  const starVertices = [];
  for (let i = 0; i < 1000; i++) {
    starVertices.push(
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000),
      THREE.MathUtils.randFloatSpread(2000)
    );
  }
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Camera Positioning
  camera.position.z = 5;

  // Orbit Controls (optional, for camera movement)
  const controls = new OrbitControls(camera, renderer.domElement);

  // GSAP Animations
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

  // Comet Spiral Animation
  gsap.to(comet.position, {
    duration: 10,
    x: 0,
    y: 0,
    z: 0,
    ease: "none",
    repeat: -1,
    onUpdate: function () {
      const time = Date.now() * 0.0005;
      comet.position.x = Math.cos(time * 0.7) * 4;
      comet.position.y = Math.sin(time * 0.7) * 2;
      comet.position.z = Math.sin(time * 0.7) * 2;
      comet.rotation.x += 0.01;
      comet.rotation.y += 0.01;
    },
  });

  // Twinkling Stars Animation
  const twinkleStars = () => {
    gsap.to(starMaterial, {
      opacity: 0.3,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  };
  twinkleStars();

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Responsiveness
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    renderer.setSize(sizes.width, sizes.height);
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  });
}
