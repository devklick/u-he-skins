import { Group } from "@mantine/core";
import SearchBox from "../SearchBox";
import SelectList from "../SelectList";

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
    <Group w={"100%"} justify="center">
      <SearchBox
        placeholder="Search..."
        onSearchTermUpdated={onSearchTermUpdated}
      />
      <SelectList
        placeholder="Device"
        options={availableDevices}
        onSelectionUpdated={onDevicesUpdated}
      />
    </Group>
  );
}

export default PageFilters;
