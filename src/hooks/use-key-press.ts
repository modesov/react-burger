import { useEffect } from 'react';

export const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    const handler = (evt: KeyboardEvent): void => {
      if (evt.key === targetKey) {
        callback();
      }
    }

    document.addEventListener('keyup', handler);

    return () => document.removeEventListener('keyup', handler);
  }, []);
}
