import React from 'react';
import { Navbar, Footer } from '@/components/global';
import { HomePage, IntroPage, AboutPage, InsiderPage, ContactPage } from '@/pages';

const Main = () => {
  return (
    <main id="main-container" className='mb-32 md:mb-0'>
      <Navbar />
      <HomePage />
      <IntroPage />
      <AboutPage />
      {/* <InsiderPage />
      <ContactPage /> */}
      <Footer />
    </main>
  );
};

export default Main;