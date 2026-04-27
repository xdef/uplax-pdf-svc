"use client";

import * as React from "react";
import cx from "clsx";
import { INoteSummarization } from "@/types";

import classes from "./RefinedText.module.css";
import { Group, Stack, Text, Typography } from "@mantine/core";
import { IconFileText } from "@tabler/icons-react";
import Markdown from "react-markdown";

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  summarization: INoteSummarization;
}>;

const RefinedText: React.FC<Props> = ({ summarization, className }) => {
  const { refined_text } = summarization;

  return (
    <Stack
      className={cx(classes.root, className)}
      style={{ breakBefore: "page" }}
      gap="sm"
    >
      <Group gap="xs">
        <IconFileText
          size={24}
          color="var(--mantine-color-gray-9)"
        />

        <Text
          component="h2"
          size="xl"
          fw="bold"
        >
          Чистый текст
        </Text>
      </Group>

      <Typography className={classes.body}>
        <Markdown>{refined_text}</Markdown>
      </Typography>
    </Stack>
  );
};

export default RefinedText;
