import { Stack } from "@mantine/core";
import { SkinItem } from "../../types/SkinItem";
import Skin from "../Skin";

interface SkinTableProps {
  skins: Array<SkinItem>;
}

function SkinsList({ skins }: SkinTableProps) {
  return (
    <Stack gap={60} w={"100%"}>
      {skins.slice(0, 3).map((skin) => (
        <Skin key={`${skin.device.name}-${skin.name}`} {...skin} />
      ))}
    </Stack>
  );
}

export default SkinsList;
