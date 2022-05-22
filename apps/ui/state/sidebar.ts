import create from "zustand";

export type ActiveSidebar = "mobileMenu" | "authentication" | null;

interface State {
  isOpen: boolean;

  activeSidebar: ActiveSidebar;
  toggleSidebar: (open: boolean) => void;
  setActiveSidebar: (sidebar: ActiveSidebar) => void;
}

export const useStore = create<State>((set) => ({
  isOpen: false,
  activeSidebar: null,
  toggleSidebar: (open) => set({ isOpen: open }),
  setActiveSidebar: (sidebar) => set({ activeSidebar: sidebar }),
}));
