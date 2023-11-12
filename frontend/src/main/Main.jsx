import React from 'react';
import { Navbar, Footer } from '@/components/global';
import { HomePage, IntroPage, AboutPage, InsiderPage, ContactPage, NewsPage, NewsDetail, Login, Register } from '@/pages';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();

  const isLoginOrSignup =
    location.pathname === "/login" || location.pathname === "/signup";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      {!isLoginOrSignup && <Footer />}
    </main>
  );
};

export default Main;