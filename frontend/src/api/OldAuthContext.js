import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const mockDatabase = {
  students: [
    {
      id: "65011338",
      year: 2,
      faculty: "Engineering",
      department: "Software Engineering",
      isActive: false,
      authentication: {
        password: "Mesan123",
      },
      contact: {
        email: "65011338@kmitl.ac.th",
        username: "fuyunohibi",
      },
      reservation: {
        status: "pending",
        building: "ECC",
        roomId: "100",
        startTime: "2023-12-03T10:00:00Z",
        endTime: "2023-12-03T11:00:00Z",
      },
      profile: {
        picture: "captain.jpg",
      },
    },
    {
      id: "65011476",
      year: 2,
      faculty: "Engineering",
      department: "Software Engineering",
      isActive: true,
      authentication: {
        password: "Mesan123",
      },
      contact: {
        email: "65011476@kmitl.ac.th",
        username: "pcrplanet",
      },
      reservation: {
        status: "approved",
        building: "ECC",
        roomId: "101",
        startTime: "2023-12-03T13:00:00Z",
        endTime: "2023-12-03T14:00:00Z",
      },
      profile: {
        picture: "petch.jpg",
      },
    },
    {
      id: "65011636",
      year: 2,
      faculty: "Engineering",
      department: "Software Engineering",
      isActive: false,
      authentication: {
        password: "Mesan123",
      },
      contact: {
        email: "65011636@kmitl.ac.th",
        username: "twtw.ig",
      },
      reservation: {
        status: "denied",
        building: "ECC",
        roomId: "101",
        startTime: "2023-12-03T15:00:00Z",
        endTime: "2023-12-03T16:00:00Z",
      },
      profile: {
        picture: "tawan.jpg",
      },
    },
  ],
  rooms: [
    {
      id: "100",
      building: "HM",
      availability: [
        {
          startTime: "2023-12-03T10:00:00Z",
          endTime: "2023-12-03T11:00:00Z",
          bookedBy: "65011338",
        },
      ],
    },
    {
      id: "101",
      building: "ECC",
      availability: [
        {
          startTime: "2023-12-03T13:00:00Z",
          endTime: "2023-12-03T14:00:00Z",
          bookedBy: "65011476",
        },
      ],
    },
    {
      id: "102",
      building: "ECC",
      availability: [],
    },
  ],
};




const findUserByEmail = (email) => {
  return mockDatabase.students.find(
    (student) => student.contact.email === email
  );
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (email, password) => {
    const user = findUserByEmail(email);
    if (user) {
      return { error: "User already exists" };
    }
    const newUser = {
      id: new Date().getTime().toString(),
      contact: { email },
      authentication: { password },
    };
    mockDatabase.students.push(newUser);
    setCurrentUser(newUser);
    return { error: null };
  };

  const logIn = (email, password) => {
    const user = findUserByEmail(email);
    if (!user || user.authentication.password !== password) {
      return { error: "Invalid email or password" };
    }
    setCurrentUser(user);
    return { error: null };
  };

  const value = {
    currentUser,
    signUp,
    logIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
