import { SkinItem } from "../../types/SkinItem";
import Skin from "../Skin";

import styles from "./SkinsList.module.scss";

interface SkinTableProps {
  skins: Array<SkinItem>;
}

function SkinsList({ skins }: SkinTableProps) {
  return (
    <div className={styles.skinsList}>
      {skins.map((skin) => (
        <Skin key={`${skin.device.name}-${skin.name}`} {...skin} />
      ))}
    </div>
  );
}

export default SkinsList;
