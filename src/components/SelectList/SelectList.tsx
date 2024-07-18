import { useState } from "react";

import { MultiSelect } from "@mantine/core";

interface SelectListProps {
  placeholder?: string;
  options: Array<string>;
  onSelectionUpdated(selected: Array<string>): void;
}

function SelectList({
  placeholder,
  options,
  onSelectionUpdated,
}: SelectListProps) {
  const [hasValue, setHashValue] = useState(false);

  return (
    <MultiSelect
      flex={"1 1 auto"}
      w={"auto"}
      miw={0}
      placeholder={hasValue ? "" : placeholder}
      searchable
      checkIconPosition="right"
      data={options}
      onChange={(values) => {
        setHashValue(values.length > 0);
        onSelectionUpdated(values);
      }}
      clearable
    />
  );
}

export default SelectList;
