import { useEffect, useRef } from "react";

export function LiquidGradientBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(err => console.error("Video play error:", err));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.65,
      }}
      aria-hidden="true"
      onLoadStart={() => console.log("Video loading")}
      onCanPlay={() => console.log("Video can play")}
      onError={(e) => console.error("Video error:", e)}
    >
      <source src="./src/assets/videos/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
