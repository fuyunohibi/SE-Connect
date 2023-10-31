import React from "react";

const Intro = () => {
  return (
    <section className="flex flex-col justify-between items-center bg-white text-black px-16 py-14
      md:px-8 md:pb-24
    ">
      <div className="flex flex-col justify-between items-start space-y-10
        md:flex-row md:space-y-0 md:space-x-10 
      ">
        <p className="font-medium text-sm">
          A New Way
          <br />
          A New World
        </p>
        <h1 className="font-medium text-5xl text-start">
          Software Enginneering a new way to learn
        </h1>
        <p className="font-medium text-md w-80
          md:w-auto 
        ">
          Delve into the world of Software Engineering at King Mongkut's
          Institute of Technology Ladkrabang, where innovation meets excellence.
        </p>
      </div>
    </section>
  );
};

export default Intro;
