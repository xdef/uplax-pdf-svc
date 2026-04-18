"use client";

import * as React from "react";
import cx from "clsx";
import { INoteSummarization } from "@/types";
import humanTimestamp from "@/utils/humanTimestamp";

import classes from "./Summarization.module.css";
import { Anchor, Avatar, Group, List, Stack, Text } from "@mantine/core";

import {
  IconBookmarks,
  IconFileTextSpark,
  IconListDetails,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  summarization: INoteSummarization;
}>;

const Summarization: React.FC<Props> = ({ summarization, className }) => {
  const { details, topics, participants, actions } = summarization;

  return (
    <Stack
      className={cx(classes.root, className)}
      gap="xl"
    >
      <Stack gap="sm">
        <Group gap="xs">
          <IconFileTextSpark
            stroke={1}
            size={24}
            color="var(--mantine-color-gray-9)"
          />

          <Text size="xl">Резюме</Text>
        </Group>

        <Text>{details}</Text>
      </Stack>

      <Stack gap="sm">
        <Group gap="xs">
          <IconUsers
            stroke={1}
            size={24}
            color="var(--mantine-color-gray-9)"
          />

          <Text size="xl">Участники</Text>
        </Group>

        <Stack>
          {participants.map((p, idx) => (
            <Stack
              key={idx}
              gap="sm"
            >
              <Stack gap="xs">
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
                    {p.name}
                  </Text>
                </Group>

                {p.role && (
                  <Text size="sm">
                    Роль: <b>{p.role}</b>
                  </Text>
                )}
              </Stack>

              <Text>{p.details}</Text>

              <Stack gap="xs">
                <Text c="dimmed">Ключевые слова:</Text>

                <Group gap="xs">
                  {p.keywords.map((k, idx) => (
                    <Text
                      key={idx}
                      fw={600}
                      inline
                    >
                      {k}
                    </Text>
                  ))}
                </Group>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack gap="sm">
        <Group gap="xs">
          <IconBookmarks
            stroke={1}
            size={24}
            color="var(--mantine-color-gray-9)"
          />

          <Text size="xl">Темы обсуждения</Text>
        </Group>

        <Stack>
          {topics.map((topic, idx) => (
            <Stack
              key={idx}
              gap="xs"
            >
              <Group gap="xs">
                <Anchor
                  td="none"
                  fw={500}
                  size="sm"
                >
                  [{humanTimestamp(topic.timestamp).join(" - ")}]
                </Anchor>

                <Text fw={500}>{topic.title}</Text>
              </Group>

              <Text>{topic.details}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {actions.length > 0 && (
        <Stack>
          <Group gap="xs">
            <IconListDetails
              stroke={1}
              size={24}
              color="var(--mantine-color-gray-9)"
            />

            <Text size="xl">Задачи</Text>
          </Group>

          <List type="ordered">
            {actions.map((a, idx) => (
              <List.Item key={idx}>
                <Stack gap={0}>
                  <Text fw={600}>{a.title}</Text>
                  <Text>{a.details}</Text>
                </Stack>
              </List.Item>
            ))}
          </List>
        </Stack>
      )}
    </Stack>
  );
};

export default Summarization;
