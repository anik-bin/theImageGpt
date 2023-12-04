import { create } from "zustand";

interface useProTextStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useProText = create<useProTextStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));