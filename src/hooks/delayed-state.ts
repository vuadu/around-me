import { useEffect, useState } from 'react';

export function useDelayedState<T>(value: T, delay: number) {
  const [state, setState] = useState<T | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  return [state];
}
