import { Anchor, Stack, Text, Title } from "@mantine/core";

interface PageHeaderProps {}

function PageHeader({}: PageHeaderProps) {
  return (
    <Stack mb={40}>
      <Title>u-he skins</Title>
      <Text>
        A filterable adaptation of the{" "}
        <Anchor href="https://u-he.com/PatchLib/skins.html">
          original page
        </Anchor>{" "}
        listing themes for the virtual synthesizers and effects created by{" "}
        <Anchor href="https://u-he.com/">u-he</Anchor>
      </Text>
    </Stack>
  );
}

export default PageHeader;
