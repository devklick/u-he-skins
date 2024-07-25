import React, { useEffect, useState } from "react";

import { IconBackspace } from "@tabler/icons-react";

import Input from "../Input";
import ActionButton from "../ActionButton";

interface SearchBoxProps {
  onSearchTermUpdated(searchTerm: string | undefined): void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

function SearchBox({
  onSearchTermUpdated,
  placeholder,
  onBlur,
  onFocus,
}: SearchBoxProps) {
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
    <ActionButton handleClick={clearSearchTerm} withBorder={false}>
      <IconBackspace />
    </ActionButton>
  );

  return (
    <Input
      midSection={
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      }
      rightSection={clearIcon}
    />
  );
}

export default SearchBox;
