// app/api/notes/markdown/route.ts

import { NextRequest } from "next/server";
import { INote } from "@/types/notes";
import { noteToMarkdown } from "@/utils/noteToMarkdown";

export async function POST(req: NextRequest) {
  try {
    const note = (await req.json()) as INote;

    const markdown = noteToMarkdown(note, note.attachments);
    const fileName = `note-${note.id}.md`;

    return new Response(markdown, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return new Response(`Error generating markdown: ${error}`, { status: 500 });
  }
}
