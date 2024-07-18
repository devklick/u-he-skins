import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import { Group, Stack, Image, Card } from "@mantine/core";

import { SkinItem } from "../../types/SkinItem";
import InfoToggle from "../InfoToggle";
import SkinInfo from "../SkinInfo";
import { isImagePath } from "../../common/utils/string-utils";

interface SkinProps extends SkinItem {}

function Skin({
  author,
  description,
  device,
  downloads,
  name,
  previews,
}: SkinProps) {
  const [showInfo, { toggle: toggleShowInfo }] = useDisclosure(true);
  const enableControls = previews.length > 1;
  const hasImages = previews.some((p) => p.url && isImagePath(p.url));

  const slides = hasImages ? (
    previews.map(
      (preview, i) =>
        preview.url &&
        isImagePath(preview.url) && (
          <Carousel.Slide key={i} h={"100%"}>
            <Image height={"100%"} src={preview.url} alt={preview.name} />
          </Carousel.Slide>
        )
    )
  ) : (
    <Carousel.Slide h={"100%"}></Carousel.Slide>
  );

  const carousel = (
    <Carousel
      withControls={enableControls}
      h={"100%"}
      controlsOffset={25}
      controlSize={25}
    >
      {slides}
    </Carousel>
  );

  return (
    <Card
      p={0}
      radius="md"
      withBorder
      pos={"relative"}
      h={{ base: 300, xs: 300, sm: 500, xl: 600 }}
    >
      {carousel}

      <Stack
        pos={"absolute"}
        justify="end"
        align="center"
        w={"100%"}
        h={"100%"}
        p={{ base: 5, xs: 20, sm: 30 }}
      >
        <Group
          justify="center"
          align="end"
          h={"100%"}
          w={{ base: "100%", sm: "70%", lg: "50%" }}
        >
          {showInfo && (
            <SkinInfo
              {...{ author, description, device, downloads, name, previews }}
            />
          )}
        </Group>
        <InfoToggle handleClick={toggleShowInfo}></InfoToggle>
      </Stack>
    </Card>
  );
}
export default Skin;
