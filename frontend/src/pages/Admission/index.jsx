import React from 'react';

const Admission = () => {
  return (
    <section className="flex flex-col justify-center items-center bg-white p-4 md:p-8 max-w-screen-xl mx-auto">
      <p className="text-[2.45rem] leading-normal font-bold text-black mb-6">
        Direct Admission
      </p>
      <iframe
        title="Admission PDF"
        src="https://reg.kmitl.ac.th/TCAS_old/news/files/2567_1_news1_3018_2023_10_20-21-17-53_f70b5.pdf"
        width="100%"
        height="600px"
      />
    </section>
  );
};

export default Admission;
