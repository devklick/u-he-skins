import { IconInfoCircleFilled } from "@tabler/icons-react";

import ActionButton from "../ActionButton";

import styles from "./InfoToggle.module.scss";

interface InfoToggleProps {
  handleClick(): void;
}

function InfoToggle({ handleClick }: InfoToggleProps) {
  return (
    <ActionButton
      withBorder
      handleClick={handleClick}
      className={{
        button: styles["info-toggle"],
        container: styles["info-toggle__container"],
      }}
    >
      <IconInfoCircleFilled className={styles["info-toggle__icon"]} />
    </ActionButton>
  );
}

export default InfoToggle;
