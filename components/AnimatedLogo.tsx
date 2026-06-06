"use client";

import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export function AnimatedLogo({
  size = 64,
  className = "",
  animate = true,
}: AnimatedLogoProps) {
  const r = size * 0.3125; // radius of each circle relative to viewBox 320
  const cx1 = size * 0.375;
  const cx2 = size * 0.625;
  const cy = size * 0.5;
  const dot = size * 0.5;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id={`halo-${size}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${dot} ${cy}) rotate(90) scale(${r * 1.2})`}
        >
          <stop offset="0" stopColor="#F2B07B" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#D86C4A" stopOpacity="0.12" />
          <stop offset="1" stopColor="#D86C4A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo background */}
      <motion.circle
        cx={dot}
        cy={cy}
        r={r * 1.2}
        fill={`url(#halo-${size})`}
        animate={animate ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Left circle */}
      <motion.circle
        cx={cx1}
        cy={cy}
        r={r}
        stroke="#D86C4A"
        strokeWidth={size * 0.007}
        initial={animate ? { x: -size * 0.06, opacity: 0 } : {}}
        animate={animate ? { x: 0, opacity: 0.9 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Right circle */}
      <motion.circle
        cx={cx2}
        cy={cy}
        r={r}
        stroke="#D86C4A"
        strokeWidth={size * 0.007}
        initial={animate ? { x: size * 0.06, opacity: 0 } : {}}
        animate={animate ? { x: 0, opacity: 0.9 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Center dot */}
      <motion.circle
        cx={dot}
        cy={cy}
        r={size * 0.02}
        fill="#D86C4A"
        initial={animate ? { scale: 0, opacity: 0 } : {}}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
      />

      {/* Pulse ring on center dot */}
      {animate && (
        <motion.circle
          cx={dot}
          cy={cy}
          r={size * 0.02}
          stroke="#D86C4A"
          strokeWidth={1}
          fill="none"
          animate={{ scale: [1, 4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: "easeOut" }}
        />
      )}

      {/* Vertical dashed line */}
      <motion.path
        d={`M${dot} ${cy - r} v${r * 2}`}
        stroke="#D86C4A"
        strokeWidth={size * 0.002}
        strokeDasharray={`${size * 0.008} ${size * 0.02}`}
        opacity="0.3"
        initial={animate ? { pathLength: 0, opacity: 0 } : {}}
        animate={animate ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </motion.svg>
  );
}
