import * as React from "react";
import cx from "clsx";
import { INoteTranscription } from "@/types";
import humanTimestamp from "@/utils/humanTimestamp";

import classes from "./Transcription.module.css";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { IconBubbleText, IconUser } from "@tabler/icons-react";

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  transcription: INoteTranscription;
}>;

const Transcription: React.FC<Props> = ({ transcription, className }) => {
  const { segments } = transcription;

  return (
    <Stack
      className={cx(classes.root, className)}
      style={{ breakBefore: "page" }}
    >
      <Group gap="xs">
        <IconBubbleText
          stroke={1}
          size={24}
          color="var(--mantine-color-gray-9)"
        />

        <Text size="xl">Транскрипция</Text>
      </Group>

      {segments.map((s, idx) => (
        <Group
          key={idx}
          align="start"
          wrap="nowrap"
          gap="xs"
        >
          <Text
            size="sm"
            c="dimmed"
          >
            {humanTimestamp({ start: s.start, end: s.end })[0]}
          </Text>

          <Stack gap={0}>
            <Group gap={4}>
              <Avatar size={24}>
                <IconUser
                  stroke={1}
                  size={18}
                />
              </Avatar>

              <Text
                size="sm"
                fw={500}
                c="dimmed"
              >
                {s.speaker}
              </Text>
            </Group>

            <Text>{s.text}</Text>
          </Stack>
        </Group>
      ))}
    </Stack>
  );
};

export default Transcription;
