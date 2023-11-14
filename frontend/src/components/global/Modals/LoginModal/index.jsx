import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { AuthContext } from "@/components/AuthProvider";
import Authentication from "@/lib/api/authentication";

const LoginModal = ({ onClose }) => {
  const { authState, logout } = useContext(AuthContext);
  const { UserProfile } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    // console.log("Logging out: ", UserProfile.email); 
    Authentication.logout("65011338@kmitl.ac.th")
      .then((response) => {
        console.log(response.message);
        
        onClose();
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div
      className=" fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="slide-from-bottom fixed bottom-0 left-0 right-0 flex flex-col justify-end items-center 
        px-11 pb-11 pt-5 rounded-t-[3rem] bg-white"
      >
        {!authState.isAuthenticated ? (
          <div className="flex flex-col justify-end items-center  space-y-4 w-full">
            <button
              className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-button-hover transition duration-500"
              onClick={() => navigate("/auth/login/identifier")}
            >
              <p className="text-white">Log In</p>
            </button>
            <button
              className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-button-hover transition duration-500"
              onClick={() => navigate("/auth/signup/identifier")}
            >
              <p className="text-white">Sign Up</p>
            </button>
          </div>
        ) : (
          <button
            className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-button-hover transition duration-500"
            onClick={handleLogout}
          >
            <p className="text-white">Log Out</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
