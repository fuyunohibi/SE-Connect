import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "@/assets/icons/NavigationIcon";

const NavigateBackButton = ({ useFixed = false, useAnimation = false, top, left, right, bottom, width = 12 , height = 12}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: useFixed ? "fixed" : "absolute",
        top: `${top}rem`,
        right: `${right}rem`,
        bottom: `${bottom}rem`,
        left: `${left}rem`,
      }}
      className={`${
        useFixed ? "fixed" : "absolute"
      }  bg-black bg-opacity-50 rounded-full w-${width} h-${height} flex justify-center items-center 
      ${
        useAnimation
          ? "hover:bg-button-hover hover:-translate-x-1  transition duration-500 ease-in-out"
          : "hover:bg-button-hover transition duration-500"
      } `}
      onClick={() => navigate(-1)}
    >
      <img
        src={BackIcon}
        alt="Back Icon"
        className="object-contain w-auto h-auto mr-[0.165rem]"
      />
    </div>
  );
};

export default NavigateBackButton;
