import React from "react";
import { SkinItem } from "../../types/SkinItem";
import Skin from "../Skin";

import styles from "./SkinsList.module.scss";

interface SkinTableProps {
  skins: Array<SkinItem & { ref?: React.RefObject<HTMLDivElement> }>;
}

function SkinsList({ skins }: SkinTableProps) {
  return (
    <div className={styles.skinsList}>
      {skins
        .slice(0, import.meta.env.VITE_SKINS_COUNT_LIMIT ?? skins.length)
        .map((skin) => (
          <Skin key={`${skin.device.name}-${skin.name}`} {...skin} />
        ))}
    </div>
  );
}

export default SkinsList;
