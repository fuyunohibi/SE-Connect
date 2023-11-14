import { create } from "zustand";
import { DefaultUserProfile } from "@/assets/images/Auth";

const useUserStore = create((set) => ({
  userProfile: {
    email: "",
    password: "",
    avatar: DefaultUserProfile,
    KmitlID: "",
    firstName: "",
    lastName: "",
    yearOfStudy: "",
  },

  setUserProfile: (updates) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...updates },
    })),

  setEmail: (email) =>
    set((state) => ({
      userProfile: { ...state.userProfile, email },
    })),
  clearEmail: () =>
    set((state) => ({
      userProfile: { ...state.userProfile, email: "" },
    })),

  setPassword: (email) =>
    set((state) => ({
      userProfile: { ...state.userProfile, password },
    })),
  clearPassword: () =>
    set((state) => ({
      userProfile: { ...state.userProfile, password: "" },
    })),

  setKmitlID: (KmitlID) =>
    set((state) => ({
      userProfile: { ...state.userProfile, KmitlID },
    })),
  clearKmitlID: () =>
    set((state) => ({
      userProfile: { ...state.userProfile, KmitlID: "" },
    })),

  setYearOfStudy: (yearOfStudy) =>
    set((state) => ({
      userProfile: { ...state.userProfile, yearOfStudy },
    })),
  clearYearOfStudy: () =>
    set((state) => ({
      userProfile: { ...state.userProfile, yearOfStudy: "" },
    })),

  setAvatar: (avatar) =>
    set((state) => ({
      userProfile: { ...state.userProfile, avatar },
    })),

  setFirstName: (firstName) =>
    set((state) => ({
      userProfile: { ...state.userProfile, firstName },
    })),

  setLastName: (lastName) =>
    set((state) => ({
      userProfile: { ...state.userProfile, lastName },
    })),
}));

export default useUserStore;
