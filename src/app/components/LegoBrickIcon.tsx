import React from 'react';

interface LegoBrickIconProps {
  color?: string; // hex color
  studs?: number; // 4 for 2x2, 8 for 2x4
  width?: number; // px
  height?: number; // px
}

// Only 2x2 and 2x4 supported for now
export default function LegoBrickIcon({ color = '#D01012', studs = 8, width = 64, height = 48 }: LegoBrickIconProps) {
  // 2x4 = 8 studs, 2x2 = 4 studs
  // We'll use a single SVG for both, adjusting the brick length
  const is2x2 = studs === 4;
  // Brick body dimensions
  const bodyW = is2x2 ? 48 : 96;
  const bodyH = 32;
  const bodyX = 8;
  const bodyY = 16;
  // Stud positions
  const studRows = 2;
  const studCols = is2x2 ? 2 : 4;
  const studR = 8;
  const studSpacingX = 20;
  const studSpacingY = 16;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 112 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Brick top face */}
      <polygon
        points={
          is2x2
            ? '8,16 56,16 48,32 0,32'
            : '8,16 104,16 96,32 0,32'
        }
        fill={color}
        stroke="#111"
        strokeWidth="2"
      />
      {/* Brick right face */}
      <polygon
        points={
          is2x2
            ? '56,16 56,48 48,64 48,32'
            : '104,16 104,48 96,64 96,32'
        }
        fill={is2x2 ? '#b00' : '#b00'}
        stroke="#111"
        strokeWidth="2"
      />
      {/* Brick left face */}
      <polygon
        points={
          is2x2
            ? '8,16 0,32 0,64 8,48'
            : '8,16 0,32 0,64 8,48'
        }
        fill={is2x2 ? '#f44' : '#f44'}
        stroke="#111"
        strokeWidth="2"
      />
      {/* Brick top edge */}
      <polyline
        points={
          is2x2
            ? '8,16 56,16 48,32 0,32 8,16'
            : '8,16 104,16 96,32 0,32 8,16'
        }
        fill="none"
        stroke="#111"
        strokeWidth="2"
      />
      {/* Studs */}
      {Array.from({ length: studRows }).map((_, row) =>
        Array.from({ length: studCols }).map((_, col) => {
          const cx = 16 + col * studSpacingX + (is2x2 ? 8 : 0);
          const cy = 8 + row * studSpacingY;
          return (
            <ellipse
              key={`stud-${row}-${col}`}
              cx={cx}
              cy={cy}
              rx={studR}
              ry={studR * 0.7}
              fill="#fff6"
              stroke="#111"
              strokeWidth="2"
            />
          );
        })
      )}
      {/* Stud tops (color) */}
      {Array.from({ length: studRows }).map((_, row) =>
        Array.from({ length: studCols }).map((_, col) => {
          const cx = 16 + col * studSpacingX + (is2x2 ? 8 : 0);
          const cy = 8 + row * studSpacingY;
          return (
            <ellipse
              key={`stud-top-${row}-${col}`}
              cx={cx}
              cy={cy}
              rx={studR - 2}
              ry={(studR - 2) * 0.7}
              fill={color}
              stroke="#111"
              strokeWidth="1"
            />
          );
        })
      )}
    </svg>
  );
} 