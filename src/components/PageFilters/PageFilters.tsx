import SearchBox from "../SearchBox";
import SelectList from "../SelectList";

import styles from "./PageFilters.module.scss";

interface PageFiltersProps {
  availableDevices: Array<string>;
  onSearchTermUpdated(searchTerm: string | undefined): void;
  onDevicesUpdated(devices: Array<string>): void;
}

function PageFilters({
  availableDevices,
  onSearchTermUpdated,
  onDevicesUpdated,
}: PageFiltersProps) {
  return (
    <div className={styles.pageFilters}>
      <SearchBox
        placeholder="Search..."
        onSearchTermUpdated={onSearchTermUpdated}
      />
      <SelectList
        placeholder="Device"
        options={availableDevices}
        onSelectionUpdated={onDevicesUpdated}
      />
    </div>
  );
}

export default PageFilters;
