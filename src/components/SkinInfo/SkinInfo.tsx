import {
  ActionIcon,
  Anchor,
  Group,
  MantineStyleProp,
  Stack,
  StackProps,
  Text,
} from "@mantine/core";
import { SkinItem, SrcItem } from "../../types/SkinItem";
import { IconDownload, IconPhoto } from "@tabler/icons-react";

interface SkinInfoProps extends SkinItem {}

function getActionIcons(type: "download" | "image", srcItems: Array<SrcItem>) {
  return srcItems.map(({ url }, i) => {
    if (!url) return;
    const style = { color: "grey" };
    return (
      <ActionIcon
        key={`${type}-${i}`}
        variant="transparent"
        onClick={() => window.open(url)}
      >
        {type === "download" ? (
          <IconDownload {...style} />
        ) : (
          <IconPhoto {...style} />
        )}
      </ActionIcon>
    );
  });
}

function tryAnchor(srcItem: SrcItem) {
  return srcItem.url ? (
    <Anchor href={srcItem.url}>{srcItem.name}</Anchor>
  ) : (
    srcItem.name
  );
}

function SkinInfo({
  author,
  description,
  device,
  downloads,
  name,
  previews,
}: SkinInfoProps) {
  const stackStyle: MantineStyleProp = {
    backgroundColor: "transparent",
    backdropFilter: "blur(20px) brightness(80%)",
    borderRadius: 20,
    border: "1px solid grey",
  };
  const stackProps: StackProps = {
    w: "100%",
    h: { base: "80%", sm: "50%" },
    px: { base: 25, md: 40 },
    pt: { base: 20 },
    pb: { base: 10 },
    gap: 0,
    style: stackStyle,
  };
  const header = (
    <Group gap={5}>
      <Text size="xl">{name}</Text>
      <Text>
        {tryAnchor(device)} theme by {tryAnchor(author)}
      </Text>
    </Group>
  );
  const descriptionBox = (
    <Group
      h={"100%"}
      justify="center"
      align="center"
      style={{ overflow: "auto" }}
    >
      <Text>{description}</Text>
    </Group>
  );
  const iconsElements = (
    <Group>
      {getActionIcons("image", previews)}
      {getActionIcons("download", downloads)}
    </Group>
  );
  return (
    <Stack {...stackProps}>
      {header}
      {descriptionBox}
      {iconsElements}
    </Stack>
  );
}
export default SkinInfo;
