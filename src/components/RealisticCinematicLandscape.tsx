import React, { useEffect, useRef } from 'react';

/**
 * RealisticCinematicLandscape
 * 
 * Renders an ultra-realistic, cinematic dual-world landscape:
 * LEFT: Hyper-realistic polluted industrial wasteland with depth haze, volumetric fog,
 *       industrial smokestacks emitting realistic billowing smoke, textured landfill hills,
 *       rusty metallic structures, and moody atmospheric gloom.
 * CENTER: An ethereal, volumetric bioluminescent emerald transformation rift / aurora river
 *         with glowing particles, sparks, mist, and dynamic refractive caustics.
 * RIGHT: A breathtaking, photorealistic sustainable eco-city bathed in golden sunset twilight,
 *        with lush verdant terraced hills, ultra-modern aerodynamic wind turbines, 
 *        glowing bio-domes with glass specular highlights, sleek eco-architecture with vertical forest foliage,
 *        soft atmospheric scattering, and realistic lighting.
 */
export const RealisticCinematicLandscape: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth || 1600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight || 900);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth || 1600;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight || 900;
      initLandscape();
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // SIMULATION DATA STRUCTURES
    // ==========================================

    // 1. Billowing Volumetric Smoke Particles (Left Industrial)
    interface VolumetricSmoke {
      x: number;
      y: number;
      startX: number;
      startY: number;
      vx: number;
      vy: number;
      radius: number;
      growth: number;
      alpha: number;
      maxAlpha: number;
      rotation: number;
      rotSpeed: number;
    }
    let smokeParticles: VolumetricSmoke[] = [];

    // 2. Bioluminescent Swirling Spores & Leaves (Transformation Rift)
    interface RiftSpore {
      t: number;
      speed: number;
      offsetRadius: number;
      angleOffset: number;
      size: number;
      color: string;
      glowColor: string;
      alpha: number;
      isLeaf: boolean;
      rot: number;
      rotSpeed: number;
    }
    let spores: RiftSpore[] = [];

    // 3. Wildlife (Crows on left, Doves / Birds on right)
    interface BirdEntity {
      x: number;
      y: number;
      vx: number;
      vy: number;
      scale: number;
      wingAngle: number;
      wingSpeed: number;
      isDove: boolean;
    }
    let birds: BirdEntity[] = [];

    // 4. Wind Turbines Rotation
    let turbineAngle1 = 0;
    let turbineAngle2 = 1.3;
    let turbineAngle3 = 2.7;

    const initLandscape = () => {
      // Initialize Volumetric Smoke from smokestacks
      smokeParticles = [];
      const stackLocations = [
        { x: width * 0.18, y: height * 0.32 },
        { x: width * 0.24, y: height * 0.26 },
        { x: width * 0.28, y: height * 0.35 },
      ];

      for (let i = 0; i < 65; i++) {
        const stack = stackLocations[i % stackLocations.length];
        smokeParticles.push({
          startX: stack.x,
          startY: stack.y,
          x: stack.x + (Math.random() - 0.5) * 40 - (Math.random() * 80),
          y: stack.y - Math.random() * (height * 0.4),
          vx: -0.25 - Math.random() * 0.35,
          vy: -0.35 - Math.random() * 0.45,
          radius: 20 + Math.random() * 50,
          growth: 0.15 + Math.random() * 0.2,
          alpha: Math.random() * 0.25,
          maxAlpha: 0.15 + Math.random() * 0.18,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
        });
      }

      // Initialize Rift Particles (Bioluminescent arc)
      spores = [];
      const colors = ['#86efac', '#4ade80', '#22c55e', '#fef08a', '#67e8f9'];
      for (let i = 0; i < 90; i++) {
        const isLeaf = Math.random() > 0.45;
        spores.push({
          t: Math.random(),
          speed: 0.0012 + Math.random() * 0.002,
          offsetRadius: (Math.random() - 0.5) * 75,
          angleOffset: Math.random() * Math.PI * 2,
          size: isLeaf ? 5 + Math.random() * 7 : 2 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          glowColor: '#4ade80',
          alpha: 0.3 + Math.random() * 0.7,
          isLeaf,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }

      // Initialize Birds
      birds = [
        { x: width * 0.08, y: height * 0.22, vx: 0.35, vy: -0.04, scale: 0.9, wingAngle: 0, wingSpeed: 0.09, isDove: false },
        { x: width * 0.16, y: height * 0.18, vx: 0.4, vy: 0.05, scale: 0.7, wingAngle: 1.2, wingSpeed: 0.1, isDove: false },
        { x: width * 0.27, y: height * 0.30, vx: 0.3, vy: -0.03, scale: 0.8, wingAngle: 2.5, wingSpeed: 0.08, isDove: false },
        { x: width * 0.72, y: height * 0.18, vx: 0.55, vy: -0.06, scale: 0.85, wingAngle: 0.5, wingSpeed: 0.06, isDove: true },
        { x: width * 0.82, y: height * 0.12, vx: 0.6, vy: 0.04, scale: 1.0, wingAngle: 1.8, wingSpeed: 0.055, isDove: true },
        { x: width * 0.91, y: height * 0.24, vx: 0.5, vy: -0.05, scale: 0.75, wingAngle: 3.1, wingSpeed: 0.07, isDove: true },
      ];
    };

    initLandscape();

    // ==========================================
    // ANIMATION TICKER & PHOTOREALISTIC RENDERING
    // ==========================================
    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // -------------------------------------------------------------
      // 1. SKY / HORIZON MATTE PAINTING WITH ATMOSPHERIC SCATTERING
      // -------------------------------------------------------------
      // Base realistic sky gradient: Dark industrial smog on left to vibrant golden dusk/emerald twilight on right
      const skyGrad = ctx.createLinearGradient(0, 0, width, height * 0.85);
      skyGrad.addColorStop(0.0, '#060807');
      skyGrad.addColorStop(0.22, '#0c0f0d');
      skyGrad.addColorStop(0.38, '#0b1d14');
      skyGrad.addColorStop(0.55, '#062817');
      skyGrad.addColorStop(0.72, '#0c4424');
      skyGrad.addColorStop(0.88, '#1b6335');
      skyGrad.addColorStop(1.0, '#2d7c43');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Atmospheric Sunset Haze & Volumetric Sunlight (Right Side)
      const sunCenter = { x: width * 0.88, y: height * 0.16 };
      const sunGlow = ctx.createRadialGradient(sunCenter.x, sunCenter.y, 0, sunCenter.x, sunCenter.y, width * 0.65);
      sunGlow.addColorStop(0.0, 'rgba(254, 240, 138, 0.7)');
      sunGlow.addColorStop(0.18, 'rgba(167, 243, 208, 0.35)');
      sunGlow.addColorStop(0.42, 'rgba(34, 197, 94, 0.12)');
      sunGlow.addColorStop(0.75, 'rgba(6, 78, 59, 0.04)');
      sunGlow.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);

      // God Rays (Crepuscular light shafts streaming across right landscape)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rayGrad = ctx.createLinearGradient(sunCenter.x, sunCenter.y, width * 0.5, height);
      rayGrad.addColorStop(0.0, 'rgba(254, 240, 138, 0.2)');
      rayGrad.addColorStop(0.5, 'rgba(134, 239, 172, 0.08)');
      rayGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rayGrad;

      // Draw 3 distinct atmospheric light shafts
      const drawRay = (angleDeg: number, spreadDeg: number, len: number) => {
        const rad = (angleDeg * Math.PI) / 180;
        const rad2 = ((angleDeg + spreadDeg) * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(sunCenter.x, sunCenter.y);
        ctx.lineTo(sunCenter.x + Math.cos(rad) * len, sunCenter.y + Math.sin(rad) * len);
        ctx.lineTo(sunCenter.x + Math.cos(rad2) * len, sunCenter.y + Math.sin(rad2) * len);
        ctx.closePath();
        ctx.fill();
      };
      drawRay(130, 8, width * 0.9);
      drawRay(145, 12, width * 0.95);
      drawRay(165, 7, width * 0.85);
      ctx.restore();

      // -------------------------------------------------------------
      // 2. DISTANT SILHOUETTES & INDUSTRIAL COMPLEX (LEFT BACKGROUND)
      // -------------------------------------------------------------
      // Distant industrial smog mountains
      ctx.fillStyle = '#0a0d0b';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      ctx.bezierCurveTo(width * 0.1, height * 0.55, width * 0.25, height * 0.62, width * 0.4, height * 0.72);
      ctx.lineTo(width * 0.4, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Industrial Smokestacks with Realistic Depth & 3D Shading
      const drawSmokestack = (x: number, y: number, w: number, h: number, hasBeacon: boolean) => {
        const stackGrad = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y);
        stackGrad.addColorStop(0, '#1c1917');
        stackGrad.addColorStop(0.3, '#292524');
        stackGrad.addColorStop(0.7, '#1f1c1a');
        stackGrad.addColorStop(1, '#0c0a09');

        ctx.fillStyle = stackGrad;
        ctx.beginPath();
        ctx.moveTo(x - w * 0.55, y + h);
        ctx.lineTo(x - w * 0.38, y);
        ctx.lineTo(x + w * 0.38, y);
        ctx.lineTo(x + w * 0.55, y + h);
        ctx.closePath();
        ctx.fill();

        // Rim Cap
        ctx.fillStyle = '#3f3f46';
        ctx.fillRect(x - w * 0.45, y - 4, w * 0.9, 5);

        // Warning Hazard Bands
        ctx.fillStyle = 'rgba(185, 28, 28, 0.75)';
        ctx.fillRect(x - w * 0.4, y + 14, w * 0.8, 6);
        ctx.fillRect(x - w * 0.43, y + 36, w * 0.86, 6);

        // Blinking Red Aircraft Beacon
        if (hasBeacon) {
          const beaconPulse = Math.sin(time * 3) > 0.2 ? 1 : 0.1;
          ctx.save();
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 10 * beaconPulse;
          ctx.fillStyle = `rgba(239, 68, 68, ${beaconPulse})`;
          ctx.beginPath();
          ctx.arc(x, y - 6, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      };

      drawSmokestack(width * 0.18, height * 0.32, 28, height * 0.38, true);
      drawSmokestack(width * 0.24, height * 0.26, 34, height * 0.46, true);
      drawSmokestack(width * 0.28, height * 0.35, 22, height * 0.35, false);

      // Industrial Refinery Pipes & Lattice Towers
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Pylons
      ctx.moveTo(width * 0.12, height * 0.65);
      ctx.lineTo(width * 0.12, height * 0.42);
      ctx.lineTo(width * 0.14, height * 0.46);
      ctx.lineTo(width * 0.14, height * 0.65);
      ctx.stroke();

      // -------------------------------------------------------------
      // 3. BILLOWING VOLUMETRIC SMOKE SIMULATION (LEFT)
      // -------------------------------------------------------------
      smokeParticles.forEach((sp) => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.radius += sp.growth;
        sp.rotation += sp.rotSpeed;
        sp.alpha -= 0.0006;

        if (sp.y < height * 0.04 || sp.x < -width * 0.1 || sp.alpha <= 0) {
          sp.x = sp.startX + (Math.random() - 0.5) * 20;
          sp.y = sp.startY + Math.random() * 10;
          sp.radius = 18 + Math.random() * 15;
          sp.alpha = sp.maxAlpha;
        }

        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.rotation);
        ctx.globalAlpha = Math.max(0, sp.alpha);

        const smokeRadial = ctx.createRadialGradient(0, 0, 0, 0, 0, sp.radius);
        smokeRadial.addColorStop(0, 'rgba(45, 42, 38, 0.45)');
        smokeRadial.addColorStop(0.5, 'rgba(25, 24, 22, 0.3)');
        smokeRadial.addColorStop(0.85, 'rgba(15, 14, 13, 0.15)');
        smokeRadial.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = smokeRadial;
        ctx.beginPath();
        ctx.arc(0, 0, sp.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // -------------------------------------------------------------
      // 4. DISTANT ECO-CITY HORIZON & BIOPHILIC TOWERS (RIGHT BACKGROUND)
      // -------------------------------------------------------------
      // Sustainable skyline towers with glass reflections and vertical forests
      const towers = [
        { x: width * 0.62, w: 22, h: 140, color: '#163320', lit: true },
        { x: width * 0.65, w: 32, h: 210, color: '#1a4329', lit: true },
        { x: width * 0.69, w: 26, h: 165, color: '#12301c', lit: false },
        { x: width * 0.73, w: 38, h: 255, color: '#235735', lit: true },
        { x: width * 0.78, w: 28, h: 185, color: '#1a4329', lit: true },
        { x: width * 0.82, w: 42, h: 220, color: '#27603c', lit: true },
      ];

      towers.forEach((tw) => {
        const ty = height * 0.68 - tw.h;

        // Tower Body with 3D Bevel
        const twGrad = ctx.createLinearGradient(tw.x, ty, tw.x + tw.w, ty);
        twGrad.addColorStop(0, tw.color);
        twGrad.addColorStop(0.7, '#2f7447');
        twGrad.addColorStop(1, '#1b4b2c');
        ctx.fillStyle = twGrad;

        // Rounded top aesthetic
        ctx.beginPath();
        ctx.roundRect(tw.x, ty, tw.w, tw.h + 80, [6, 6, 0, 0]);
        ctx.fill();

        // Glass specular highlight reflection line
        ctx.strokeStyle = 'rgba(219, 254, 226, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tw.x + 3, ty + 8);
        ctx.lineTo(tw.x + 3, ty + tw.h * 0.85);
        ctx.stroke();

        // Horizontal Terraced Sky-Gardens & Warm Interior Glow
        if (tw.lit) {
          const floors = Math.floor(tw.h / 24);
          for (let f = 1; f < floors; f++) {
            const fy = ty + f * 24;
            // Floor garden band
            ctx.fillStyle = '#15803d';
            ctx.fillRect(tw.x + 2, fy, tw.w - 4, 3);

            // Glowing eco-led windows
            ctx.fillStyle = 'rgba(187, 247, 208, 0.85)';
            ctx.fillRect(tw.x + 6, fy - 6, tw.w - 12, 2.5);
          }
        }
      });

      // -------------------------------------------------------------
      // 5. ROLLING VERDANT ECO-HILLS & WIND TURBINES (RIGHT MIDGROUND)
      // -------------------------------------------------------------
      // Layer 1: Back Green Ridge
      const hill1Grad = ctx.createLinearGradient(0, height * 0.45, 0, height * 0.9);
      hill1Grad.addColorStop(0, '#154823');
      hill1Grad.addColorStop(1, '#0d2d16');
      ctx.fillStyle = hill1Grad;
      ctx.beginPath();
      ctx.moveTo(width * 0.52, height * 0.72);
      ctx.bezierCurveTo(width * 0.68, height * 0.52, width * 0.85, height * 0.54, width, height * 0.46);
      ctx.lineTo(width, height);
      ctx.lineTo(width * 0.52, height);
      ctx.closePath();
      ctx.fill();

      // Layer 2: Main Middle Lush Ridge with Bioluminescent Grass Hues
      const hill2Grad = ctx.createLinearGradient(0, height * 0.55, 0, height);
      hill2Grad.addColorStop(0, '#1d5e2e');
      hill2Grad.addColorStop(0.5, '#144621');
      hill2Grad.addColorStop(1, '#092110');
      ctx.fillStyle = hill2Grad;
      ctx.beginPath();
      ctx.moveTo(width * 0.46, height * 0.80);
      ctx.bezierCurveTo(width * 0.65, height * 0.60, width * 0.88, height * 0.62, width, height * 0.56);
      ctx.lineTo(width, height);
      ctx.lineTo(width * 0.46, height);
      ctx.closePath();
      ctx.fill();

      // Modern Aerodynamic Wind Turbines (Realistic Shaded Masts & Animated Blades)
      turbineAngle1 += 0.015;
      turbineAngle2 += 0.018;
      turbineAngle3 += 0.013;

      const drawRealisticTurbine = (cx: number, cy: number, mastHeight: number, bladeLen: number, angle: number) => {
        // Mast with cylindrical 3D gradient
        const mastGrad = ctx.createLinearGradient(cx - 3, cy, cx + 3, cy);
        mastGrad.addColorStop(0, '#d1d5db');
        mastGrad.addColorStop(0.5, '#ffffff');
        mastGrad.addColorStop(1, '#9ca3af');

        ctx.fillStyle = mastGrad;
        ctx.beginPath();
        ctx.moveTo(cx - 3.5, cy + mastHeight);
        ctx.lineTo(cx - 2, cy);
        ctx.lineTo(cx + 2, cy);
        ctx.lineTo(cx + 3.5, cy + mastHeight);
        ctx.closePath();
        ctx.fill();

        // Hub (Nacelle)
        ctx.fillStyle = '#f3f4f6';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3 Aerodynamic Tapered Blades
        ctx.save();
        ctx.translate(cx, cy);
        for (let b = 0; b < 3; b++) {
          const bAngle = angle + (b * Math.PI * 2) / 3;
          ctx.save();
          ctx.rotate(bAngle);

          // Blade Shape (Tapered airfoil)
          const bladeGrad = ctx.createLinearGradient(0, 0, bladeLen, 0);
          bladeGrad.addColorStop(0, '#f9fafb');
          bladeGrad.addColorStop(0.85, '#e5e7eb');
          bladeGrad.addColorStop(1, '#9ca3af');

          ctx.fillStyle = bladeGrad;
          ctx.beginPath();
          ctx.moveTo(0, -1.8);
          ctx.quadraticCurveTo(bladeLen * 0.4, -3, bladeLen, 0);
          ctx.quadraticCurveTo(bladeLen * 0.4, 2, 0, 1.8);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      };

      drawRealisticTurbine(width * 0.91, height * 0.22, height * 0.28, 48, turbineAngle1);
      drawRealisticTurbine(width * 0.84, height * 0.29, height * 0.24, 38, turbineAngle2);
      drawRealisticTurbine(width * 0.77, height * 0.36, height * 0.18, 28, turbineAngle3);

      // Biogas / CBG Plant Biodome (Futuristic Glass Spherical Geodesic Dome)
      const domeX = width * 0.86;
      const domeY = height * 0.65;
      const domeRadius = 55;

      // Base Tank
      const tankGrad = ctx.createLinearGradient(domeX - domeRadius, domeY, domeX + domeRadius, domeY);
      tankGrad.addColorStop(0, '#1b3b24');
      tankGrad.addColorStop(0.5, '#2e693f');
      tankGrad.addColorStop(1, '#15311e');
      ctx.fillStyle = tankGrad;
      ctx.beginPath();
      ctx.roundRect(domeX - domeRadius, domeY, domeRadius * 2, 60, [0, 0, 8, 8]);
      ctx.fill();

      // Semi-spherical Glass Biodome
      const domeGrad = ctx.createRadialGradient(
        domeX - 15,
        domeY - 20,
        5,
        domeX,
        domeY,
        domeRadius
      );
      domeGrad.addColorStop(0, 'rgba(134, 239, 172, 0.85)');
      domeGrad.addColorStop(0.5, 'rgba(34, 197, 94, 0.6)');
      domeGrad.addColorStop(0.9, 'rgba(21, 128, 61, 0.8)');
      domeGrad.addColorStop(1, 'rgba(6, 78, 59, 0.95)');

      ctx.fillStyle = domeGrad;
      ctx.beginPath();
      ctx.arc(domeX, domeY, domeRadius, Math.PI, 0, false);
      ctx.closePath();
      ctx.fill();

      // Geodesic Structural Lattice (Polished Glass Facets)
      ctx.strokeStyle = 'rgba(240, 253, 244, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(domeX, domeY, domeRadius * 0.65, Math.PI, 0, false);
      ctx.moveTo(domeX - domeRadius * 0.5, domeY);
      ctx.quadraticCurveTo(domeX - domeRadius * 0.3, domeY - domeRadius * 0.8, domeX, domeY - domeRadius);
      ctx.quadraticCurveTo(domeX + domeRadius * 0.3, domeY - domeRadius * 0.8, domeX + domeRadius * 0.5, domeY);
      ctx.stroke();

      // Specular Sunlight Arc on Dome
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(domeX, domeY, domeRadius - 3, -Math.PI * 0.85, -Math.PI * 0.6);
      ctx.stroke();

      // Dome Typography
      ctx.fillStyle = '#f0fdf4';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('BIOGAS / CBG', domeX, domeY + 24);
      ctx.fillStyle = '#86efac';
      ctx.font = '9px system-ui, sans-serif';
      ctx.fillText('PLANT FACILITY', domeX, domeY + 38);

      // Solar Photovoltaic Grid next to Bio-Dome
      const drawSolarArray = (sx: number, sy: number) => {
        ctx.save();
        ctx.fillStyle = '#1e3a8a';
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 1;
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 3; c++) {
            const px = sx + c * 24 - r * 8;
            const py = sy + r * 14;
            ctx.beginPath();
            ctx.moveTo(px, py + 10);
            ctx.lineTo(px + 8, py);
            ctx.lineTo(px + 28, py);
            ctx.lineTo(px + 20, py + 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
        ctx.restore();
      };
      drawSolarArray(domeX - domeRadius - 65, domeY + 12);

      // -------------------------------------------------------------
      // 6. DETAILED REALISTIC LANDFILL & SCRAP TERRAIN (LEFT FOREGROUND)
      // -------------------------------------------------------------
      // Shaded dark waste hill
      const landfillGrad = ctx.createLinearGradient(0, height * 0.55, width * 0.35, height);
      landfillGrad.addColorStop(0, '#1c1917');
      landfillGrad.addColorStop(0.5, '#12100e');
      landfillGrad.addColorStop(1, '#070605');

      ctx.fillStyle = landfillGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.6);
      ctx.bezierCurveTo(width * 0.15, height * 0.58, width * 0.3, height * 0.7, width * 0.38, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Render Individual Textured Trash Bags (Volumetric 3D specular shine)
      const drawTrashBag = (bx: number, by: number, rx: number, ry: number) => {
        const bagGrad = ctx.createRadialGradient(bx - rx * 0.3, by - ry * 0.3, 3, bx, by, rx);
        bagGrad.addColorStop(0, '#3f3f46');
        bagGrad.addColorStop(0.4, '#18181b');
        bagGrad.addColorStop(0.85, '#09090b');
        bagGrad.addColorStop(1, '#000000');

        ctx.fillStyle = bagGrad;
        ctx.beginPath();
        ctx.ellipse(bx, by, rx, ry, (Math.sin(bx) * 0.3), 0, Math.PI * 2);
        ctx.fill();

        // Plastic Crinkles & Highlights
        ctx.strokeStyle = 'rgba(161, 161, 170, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(bx - rx * 0.5, by - ry * 0.2);
        ctx.quadraticCurveTo(bx - rx * 0.1, by - ry * 0.6, bx + rx * 0.4, by - ry * 0.1);
        ctx.stroke();

        // Bag Knot / Tie
        ctx.fillStyle = '#52525b';
        ctx.beginPath();
        ctx.arc(bx - rx * 0.1, by - ry * 0.75, 4, 0, Math.PI * 2);
        ctx.fill();
      };

      drawTrashBag(width * 0.08, height * 0.82, 50, 36);
      drawTrashBag(width * 0.16, height * 0.86, 60, 42);
      drawTrashBag(width * 0.23, height * 0.88, 55, 38);
      drawTrashBag(width * 0.11, height * 0.92, 65, 44);
      drawTrashBag(width * 0.28, height * 0.94, 48, 34);

      // Discarded Scrap Artifacts (PET bottles, crushed cans, cardboard cartons)
      const drawScrapArtifacts = () => {
        // PET Plastic Bottles with Refraction
        const drawBottle = (x: number, y: number, angle: number) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(-8, -18, 16, 36, 4);
          ctx.fill();
          ctx.stroke();
          // Blue cap
          ctx.fillStyle = '#0369a1';
          ctx.fillRect(-4, -22, 8, 4);
          // Highlight reflection
          ctx.strokeStyle = 'rgba(255,255,255,0.8)';
          ctx.beginPath();
          ctx.moveTo(-5, -14);
          ctx.lineTo(-5, 12);
          ctx.stroke();
          ctx.restore();
        };

        drawBottle(width * 0.05, height * 0.88, 0.4);
        drawBottle(width * 0.19, height * 0.93, -0.6);
        drawBottle(width * 0.31, height * 0.92, 1.1);

        // Crushed Aluminum Beverage Can
        const drawCan = (cx: number, cy: number, angle: number) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.fillStyle = '#f59e0b';
          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(-10, -14, 20, 28, 3);
          ctx.fill();
          ctx.stroke();
          // Metal rim
          ctx.fillStyle = '#e5e7eb';
          ctx.fillRect(-9, -15, 18, 3);
          ctx.restore();
        };

        drawCan(width * 0.14, height * 0.91, -0.4);
        drawCan(width * 0.25, height * 0.96, 0.8);
      };
      drawScrapArtifacts();

      // -------------------------------------------------------------
      // 7. PHOTOREALISTIC GOLDEN-EMERALD RIVER OF LIGHT (CENTER)
      // -------------------------------------------------------------
      // The luminous river flowing from the eco-side winding towards the bottom center
      const riverGrad = ctx.createLinearGradient(width * 0.75, height * 0.5, width * 0.35, height);
      riverGrad.addColorStop(0.0, 'rgba(254, 240, 138, 0.95)');
      riverGrad.addColorStop(0.35, 'rgba(134, 239, 172, 0.9)');
      riverGrad.addColorStop(0.7, 'rgba(34, 197, 94, 0.8)');
      riverGrad.addColorStop(1.0, 'rgba(21, 128, 61, 0.5)');

      ctx.save();
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 24;
      ctx.fillStyle = riverGrad;

      ctx.beginPath();
      // Flowing natural S-curve
      ctx.moveTo(width * 0.72, height * 0.58);
      ctx.bezierCurveTo(width * 0.58, height * 0.65, width * 0.48, height * 0.76, width * 0.36, height);
      ctx.lineTo(width * 0.48, height);
      ctx.bezierCurveTo(width * 0.58, height * 0.78, width * 0.68, height * 0.68, width * 0.80, height * 0.60);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // River Water Surface Shimmer & Caustics
      for (let i = 0; i < 9; i++) {
        const prog = ((time * 0.12 + i / 9) % 1);
        const rx = width * 0.74 - prog * width * 0.34 + Math.sin(time * 2 + i) * 12;
        const ry = height * 0.60 + prog * height * 0.38;
        const rLen = (1 - prog * 0.35) * 45 + 15;

        ctx.save();
        ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.65;
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2.2;
        ctx.shadowColor = '#86efac';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(rx, ry, rLen, 3, 0.25, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 8. ETHEREAL BIOLUMINESCENT TRANSFORMATION ARC (CENTER)
      // -------------------------------------------------------------
      // Cubic Bezier coordinates for dynamic transformation sweep
      const startX = width * 0.22;
      const startY = height * 0.98;
      const cp1X = width * 0.40;
      const cp1Y = height * 0.62;
      const cp2X = width * 0.48;
      const cp2Y = height * 0.18;
      const endX = width * 0.82;
      const endY = height * 0.10;

      // Outer Volumetric Green Corona / Nebula
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const arcCorona = ctx.createLinearGradient(startX, startY, endX, endY);
      arcCorona.addColorStop(0, 'rgba(21, 128, 61, 0.1)');
      arcCorona.addColorStop(0.35, 'rgba(34, 197, 94, 0.7)');
      arcCorona.addColorStop(0.65, 'rgba(74, 222, 128, 0.85)');
      arcCorona.addColorStop(0.9, 'rgba(134, 239, 172, 0.6)');
      arcCorona.addColorStop(1, 'rgba(254, 240, 138, 0.2)');

      ctx.strokeStyle = arcCorona;
      ctx.lineWidth = 48;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
      ctx.stroke();

      // Inner Brilliant White Core Laser Beam
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 8;
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(startX + 10, startY - 10);
      ctx.bezierCurveTo(cp1X + 5, cp1Y - 5, cp2X - 5, cp2Y + 5, endX - 10, endY + 10);
      ctx.stroke();
      ctx.restore();

      // Swirling Spores, Sparkles & Botanical Leaves
      spores.forEach((sp) => {
        sp.t += sp.speed;
        if (sp.t > 1) sp.t = 0;
        sp.rot += sp.rotSpeed;

        const u = 1 - sp.t;
        const tt = sp.t * sp.t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * sp.t;

        const px = uuu * startX + 3 * uu * sp.t * cp1X + 3 * u * tt * cp2X + ttt * endX + Math.cos(time * 2 + sp.angleOffset) * sp.offsetRadius;
        const py = uuu * startY + 3 * uu * sp.t * cp1Y + 3 * u * tt * cp2Y + ttt * endY + Math.sin(time * 2 + sp.angleOffset) * sp.offsetRadius;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(sp.rot);
        ctx.globalAlpha = sp.alpha * Math.sin(sp.t * Math.PI);

        if (sp.isLeaf) {
          // Botanical Fresh Leaf
          ctx.fillStyle = sp.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, sp.size, sp.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#14532d';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-sp.size, 0);
          ctx.lineTo(sp.size, 0);
          ctx.stroke();
        } else {
          // Bioluminescent Spore Particle
          ctx.fillStyle = sp.color;
          ctx.shadowColor = sp.glowColor;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(0, 0, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // -------------------------------------------------------------
      // 9. RADIANT 3D RECYCLING EMBLEM AT VORTEX FOCAL POINT
      // -------------------------------------------------------------
      const vortexX = width * 0.46;
      const vortexY = height * 0.42;

      ctx.save();
      ctx.translate(vortexX, vortexY);

      // Rotating Aura Ring
      const auraPulse = 1 + Math.sin(time * 2.5) * 0.08;
      ctx.scale(auraPulse, auraPulse);

      // Radial Glow Sphere
      const orbGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 48);
      orbGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      orbGrad.addColorStop(0.3, 'rgba(134, 239, 172, 0.85)');
      orbGrad.addColorStop(0.7, 'rgba(34, 197, 94, 0.4)');
      orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();

      // Radiant 3-Arrow Recycling Icon with Dimensional Depth
      const drawRecycleSymbol = () => {
        ctx.save();
        ctx.rotate(time * 0.4);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 16;

        for (let i = 0; i < 3; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 3);

          // Curved Arrow Ribbon
          ctx.beginPath();
          ctx.arc(0, 0, 22, -0.6, 0.4, false);
          ctx.lineWidth = 4.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Arrowhead
          const headX = Math.cos(0.4) * 22;
          const headY = Math.sin(0.4) * 22;
          ctx.beginPath();
          ctx.moveTo(headX + 4, headY - 6);
          ctx.lineTo(headX + 8, headY + 5);
          ctx.lineTo(headX - 3, headY + 3);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      };
      drawRecycleSymbol();
      ctx.restore();

      // -------------------------------------------------------------
      // 10. WILDLIFE DYNAMICS (FLAPPING CROWS VS GLIDING DOVES)
      // -------------------------------------------------------------
      birds.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.wingAngle += b.wingSpeed;

        if (b.x > width + 30) {
          b.x = -30;
          b.y = height * 0.12 + Math.random() * height * 0.25;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.scale, b.scale);

        const wingY = Math.sin(b.wingAngle) * 5;

        if (b.isDove) {
          // White/Golden Dove in Eco Sky
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#86efac';
          ctx.shadowBlur = 6;
        } else {
          // Dark Silhouette Crow in Smog Sky
          ctx.strokeStyle = '#18181b';
          ctx.lineWidth = 2.0;
        }

        ctx.beginPath();
        // Left wing
        ctx.moveTo(-9, -wingY);
        ctx.quadraticCurveTo(-4, -wingY * 0.3, 0, 0);
        // Right wing
        ctx.quadraticCurveTo(4, -wingY * 0.3, 9, -wingY);
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      id="cinematic-panoramic-landscape"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover block"
      />
    </div>
  );
};
