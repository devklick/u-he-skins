import { IconDownload, IconPhoto } from "@tabler/icons-react";
import { SkinItem, SrcItem } from "../../types/SkinItem";
import ActionButton from "../ActionButton";

import styles from "./SkinInfo.module.scss";

interface SkinInfoProps extends SkinItem {}

function getActionIcons(type: "download" | "image", srcItems: Array<SrcItem>) {
  return srcItems.map(({ url }, i) => {
    if (!url) return;
    const style = { color: "grey" };
    return (
      <ActionButton key={`${type}-${i}`} handleClick={() => window.open(url)}>
        {type === "download" ? (
          <IconDownload {...style} />
        ) : (
          <IconPhoto {...style} />
        )}
      </ActionButton>
    );
  });
}

function tryAnchor(srcItem: SrcItem) {
  return srcItem.url ? <a href={srcItem.url}>{srcItem.name}</a> : srcItem.name;
}

function SkinInfo({
  author,
  description,
  device,
  downloads,
  name,
  previews,
}: SkinInfoProps) {
  const header = (
    <div className={styles.headerContainer}>
      <span className={styles.primaryHeader}>{name}</span>
      <span className={styles.secondaryHeader}>
        {tryAnchor(device)} theme by {tryAnchor(author)}
      </span>
    </div>
  );
  const descriptionBox = (
    <div className={styles.descriptionContainer}>
      <span className={styles.description}>{description}</span>
    </div>
  );
  const iconsElements = (
    <div className={styles.iconContainer}>
      {getActionIcons("image", previews)}
      {getActionIcons("download", downloads)}
    </div>
  );
  return (
    <div className={styles.skinInfo}>
      {header}
      {descriptionBox}
      {iconsElements}
    </div>
  );
}
export default SkinInfo;
