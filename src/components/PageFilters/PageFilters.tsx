import SearchBox from "../SearchBox";
import SelectList from "../SelectList";

import styles from "./PageFilters.module.scss";

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
  return (
    <div className={styles.pageFilters}>
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
  );
}

export default PageFilters;
