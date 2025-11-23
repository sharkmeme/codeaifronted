import { useEffect, useRef, useState } from "react";

export function BunnyOrb() {
  const wrapperRef = useRef<HTMLDivElement>(null);
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

      wrapperRef.current.style.transform =
        `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY}px))`;
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
      <div
        className={`bunny-orb ${prefersReducedMotion ? "" : "bunny-orb--float"}`}
        data-testid="bunny-orb"
      >
        <img
          src="/bunny-orb.png"
          alt="bunnycode.ai logo"
          className="bunny-orb-image"
        />
      </div>
    </div>
  );
}
