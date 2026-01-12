import { useEffect, useRef } from "react";

export function LiquidGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // ---- FLOW STATE ----
    let time = 0;
    let scrollY = window.scrollY;
    let scrollVelocity = 0;
    let direction = 1; // 1 = left→right, -1 = right→left

    // Listen to scroll
    let lastScroll = window.scrollY;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
      scrollVelocity = scrollY - lastScroll;
      lastScroll = scrollY;
    });

    const colors = {
      base: "rgb(15,10,25)",
      purple: "rgba(120,80,255,0.15)",
      orange: "rgba(255,120,40,0.18)",
    };

    const draw = () => {
      time += 0.004;

      // Smooth direction change
      direction += Math.sign(scrollVelocity) * 0.002;
      direction = Math.max(-1, Math.min(1, direction));

      ctx.fillStyle = colors.base;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const waveStrength = 120 + Math.abs(scrollVelocity) * 6;
      const flowSpeed = time * direction * 400;

      // ---- LIQUID WAVES ----
      for (let i = 0; i < 3; i++) {
        const yOffset =
          Math.sin(time * 0.8 + i * 2 + scrollY * 0.002) * 120;

        const gradient = ctx.createRadialGradient(
          canvas.width * 0.5 +
            Math.sin(time + i) * waveStrength +
            flowSpeed,
          canvas.height * 0.5 + yOffset,
          0,
          canvas.width * 0.5,
          canvas.height * 0.5,
          canvas.width * 0.7
        );

        gradient.addColorStop(
          0,
          i % 2 === 0 ? colors.orange : colors.purple
        );
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Natural damping
      scrollVelocity *= 0.92;

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
