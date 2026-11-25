import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';
import {
  applyStudioEnvironment,
  createAfterDrawScheduler,
  detectSoftwareWebGL,
} from '../utils/threeHelpers';

function createFrontBadgeTexture(maxAniso: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1152;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 768, 1152);
  bg.addColorStop(0, '#101015');
  bg.addColorStop(0.55, '#09090C');
  bg.addColorStop(1, '#14090B');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 768, 1152);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 48; x < 768; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1152);
    ctx.stroke();
  }
  for (let y = 48; y < 1152; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(768, y);
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(620, 220, 10, 620, 220, 420);
  glow.addColorStop(0, 'rgba(239, 68, 68, 0.24)');
  glow.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 768, 1152);

  ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, 712, 1096);

  ctx.fillStyle = '#DC2626';
  ctx.fillRect(28, 92, 712, 54);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 26px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED BUILDER', 384, 128);

  ctx.fillStyle = '#0B0B0F';
  ctx.fillRect(64, 200, 136, 136);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 4;
  ctx.strokeRect(64, 200, 136, 136);

  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(126, 236);
  ctx.lineTo(94, 236);
  ctx.lineTo(94, 300);
  ctx.lineTo(126, 300);
  ctx.lineTo(126, 268);
  ctx.lineTo(110, 268);
  ctx.stroke();

  ctx.strokeStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(140, 300);
  ctx.lineTo(158, 236);
  ctx.lineTo(176, 300);
  ctx.moveTo(145, 278);
  ctx.lineTo(171, 278);
  ctx.stroke();

  ctx.textAlign = 'right';
  ctx.fillStyle = '#A1A1AA';
  ctx.font = '500 22px "JetBrains Mono", monospace';
  ctx.fillText('PASS ID // GA-2023', 704, 240);
  ctx.fillStyle = '#EF4444';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('CLEARANCE: FULL-STACK', 704, 280);
  ctx.fillStyle = '#71717A';
  ctx.font = '400 20px "JetBrains Mono", monospace';
  ctx.fillText('COHORT 2023 – 2027', 704, 318);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#71717A';
  ctx.font = '500 22px "JetBrains Mono", monospace';
  ctx.fillText('ENGINEER', 64, 435);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 84px "Oswald", sans-serif';
  ctx.fillText('GOUD ADITYA', 64, 525);

  ctx.fillStyle = '#EF4444';
  ctx.fillRect(64, 558, 180, 6);

  ctx.fillStyle = '#FCA5A5';
  ctx.font = 'bold 34px "JetBrains Mono", monospace';
  ctx.fillText('FULL STACK DEVELOPER', 64, 622);

  ctx.fillStyle = '#D4D4D8';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SHARDA UNIVERSITY · CSE', 64, 678);

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Greater Noida, Uttar Pradesh, India', 64, 720);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 795);
  ctx.lineTo(704, 795);
  ctx.stroke();

  const qrX = 64;
  const qrY = 835;
  const cell = 13;
  const size = 14;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isCorner =
        (r < 4 && c < 4) || (r < 4 && c >= size - 4) || (r >= size - 4 && c < 4);
      const hash = ((r * 31 + c * 17 + 7) % 5) < 2;
      if (isCorner || hash) {
        ctx.fillStyle = isCorner ? '#EF4444' : '#E4E4E7';
        ctx.fillRect(qrX + c * cell, qrY + r * cell, cell - 2, cell - 2);
      }
    }
  }

  let bx = 290;
  const widths = [6, 3, 9, 4, 3, 10, 5, 3, 8, 4, 6, 3, 11, 4, 5, 8, 3, 7, 4, 9, 3, 6, 5, 10, 4, 6];
  for (let i = 0; i < widths.length && bx < 700; i++) {
    ctx.fillStyle = i % 7 === 0 ? '#EF4444' : '#E4E4E7';
    ctx.fillRect(bx, 855, widths[i], 112);
    bx += widths[i] + (i % 3 === 0 ? 7 : 4);
  }

  ctx.fillStyle = '#71717A';
  ctx.font = '400 20px "JetBrains Mono", monospace';
  ctx.fillText('GA-SHARDA-CSE-92-NPTEL', 290, 1010);

  ctx.fillStyle = '#DC2626';
  ctx.fillRect(28, 1094, 712, 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAniso;
  texture.needsUpdate = true;
  return texture;
}

function createBackBadgeTexture(maxAniso: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1152;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#09090D';
  ctx.fillRect(0, 0, 768, 1152);

  ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, 712, 1096);

  ctx.fillStyle = '#18181D';
  ctx.fillRect(28, 110, 712, 90);
  ctx.fillStyle = '#991B1B';
  ctx.fillRect(28, 200, 712, 6);

  ctx.fillStyle = '#EF4444';
  ctx.font = 'bold 26px "JetBrains Mono", monospace';
  ctx.fillText('CORE SPECIALIZATIONS', 64, 300);

  const specs = [
    '01 · FULL-STACK WEB (REACT / NODE / EXPRESS)',
    '02 · COMPUTER VISION (PYTHON / OPENCV)',
    '03 · CIVIC TECH (LOAKSUDHAR PLATFORM)',
    '04 · DATA STRUCTURES & ALGORITHMS (JAVA)',
    '05 · DATABASES (MONGODB / MYSQL)',
  ];

  ctx.fillStyle = '#E4E4E7';
  ctx.font = '500 22px "JetBrains Mono", monospace';
  specs.forEach((line, idx) => {
    ctx.fillText(line, 64, 365 + idx * 58);
  });

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('NPTEL Elite 92% · Oracle Java · NASSCOM', 64, 740);
  ctx.fillText('vishwanagar22@gmail.com', 64, 785);

  ctx.fillStyle = '#DC2626';
  ctx.fillRect(28, 1094, 712, 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAniso;
  texture.needsUpdate = true;
  return texture;
}

export function Lanyard3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const resetFnRef = useRef<(() => void) | null>(null);
  const [webglError, setWebglError] = useState(false);

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
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 520;
    renderer.setSize(width, height);
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    // Framed slightly further back and centered lower so the full card + strap fit cleanly above bottom bar
    camera.position.set(0, -0.15, 8.85);

    const envTexture = applyStudioEnvironment(renderer, scene);
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const hemi = new THREE.HemisphereLight(0xe4e4e7, 0x18181b, 0.55);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(3.5, 5, 6);
    scene.add(keyLight);

    const crimsonRim = new THREE.PointLight(0xef4444, 16, 16, 2);
    crimsonRim.position.set(-3.2, 1.5, 3.2);
    scene.add(crimsonRim);

    const fillRim = new THREE.PointLight(0xdc2626, 8, 16, 2);
    fillRim.position.set(3.2, -2.0, 2.5);
    scene.add(fillRim);

    const pivotGroup = new THREE.Group();
    pivotGroup.position.set(0, 2.65, 0);
    scene.add(pivotGroup);

    const anchorGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.16, 24);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x3f3f46,
      metalness: 0.92,
      roughness: 0.22,
    });
    const anchorMesh = new THREE.Mesh(anchorGeo, steelMat);
    pivotGroup.add(anchorMesh);

    const strapGroup = new THREE.Group();
    pivotGroup.add(strapGroup);

    const strapGeo = new THREE.BoxGeometry(0.26, 1.4, 0.028);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      roughness: 0.85,
      metalness: 0.1,
    });
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    strapMesh.position.set(0, -0.74, 0);
    strapGroup.add(strapMesh);

    const stripeGeo = new THREE.BoxGeometry(0.045, 1.4, 0.032);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.45,
      roughness: 0.55,
      metalness: 0.2,
    });
    const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
    stripeMesh.position.set(0, -0.74, 0);
    strapGroup.add(stripeMesh);

    const cardPivot = new THREE.Group();
    cardPivot.position.set(0, -1.46, 0);
    pivotGroup.add(cardPivot);

    const ringGeo = new THREE.TorusGeometry(0.14, 0.028, 12, 28);
    const ringMesh = new THREE.Mesh(ringGeo, steelMat);
    ringMesh.position.set(0, -0.02, 0);
    cardPivot.add(ringMesh);

    const clampGeo = new THREE.BoxGeometry(0.46, 0.14, 0.1);
    const clampMesh = new THREE.Mesh(clampGeo, steelMat);
    clampMesh.position.set(0, -0.18, 0);
    cardPivot.add(clampMesh);

    const cardW = 2.1;
    const cardH = 3.12;
    const r = 0.12;
    const shape = new THREE.Shape();
    shape.moveTo(-cardW / 2 + r, -cardH / 2);
    shape.lineTo(cardW / 2 - r, -cardH / 2);
    shape.quadraticCurveTo(cardW / 2, -cardH / 2, cardW / 2, -cardH / 2 + r);
    shape.lineTo(cardW / 2, cardH / 2 - r);
    shape.quadraticCurveTo(cardW / 2, cardH / 2, cardW / 2 - r, cardH / 2);
    shape.lineTo(-cardW / 2 + r, cardH / 2);
    shape.quadraticCurveTo(-cardW / 2, cardH / 2, -cardW / 2, cardH / 2 - r);
    shape.lineTo(-cardW / 2, -cardH / 2 + r);
    shape.quadraticCurveTo(-cardW / 2, -cardH / 2, -cardW / 2 + r, -cardH / 2);

    const cardBodyGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 3,
    });
    cardBodyGeo.center();

    const cardBodyMat = new THREE.MeshStandardMaterial({
      color: 0x16161c,
      metalness: 0.85,
      roughness: 0.28,
    });
    const cardBodyMesh = new THREE.Mesh(cardBodyGeo, cardBodyMat);
    cardBodyMesh.position.set(0, -1.8, 0);
    cardPivot.add(cardBodyMesh);

    const edgeGlowGeo = new THREE.EdgesGeometry(cardBodyGeo);
    const edgeGlowMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.55,
    });
    const edgeGlowLines = new THREE.LineSegments(edgeGlowGeo, edgeGlowMat);
    edgeGlowLines.position.copy(cardBodyMesh.position);
    edgeGlowLines.scale.set(1.005, 1.005, 1.05);
    cardPivot.add(edgeGlowLines);

    const frontTexture = createFrontBadgeTexture(maxAniso);
    const backTexture = createBackBadgeTexture(maxAniso);

    const plateGeo = new THREE.PlaneGeometry(cardW - 0.08, cardH - 0.08);
    const frontPlateMat = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.32,
      metalness: 0.15,
    });
    const frontPlate = new THREE.Mesh(plateGeo, frontPlateMat);
    frontPlate.position.set(0, -1.8, 0.052);
    cardPivot.add(frontPlate);

    const backPlateMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.35,
      metalness: 0.15,
    });
    const backPlate = new THREE.Mesh(plateGeo, backPlateMat);
    backPlate.position.set(0, -1.8, -0.052);
    backPlate.rotation.y = Math.PI;
    cardPivot.add(backPlate);

    const slotGeo = new THREE.BoxGeometry(0.42, 0.08, 0.12);
    const slotMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.7,
      metalness: 0.6,
      roughness: 0.3,
    });
    const slotMesh = new THREE.Mesh(slotGeo, slotMat);
    slotMesh.position.set(0, -0.34, 0);
    cardPivot.add(slotMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Fixed Drag + Spring Physics State
    const physics = {
      swingZ: 0.06,
      swingVelZ: 0,
      swingX: 0,
      swingVelX: 0,
      spinY: -0.15,
      spinVelY: 0,
      targetSpinSnap: 0,
      hasCustomSpin: false,
      hoverTargetX: 0,
      hoverTargetY: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,
    };

    resetFnRef.current = () => {
      physics.hasCustomSpin = false;
      physics.targetSpinSnap = 0;
      physics.swingZ = 0.2;
      physics.swingVelZ = 0;
      physics.swingX = 0;
      physics.swingVelX = 0;
      physics.spinVelY = 4.2;
    };

    const startDrag = (clientX: number, clientY: number) => {
      physics.isDragging = true;
      physics.hasCustomSpin = true;
      physics.lastX = clientX;
      physics.lastY = clientY;
      physics.spinVelY = 0;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const moveDrag = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
        physics.hoverTargetX = THREE.MathUtils.clamp(nx, -1, 1);
        physics.hoverTargetY = THREE.MathUtils.clamp(ny, -1, 1);
      }

      if (!physics.isDragging) return;

      const dx = clientX - physics.lastX;
      const dy = clientY - physics.lastY;
      physics.lastX = clientX;
      physics.lastY = clientY;

      // Immediate 1:1 rotation + pendulum pull during drag
      physics.spinY += dx * 0.014;
      physics.swingZ = THREE.MathUtils.clamp(physics.swingZ - dx * 0.0028, -0.45, 0.45);
      physics.swingX = THREE.MathUtils.clamp(physics.swingX + dy * 0.0028, -0.35, 0.35);

      // Capture momentum for release inertia
      physics.spinVelY = THREE.MathUtils.clamp(dx * 0.42, -16, 16);
      physics.swingVelZ = THREE.MathUtils.clamp(-dx * 0.09, -4, 4);
      physics.swingVelX = THREE.MathUtils.clamp(dy * 0.09, -4, 4);
    };

    const endDrag = () => {
      if (!physics.isDragging) return;
      physics.isDragging = false;
      renderer.domElement.style.cursor = 'grab';
      // Snap softly to nearest front (0) or back (PI) face after inertia settles
      const halfTurn = Math.PI;
      physics.targetSpinSnap = Math.round(physics.spinY / halfTurn) * halfTurn;
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      moveDrag(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      endDrag();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (physics.isDragging) e.preventDefault();
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      endDrag();
    };

    const onCanvasLeave = () => {
      if (!physics.isDragging) {
        physics.hoverTargetX = 0;
        physics.hoverTargetY = 0;
      }
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    renderer.domElement.addEventListener('mouseleave', onCanvasLeave);

    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    const handleResize = () => {
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize, { passive: true });

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
      const dt = Math.min(clock.getDelta(), 0.04);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        if (!physics.isDragging) {
          // Pendulum spring physics back to gentle idle hover sway
          const idleZ = Math.sin(elapsed * 1.15) * 0.03 + physics.hoverTargetX * 0.1;
          const idleX = Math.cos(elapsed * 0.9) * 0.02 - physics.hoverTargetY * 0.08;

          const stiffness = 22;
          const damping = 4.0;

          const forceZ = (idleZ - physics.swingZ) * stiffness;
          physics.swingVelZ = (physics.swingVelZ + forceZ * dt) * Math.exp(-damping * dt);
          physics.swingZ += physics.swingVelZ * dt;

          const forceX = (idleX - physics.swingX) * stiffness;
          physics.swingVelX = (physics.swingVelX + forceX * dt) * Math.exp(-damping * dt);
          physics.swingX += physics.swingVelX * dt;

          // Spin inertia + gentle settle to front/back face once momentum slows
          physics.spinY += physics.spinVelY * dt;
          physics.spinVelY *= Math.exp(-2.4 * dt);

          if (Math.abs(physics.spinVelY) < 0.8) {
            const target = physics.hasCustomSpin
              ? physics.targetSpinSnap + physics.hoverTargetX * 0.25
              : physics.hoverTargetX * 0.35 + Math.sin(elapsed * 0.7) * 0.14;
            const settleForce = (target - physics.spinY) * 4.5;
            physics.spinVelY = (physics.spinVelY + settleForce * dt) * Math.exp(-3.2 * dt);
          }
        }

        pivotGroup.rotation.z = physics.swingZ;
        pivotGroup.rotation.x = physics.swingX;
        cardPivot.rotation.y = physics.spinY;
        cardPivot.rotation.z = physics.swingZ * 0.35;
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
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mouseleave', onCanvasLeave);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      anchorGeo.dispose();
      strapGeo.dispose();
      strapMat.dispose();
      stripeGeo.dispose();
      stripeMat.dispose();
      ringGeo.dispose();
      clampGeo.dispose();
      steelMat.dispose();
      cardBodyGeo.dispose();
      cardBodyMat.dispose();
      edgeGlowGeo.dispose();
      edgeGlowMat.dispose();
      plateGeo.dispose();
      frontPlateMat.dispose();
      backPlateMat.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      slotGeo.dispose();
      slotMat.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglError) {
    return (
      <div className="glass-surface flex h-full min-h-[460px] flex-col items-center justify-center rounded-2xl p-8 text-center">
        <p className="font-mono text-xs tracking-[0.18em] text-red-400 uppercase">
          Verified Builder
        </p>
        <h3 className="mt-3 font-display text-4xl font-bold text-white uppercase">
          GOUD ADITYA
        </h3>
        <p className="mt-2 font-mono text-sm text-zinc-300">FULL STACK DEVELOPER</p>
        <p className="mt-1 text-xs text-zinc-400">SHARDA UNIVERSITY · CSE</p>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-2xl border border-red-500/25 bg-[#09090D] shadow-[0_0_50px_-15px_rgba(220,38,38,0.3)]">
      {/* Radial ambient crimson glow behind lanyard */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(220, 38, 38, 0.2) 0%, rgba(153, 27, 27, 0.05) 45%, rgba(9, 9, 13, 0) 75%)',
        }}
      />

      {/* Isolated WebGL mount container */}
      <div ref={mountRef} className="relative z-10 h-full min-h-[520px] w-full" />

      {/* Bottom compact control bar (solid rgba, no backdrop-filter over WebGL) */}
      <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-[#0A0A0E]/90 px-4 py-2.5">
        <span className="font-mono text-[11px] text-zinc-400">
          Drag to spin · Hover to tilt badge
        </span>
        <button
          type="button"
          onClick={() => resetFnRef.current?.()}
          className="inline-flex items-center gap-1.5 rounded-md border border-red-500/35 bg-red-950/35 px-2.5 py-1 font-mono text-[11px] font-medium text-red-200 transition-colors hover:border-red-500 hover:text-white"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>
    </div>
  );
}
