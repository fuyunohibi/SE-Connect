import React from 'react';
import { Glasgow } from '@/assets/images/Connection';

const Connection = () => {
    const externalLink = 'https://www.gla.ac.uk/';

    const handleDivClick = () => {
        // Open the external link in a new tab/window
        window.open(externalLink, '_blank');
    };

    return (
        <section
            className="flex flex-col justify-center items-center bg-white p-4 md:p-8 max-w-screen-xl mx-auto"
        >
            <p className="text-[2.45rem] leading-normal font-bold text-black">
                Connection
            </p>
            <div className="flex items-center mt-6" onClick={handleDivClick} style={{ cursor: 'pointer' }}>
                <img src={Glasgow} alt="Glasgow" className="h-20" />
                <p className="text-[1.75rem] leading-normal font-bold text-black">
                    University of Glasgow
                </p>
            </div>
        </section>
    );
};

export default Connection;
