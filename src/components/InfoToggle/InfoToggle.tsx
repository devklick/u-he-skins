import { IconInfoCircleFilled } from "@tabler/icons-react";

import styles from "./InfoToggle.module.scss";

interface InfoToggleProps {
  handleClick(): void;
}

function InfoToggle({ handleClick }: InfoToggleProps) {
  return (
    <div className={styles.infoToggle} onClick={handleClick}>
      <IconInfoCircleFilled />
    </div>
  );
}

export default InfoToggle;
