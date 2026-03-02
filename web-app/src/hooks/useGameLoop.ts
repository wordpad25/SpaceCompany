import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export function useGameLoop() {
  const tick = useGameStore((state) => state.tick);
  const lastTimeRef = useRef<number>(performance.now());
  const reqRef = useRef<number>(0);

  useEffect(() => {
    const loop = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Ensure delta is reasonable to prevent big jumps on un-pausing
      if (delta < 1.0) {
        tick(delta);
      }

      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(reqRef.current);
  }, [tick]);
}