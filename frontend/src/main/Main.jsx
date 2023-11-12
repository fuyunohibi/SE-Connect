import React from 'react';
import { Navbar, Footer } from '@/components/global';
import { HomePage, IntroPage, AboutPage, InsiderPage, ContactPage, NewsPage, NewsDetail } from '@/pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Main = () => {
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
      </Routes>
      <Footer />
    </main>
  );
};

export default Main;