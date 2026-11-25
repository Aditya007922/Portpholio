import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  applyStudioEnvironment,
  createAfterDrawScheduler,
  detectSoftwareWebGL,
} from '../utils/threeHelpers';

export function HeroThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    const envTexture = applyStudioEnvironment(renderer, scene);

    // Three-point studio lighting with crimson rim accents
    const hemi = new THREE.HemisphereLight(0xd4d4d8, 0x18181b, 0.45);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfff1f2, 1.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xef4444, 14, 18, 2);
    rimLight.position.set(-3.2, 2.2, 2.5);
    scene.add(rimLight);

    const underLight = new THREE.PointLight(0xdc2626, 9, 15, 2);
    underLight.position.set(2.5, -2.5, 2.0);
    scene.add(underLight);

    // Composite multi-part 3D wireframe + metallic rig
    const rig = new THREE.Group();
    scene.add(rig);

    // Part 1: Inner faceted obsidian metallic icosahedron core
    const coreGeo = new THREE.IcosahedronGeometry(0.95, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.9,
      roughness: 0.22,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rig.add(coreMesh);

    // Part 2: Crimson wireframe geodesic shell
    const cageGeo = new THREE.IcosahedronGeometry(1.38, 1);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.72,
    });
    const cageLines = new THREE.LineSegments(cageEdges, cageMat);
    rig.add(cageLines);

    // Part 3: Primary tilted orbital ring
    const ring1Geo = new THREE.TorusGeometry(1.88, 0.022, 12, 72);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.85,
      metalness: 0.8,
      roughness: 0.28,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.set(Math.PI / 3.2, Math.PI / 6, 0);
    rig.add(ring1);

    // Part 4: Secondary brushed steel orbital ring
    const ring2Geo = new THREE.TorusGeometry(2.18, 0.014, 12, 84);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x71717a,
      metalness: 0.92,
      roughness: 0.24,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(-Math.PI / 3.6, -Math.PI / 5, 0);
    rig.add(ring2);

    // Part 5-8: 4 orbiting wireframe octahedron nodes
    const satGeo = new THREE.OctahedronGeometry(0.16, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 0.7,
      metalness: 0.4,
      roughness: 0.35,
      wireframe: true,
    });
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i * Math.PI) / 2;
      sat.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 0.6, Math.sin(angle) * 2.15);
      satellites.push(sat);
      rig.add(sat);
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const pointerTarget = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerTarget.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerTarget.y = THREE.MathUtils.clamp(ny, -1, 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    const afterDraw = createAfterDrawScheduler(renderer, (id) => {
      frameId = id;
    });

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        coreMesh.rotation.y += delta * 0.35;
        coreMesh.rotation.x += delta * 0.18;
        cageLines.rotation.y -= delta * 0.22;
        cageLines.rotation.z += delta * 0.12;
        ring1.rotation.z += delta * 0.28;
        ring2.rotation.z -= delta * 0.2;

        for (let i = 0; i < satellites.length; i++) {
          const sat = satellites[i];
          const a = elapsed * 0.65 + (i * Math.PI) / 2;
          sat.position.set(Math.cos(a) * 2.15, Math.sin(a * 1.5) * 0.55, Math.sin(a) * 2.15);
          sat.rotation.y += delta * 1.4;
        }

        rig.rotation.y = THREE.MathUtils.damp(rig.rotation.y, pointerTarget.x * 0.45, 5, delta);
        rig.rotation.x = THREE.MathUtils.damp(rig.rotation.x, -pointerTarget.y * 0.35, 5, delta);
        rig.position.y = Math.sin(elapsed * 1.3) * 0.08;
      }

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageEdges.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return null;
  }

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
