// src/hooks/useHoverCapable.ts
import { useEffect, useState } from 'react';

export function useHoverCapable() {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  return canHover;
}
