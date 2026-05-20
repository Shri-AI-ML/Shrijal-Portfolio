import React from 'react';
import { motion } from 'framer-motion';

const GlowBlob = ({ className = '', color = 'indigo', delay = 0, duration = 8 }) => {
  const colorMap = {
    indigo: 'bg-indigo-600/10 shadow-[0_0_80px_rgba(99,102,241,0.15)]',
    purple: 'bg-purple-600/10 shadow-[0_0_80px_rgba(139,92,246,0.15)]',
    blue: 'bg-blue-600/10 shadow-[0_0_80px_rgba(59,130,246,0.15)]',
    emerald: 'bg-emerald-600/5 shadow-[0_0_80px_rgba(52,211,153,0.05)]',
  };

  const selectedColor = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -30, 40, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
      className={`absolute rounded-full filter blur-[60px] pointer-events-none z-0 ${selectedColor} ${className}`}
    />
  );
};

export default GlowBlob;
