"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

type MarqueeItem = {
  text: string;
  outlined: boolean;
};

const marqueeItems: MarqueeItem[] = [
  {
    text: "SYED MUHAMMAD IMRAN ★",
    outlined: false,
  },
  {
    text: "SYED MUHAMMAD IMRAN ★",
    outlined: true,
  },
  {
    text: "SYED MUHAMMAD IMRAN ★",
    outlined: false,
  },
];

const textStyle = {
  fontSize: "clamp(80px, 13vw, 240px)",
  fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
  letterSpacing: "-0.03em",
};

export default function MarqueeText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ─── motion values for smooth cursor-following ─── */
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const springX = useSpring(rawX, { stiffness: 300, damping: 50 });
  const springY = useSpring(rawY, { stiffness: 300, damping: 50 });

  /* Build the radial-gradient mask string reactively */
  const maskImage = useMotionTemplate`radial-gradient(circle 120px at ${springX}% ${springY}%, black 0%, transparent 100%)`;

  /**
   * Handle mouse movement relative to the marquee container.
   */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 100);
    rawY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  /**
   * Render one complete sequence of marquee items.
   * Each item includes a base layer + a gradient hover-reveal overlay.
   */
  const renderItems = (prefix: string) =>
    marqueeItems.map((item, index) => (
      <span
        key={`${prefix}-${index}`}
        className="relative inline-block shrink-0 select-none pr-[2vw] font-black uppercase leading-none"
        style={textStyle}
      >
        {/* ===================================================== */}
        {/* Base text                                             */}
        {/* ===================================================== */}

        <span
          className="block"
          style={{
            color: item.outlined ? "transparent" : "var(--marquee-filled)",
            WebkitTextStroke: item.outlined ? "var(--marquee-stroke)" : "0px",
            opacity: 1,
          }}
        >
          {item.text}
        </span>

        {/* ===================================================== */}
        {/* Cursor reveal layer                                   */}
        {/* ===================================================== */}

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px transparent",

            background:
              "linear-gradient(90deg, #eab308 0%, #ef4444 25%, #3b82f6 50%, #06b6d4 75%, #8b5cf6 100%)",

            WebkitBackgroundClip: "text",
            backgroundClip: "text",

            maskImage,
            WebkitMaskImage: maskImage,

            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          {item.text}
        </motion.span>
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="relative z-10 mb-auto w-full overflow-hidden pointer-events-auto"
      style={{ minHeight: "clamp(80px, 13vw, 240px)", contain: "layout" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max whitespace-nowrap"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
        }}
      >
        {/* =================================================== */}
        {/* FIRST COMPLETE SEQUENCE                             */}
        {/* =================================================== */}

        <div className="flex shrink-0">{renderItems("first")}</div>

        {/* =================================================== */}
        {/* SECOND IDENTICAL SEQUENCE                           */}
        {/* =================================================== */}

        <div className="flex shrink-0">{renderItems("second")}</div>
      </motion.div>
    </div>
  );
}
