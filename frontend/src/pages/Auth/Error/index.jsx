import React from 'react';
import { useNavigate } from 'react-router-dom';
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";

const AuthError = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex w-full justify-center items-center h-8  mt-10">
        <img
          src={SoftwareEngineeringLogo}
          alt="Software Engineering Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h4>Oops!</h4>
      <p>
        You tried signing in with a different authentication method than the one
        you used during signup. Please try again using your original
        authentication method.
      </p>
      <button
        className="mt-3 bg-black-background rounded-[3rem]  h-full w-full p-6 hover:bg-button-hover transition duration-500"
        onClick={() => navigate("/auth/login")}
      >
        Go back
      </button>
    </div>
  );
};

export default AuthError;