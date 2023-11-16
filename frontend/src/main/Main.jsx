import React, { useEffect } from 'react';
import { Navbar, Footer } from '@/components/global';
import { HomePage, IntroPage, AboutPage, InsiderPage, AdmissionPage, ProgramPage, ConnectionPage, EventPage, ContactPage, NewsPage, NewsDetail, Login, LoginPassword, Register, RegisterPassword, RegisterUserDetails, RoomReservation } from '@/pages';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import useUserStore from "@/store/useUserStore";

const Main = () => {
  const location = useLocation();
  
  useEffect(() => {
    const storedUserProfile = localStorage.getItem("userProfile");
    console.log("storedUserProfile: ", storedUserProfile);
    if (storedUserProfile) {
      const profile = JSON.parse(storedUserProfile);
      useUserStore.getState().setEmail(profile.email);
      useUserStore.getState().setKmitlID(profile.ID);
      useUserStore.getState().setYearOfStudy(profile.year_of_study);
      useUserStore.getState().setAvatar(profile.profile_picture);
      useUserStore.getState().setFirstName(profile.firstname);
      useUserStore.getState().setLastName(profile.lastname);
    }
  }, []);

  const isLoginOrSignup =
    location.pathname === "/auth/login/identifier" || location.pathname === "/auth/login/password" || 
    location.pathname === "/auth/signup/identifier" || location.pathname === "/auth/signup/password" || 
    location.pathname === "/auth/signup/user-details";

  const isRoomReservation = location.pathname === "/room-reservation" || location.pathname === "/create/room-reservation";

  return (
    <main id="main-container" className="mb-32 md:mb-0">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <IntroPage />
              <AboutPage />
              {/* <InsiderPage /> */}
              {/* <ContactPage /> */}
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admissions" element={<AdmissionPage />} />
        <Route path="/programs" element={<ProgramPage />} />
        <Route path="/connections" element={<ConnectionPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route
          path="/room-reservation"
          element={
            <ProtectedRoute>
              <RoomReservation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/room-reservation"
          element={
            <ProtectedRoute>
              <RoomReservation />
            </ProtectedRoute>
          }
        />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:ID" element={<NewsDetail />} />
        <Route path="/auth/login/identifier" element={<Login />} />
        <Route path="/auth/login/password" element={<LoginPassword />} />
        <Route path="/auth/signup/identifier" element={<Register />} />
        <Route path="/auth/signup/password" element={<RegisterPassword />} />
        <Route
          path="/auth/signup/user-details"
          element={<RegisterUserDetails />}
        />
      </Routes>
      {!isLoginOrSignup && !isRoomReservation && <Footer />}
    </main>
  );
};

export default Main;