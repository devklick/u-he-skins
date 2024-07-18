import React, { useEffect, useState } from "react";

import { ActionIcon, TextInput } from "@mantine/core";
import { IconBackspace } from "@tabler/icons-react";

interface SearchBoxProps {
  onSearchTermUpdated(searchTerm: string | undefined): void;
  placeholder?: string;
}

function SearchBox({ onSearchTermUpdated, placeholder }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    onSearchTermUpdated(searchTerm);
  }, [searchTerm]);

  function clearSearchTerm() {
    setSearchTerm("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const clearIcon = (
    <ActionIcon disabled={!searchTerm} onClick={clearSearchTerm}>
      <IconBackspace />
    </ActionIcon>
  );

  return (
    <TextInput
      flex={"1 1 auto"}
      w={"auto"}
      placeholder={placeholder}
      rightSection={clearIcon}
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBox;
