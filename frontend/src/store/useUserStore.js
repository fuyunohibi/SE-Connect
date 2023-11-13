import create from "zustand";

const useUserStore = create((set) => ({
  email: "",
  setEmail: (email) => set(() => ({ email })),
  clearEmail: () => set({ email: '' })
}));

export default useUserStore;
