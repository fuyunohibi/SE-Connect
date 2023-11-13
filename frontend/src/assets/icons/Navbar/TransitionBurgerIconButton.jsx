import React, { useState } from "react";

const TransitionBurgerIconButton = ({ onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`absolute hidden md:flex justify-center items-center bg-white rounded-full
          hover:bg-button-hover transition duration-500 hover:rotate-90
          md:h-14 md:w-14 p-[0.95rem]
          md:top-8 md:left-8 md:p-[1.35rem] `}
    >
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "stroke 0.3s ease",
          stroke: hover ? "white" : "black",
        }}
      >
        <path
          d="M1 7H19M1 1H12.5M7.5 13H19"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default TransitionBurgerIconButton;
