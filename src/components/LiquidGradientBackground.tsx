import { motion } from "motion/react";

export function LiquidGradientBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Animated gradient background */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          background: "linear-gradient(-45deg, #3d1c6d 0%, #1a2f5a 25%, #3d1c6d 50%, #1a2f5a 75%, #3d1c6d 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Blur overlay for smoothness */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
