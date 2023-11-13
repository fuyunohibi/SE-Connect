import React from "react";

const Intro = () => {
  return (
    <section
      className="flex flex-col justify-between items-center bg-white text-black px-16 py-14
      md:pb-24 md:px-10
    "
    >
      <div
        className="flex flex-col justify-between items-start space-y-16
        lg:flex-row lg:space-y-0 lg:space-x-10 
      "
      >
        <p className="text-[0.75rem] text-black">
          A New Way{" "}
          <br className="lg:hidden"/>A New World
        </p>
        <h1 className="font-medium text-5xl text-start">
          Software Enginneering a new way to learn
        </h1>
        <p className="text-[0.75rem] text-black w-[70%] lg:w-[25%]">
          Delve into the world of Software Engineering at King Mongkut's
          Institute of Technology Ladkrabang, where innovation meets excellence.
        </p>
      </div>
    </section>
  );
};

export default Intro;
