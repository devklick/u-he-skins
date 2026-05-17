import { IconInfoCircleFilled } from "@tabler/icons-react";

import ActionButton from "../ActionButton";

import styles from "./InfoToggle.module.scss";

interface InfoToggleProps {
  handleClick(): void;
}

function InfoToggle({ handleClick }: InfoToggleProps) {
  return (
    <ActionButton
      handleClick={handleClick}
      className={styles.infoToggleActionButton}
    >
      <IconInfoCircleFilled className={styles.infoToggleIcon} />
    </ActionButton>
  );
}

export default InfoToggle;
