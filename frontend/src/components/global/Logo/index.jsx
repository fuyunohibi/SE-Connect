import React from 'react';
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";

const SELogo = ({ className }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-34 ${className}`}
    >
      <div className="w-24 h-24 -mb-3">
        <img
          src={SoftwareEngineeringLogo}
          alt="Software Engineering Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h1>SE-Connect</h1>
    </div>
  );
};

export default SELogo;