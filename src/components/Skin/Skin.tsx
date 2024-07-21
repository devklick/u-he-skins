import { SkinItem } from "../../types/SkinItem";
import InfoToggle from "../InfoToggle";
import SkinInfo from "../SkinInfo";
import { isImagePath } from "../../common/utils/string-utils";

import styles from "./Skin.module.scss";
import useToggle from "../../common/hooks/useToggle";

interface SkinProps extends SkinItem {}

function Skin({
  author,
  description,
  device,
  downloads,
  name,
  previews,
}: SkinProps) {
  const [showInfo, { toggle: toggleShowInfo }] = useToggle(true);
  const hasImages = previews.some((p) => p.url && isImagePath(p.url));

  return (
    <div className={styles.skinContainer}>
      <div className={styles.imageContainer}>
        {/* TODO: Consider creating a carousel or giving some way to view multiple images */}
        {hasImages && (
          <img className={styles.skinImage} src={previews[0].url} />
        )}
      </div>

      <div className={styles.skinInfoContainerWrapper}>
        <div className={styles.skinInfoContainer}>
          {showInfo && (
            <SkinInfo
              {...{ author, description, device, downloads, name, previews }}
            />
          )}
        </div>
        <InfoToggle handleClick={toggleShowInfo}></InfoToggle>
      </div>
    </div>
  );
}
export default Skin;
