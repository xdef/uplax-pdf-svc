import { INote } from "@/types";

import { promises as fs } from "fs";
import path from "path";

const notesFilePath = (id: string) => {
  return path.join("/tmp", `note-${id}.json`);
};

export const noteService = {
  create: async (query: INote) => {
    const filePath = notesFilePath(query.id);
    await fs.writeFile(filePath, JSON.stringify(query, null, 2));

    return query.id;
  },

  show: async (id: string) => {
    try {
      const filePath = notesFilePath(id);
      const fileData = await fs.readFile(filePath, "utf8");

      return JSON.parse(fileData) as INote;
    } catch {
      return null;
    }
  },
};
