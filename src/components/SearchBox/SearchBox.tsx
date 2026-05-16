import React, { useEffect, useState } from "react";

import { IconBackspace } from "@tabler/icons-react";

import Input from "../Input";
import ActionButton from "../ActionButton";
import styles from "./SearchBox.module.scss";

interface SearchBoxProps {
  onSearchTermUpdated(searchTerm: string | undefined): void;
  value?: string | null;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

function SearchBox({
  onSearchTermUpdated,
  placeholder,
  onBlur,
  onFocus,
  value,
}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState<string>(value ?? "");
  useEffect(() => {
    setSearchTerm(value ?? "");
  }, [value]);

  useEffect(() => {
    onSearchTermUpdated(searchTerm);
  }, [onSearchTermUpdated, searchTerm]);

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
          className={styles.searchBox}
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
