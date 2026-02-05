import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeShaderProps {
  variant?: 'matrix' | 'glitch' | 'noise';
  className?: string;
}

export function ThreeShader({ variant = 'matrix', className = '' }: ThreeShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    rendererRef.current = renderer;

    const updateSize = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = 300;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    updateSize();
    containerRef.current.appendChild(renderer.domElement);

    // Matrix rain shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = vUv;
        float columns = 80.0;
        float col = floor(uv.x * columns);
        float offset = random(vec2(col, 0.0));
        float rain = fract(uv.y + time * (0.3 + offset * 0.5) + offset * 10.0);
        float character = step(0.92, rain);
        float brightness = 0.3 + 0.7 * (1.0 - rain);
        float fade = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
        vec3 color = vec3(0.0, 1.0, 0.25) * character * brightness * fade;
        color += vec3(0.0, 0.3, 0.1) * (1.0 - rain) * 0.2 * fade;
        gl_FragColor = vec4(color, character * fade * 0.8);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, 300) },
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      material.uniforms.time.value = elapsed;
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      updateSize();
      material.uniforms.resolution.value.set(
        containerRef.current?.clientWidth || window.innerWidth,
        300
      );
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-[300px] ${className}`}
    />
  );
}
