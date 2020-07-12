import { useRef, useEffect } from 'react';

export default function useIsMountedRef() {
  const isMountedRef = useRef<boolean>();

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });

  return isMountedRef;
}
