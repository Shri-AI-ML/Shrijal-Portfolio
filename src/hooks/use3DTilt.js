import { useState } from 'react';

/**
 * Custom hook to apply a premium 3D tilt and glare reflection effect to any element on mouse hover.
 * Uses performant inline calculations and CSS transitions.
 * 
 * @param {number} maxRotation - Maximum tilt rotation in degrees.
 * @param {number} scale - Scale magnification on hover.
 * @returns {object} Tilt and glare inline styles, along with mouse move and leave event handlers.
 */
export function use3DTilt(maxRotation = 8, scale = 1.015) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
  });

  const [glareStyle, setGlareStyle] = useState({
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)',
    opacity: 0,
    transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
  });

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates from -0.5 to 0.5
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;

    // Calculate rotation angles (rotateX depends on Y coordinate, rotateY depends on X coordinate)
    const rotateX = -normY * maxRotation;
    const rotateY = normX * maxRotation;

    // Glare position percentage
    const glareX = (x / width) * 100;
    const glareY = (y / height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.07)',
    });

    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 60%)`,
      opacity: 1,
      transition: 'opacity 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
    });
    setGlareStyle({
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)',
      opacity: 0,
      transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  return {
    tiltStyle,
    glareStyle,
    handleMouseMove,
    handleMouseLeave,
  };
}
