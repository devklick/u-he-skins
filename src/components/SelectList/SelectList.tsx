import { useRef, useState } from "react";

import styles from "./SelectList.module.scss";
import useDetectMouseDownOutside from "../../common/hooks/useDetectMouseDownOutside";
import Input from "../Input";
import ActionButton from "../ActionButton";
import { IconBackspace } from "@tabler/icons-react";
import Tags from "../Tags";

interface SelectListProps {
  placeholder?: string;
  options: Array<string>;
  onSelectionUpdated(selected: Array<string>): void;
}

function SelectList({
  onSelectionUpdated,
  options,
  placeholder,
}: SelectListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Array<string>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const [matchingOptions, setMatchingOptions] = useState<Array<string>>([
    ...options,
  ]);

  function handleSearchUpdated(search: string | undefined) {
    if (!search) setMatchingOptions(options);
    else
      setMatchingOptions(
        options.filter((o) => o.toUpperCase().includes(search.toUpperCase()))
      );
    setSearchTerm(search ?? "");
  }

  useDetectMouseDownOutside({
    elementRef: containerRef,
    onMouseDown: () => setFocused(false),
  });

  function selectOption(option: string) {
    const newSelected = [...selected, option];
    setSelected(newSelected);
    onSelectionUpdated(newSelected);
  }

  function deselectOption(option: string) {
    const i = selected.indexOf(option);
    const newSelected = [...selected];
    newSelected.splice(i, 1);
    setSelected(newSelected);
    onSelectionUpdated(newSelected);
  }

  function handleOptionClicked(option: string) {
    if (selected.includes(option)) {
      deselectOption(option);
    } else {
      selectOption(option);
    }
  }

  const clearIcon = (
    <ActionButton
      handleClick={() => {
        setSearchTerm("");
        setSelected([]);
        onSelectionUpdated([]);
      }}
      withBorder={false}
    >
      <IconBackspace />
    </ActionButton>
  );

  return (
    <Input
      ref={containerRef}
      leftSection={
        <Tags tags={selected} onDeleteTag={(tag) => deselectOption(tag)} />
      }
      midSection={
        <input
          type="text"
          placeholder={selected.length ? undefined : placeholder}
          value={searchTerm}
          onChange={(e) => handleSearchUpdated(e.currentTarget.value)}
          onFocus={() => setFocused(true)}
        />
      }
      rightSection={clearIcon}
    >
      <div className={styles.selectListOptionContainerPositioning}>
        <div
          className={styles.selectListOptionContainer}
          style={{ visibility: focused ? "visible" : "hidden" }}
        >
          {matchingOptions
            .sort((a, b) => a.localeCompare(b))
            .map((option) => (
              <div
                key={option}
                className={styles.selectListOption}
                onClick={() => handleOptionClicked(option)}
              >
                {option}
              </div>
            ))}
        </div>
      </div>
    </Input>
  );
}

export default SelectList;
