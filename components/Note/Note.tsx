import * as React from "react";
import cx from "clsx";
import { INote } from "@/types";

import classes from "./Note.module.css";
import { Stack } from "@mantine/core";
import Header from "./Header";
import Summarization from "./Summarization";
import Transcription from "./Transcription";
import RefinedText from "./RefinedText";

type Props = React.PropsWithChildren<{
  readonly className?: string | undefined;
  note: INote;
}>;

const Note: React.FC<Props> = ({ note, className }) => {
  const summarization = note.summarizations[0];
  if (!summarization) {
    return null;
  }

  const transcription = note.transcriptions[0];
  if (!transcription) {
    return null;
  }

  return (
    <Stack
      className={cx(classes.root, className)}
      gap="xl"
    >
      <Header note={note} />

      <Summarization summarization={summarization} />
      <RefinedText summarization={summarization} />
      <Transcription transcription={transcription} />
    </Stack>
  );
};

export default Note;
