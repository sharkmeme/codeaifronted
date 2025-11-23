import { useEffect, useRef, useState } from "react";

export function BunnyOrb() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGGElement>(null);
  const rightEyeRef = useRef<SVGGElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.querySelector("section");
      if (!heroSection || !wrapperRef.current) return;

      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const deltaX = (mouseX - centerX) / centerX;
      const deltaY = (mouseY - centerY) / centerY;

      const parallaxX = deltaX * 20;
      const parallaxY = deltaY * 20;

      wrapperRef.current.style.transform = `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY}px))`;

      if (leftEyeRef.current && rightEyeRef.current) {
        const eyeX = deltaX * 3;
        const eyeY = deltaY * 3;

        leftEyeRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        rightEyeRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className="bunny-orb-wrapper"
      data-testid="bunny-orb-wrapper"
    >
      <svg
        className={`bunny-orb ${prefersReducedMotion ? "" : "rotating"}`}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="bunny-orb-svg"
      >
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-10"
        />

        <circle
          cx="200"
          cy="200"
          r="180"
          fill="hsl(var(--muted) / 0.05)"
          stroke="currentColor"
          strokeWidth="0.5"
          className="opacity-20"
        />

        <g className="bunny-face" opacity="0.3">
          <path
            d="M 160 100 Q 150 60, 140 50 Q 135 45, 130 50 Q 125 55, 130 60 Q 140 75, 145 90 L 160 100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M 240 100 Q 250 60, 260 50 Q 265 45, 270 50 Q 275 55, 270 60 Q 260 75, 255 90 L 240 100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g ref={leftEyeRef} className="bunny-eye">
            <circle cx="170" cy="190" r="3" fill="currentColor" opacity="0.6" />
          </g>

          <g ref={rightEyeRef} className="bunny-eye">
            <circle cx="230" cy="190" r="3" fill="currentColor" opacity="0.6" />
          </g>

          <circle
            cx="200"
            cy="210"
            r="4"
            fill="currentColor"
            opacity="0.4"
          />

          <path
            d="M 200 210 Q 190 220, 185 225"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 200 210 Q 210 220, 215 225"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />

          <path
            d="M 185 240 Q 200 250, 215 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
}
