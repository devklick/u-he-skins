import { RefObject, useEffect, useRef, useState } from "react";

interface ScrolledPaginationProps<Item> {
  items: Array<Item>;
  pageSize: number;
  initialPageNumber?: number;
}

interface ScrolledPaginationResult<Item> {
  pageData: Array<Item>;
  observerTarget: RefObject<HTMLDivElement>;
}

function useScrolledPagination<Item>({
  items,
  pageSize,
  initialPageNumber = 1,
}: ScrolledPaginationProps<Item>): ScrolledPaginationResult<Item> {
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting) return;
      const nextPage = currentPage + 1;
      const maxPage = Math.ceil(items.length / pageSize);
      if (nextPage > maxPage) return;
      setCurrentPage(nextPage);
    });
    const currentObserverTarget = observerTarget.current;
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }
    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [currentPage, items.length, observerTarget, pageSize]);

  const pageData = items.slice(0, currentPage * pageSize);

  return { pageData, observerTarget } as const;
}

export default useScrolledPagination;
