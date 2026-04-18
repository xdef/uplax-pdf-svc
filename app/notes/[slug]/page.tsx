import { notFound } from "next/navigation";

import Note from "@/components/Note";
import { noteService } from "@/services";

export default async function ConferencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await noteService.show(slug);

  if (!note) {
    notFound();
  }

  return <Note note={note} />;
}
