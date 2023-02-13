import { useEffect } from 'react';

export const useKeyPress = (targetKey, callback, eventName = 'keyup') => {
  const handler = ({ key }) => {
    if (key === targetKey) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener(eventName, handler);

    return () => document.removeEventListener(eventName, handler);
  }, []);
}
