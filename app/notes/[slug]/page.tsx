import { notFound } from "next/navigation";

import Note from "@/components/Note";
import { noteService } from "@/services";
import { INote } from "@/types";

export default async function ConferencePage({ params }: { params: Promise<{ slug: string }> }) {
  let note: INote | null;

  if (process.env.NODE_ENV === "production") {
    const { slug } = await params;
    note = await noteService.show(slug);
  } else {
    note = (await import("./note.json")) as unknown as INote;
  }

  if (!note) {
    notFound();
  }

  return <Note note={note} />;
}
