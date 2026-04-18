import * as React from "react";
import cx from "clsx";
import { INote } from "@/types";
import dayjs from "@/utils/dayjs";

import classes from "./Header.module.css";
import { Text, Stack, rem } from "@mantine/core";

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  note: INote;
}>;

const Header: React.FC<Props> = ({ note, className }) => {
  const summarization = note.summarizations[0];

  return (
    <Stack
      className={cx(classes.root, className)}
      gap={4}
    >
      <Text size={rem(24)}>{summarization.title}</Text>

      <Text
        c="dimmed"
        fw={500}
      >
        {dayjs(note.created_at).format("LLL")}
      </Text>
    </Stack>
  );
};

export default Header;
