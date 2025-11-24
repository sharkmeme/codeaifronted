import { useEffect, useRef, useState } from "react";

export function BunnyOrb() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = typeof window !== "undefined" &&
                   window.matchMedia("(max-width: 768px)").matches;

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
    if (prefersReducedMotion || isMobile) return;

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
  }, [prefersReducedMotion, isMobile]);

  return (
    <div
      ref={wrapperRef}
      className={`bunny-orb-wrapper max-sm:w-40 max-sm:h-40 max-sm:mx-auto max-sm:pt-0 max-sm:pb-0 max-sm:mt-0 max-sm:mb-0 max-sm:p-0 max-sm:py-0 max-sm:my-0`}
      data-testid="bunny-orb-wrapper"
    >
      <div
        className={`bunny-orb ${isMobile ? "mobile-orb bunny-orb--mobile" : ""} ${prefersReducedMotion ? "" : "bunny-orb--float"}`}
        data-testid="bunny-orb"
      >
        <img
          src="/bunny-orb-optimized.webp"
          alt="bunnycode.ai logo"
          className="bunny-orb-image"
        />
      </div>
    </div>
  );
}
