import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getAnimationSettings(angle: number, originX: number) {
  return {
    particleCount: Math.floor(5 * randomInRange(0.2, 1)),
    startVelocity: 0.8,
    ticks: 50,
    gravity: 0.5,
    spread: 360,
    origin: {
      x: Math.random(),
      y: Math.random(),
    },
    colors: ["#FF7043", "#29B6F6", "#FFCA28", "#66BB6A", "#78909C"],
    shapes: ["square"],
    scalar: 1.5,
  };
}

export function SnowConfetti() {
  const refAnimationInstance = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<any>();

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(10, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "absolute",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    />
  );
}
