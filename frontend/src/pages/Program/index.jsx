import React from 'react';
import { curriculum } from '@/assets/images/Program';

const Program = () => {
    return (
        <section className="flex flex-col justify-center items-center bg-white p-4 md:p-8 max-w-screen-xl mx-auto ">
            <p className="text-[2.45rem] leading-normal font-bold text-black">
                B.Eng. in Software Engineering Program
            </p>
            <p>The B.Eng. in Software Engineering Program is a 4-year undergraduate program 
                aiming at producing graduates who are capable of working confidently in the international 
                software industry as well as pursuing postgraduate study and research in leading universities worldwide. 
                The curriculum of the program is designed in accordance with the recent ACM/IEEE guideline for undergraduate 
                curriculum in software engineering.
            </p>
            <p className="text-[1.75rem] leading-normal font-bold text-black">Curriculum Overview - Study Plans</p>
            <img src={curriculum} alt="curriculum" />
        </section>
    );
};

export default Program;