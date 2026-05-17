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
      <a href={url} target="_blank" key={`${type}-${i}`}>
        <ActionButton withBorder>
          {type === "download" ? (
            <IconDownload {...style} />
          ) : (
            <IconPhoto {...style} />
          )}
        </ActionButton>
      </a>
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
  return (
    <div className={styles["skin-info__container"]}>
      <div className={styles["skin-info"]}>
        <div className={styles["skin-info__headers"]}>
          {/* headers */}
          <span className={styles["skin-info__header"]}>{name}</span>
          <span className={styles["skin-info__sub-header"]}>
            {tryAnchor(device)} theme by {tryAnchor(author)}
          </span>
        </div>
        {/* description */}
        <div className={styles["skin-info__description-container"]}>
          <span className={styles["skin-info__description"]}>
            {description}
          </span>
        </div>
        {/* icons */}
        <div className={styles["skin-info__icons"]}>
          {getActionIcons("image", previews)}
          {getActionIcons("download", downloads)}
        </div>
      </div>
    </div>
  );
}
export default SkinInfo;
