import React, { useEffect, useState } from "react";

interface ScrolledPaginationProps<Item> {
  items: Array<Item>;
  observerTarget: React.RefObject<HTMLDivElement>;
  pageSize: number;
  initialPageNumber?: number;
}

type ScrolledPaginationResult<Item> = [Array<Item>];

function useScrolledPagination<Item>({
  items,
  observerTarget,
  pageSize,
  initialPageNumber = 1,
}: ScrolledPaginationProps<Item>): ScrolledPaginationResult<Item> {
  const [currentPage, setCurrentPage] = useState(initialPageNumber);

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

  return [pageData] as const;
}

export default useScrolledPagination;
