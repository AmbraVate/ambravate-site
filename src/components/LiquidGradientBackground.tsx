import { useEffect, useRef } from 'react';

export function LiquidGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let time = 0;
    const colors = [
      { r: 20, g: 10, b: 30 },    // Deep purple-black
      { r: 30, g: 15, b: 50 },    // Dark purple
      { r: 255, g: 100, b: 0 },   // Orange
      { r: 10, g: 5, b: 20 },     // Almost black
    ];

    const animate = () => {
      time += 0.003;

      // Create multiple gradient circles that move
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time) * 0.3),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.3),
        0,
        canvas.width * (0.3 + Math.sin(time) * 0.3),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.3),
        canvas.width * 0.6
      );

      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 0.8) * 0.2),
        canvas.height * (0.6 + Math.sin(time * 0.5) * 0.3),
        0,
        canvas.width * (0.7 + Math.cos(time * 0.8) * 0.2),
        canvas.height * (0.6 + Math.sin(time * 0.5) * 0.3),
        canvas.width * 0.5
      );

      // Base dark background
      ctx.fillStyle = `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // First gradient (orange accent)
      gradient1.addColorStop(0, `rgba(${colors[2].r}, ${colors[2].g}, ${colors[2].b}, 0.15)`);
      gradient1.addColorStop(0.5, `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.1)`);
      gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Second gradient (purple accent)
      gradient2.addColorStop(0, `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.2)`);
      gradient2.addColorStop(0.5, `rgba(${colors[3].r}, ${colors[3].g}, ${colors[3].b}, 0.1)`);
      gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
