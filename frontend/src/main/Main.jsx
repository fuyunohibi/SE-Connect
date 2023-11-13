import React from 'react';
import { Navbar, Footer } from '@/components/global';
import { HomePage, IntroPage, AboutPage, InsiderPage, ContactPage, NewsPage, NewsDetail, Login, LoginPassword, Register, RegisterPassword, RegisterUserDetails } from '@/pages';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();

  const isLoginOrSignup =
    location.pathname === "/auth/login/identifier" || location.pathname === "/auth/login/password" || 
    location.pathname === "/auth/signup/identifier" || location.pathname === "/auth/signup/password" || 
    location.pathname === "/auth/signup/user-details";

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
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/auth/login/identifier" element={<Login />} />
        <Route path="/auth/login/password" element={<LoginPassword />} />
        <Route path="/auth/signup/identifier" element={<Register />} />
        <Route path="/auth/signup/password" element={<RegisterPassword />} />
        <Route path="/auth/signup/user-details" element={<RegisterUserDetails />} />
      </Routes>
      {!isLoginOrSignup && <Footer />}
    </main>
  );
};

export default Main;