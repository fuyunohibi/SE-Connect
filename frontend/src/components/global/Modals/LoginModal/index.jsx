import React, { useState, useEffect, useRef } from "react";
import { CloseIcon } from "@/assets/icons/Navbar";
import { CustomIconButton } from "@/components/global/Buttons";

const SignupContent = () => {
  const [modalContent, setModalContent] = useState("signup1");
  const [email, setEmail] = useState("");

  const handleChangeModalContent = (content) => {
    setModalContent(content);
  }

  const handleChangeEmail = (mail) => {
    setEmail(mail);
  }
  
  return (
    <>{modalContent === "signup2" ? <SignupContent2 currentModalContent={handleChangeModalContent} currentEmail={email}/> : modalContent === "signup3" ? <SignupContent3 /> : <SignupContent1 currentModalContent={handleChangeModalContent} currentEmail={handleChangeEmail}/>}</>
  );
};

const SignupContent1 = ({ currentModalContent, currentEmail }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  useEffect(() => {
    console.log(email);
  }, [email])

  return (
    <div className="flex flex-col justify-start items-center space-y-10 w-full h-full mt-5 ">
      <div className="flex justify-between items-end w-full">
        <div>
          <h1 className="text-black font-black text-3xl mb-0">Create</h1>
          <h1 className="text-black font-black text-3xl">Your Account</h1>
        </div>
      </div>
      <form className="flex flex-col justify-center items-start w-full mt-12">
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Email address
        </label>
        <input
          onChange={handleEmailChange}
          type="text"
          id="email"
          placeholder="Email address"
          className="text-black pl-4 pr-16 py-3 w-full rounded-l border-2 border-disabled focus:ring-0 mb-5"
        />

        <button
          className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-primary transition duration-300"
          onClick={() => {
            currentModalContent("signup2");
            currentEmail(email);
          }}
        >
          <p className="text-white">Continue</p>
        </button>
      </form>
    </div>
  );
};


const SignupContent2 = ({ currentModalContent, currentEmail }) => {
  return (
    <div className="flex flex-col justify-start items-center space-y-10 w-full h-full mt-5 ">
      <div className="flex justify-between items-end w-full">
        <div>
          <h1 className="text-black font-black text-3xl mb-0">Create</h1>
          <h1 className="text-black font-black text-3xl">Your Account</h1>
        </div>
      </div>
      <form className="flex flex-col justify-center items-start w-full mt-12">
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Email address
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="email"
            value={currentEmail}
            className="text-black pl-4 pr-16 py-3 w-full rounded-l border-2 border-disabled focus:ring-0 mb-2"
          />
          <span className="absolute bottom-2 inset-y-0 right-0 flex items-center pr-4 text-status-success">
            Edit
          </span>
        </div>

        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Password
        </label>
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="text-black w-full px-4 py-3 rounded-l border-2 border-disabled focus:ring-0 mb-8 "
        />

        <button
          className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-primary transition duration-300"
          onClick={() => currentModalContent("signup3")}
        >
          <p className="text-white">Continue</p>
        </button>
      </form>
    </div>
  );
};

const SignupContent3 = ({ currentModalContent }) => {
  return (
    <div className="flex flex-col justify-start items-center space-y-10 w-full h-full mt-5 ">
      <div className="flex justify-between items-end w-full">
        <div>
          <h1 className="text-black font-black text-3xl mb-0">Finish</h1>
          <h1 className="text-black font-black text-3xl">Your Account</h1>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="h-16 w-16 rounded-full border-2 border-primary"></div>
          <p className="text-gray-500 text-sm font-medium">Upload picture</p>
        </div>
      </div>
      <form className="flex flex-col justify-center items-start w-full mt-12">
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          KMITL ID
        </label>
        <input
          type="text"
          id="kmitl id"
          placeholder="ID"
          className="text-black w-full px-4 py-3 rounded-l border-2 border-disabled focus:ring-0  mb-2"
        />
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Year
        </label>
        <input
          type="select"
          id="year"
          placeholder="Year"
          className="text-black w-full px-4 py-3 rounded-l border-2 border-disabled focus:ring-0 mb-2 "
        />
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Faculty
        </label>
        <input
          type="select"
          id="faculty"
          placeholder="Faculty"
          className="text-black w-full px-4 py-3 rounded-l border-2 border-disabled focus:ring-0 mb-2 "
        />
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Department
        </label>
        <input
          type="select"
          id="department"
          placeholder="Department"
          className="text-black w-full px-4 py-3 rounded-l border-2 border-disabled focus:ring-0 mb-8 "
        />
        <button
          className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-primary transition duration-300"
          onClick={() => currentModalContent("SignupContentFinal")}
        >
          <p className="text-white">Continue</p>
        </button>
      </form>
    </div>
  );
};

const LoginContent = ({ currentModalContent }) => {
  return (
    <div className="flex flex-col justify-start items-center space-y-10 w-full h-full mt-5 ">
      <div className="flex justify-between items-end w-full">
        <div>
          <h1 className="text-black font-black text-3xl mb-0">Welcome</h1>
          <h1 className="text-black font-black text-3xl">Back</h1>
        </div>
      </div>
      <form className="flex flex-col justify-center items-start w-full mt-12">
        <label className="text-gray-500 text-sm font-medium" htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          id="email"
          placeholder="Email address"
          className="text-black pl-4 pr-16 py-3 w-full rounded-l border-2 border-disabled focus:ring-0 mb-5"
        />

        <button
          className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-primary transition duration-300"
          onClick={() => {}}
        >
          <p className="text-white">Continue</p>
        </button>

        <div className="flex justify-center items-center w-full mt-5">
          <p className="text-black text-sm">
            Don't have an account?{" "}
            <span
              className="text-status-success"
              onClick={() => setModalContent("signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

const LoginModal = ({ onClose }) => {
  const [modalContent, setModalContent] = useState("");

  const handleCloseContent = () => {
    setModalContent("");
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // NOTE: Prevent the click event from bubbling up to the overlay
  };

  const handleChangeModalContent = (content) => {
    setModalContent(content);
  }

  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="fixed bottom-0 left-0 right-0 flex flex-col justify-end items-center 
        px-11 pb-11 rounded-t-[3rem] bg-white"
        onClick={handleModalClick}
      >
        {modalContent === "signup" && <SignupContent />}
        {modalContent === "login" && <LoginContent />}
        {/* {modalContent && (
          <CustomIconButton
            icon={CloseIcon}
            className="absolute top-6 right-6"
            onClick={handleCloseContent}
          />
        )} */}

        <div className="flex flex-col justify-end items-center mt-5 space-y-4 w-full">
          {modalContent === "login" || modalContent === "signup" ? null : (
            <>
              <button
                className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-primary transition duration-300"
                onClick={() => setModalContent("login")}
              >
                <p className="text-white">Log In</p>
              </button>
              <button
                className="flex justify-center items-center py-4 w-full bg-black-background rounded-full hover:bg-primary transition duration-300"
                onClick={() => setModalContent("signup")}
              >
                <p className="text-white">Sign up</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
