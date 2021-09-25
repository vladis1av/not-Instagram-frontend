import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();
  const currentElem = ref.current;

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    const cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(currentElem);

    return () => {
      if (currentElem) {
        observer.current.unobserve(currentElem);
      }
    };
  }, [isLoading, observer]);
};
