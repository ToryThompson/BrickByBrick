import React from 'react';

/**
 * Renders a LEGO brick logo matching the nav bar, but scalable for headers.
 * @param {string} className - Additional classes.
 * @param {number} scale - Multiplier for size (1 = nav bar, 2 = double, etc).
 */
export default function LegoBrickLogo({ className = '', scale = 2 }) {
  // Nav bar: w-12 h-6, studs w-4 h-2, offsets -top-1, -left-0.5, etc
  const baseW = 48; // 12 * 4
  const baseH = 24; // 6 * 4
  const w = baseW * scale;
  const h = baseH * scale;
  const studW = 16 * scale; // 4 * 4
  const studH = 8 * scale;  // 2 * 4
  const sideW = 2 * scale;  // 0.5 * 4
  const studTop = -4 * scale; // -1 * 4
  const sideOffset = -2 * scale; // -0.5 * 4

  return (
    <div
      className={`relative bg-[#0055BF] rounded-sm ${className}`}
      style={{ width: w, height: h }}
    >
      {/* 3D effect - top face */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{ background: 'linear-gradient(to bottom, #0066E5, #0055BF)' }}
      />
      {/* 3D effect - side faces */}
      <div
        className="absolute inset-y-0 rounded-l-sm"
        style={{ left: sideOffset, width: sideW, background: '#004CAA' }}
      />
      <div
        className="absolute inset-y-0 rounded-r-sm"
        style={{ right: sideOffset, width: sideW, background: '#004CAA' }}
      />
      {/* Studs */}
      <div
        className="absolute rounded-sm shadow-inner"
        style={{
          top: studTop,
          left: w * 0.25 - studW / 2,
          width: studW,
          height: studH,
          background: '#0066E5',
        }}
      />
      <div
        className="absolute rounded-sm shadow-inner"
        style={{
          top: studTop,
          left: w * 0.75 - studW / 2,
          width: studW,
          height: studH,
          background: '#0066E5',
        }}
      />
    </div>
  );
} 