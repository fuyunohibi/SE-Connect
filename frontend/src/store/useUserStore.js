import { create } from "zustand";
import { DefaultUserProfile } from "@/assets/images/Auth";

const useUserStore = create((set) => ({
  userProfile: {
    email: "",
    registrationID: "",
    avatar: DefaultUserProfile,
    KmitlID: "",
    firstName: "",
    lastName: "",
    yearOfStudy: "",
  },


  clearAllData: () =>
    set((state) => ({
      userProfile: {
        email: "",
        registrationID: "",
        avatar: DefaultUserProfile,
        KmitlID: "",
        firstName: "",
        lastName: "",
        yearOfStudy: "",
      },
    })),

  setRegistrationID: (registrationID) =>
    set((state) => ({
      userProfile: { ...state.userProfile, registrationID },
    })),

  clearregistrationID: () =>
    set((state) => ({
      userProfile: { ...state.userProfile, registrationID: "" },
    })),

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

  setKmitlID: (KmitlID) =>
    set((state) => ({
      userProfile: { ...state.userProfile, KmitlID },
    })),
  clearKmitlID: () =>
    set((state) => ({
      userProfile: { ...state.userProfile, KmitlID: "" },
    })),
  setYearOfStudy: (yearOfStudy) => set((state) => {
    let suffix;
    switch (parseInt(yearOfStudy)) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
    const formattedYear = yearOfStudy + suffix + " year";

    return {
      userProfile: {
        ...state.userProfile,
        yearOfStudy: formattedYear,
        displayedYearOfStudy: yearOfStudy,
      },
    };
  }),
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
