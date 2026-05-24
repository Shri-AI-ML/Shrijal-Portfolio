import React, { useRef, useEffect } from 'react';

const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    // Strict particle counts to keep frame rates high on mobile and older laptops
    const maxParticles = width < 768 ? 20 : 50;
    const fov = 450; // Perspective zoom parameter
    
    // Mouse coordinates tracking for attraction
    const mouse = { x: null, y: null, targetX: null, targetY: null, radius: 140 };
    // Camera coordinates for scroll-independent parallax
    const camera = { x: 0, y: 0, targetX: 0, targetY: 0 };

    class Particle {
      constructor() {
        this.reset();
        // Scatter initial particles in Z-depth to avoid spawn-clustering
        this.z3d = Math.random() * fov;
      }

      reset() {
        this.x3d = (Math.random() - 0.5) * width * 1.3;
        this.y3d = (Math.random() - 0.5) * height * 1.3;
        this.z3d = fov; // Start far in background
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = -0.2 - Math.random() * 0.4; // Slowly move forward
        this.radius = Math.random() * 1.2 + 0.8;
      }

      update() {
        this.x3d += this.vx;
        this.y3d += this.vy;
        this.z3d += this.vz;

        // Reset if the particle passes the camera or goes way off screen
        if (this.z3d <= -fov || Math.abs(this.x3d) > width * 1.5 || Math.abs(this.y3d) > height * 1.5) {
          this.reset();
        }

        // Project 3D coordinates onto 2D canvas space
        const scale = fov / (fov + this.z3d);
        this.x = (this.x3d + camera.x) * scale + width / 2;
        this.y = (this.y3d + camera.y) * scale + height / 2;
        this.screenRadius = this.radius * scale;
        this.opacity = (1 - this.z3d / fov) * 0.4; // Fade out in distance

        // Apply magnetic mouse pull in 3D projection space
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Pull coordinates slowly toward target cursor
            this.x3d += (dx / dist) * force * 0.3;
            this.y3d += (dy / dist) * force * 0.3;
          }
        }
      }

      draw() {
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.screenRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`; // Soft indigo glow
        ctx.fill();
      }
    }

    // Spawn initial particle population
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      // Connect close particles together
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        if (pi.x < 0 || pi.x > width || pi.y < 0 || pi.y > height) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          if (pj.x < 0 || pj.x > width || pj.y < 0 || pj.y > height) continue;

          // Calculate Z-aware spatial distance
          const dx = pi.x3d - pj.x3d;
          const dy = pi.y3d - pj.y3d;
          const dz = pi.z3d - pj.z3d;
          const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3d < 160) {
            const scale = fov / (fov + (pi.z3d + pj.z3d) / 2);
            const alpha = (1 - dist3d / 160) * 0.12 * scale;

            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.5 * scale;
            ctx.stroke();
          }
        }

        // Draw glowing link to mouse pointer if cursor is active
        if (mouse.x !== null && mouse.y !== null) {
          const dx = pi.x - mouse.x;
          const dy = pi.y - mouse.y;
          const dist2d = Math.sqrt(dx * dx + dy * dy);
          
          if (dist2d < mouse.radius) {
            const alpha = (1 - dist2d / mouse.radius) * 0.15 * (1 - pi.z3d / fov);
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate camera movements for fluid parallax inertia
      camera.x += (camera.targetX - camera.x) * 0.05;
      camera.y += (camera.targetY - camera.y) * 0.05;

      // Smooth mouse tracking coordinates
      if (mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.15;
          mouse.y += (mouse.targetY - mouse.y) * 0.15;
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Map cursor movement to a subtle, organic camera tilt offset
      camera.targetX = ((e.clientX / width) - 0.5) * -40;
      camera.targetY = ((e.clientY / height) - 0.5) * -40;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
      mouse.x = null;
      mouse.y = null;
      camera.targetX = 0;
      camera.targetY = 0;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        contain: 'strict',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
      }}
    />
  );
};

export default NeuralCanvas;
