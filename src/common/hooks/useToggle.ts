import { useState } from "react";

function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((value) => !value);
  }

  return [value, { toggle }] as const;
}

export default useToggle;
