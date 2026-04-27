// utils/noteToMarkdown.ts

import { INote } from "@/types/notes";
import { IAttachment } from "@/types/attachments";

function formatMeta(note: INote): string {
  return ["## Meta", `**id:** ${note.id}`, `**created_at:** ${note.created_at}`, ""].join("\n");
}

function formatRefinedText(note: INote): string {
  return note.summarizations[0]?.refined_text || "";
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

export function noteToMarkdown(note: INote, attachments: IAttachment[] = []): string {
  return [
    "# Note",
    "",
    formatMeta(note),
    formatAttachments(attachments),
    formatRefinedText(note),
  ].join("\n");
}
