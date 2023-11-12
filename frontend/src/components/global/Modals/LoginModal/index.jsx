import React from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="fixed bottom-0 left-0 right-0 flex flex-col justify-end items-center 
        px-11 pb-11 rounded-t-[3rem] bg-white"
      >
        <div className="flex flex-col justify-end items-center mt-5 space-y-4 w-full">
          <button
            className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-button-hover transition duration-500"
            onClick={() => navigate("/login")}
          >
            <p className="text-white">Log In</p>
          </button>
          <button
            className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-button-hover transition duration-500"
            onClick={() => navigate("/signup")}
          >
            <p className="text-white">Sign up</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
