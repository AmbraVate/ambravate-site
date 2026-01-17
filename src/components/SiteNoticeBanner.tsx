import { useEffect, useState } from "react";

const STORAGE_KEY = "ambavrate_site_notice_dismissed";

export function SiteNoticeBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === "true";

    if (!stored) {
      setVisible(true);
    } else {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      setVisible(window.scrollY < 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <div className="mx-auto max-w-screen-xl px-3 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-b-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 backdrop-blur py-2 sm:py-2.5 px-3 sm:px-4">
          <p className="text-[11px] sm:text-sm leading-snug text-[#FF6B00]">
            <span className="font-medium">Notice:</span>{" "}
            This site is part of an active rollout. Some features may be limited or temporarily unavailable.
          </p>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss notice"
            className="flex-shrink-0 rounded-md px-2 py-1 text-[11px] sm:text-xs font-medium text-[#FF6B00] hover:bg-[#FF6B00]/20 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
