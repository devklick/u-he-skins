import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  midSection: React.ReactNode;
}

const Input = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InputProps>
>(({ midSection, leftSection, rightSection, children }, ref) => {
  return (
    <div className={styles["input__container"]} ref={ref}>
      <div className={styles["input__content"]}>
        {leftSection}
        {midSection}
        {rightSection}
      </div>
      {children}
    </div>
  );
});

export default Input;
