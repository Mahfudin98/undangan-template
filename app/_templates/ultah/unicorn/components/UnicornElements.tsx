"use client";

interface StarProps {
  cx: number;
  cy: number;
  size?: number;
  color?: string;
  delay?: number;
}

export function Star({
  cx,
  cy,
  size = 10,
  color = "#38bdf8",
  delay = 0,
}: StarProps) {
  return (
    <g
      transform={`translate(${cx}, ${cy})`}
      style={{ animationDelay: `${delay}s` }}
      className="animate-twinkle"
    >
      <polygon
        points={`0,${-size} ${size * 0.29},${-size * 0.4} ${size * 0.95},${-size * 0.31} ${size * 0.47},${size * 0.15} ${size * 0.59},${size * 0.81} 0,${size * 0.5} ${-size * 0.59},${size * 0.81} ${-size * 0.47},${size * 0.15} ${-size * 0.95},${-size * 0.31} ${-size * 0.29},${-size * 0.4}`}
        fill={color}
        opacity={0.9}
      />
    </g>
  );
}

export function UnicornHead({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horn */}
      <polygon
        points="100,5 88,55 112,55"
        fill="url(#hornGradient)"
        stroke="#38bdf8"
        strokeWidth="1"
      />
      <line
        x1="100"
        y1="8"
        x2="100"
        y2="52"
        stroke="#fff"
        strokeWidth="1.5"
        opacity={0.6}
      />

      {/* Horn stripes */}
      <line
        x1="91"
        y1="20"
        x2="109"
        y2="20"
        stroke="#bae6fd"
        strokeWidth="1"
        opacity={0.7}
      />
      <line
        x1="89"
        y1="33"
        x2="111"
        y2="33"
        stroke="#bae6fd"
        strokeWidth="1"
        opacity={0.7}
      />
      <line
        x1="87"
        y1="46"
        x2="113"
        y2="46"
        stroke="#bae6fd"
        strokeWidth="1"
        opacity={0.7}
      />

      {/* Ear */}
      <ellipse
        cx="68"
        cy="68"
        rx="14"
        ry="18"
        fill="#bfdbfe"
        transform="rotate(-15 68 68)"
      />
      <ellipse
        cx="68"
        cy="68"
        rx="8"
        ry="12"
        fill="#60a5fa"
        transform="rotate(-15 68 68)"
      />

      {/* Head */}
      <ellipse cx="100" cy="115" rx="55" ry="60" fill="url(#headGradient)" />

      {/* Mane */}
      <path
        d="M55 80 Q30 100 35 130 Q40 155 55 165"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M55 80 Q28 102 33 132 Q38 157 53 167"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M55 80 Q26 104 31 134 Q36 159 51 169"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Eye */}
      <ellipse cx="118" cy="108" rx="12" ry="10" fill="#1e3a8a" />
      <ellipse cx="115" cy="105" rx="5" ry="4" fill="#fff" />
      <circle cx="113" cy="103" r="2" fill="#1e3a8a" />

      {/* Eyelashes */}
      <line
        x1="110"
        y1="99"
        x2="107"
        y2="95"
        stroke="#1e3a8a"
        strokeWidth="1.5"
      />
      <line
        x1="118"
        y1="98"
        x2="118"
        y2="93"
        stroke="#1e3a8a"
        strokeWidth="1.5"
      />
      <line
        x1="126"
        y1="101"
        x2="130"
        y2="97"
        stroke="#1e3a8a"
        strokeWidth="1.5"
      />

      {/* Nose */}
      <ellipse cx="130" cy="130" rx="8" ry="5" fill="#93c5fd" opacity={0.6} />
      <circle cx="128" cy="130" r="1.5" fill="#60a5fa" />
      <circle cx="133" cy="130" r="1.5" fill="#60a5fa" />

      {/* Cheek blush */}
      <ellipse cx="140" cy="120" rx="12" ry="8" fill="#bfdbfe" opacity={0.4} />

      {/* Mouth */}
      <path
        d="M118 148 Q128 158 138 148"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id="hornGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FloatingElement({
  type,
  style,
  className = "",
}: {
  type: "star" | "heart" | "diamond" | "sparkle" | "flower";
  style?: React.CSSProperties;
  className?: string;
}) {
  const elements = {
    star: (
      <svg viewBox="0 0 40 40" className={className} style={style}>
        <polygon
          points="20,2 24,14 38,14 27,22 31,36 20,28 9,36 13,22 2,14 16,14"
          fill="#38bdf8"
          stroke="#bae6fd"
          strokeWidth="1"
        />
      </svg>
    ),

    heart: (
      <svg viewBox="0 0 40 40" className={className} style={style}>
        <path
          d="M20 35 C20 35 4 25 4 15 C4 8 10 4 15 6 C17 7 19 9 20 11 C21 9 23 7 25 6 C30 4 36 8 36 15 C36 25 20 35 20 35Z"
          fill="#60a5fa"
          stroke="#2563eb"
          strokeWidth="1"
        />
      </svg>
    ),

    diamond: (
      <svg viewBox="0 0 40 40" className={className} style={style}>
        <polygon
          points="20,4 36,16 20,36 4,16"
          fill="url(#diamondGrad)"
          stroke="#93c5fd"
          strokeWidth="1"
        />

        <defs>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="50%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    ),

    sparkle: (
      <svg viewBox="0 0 40 40" className={className} style={style}>
        <path
          d="M20 4 L22 18 L36 20 L22 22 L20 36 L18 22 L4 20 L18 18Z"
          fill="#38bdf8"
        />
      </svg>
    ),

    flower: (
      <svg viewBox="0 0 40 40" className={className} style={style}>
        {/* Pre-computed petals to avoid floating point hydration mismatch */}
        <ellipse
          cx="30"
          cy="20"
          rx="6"
          ry="4"
          fill="#60a5fa"
          transform="rotate(0 30 20)"
          opacity={0.85}
        />
        <ellipse
          cx="25"
          cy="11.34"
          rx="6"
          ry="4"
          fill="#3b82f6"
          transform="rotate(60 25 11.34)"
          opacity={0.85}
        />
        <ellipse
          cx="15"
          cy="11.34"
          rx="6"
          ry="4"
          fill="#60a5fa"
          transform="rotate(120 15 11.34)"
          opacity={0.85}
        />
        <ellipse
          cx="10"
          cy="20"
          rx="6"
          ry="4"
          fill="#3b82f6"
          transform="rotate(180 10 20)"
          opacity={0.85}
        />
        <ellipse
          cx="15"
          cy="28.66"
          rx="6"
          ry="4"
          fill="#60a5fa"
          transform="rotate(240 15 28.66)"
          opacity={0.85}
        />
        <ellipse
          cx="25"
          cy="28.66"
          rx="6"
          ry="4"
          fill="#3b82f6"
          transform="rotate(300 25 28.66)"
          opacity={0.85}
        />
        <circle cx="20" cy="20" r="5" fill="#38bdf8" />
      </svg>
    ),
  };

  return elements[type];
}

export function RainbowDivider() {
  return (
    <div className="w-full flex items-center gap-0 my-6">
      {[
        "#60a5fa",
        "#2563eb",
        "#3b82f6",
        "#1d4ed8",
        "#93c5fd",
        "#bfdbfe",
        "#38bdf8",
      ].map((color, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
