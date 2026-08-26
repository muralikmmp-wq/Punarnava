import React, { useEffect, useRef } from 'react';

export const CinematicPanoramicLandscape: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 1600;
      height = canvas.height = canvas.parentElement.clientHeight || 900;
    };
    window.addEventListener('resize', onResize);

    // ==========================================
    // 1. SMOKE DRIFT PARTICLES (LEFT POLLUTION SIDE)
    // ==========================================
    interface SmokeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      maxAlpha: number;
    }
    const smokeParticles: SmokeParticle[] = [];
    for (let i = 0; i < 40; i++) {
      smokeParticles.push({
        x: width * 0.22 + (Math.random() - 0.5) * 80,
        y: height * 0.25 + Math.random() * height * 0.2,
        vx: (Math.random() - 0.2) * 0.3,
        vy: -0.3 - Math.random() * 0.4,
        radius: 25 + Math.random() * 45,
        alpha: Math.random() * 0.15,
        maxAlpha: 0.18 + Math.random() * 0.12,
      });
    }

    // ==========================================
    // 2. BIRDS / CROWS GLIDING (CONTRASTING SPECIES)
    // ==========================================
    interface Bird {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      wingAngle: number;
      wingSpeed: number;
      side: 'left-crow' | 'right-dove';
    }
    const birds: Bird[] = [
      // Left side: Dark crows over pollution
      { x: width * 0.15, y: height * 0.28, vx: 0.4, vy: -0.05, size: 5, wingAngle: 0, wingSpeed: 0.08, side: 'left-crow' },
      { x: width * 0.28, y: height * 0.22, vx: 0.35, vy: 0.08, size: 4, wingAngle: 1.5, wingSpeed: 0.07, side: 'left-crow' },
      { x: width * 0.08, y: height * 0.35, vx: 0.5, vy: -0.08, size: 6, wingAngle: 0.8, wingSpeed: 0.09, side: 'left-crow' },
      // Right side: Free gliding birds in golden eco-sky
      { x: width * 0.72, y: height * 0.20, vx: 0.6, vy: -0.1, size: 5, wingAngle: 0, wingSpeed: 0.06, side: 'right-dove' },
      { x: width * 0.85, y: height * 0.15, vx: 0.55, vy: 0.05, size: 4, wingAngle: 2, wingSpeed: 0.05, side: 'right-dove' },
      { x: width * 0.65, y: height * 0.26, vx: 0.65, vy: -0.06, size: 5.5, wingAngle: 1, wingSpeed: 0.065, side: 'right-dove' },
    ];

    // ==========================================
    // 3. SWIRLING EMERALD PARTICLES & LEAVES ALONG TRANSFORMATION ARC
    // ==========================================
    interface ArcParticle {
      t: number;
      speed: number;
      size: number;
      opacity: number;
      color: string;
      offsetY: number;
      offsetX: number;
      isLeaf: boolean;
      rotation: number;
      rotSpeed: number;
    }
    const arcParticles: ArcParticle[] = [];
    for (let i = 0; i < 75; i++) {
      arcParticles.push({
        t: Math.random(),
        speed: 0.0018 + Math.random() * 0.0025,
        size: 3 + Math.random() * 9,
        opacity: 0.3 + Math.random() * 0.7,
        color: Math.random() > 0.4 ? '#4ade80' : Math.random() > 0.5 ? '#86efac' : '#fef08a',
        offsetY: (Math.random() - 0.5) * 60,
        offsetX: (Math.random() - 0.5) * 45,
        isLeaf: Math.random() > 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
      });
    }

    // ==========================================
    // 4. ROTATING WIND TURBINE ANGLES
    // ==========================================
    let turbineAngle1 = 0;
    let turbineAngle2 = 1.2;
    let turbineAngle3 = 2.4;

    // Time ticker
    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // ----------------------------------------
      // A. RENDER SMOKE PARTICLES OVER POLLUTED CHIMNEYS
      // ----------------------------------------
      smokeParticles.forEach((sp) => {
        sp.y += sp.vy;
        sp.x += sp.vx;
        sp.radius += 0.12;
        sp.alpha -= 0.0004;

        if (sp.y < height * 0.02 || sp.alpha <= 0) {
          sp.x = width * 0.23 + (Math.random() - 0.5) * 70;
          sp.y = height * 0.28 + Math.random() * 30;
          sp.radius = 20 + Math.random() * 15;
          sp.alpha = sp.maxAlpha;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, sp.alpha);
        const smokeGrad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.radius);
        smokeGrad.addColorStop(0, 'rgba(40, 38, 35, 0.4)');
        smokeGrad.addColorStop(0.6, 'rgba(25, 24, 23, 0.25)');
        smokeGrad.addColorStop(1, 'rgba(15, 15, 15, 0)');
        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ----------------------------------------
      // B. RENDER RIVER OF LIGHT SHIMMER (GOLDEN-GREEN REFLECTIONS)
      // ----------------------------------------
      ctx.save();
      const riverShimmerCount = 8;
      for (let i = 0; i < riverShimmerCount; i++) {
        const prog = ((time * 0.15 + i / riverShimmerCount) % 1);
        const rx = width * 0.65 - prog * width * 0.35 + Math.sin(time + i) * 15;
        const ry = height * 0.52 + prog * height * 0.42;
        const rWidth = (1 - prog * 0.3) * 60 + 20;

        ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.45;
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.ellipse(rx, ry, rWidth, 4, 0.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // ----------------------------------------
      // C. RENDER SWIRLING TRANSFORMATION ARC PARTICLES & FLOATING LEAVES
      // ----------------------------------------
      arcParticles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        p.rotation += p.rotSpeed;

        // Cubic Bezier curve spanning from polluted wasteland (bottom-left) to clean green city (top-right)
        const startX = width * 0.24;
        const startY = height * 0.98;
        const cp1X = width * 0.42;
        const cp1Y = height * 0.68;
        const cp2X = width * 0.48;
        const cp2Y = height * 0.22;
        const endX = width * 0.82;
        const endY = height * 0.12;

        const u = 1 - p.t;
        const tt = p.t * p.t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * p.t;

        const px = uuu * startX + 3 * uu * p.t * cp1X + 3 * u * tt * cp2X + ttt * endX + p.offsetX * Math.sin(p.t * Math.PI * 2);
        const py = uuu * startY + 3 * uu * p.t * cp1Y + 3 * u * tt * cp2Y + ttt * endY + p.offsetY * Math.sin(p.t * Math.PI * 2);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity * Math.sin(p.t * Math.PI);

        if (p.isLeaf) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.42, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#14532d';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.lineTo(p.size, 0);
          ctx.stroke();
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#4ade80';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // ----------------------------------------
      // D. RENDER ROTATING WIND TURBINE BLADES (RIGHT ECO-CITY)
      // ----------------------------------------
      turbineAngle1 += 0.015;
      turbineAngle2 += 0.018;
      turbineAngle3 += 0.014;

      const drawTurbineBlades = (cx: number, cy: number, length: number, angle: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = '#ecfdf5';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#86efac';
        ctx.shadowBlur = 6;

        for (let b = 0; b < 3; b++) {
          const bladeAngle = angle + (b * (Math.PI * 2)) / 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(bladeAngle) * length, Math.sin(bladeAngle) * length);
          ctx.stroke();
        }

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      // Turbines mapped to the background canvas coordinates
      drawTurbineBlades(width * 0.90, height * 0.20, 45, turbineAngle1);
      drawTurbineBlades(width * 0.838, height * 0.267, 35, turbineAngle2);
      drawTurbineBlades(width * 0.775, height * 0.333, 25, turbineAngle3);

      // ----------------------------------------
      // E. RENDER GENTLE BIRDS / CROWS FLAPPING & GLIDING
      // ----------------------------------------
      birds.forEach((bird) => {
        bird.x += bird.vx;
        bird.y += bird.vy;
        bird.wingAngle += bird.wingSpeed;

        // Reset bird when crossing edges
        if (bird.x > width + 20) {
          bird.x = -20;
          bird.y = height * 0.15 + Math.random() * height * 0.25;
        }

        ctx.save();
        ctx.translate(bird.x, bird.y);

        const wingFlap = Math.sin(bird.wingAngle) * bird.size;

        if (bird.side === 'left-crow') {
          ctx.strokeStyle = '#18181b';
          ctx.lineWidth = 1.8;
        } else {
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.6;
          ctx.shadowColor = '#86efac';
          ctx.shadowBlur = 4;
        }

        ctx.beginPath();
        // Left wing
        ctx.moveTo(-bird.size * 1.5, -wingFlap);
        ctx.quadraticCurveTo(-bird.size * 0.7, -wingFlap * 0.2, 0, 0);
        // Right wing
        ctx.quadraticCurveTo(bird.size * 0.7, -wingFlap * 0.2, bird.size * 1.5, -wingFlap);
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      id="cinematic-panoramic-landscape"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC 16:9 HIGH-DETAIL VECTOR ARTWORK */}
      {/* ========================================================================= */}
      <svg 
        viewBox="0 0 1600 900" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-full h-full object-cover"
      >
        <defs>
          {/* Sky Gradient: From Polluted Dim Charcoal Smog (left) to Deep Forest Green and Dusk Twilight Sunset (right) */}
          <linearGradient id="pano-sky-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#080a09" />
            <stop offset="20%" stopColor="#121312" />
            <stop offset="38%" stopColor="#091f14" />
            <stop offset="55%" stopColor="#06321a" />
            <stop offset="75%" stopColor="#0d4a25" />
            <stop offset="90%" stopColor="#1a6332" />
            <stop offset="100%" stopColor="#2e7d42" />
          </linearGradient>

          {/* Forest Green Deep Atmosphere Vignette */}
          <radialGradient id="pano-forest-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="60%" stopColor="#02140a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#010804" stopOpacity="0.85" />
          </radialGradient>

          {/* Golden Sunburst Glow on Right Side */}
          <radialGradient id="pano-sun-burst" cx="92%" cy="14%" r="65%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#86efac" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Dynamic Glowing Emerald Transformation Arc Gradient */}
          <linearGradient id="pano-vortex-grad" x1="10%" y1="95%" x2="85%" y2="8%">
            <stop offset="0%" stopColor="#15803d" stopOpacity="0.2" />
            <stop offset="28%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4ade80" stopOpacity="1" />
            <stop offset="72%" stopColor="#86efac" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.6" />
          </linearGradient>

          {/* River of Golden-Green Light Gradient */}
          <linearGradient id="pano-river-grad" x1="85%" y1="42%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#86efac" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#22c55e" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.5" />
          </linearGradient>

          {/* Waste Terrain Gradient */}
          <linearGradient id="pano-waste-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#24211e" />
            <stop offset="50%" stopColor="#12100e" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          {/* Emerald & Sunlight Glow Filters */}
          <filter id="pano-emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="pano-core-pulse" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="20" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky Foundation & Dark Forest Atmosphere */}
        <rect width="1600" height="900" fill="url(#pano-sky-grad)" />
        <rect width="1600" height="900" fill="url(#pano-sun-burst)" />
        <rect width="1600" height="900" fill="url(#pano-forest-vignette)" opacity="0.75" />

        {/* ========================================================================= */}
        {/* LEFT SIDE: BLEAK INDUSTRIAL WASTELAND, SMOKESTACKS & SMOKE */}
        {/* ========================================================================= */}
        <g id="wasteland-industrial-structures">
          {/* Smokestack 1 */}
          <polygon points="345,310 355,160 375,160 385,310" fill="#1c1917" />
          <rect x="350" y="152" width="30" height="9" fill="#292524" />
          {/* Smokestack 2 (Tallest) */}
          <polygon points="390,320 402,130 424,130 436,320" fill="#171717" />
          <rect x="398" y="122" width="30" height="9" fill="#262626" />
          {/* Red Warning Band on Smokestack */}
          <rect x="404" y="145" width="18" height="6" fill="#7f1d1d" opacity="0.8" />
          {/* Smokestack 3 */}
          <polygon points="440,330 448,180 464,180 472,330" fill="#0f0f0f" />

          {/* Billowing Smoke Layers */}
          <path d="M 365 150 Q 330 90 280 60 Q 230 40 180 30 Q 260 10 350 30 Q 420 60 380 120 Z" fill="#262626" opacity="0.5" />
          <path d="M 412 122 Q 380 70 350 40 Q 420 15 480 35 Q 520 70 440 110 Z" fill="#1c1917" opacity="0.55" />
          <path d="M 456 175 Q 490 120 540 85 Q 580 65 550 110 Z" fill="#2b2b2b" opacity="0.4" />
        </g>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: FUTURISTIC ECO-CITY, GREEN HILLS & BIO-CBG DOME */}
        {/* ========================================================================= */}
        {/* Golden Sunbeams streaming from top-right */}
        <g id="golden-sunbeams" opacity="0.4">
          <polygon points="1440,80 1050,900 1160,900" fill="#fef08a" opacity="0.2" />
          <polygon points="1440,80 880,900 960,900" fill="#fef08a" opacity="0.25" />
          <polygon points="1440,80 750,900 820,900" fill="#86efac" opacity="0.18" />
        </g>

        {/* Sustainable Skyline (Vertical Garden Towers) */}
        <g id="skyline-sustainable-towers" opacity="0.85">
          <rect x="850" y="370" width="24" height="130" rx="3" fill="#1b3820" />
          <rect x="880" y="320" width="28" height="180" rx="4" fill="#2d5e37" />
          <rect x="915" y="350" width="22" height="150" rx="3" fill="#1b3820" />
          <rect x="945" y="295" width="34" height="205" rx="5" fill="#397346" />
          <rect x="985" y="335" width="26" height="165" rx="3" fill="#234c2b" />
          {/* Vertical garden glow windows */}
          <line x1="886" y1="335" x2="902" y2="335" stroke="#86efac" strokeWidth="2.5" opacity="0.85" />
          <line x1="886" y1="360" x2="902" y2="360" stroke="#86efac" strokeWidth="2.5" opacity="0.85" />
          <line x1="952" y1="315" x2="972" y2="315" stroke="#86efac" strokeWidth="2.5" opacity="0.85" />
          <line x1="952" y1="340" x2="972" y2="340" stroke="#86efac" strokeWidth="2.5" opacity="0.85" />
          <line x1="952" y1="365" x2="972" y2="365" stroke="#86efac" strokeWidth="2.5" opacity="0.85" />
        </g>

        {/* Rolling Lush Green Hills */}
        <path d="M 740 610 Q 940 450 1200 470 Q 1420 490 1600 430 L 1600 900 L 740 900 Z" fill="#1d552b" />
        <path d="M 660 680 Q 900 530 1250 550 Q 1460 560 1600 510 L 1600 900 L 660 900 Z" fill="#164823" />
        <path d="M 530 770 Q 800 610 1150 620 Q 1400 630 1600 590 L 1600 900 L 530 900 Z" fill="#10361a" />

        {/* Modern Wind Turbine Tower Masts (Blades animated in canvas above) */}
        <g id="turbine-towers" stroke="#ecfdf5" opacity="0.95">
          {/* Turbine 1 */}
          <line x1="1440" y1="180" x2="1440" y2="380" strokeWidth="4" />
          {/* Turbine 2 */}
          <line x1="1340" y1="240" x2="1340" y2="420" strokeWidth="3" />
          {/* Turbine 3 */}
          <line x1="1240" y1="300" x2="1240" y2="440" strokeWidth="2" opacity="0.8" />
        </g>

        {/* Biogas / CBG Plant Biodome */}
        <g id="biogas-cbg-biodome" transform="translate(1380, 495)">
          {/* Base Tank */}
          <rect x="0" y="45" width="170" height="95" rx="10" fill="#2d5e37" stroke="#4ade80" strokeWidth="2.5" />
          {/* Geodesic Dome */}
          <path d="M 0 45 C 0 -15, 170 -15, 170 45 Z" fill="#397346" stroke="#4ade80" strokeWidth="2.5" />
          {/* Geodesic Lattice Lines */}
          <path d="M 30 45 C 40 10, 130 10, 140 45" stroke="#86efac" strokeWidth="1.5" fill="none" opacity="0.8" />
          <line x1="85" y1="0" x2="85" y2="45" stroke="#86efac" strokeWidth="1.5" opacity="0.8" />
          {/* Dome Plant Typography */}
          <text x="85" y="76" fill="#f0fdf4" fontSize="11" fontWeight="900" letterSpacing="0.8" textAnchor="middle" fontFamily="sans-serif">
            BIOGAS / CBG
          </text>
          <text x="85" y="93" fill="#86efac" fontSize="9" fontWeight="800" letterSpacing="1" textAnchor="middle" fontFamily="sans-serif">
            PLANT
          </text>
          {/* Solar Panel Array */}
          <g transform="translate(10, 115)">
            <polygon points="0,25 35,0 85,0 50,25" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" />
            <polygon points="55,25 90,0 140,0 105,25" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" />
          </g>
        </g>

        {/* Small sustainable houses in greenery */}
        <g id="houses-in-greenery" transform="translate(1120, 610)" opacity="0.9">
          <polygon points="20,0 0,15 40,15" fill="#fef08a" opacity="0.8" />
          <rect x="6" y="15" width="28" height="18" fill="#1e3a24" />
          <rect x="16" y="20" width="8" height="13" fill="#86efac" />
        </g>

        {/* ========================================================================= */}
        {/* CENTER: GOLDEN-GREEN LIGHT RIVER & TRANSFORMATION ARC */}
        {/* ========================================================================= */}
        {/* Winding River of Golden-Green Light */}
        <path 
          d="M 1020 470 Q 760 550 630 670 Q 520 780 430 900 L 590 900 Q 680 780 780 690 Q 920 590 1100 500 Z" 
          fill="url(#pano-river-grad)" 
          opacity="0.9"
          filter="url(#pano-emerald-glow)"
        />

        {/* Sweep Transformation Arch */}
        <path 
          d="M 310 900 C 470 740, 520 270, 850 140 C 960 100, 1160 90, 1320 150" 
          stroke="url(#pano-vortex-grad)" 
          strokeWidth="52" 
          strokeLinecap="round" 
          fill="none" 
          filter="url(#pano-emerald-glow)"
          opacity="0.92"
        />
        <path 
          d="M 350 880 C 490 720, 540 290, 850 160" 
          stroke="#fef08a" 
          strokeWidth="14" 
          strokeLinecap="round" 
          fill="none" 
          opacity="0.8" 
        />

        {/* Center Glowing White Recycling Symbol (Three Arrows in a Triangle) */}
        <g transform="translate(735, 410) scale(0.95)" filter="url(#pano-core-pulse)">
          {/* Luminous Glow Halo */}
          <circle cx="40" cy="40" r="55" fill="#4ade80" opacity="0.3" />
          <circle cx="40" cy="40" r="40" fill="#22c55e" opacity="0.5" />
          
          {/* 3-Arrow Recycling Symbol with Bright White Radiant Fill */}
          {/* Arrow 1: Top Right to Bottom */}
          <path d="M 50 15 L 65 35 L 55 35 L 60 55 L 70 52 L 55 70 L 40 54 L 50 55 L 45 35 L 35 35 Z" fill="#ffffff" />
          {/* Arrow 2: Bottom to Left */}
          <path d="M 55 65 L 35 65 L 35 55 L 18 68 L 35 82 L 35 72 L 55 72 Z" fill="#dcfce7" />
          {/* Arrow 3: Left to Top */}
          <path d="M 22 55 L 32 35 L 40 40 L 40 20 L 20 22 L 28 27 L 15 48 Z" fill="#bbf7d0" />
        </g>

        {/* ========================================================================= */}
        {/* LEFT BOTTOM: MASSIVE MOUNDS OF WASTE & LANDFILL DEBRIS */}
        {/* ========================================================================= */}
        <g id="landfill-waste-piles">
          <path d="M 0 520 Q 220 500 390 610 Q 490 690 450 900 L 0 900 Z" fill="url(#pano-waste-grad)" />

          {/* Piles of Dark Trash Bags */}
          <ellipse cx="130" cy="770" rx="70" ry="48" fill="#09090b" stroke="#27272a" strokeWidth="2.5" />
          <path d="M 110 730 Q 130 715 150 730" stroke="#52525b" strokeWidth="3" fill="none" />
          <ellipse cx="230" cy="785" rx="80" ry="52" fill="#121214" stroke="#27272a" strokeWidth="2.5" />
          <ellipse cx="330" cy="815" rx="65" ry="44" fill="#09090b" stroke="#18181b" strokeWidth="2.5" />
          
          {/* Discarded Plastic Bottles, Crushed Cans, Cardboard */}
          <rect x="75" y="805" width="20" height="42" rx="6" transform="rotate(35 75 805)" fill="#38bdf8" opacity="0.8" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="175" y="825" width="24" height="30" rx="5" transform="rotate(-20 175 825)" fill="#fbbf24" opacity="0.85" stroke="#d97706" strokeWidth="1.5" />
          <rect x="270" y="795" width="18" height="36" rx="5" transform="rotate(65 270 795)" fill="#60a5fa" opacity="0.75" stroke="#2563eb" strokeWidth="1.5" />
          {/* Crushed Cardboard Box */}
          <polygon points="45,720 90,705 135,720 90,742" fill="#78350f" opacity="0.9" />
          <polygon points="45,720 90,742 90,785 45,763" fill="#92400e" opacity="0.95" />
          <polygon points="135,720 90,742 90,785 135,763" fill="#451a03" />
        </g>

        {/* ========================================================================= */}
        {/* FOREGROUND NATURAL BOTANICAL FRAMING */}
        {/* ========================================================================= */}
        <g id="botanical-framing" opacity="0.95">
          <path d="M -20 850 Q 80 820 120 760 Q 80 720 -20 740 Z" fill="#14532d" />
          <path d="M 0 900 Q 90 860 140 820 Q 110 880 0 900 Z" fill="#166534" />
          <path d="M 120 760 L -20 850" stroke="#4ade80" strokeWidth="2" opacity="0.6" />

          <path d="M 0 -20 Q 60 40 100 20 Q 70 80 0 70 Z" fill="#14532d" />
          <path d="M 80 0 Q 140 40 180 20 Q 140 70 80 50 Z" fill="#166534" />

          <path d="M 1620 700 Q 1520 670 1480 620 Q 1540 590 1620 630 Z" fill="#15803d" />
          <path d="M 1620 780 Q 1500 760 1450 710 Q 1530 680 1620 710 Z" fill="#166534" />
          <path d="M 1620 880 Q 1520 860 1460 800 Q 1550 780 1620 810 Z" fill="#14532d" />
        </g>
      </svg>

      {/* Dynamic 60fps Canvas Loop (Smoke, Shimmer, Wind Turbines, Swirling Leaves, Birds) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />
    </div>
  );
};
