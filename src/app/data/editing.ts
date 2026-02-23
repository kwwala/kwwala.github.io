import snapshot from "@/app/data/generated/editing.snapshot.json";
import type { EditingCreator } from "@/app/types";

type EditingSnapshot = {
  playlistId: string;
  generatedAt: string;
  creators: EditingCreator[];
};

const editingSnapshot = snapshot as EditingSnapshot;

export const EDITING_CREATORS: EditingCreator[] = editingSnapshot.creators;
