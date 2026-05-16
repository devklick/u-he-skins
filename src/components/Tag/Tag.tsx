import { IconX } from "@tabler/icons-react";
import styles from "./Tag.module.scss";

interface TagProps {
  text: string;
  onClickDelete(): void;
}

function Tag({ text, onClickDelete }: TagProps) {
  return (
    <div className={styles.tag}>
      <span>{text}</span>
      <IconX
        className={styles.tagDeleteIcon}
        onClick={onClickDelete}
        size={10}
      />
    </div>
  );
}

export default Tag;
