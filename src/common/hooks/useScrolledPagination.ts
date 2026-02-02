import { Ref, useCallback, useEffect, useRef, useState } from "react";

interface ScrolledPaginationProps<Item> {
  items: Array<Item>;
  pageSize: number;
  initialPageNumber?: number;
}

interface ScrolledPaginationResult<Item> {
  pageData: Array<Item>;
  observerTarget: Ref<HTMLDivElement>;
}

function useScrolledPagination<Item>({
  items,
  pageSize,
  initialPageNumber = 1,
}: ScrolledPaginationProps<Item>): ScrolledPaginationResult<Item> {
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const observer = useRef<IntersectionObserver | null>(null);

  const buildPage = useCallback(() => {
    const nextPage = currentPage + 1;
    const maxPage = Math.ceil(items.length / pageSize);
    if (nextPage > maxPage) return;
    setCurrentPage(nextPage);
  }, [currentPage, items.length, pageSize]);

  const observerTargetCallback = useCallback(
    (node: null | HTMLDivElement) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
        if (!isIntersecting) return;
        buildPage();
      });

      if (node) {
        observer.current.disconnect();
        observer.current.observe(node);
      }
    },
    [buildPage],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const pageData = items.slice(0, currentPage * pageSize);

  return { pageData, observerTarget: observerTargetCallback } as const;
}

export default useScrolledPagination;
