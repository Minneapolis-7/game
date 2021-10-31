import { useCallback, useState } from 'react';

/**
 * Переиспользование логики при запуске асинхронных действий.
 * ВАЖНО: не применять для асинхронных redux-экшенов,
 * вместо этого использовать в качестве прогресса redux-стэйт на стадиях pending/fulfilled/rejected.
 * Возвращает саму функцию, обработанную через `useCallback`, и флаг состояния.
 * @param action - асинхронная функция, которую нужно исполнить
 * @param deps - зависимости для `useCallback`
 * @param keepProgress - не сбрасывать флаг `isInProgress` после завершения функции
 * @returns [isInProgress, cb] - флаг состояния, и функция для запуска
 */
export default function useProgress(
  action: () => Promise<unknown>,
  deps = [],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, action, keepProgress]);

  return [isInProgress, cb];
}
