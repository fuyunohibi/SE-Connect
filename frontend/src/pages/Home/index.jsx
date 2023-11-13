import React from 'react';
import { BackgroundSection } from '@/components/global';
import { HomeImage, KmitlDarkBackground } from '@/assets/images/Home';
import SELogo from '@/components/global/Logo';

const Home = () => {
  return (
    <section className="relative flex flex-1 flex-col h-screen p-4">
      <SELogo className="absolute left-0 right-0 " />
      <img
        src={KmitlDarkBackground}
        alt="Home background"
        className="object-cover w-full h-full rounded-3xl "
      />
      <div className="absolute left-16 bottom-48 flex flex-col justify-center items-start text-white">
        <p className="text-[0.7rem] mb-5">International Program</p>
        <h1 className="text-[3rem] leading-[3.75rem] font-semibold mb-4">
          B.Eng. Software Engineering
        </h1>
        <p className="text-md">(International Program)</p>
      </div>
    </section>
  );
};

export default Home;