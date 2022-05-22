import { useEffect, useRef } from "react";

// modified from https://usehooks.com/usePrevious/
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
