import { useCallback, useState } from 'react';

export default function useProgress(
  action: () => Promise<unknown>,
  keepProgress = false
): [boolean, () => Promise<unknown>] {
  const [isInProgress, setIsInProgress] = useState(false);
  const cb = useCallback(async () => {
    setIsInProgress(true);

    try {
      await action();
    } catch (e) {
      throw new Error(e);
    } finally {
      if (!keepProgress) {
        setIsInProgress(false);
      }
    }
  }, [action, keepProgress]);

  return [isInProgress, cb];
}
