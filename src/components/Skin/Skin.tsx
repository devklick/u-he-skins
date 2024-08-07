import { SkinItem } from "../../types/SkinItem";
import InfoToggle from "../InfoToggle";
import SkinInfo from "../SkinInfo";
import { isImagePath } from "../../common/utils/string-utils";
import useToggle from "../../common/hooks/useToggle";

import styles from "./Skin.module.scss";
import { forwardRef } from "react";

interface SkinProps extends SkinItem {}

const Skin = forwardRef<HTMLDivElement, SkinProps>(
  ({ author, description, device, downloads, name, previews }, ref) => {
    const [showInfo, { toggle: toggleShowInfo }] = useToggle(true);
    const hasImages = previews.some((p) => p.url && isImagePath(p.url));

    return (
      <div className={styles.skinContainer} ref={ref}>
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
);

export default Skin;
