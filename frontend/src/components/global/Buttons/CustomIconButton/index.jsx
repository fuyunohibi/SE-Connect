import React from 'react';

const CustomIconButton = ({ icon, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        `flex justify-center items-center bg-black-background rounded-full
        hover:bg-button-hover 
          h-12 w-12 p-[1.1rem]
          md:h-16 md:w-16 md:p-[1.4rem] 
          ${className}`
      }
    >
      <img
        src={icon}
        alt={icon}
        className="object-contain w-full h-full"
      />
    </button>
  );
};

export default CustomIconButton;