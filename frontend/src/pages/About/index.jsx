import React from "react";


const cardData = [
  {
    id: 1,
    title: "What is Software Engineering?",
    content:
      "Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science in order to produce efficient and reliable software with the available resources.",
  },
  {
    id: 3,
    title: "Job Opportunities: Careers in Software Engineering",
    content:
      "Software engineers, software architects, and software developers on various platforms, including enterprise software, web applications, mobile applications, games, embedded applications, etc.",
  },
  {
    id: 4,
    title: "Why study Software Engineering?",
    content:
      "Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science in order to produce efficient and reliable software with the available resources.",
  },
];

const About = () => {
  return (
    <section className="flex flex-col justify-center items-center bg-white p-4 md:p-8 max-w-screen-xl mx-auto ">
      <div
        className="grid grid-cols-3 gap-4 w-full h-[34rem] 
        md:grid-cols-4 
      "
      >
        {/* Black Box */}
        <div
          className="flex bg-black-background rounded-3xl p-4 col-span-2 row-span-3 relative
          md:row-end-4 md:col-span-1 z-0
        "
        >
          <div className="flip-container">
            <div className="flip-card-front">
              <p className="text-cream font-normal">
                What is Software
                <br />
                Engineering?
              </p>
            </div>
            <div className="flip-card-back bg-gray-400 w-full h-full rounded-3xl py-4">
              {/* <p className="text-white font-normal">
                Software engineering (SE) is an engineering discipline
                concerning all aspects of software production, including
                software analysis, design, development, testing, and deployment.
                SE requires profound abstract and logical thinking and the
                application of mathematics, logic, and computer science in order
                to produce efficient and reliable software with the available
                resources.
              </p> */}
            </div>
          </div>
        </div>

        {/* Blue Box */}
        <div
          className="flex bg-card-blue rounded-3xl p-4 md:col-span-1 relative z-0
          md:row-end-4
        "
        >
          <div className="flip-container">
            <div className="flip-card-front"></div>
            <div className="flip-card-back bg-gray-400 w-full h-full rounded-3xl py-4"></div>
          </div>
        </div>

        {/* Cream Box */}
        <div
          className="flex bg-cream rounded-3xl p-4 row-span-2 md:col-span-1 relative z-0
          md:row-end-4
        "
        >
          <div className="flip-container">
            <div className="flip-card-front">
              <p className="text-cream-text font-normal">
                Job Opportunities: Careers
                <br />
                in Software Engineering
              </p>
            </div>
            <div className="flip-card-back bg-gray-400 w-full h-full rounded-3xl py-4">
              {/* <p className="text-black font-normal">
                Software engineers, architects, and developers specializing in
                enterprise, web, mobile, gaming, and embedded platforms.
              </p> */}
            </div>
          </div>
        </div>

        {/* Red Box */}
        <div
          className="flex bg-primary rounded-3xl p-4 col-span-3  md:col-span-1 relative z-0
          md:row-end-4
        "
        >
          <div className="flip-container">
            <div className="flip-card-front">
              <p className="text-white font-normal">
                Why study Software
                <br />
                Engineering?
              </p>
            </div>
            <div className="flip-card-back bg-gray-400 w-full h-full rounded-3xl py-4">
              {/* <p className="text-black font-normal">
                It is hard to overstate the ubiquity of software nowadays. Every
                computer system is governed by software. Almost every human
                activity involves software in some form. Undoubtedly software
                industry is one of the largest and fastest growing industries in
                the world. Consequently, skilled software engineers are in high
                demand worldwide. As software becomes more and more complex, the
                programming skills and the rudimentary knowledge of software
                engineering that students obtained from traditional computer
                science and computer engineering curriculums are insufficient.
                The development of real-world software applications requires the
                skills in analysing the problem domain and the customer’s
                requirement and the skills in designing the software from the
                topmost level down to the implementation level. Moreover, a
                software engineer must be able to use proper tools, techniques,
                and methodologies in order to produce the software in an
                efficient manner.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


