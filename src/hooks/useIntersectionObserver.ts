import { RefObject, useEffect, useState } from 'react';

function useIntersectionObserver(
  targetRef: RefObject<Element>,
  options: IntersectionObserverInit = {
    threshold: 0,
    root: null,
    rootMargin: '0px',
  }
): IntersectionObserverEntry | undefined {
  const [currentEntry, setCurrentEntry] = useState<IntersectionObserverEntry>();

  const isIntersecting = currentEntry?.isIntersecting;

  const updateEntry = (entries: IntersectionObserverEntry[]): void => {
    const [entry] = entries;

    setCurrentEntry(entry);
  };

  useEffect(() => {
    const target = targetRef?.current;

    if (isIntersecting || !target) return;

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(target);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [
    targetRef,
    options.root,
    options.rootMargin,
    options.threshold,
    isIntersecting,
  ]);

  return currentEntry;
}

export default useIntersectionObserver;
