import { useCallback, useEffect, useRef, useState } from "react";
import SearchBox from "../SearchBox";
import SelectList from "../SelectList";

import styles from "./PageFilters.module.scss";
import clsx from "clsx";

interface PageFiltersProps {
  availableDevices: Array<string>;
  onSearchTermUpdated(searchTerm: string | undefined): void;
  onDevicesUpdated(devices: Array<string>): void;
  searchTerm?: string | null;
  selectedDevices?: Array<string>;
}

function PageFilters({
  availableDevices,
  onSearchTermUpdated,
  onDevicesUpdated,
  searchTerm,
  selectedDevices,
}: PageFiltersProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pageFiltersRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!stuck) return;
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) > 5) {
        setHidden(delta > 0);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [stuck]);

  return (
    <>
      <div ref={triggerRef} />
      <div
        className={clsx(styles.pageFilters, {
          [styles["pageFilters--stuck"]]: stuck,
          [styles["pageFilters--hidden"]]: stuck && hidden,
        })}
        ref={pageFiltersRef}
      >
        <SearchBox
          placeholder="Search..."
          onSearchTermUpdated={onSearchTermUpdated}
          value={searchTerm}
        />
        <SelectList
          placeholder="Device"
          options={availableDevices}
          onSelectionUpdated={onDevicesUpdated}
          value={selectedDevices}
        />
      </div>
    </>
  );
}

export default PageFilters;
