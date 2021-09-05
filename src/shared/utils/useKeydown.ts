import { useEffect } from 'react';

export default function useKeydown(key: string, cb: (...args: unknown[]) => unknown): void {
  const handler = (e: KeyboardEvent) => {
    if (e.key === key) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [cb]);
}
