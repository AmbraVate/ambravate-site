import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function AnimatedHeader() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Scale from full size to smaller (positioned in top-left)
  const scale = useTransform(scrollY, [0, window.innerHeight], [0, 1]);
  const opacity = useTransform(scrollY, [0, window.innerHeight * 0.5], [0, 1]);
  const xPosition = useTransform(scrollY, [0, window.innerHeight], [0, -window.innerWidth / 2 + 60]);
  const yPosition = useTransform(scrollY, [0, window.innerHeight], [0, -window.innerHeight / 2 + 40]);

  // Text collapse animation
  const textOpacity = useTransform(scrollY, [0, window.innerHeight * 0.7], [0, 1]);
  const logoOpacity = useTransform(scrollY, [window.innerHeight * 0.3, window.innerHeight], [0, 1]);

  return (
    <>
      {/* Text Logo - A V */}
      <motion.div
        ref={containerRef}
        className="fixed top-6 left-8 z-50 pointer-events-none"
        style={{
          opacity: textOpacity,
        }}
      >
        <div className="flex gap-3 items-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#FF6B00]">A</span>
            <span className="text-white">V</span>
          </h2>
        </div>
      </motion.div>

      {/* Logo with Circle Mask */}
      <motion.div
        className="fixed top-6 left-8 z-50 pointer-events-none"
        style={{
          opacity: logoOpacity,
        }}
      >
        <div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#FF6B00]"
          style={{
            backgroundImage: 'url(/src/assets/logo/logo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>
    </>
  );
}
