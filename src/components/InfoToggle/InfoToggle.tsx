import { IconInfoCircleFilled } from "@tabler/icons-react";

import styles from "./InfoToggle.module.scss";
import ActionButton from "../ActionButton";

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
