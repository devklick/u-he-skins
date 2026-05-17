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
        button: styles.infoToggleActionButton,
        container: styles.infoToggleActionButtonContainer,
      }}
    >
      <IconInfoCircleFilled className={styles.infoToggleIcon} />
    </ActionButton>
  );
}

export default InfoToggle;
