import { useEffect } from 'react';

export function useOutsideClick(ref, callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, enabled]);
}