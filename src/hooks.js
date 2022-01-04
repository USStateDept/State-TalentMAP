import { useEffect, useRef } from 'react';

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export function useMount(fn, { hook = useEffect } = {}) {
  hook(() => { fn(); return undefined; }, []);
}

export function useUnmount(fn, { hook = useEffect } = {}) {
  hook(() => fn, []);
}

export default function useUpdate(fn, { hook = useEffect } = {}) {
  const mounting = useRef(true);
  hook(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      fn();
    }
  });
}
