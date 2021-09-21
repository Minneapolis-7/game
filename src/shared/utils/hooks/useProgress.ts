import { useCallback, useState } from 'react';

/**
 * Переиспользование логики при запуске асинхронных действий.
 * Возвращает саму функцию, обработанную через `useCallback`, и флаг состояния.
 * @param action - асинхронная функция, которую нужно исполнить
 * @param keepProgress - не сбрасывать флаг `isInProgress` после завершения функции
 * @returns [isInProgress, cb] - флаг состояния, и функция для запуска
 */
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
