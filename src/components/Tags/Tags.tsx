import Tag from "../Tag";

import styles from "./Tags.module.scss";

interface TagsProps {
  tags: Array<string>;
  onDeleteTag(tag: string): void;
}

function Tags({ tags, onDeleteTag }: TagsProps) {
  if (!tags.length) return null;
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag text={tag} onClickDelete={() => onDeleteTag(tag)} />
      ))}
    </div>
  );
}

export default Tags;
