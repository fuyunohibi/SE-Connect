import { create } from "zustand";

const useUserStore = create((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: "" }),

  KmitlID: "",
  setKmitlID: (KmitlID) => set(() => ({ KmitlID })),
  clearKmitlID: () => set({ KmitlID: "" }),

  yearOfStudy: "",
  setYearOfStudy: (yearOfStudy) => set(() => ({ yearOfStudy })),
  clearYearOfStudy: () => set({ yearOfStudy: "" }),

  firstName: "",
  setFirstName: (firstName) => set(() => ({ firstName })),
  clearFirstName: () => set({ firstName: "" }),

  lastName: "",
  setLastName: (lastName) => set(() => ({ lastName })),
  clearLastName: () => set({ lastName: "" }),
}));

export default useUserStore;
