'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full opacity-80 shadow-lg" />
      <style jsx global>{`
        @media (hover: hover) {
          * {
            cursor: none !important;
          }
        }

        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
} 