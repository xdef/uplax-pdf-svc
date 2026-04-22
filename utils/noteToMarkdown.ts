// utils/noteToMarkdown.ts

import {
  INote,
  INoteSummarization,
  INoteTranscription,
  INoteTranscriptionSegment,
} from "@/types/notes";
import { IAttachment } from "@/types/attachments";

function formatMeta(note: INote): string {
  return ["## Meta", `**id:** ${note.id}`, `**created_at:** ${note.created_at}`, ""].join("\n");
}

function formatAttachments(attachments: IAttachment[]): string {
  if (!attachments?.length) return "## Attachments\n_None_\n";

  return [
    "## Attachment",
    ...attachments.map((att) =>
      [
        "- **id:** " + att.id,
        att.metadata?.filename ? `  **filename:** ${att.metadata.filename}` : "",
        att.metadata?.size ? `  **size:** ${att.metadata.size}` : "",
        att.metadata?.mime_type ? `  **mime_type:** ${att.metadata.mime_type}` : "",
        "",
      ].join("\n")
    ),
    "",
  ].join("\n");
}

function formatSummarizations(summarizations: INoteSummarization[]): string {
  if (!summarizations?.length) return "## Summarizations\n_None_\n";
  return [
    "## Summarization",
    ...summarizations.map((sum) =>
      [
        `**title:** ${sum.title}`,
        `**details:** ${sum.details}`,
        "",
        "### Topics",
        ...(sum.topics?.length
          ? sum.topics.map((topic) =>
              [
                "- **title:** " + topic.title,
                `  **details:** ${topic.details}`,
                `  **participants:** ${topic.participants.join(", ")}`,
                "",
              ].join("\n")
            )
          : ["_None_"]),
        "### Actions",
        ...(sum.actions?.length
          ? sum.actions.map((action) =>
              [
                "- **due_date:** " + (action.due_date ?? ""),
                `  **title:** ${action.title}`,
                `  **details:** ${action.details ?? ""}`,
                `  **participants:** ${action.participants.join(", ")}`,
                "",
              ].join("\n")
            )
          : ["_None_"]),
        "### Participants",
        ...(sum.participants?.length
          ? sum.participants.map((part) =>
              [
                "- **name:** " + part.name,
                `  **role:** ${part.role ?? ""}`,
                `  **details:** ${part.details}`,
                `  **keywords:** ${part.keywords.join(", ")}`,
                "",
              ].join("\n")
            )
          : ["_None_"]),
      ].join("\n")
    ),
    "",
  ].join("\n");
}

function formatTranscriptions(transcriptions: INoteTranscription[]): string {
  if (!transcriptions?.length) return "## Transcriptions\n_None_\n";
  return [
    "## Transcription",
    ...transcriptions.map((tr) =>
      [
        "### Segments",
        ...(tr.segments?.length
          ? tr.segments.map((seg: INoteTranscriptionSegment) =>
              [
                `- **time:** ${seg.start} - ${seg.end}`,
                `  **speaker:** ${seg.speaker}`,
                `  **text:** ${seg.text}`,
                "",
              ].join("\n")
            )
          : ["_None_"]),
      ].join("\n")
    ),
    "",
  ].join("\n");
}

export function noteToMarkdown(note: INote, attachments: IAttachment[] = []): string {
  return [
    "# Note",
    "",
    formatMeta(note),
    formatAttachments(attachments),
    formatTranscriptions(note.transcriptions),
    formatSummarizations(note.summarizations),
  ].join("\n");
}
