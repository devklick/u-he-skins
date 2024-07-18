import { ActionIcon, Group } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";

interface InfoToggleProps {
  handleClick(): void;
}

function InfoToggle({ handleClick }: InfoToggleProps) {
  return (
    <Group
      h={40}
      w={40}
      pos={"absolute"}
      right={10}
      top={10}
      justify="center"
      align="center"
      style={{
        borderRadius: 7,
        border: "1px solid grey",
        backdropFilter: "blur(5px)",
      }}
    >
      <ActionIcon color="white" variant="transparent" onClick={handleClick}>
        <IconInfoCircleFilled />
      </ActionIcon>
    </Group>
  );
}

export default InfoToggle;
