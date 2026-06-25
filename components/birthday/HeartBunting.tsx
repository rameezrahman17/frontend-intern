'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeartBunting() {
  return (
    <div className="absolute top-0 left-0 w-64 h-32 pointer-events-none z-10 overflow-visible">
      <svg className="w-full h-full" viewBox="0 0 250 120" fill="none">
        {/* Rope/String */}
        <path
          d="M -10 -10 Q 70 40 150 10 T 260 -10"
          className="bunting-rope"
        />

        {/* Heart 1 */}
        <motion.g
          initial={{ rotate: -5 }}
          animate={{ rotate: [ -5, 5, -5 ] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ originX: '40px', originY: '22px' }}
        >
          <line x1="40" y1="22" x2="40" y2="45" stroke="#7A1B3A" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M 40 45 C 37 40, 30 40, 30 46 C 30 52, 40 58, 40 60 C 40 58, 50 52, 50 46 C 50 40, 43 40, 40 45 Z"
            fill="#F36C8E"
            stroke="#7A1B3A"
            strokeWidth="1"
          />
        </motion.g>

        {/* Heart 2 */}
        <motion.g
          initial={{ rotate: 4 }}
          animate={{ rotate: [ 4, -4, 4 ] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.3 }}
          style={{ originX: '90px', originY: '33px' }}
        >
          <line x1="90" y1="33" x2="90" y2="60" stroke="#7A1B3A" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M 90 60 C 86 53, 76 53, 76 61 C 76 69, 90 77, 90 80 C 90 77, 104 69, 104 61 C 104 53, 94 53, 90 60 Z"
            fill="#FBD3DE"
            stroke="#7A1B3A"
            strokeWidth="1.2"
          />
        </motion.g>

        {/* Heart 3 */}
        <motion.g
          initial={{ rotate: -8 }}
          animate={{ rotate: [ -8, 2, -8 ] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.6 }}
          style={{ originX: '142px', originY: '25px' }}
        >
          <line x1="142" y1="25" x2="142" y2="50" stroke="#7A1B3A" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M 142 50 C 139 45, 132 45, 132 51 C 132 57, 142 63, 142 65 C 142 63, 152 57, 152 51 C 152 45, 145 45, 142 50 Z"
            fill="#E15B82"
            stroke="#7A1B3A"
            strokeWidth="1"
          />
        </motion.g>

        {/* Heart 4 */}
        <motion.g
          initial={{ rotate: 6 }}
          animate={{ rotate: [ 6, -6, 6 ] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.9 }}
          style={{ originX: '190px', originY: '14px' }}
        >
          <line x1="190" y1="14" x2="190" y2="35" stroke="#7A1B3A" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M 190 35 C 187 31, 182 31, 182 36 C 182 41, 190 46, 190 48 C 190 46, 198 41, 198 36 C 198 31, 193 31, 190 35 Z"
            fill="#F36C8E"
            stroke="#7A1B3A"
            strokeWidth="0.8"
          />
        </motion.g>
      </svg>
    </div>
  );
}
