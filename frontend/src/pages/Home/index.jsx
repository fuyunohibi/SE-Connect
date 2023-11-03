import React from 'react';
import { BackgroundSection } from '@/components/global';
import { HomeImage } from '@/assets/images/Home';
import SELogo from '@/components/global/Logo';

const Home = () => {
  return (
    <section className="flex flex-1 flex-col h-screen p-4">
      <SELogo className="absolute left-0 right-0" />
      <img src={HomeImage} alt="Home" className="object-cover w-full h-full rounded-3xl" />
    </section>
  );
};

export default Home;