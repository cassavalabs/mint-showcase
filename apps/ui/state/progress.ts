import create from "zustand";

type Progress =
  | {
      title: string;
      description: string;
      status: string;
    }[]
  | null;

interface ProgressState {
  progress: Progress;
  setProgress: (steps: Progress) => void;
  updateProgress: (completedId: number, nextId?: number) => void;
}

const updateStatus = (
  completedId: number,
  progress: Progress,
  nextId?: number
) => {
  if (progress == null) return null;

  const newProgress = progress.slice();
  newProgress[completedId].status = "completed";

  if (nextId && nextId < newProgress.length) {
    newProgress[nextId].status = "processing";
  }

  return newProgress;
};

export const useProgressStore = create<ProgressState>((set) => ({
  progress: null,
  setProgress: (progress) => set({ progress }),
  updateProgress: (completedId, nextId) =>
    set((state) => ({
      progress: updateStatus(completedId, state.progress, nextId),
    })),
}));
