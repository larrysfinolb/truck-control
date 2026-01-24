import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIState {
  pageTitle: string;
}

interface UIActions {
  setPageTitle: (title: string) => void;
  resetPageTitle: () => void;
}

type UIStore = UIState & UIActions;

const INITIAL_STATE: UIState = {
  pageTitle: "Dashboard",
};

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,
      setPageTitle: (title) => set({ pageTitle: title }, false, "UI/setPageTitle"),
      resetPageTitle: () => set({ pageTitle: INITIAL_STATE.pageTitle }, false, "UI/resetPageTitle"),
    }),
    { name: "UI Store" }
  )
);
