import React from "react";
import { useNavigate } from "react-router-dom";
import KmitlLogo from "@/assets/icons/Logo/KmitlLogo.png";
import LoginModal from "@/components/global/Modals/LoginModal";
import { ArrowUpIcon } from "@/assets/icons/NavigationIcon";

const Footer = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const toggleLoginModal = () => {
    console.log("toggleLoginModal");
    setIsLoginModalOpen(!isLoginModalOpen);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-neutral-gray pt-8 px-8 pb-6 rounded-3xl mx-4  text-black">
      {/* Logo or Brand Name */}
      <div className="flex flex-col items-start justify-center mb-10 space-y-5 ">
        <div className="w-32 h-32 rounded-full -ml-3">
          <img
            src={KmitlLogo}
            alt="KMITL Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-xl font-medium text-start">
          King Mongkut's{<br />}Institute of Technology Ladkrabang
        </h1>
      </div>

      {/* Footer Links */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col justify-start items-start space-y-8">
          <p className="text-sm font-medium text-black">Contacts</p>
          <ul>
            <ul className="text-[0.65rem] text-black mb-5">
              The start of your
              <br />
              journey begins here.
            </ul>
            <li className="text-md font-medium text-black hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out">
              02-329-8000
            </li>
            <li className="text-md font-medium text-black hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out">
              02-329-8321
            </li>
            <li className="text-[0.65rem] text-black mb-5">
              Questions and suggestions
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-start items-center space-y-8 -ml-5">
          <p className="text-sm font-medium text-black mr-6">Follow us</p>
          <ul className="space-y-3">
            <a
              className="text-[0.8rem] font-normal -mt-[0.25rem] flex items-center hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out"
              href="https://www.facebook.com/KMITL.SIIE/?locale=th_TH"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
              <span className="ml-4">
                <img
                  src={ArrowUpIcon}
                  className="w-[0.625rem] h-[0.625rem]"
                  alt="Arrow Up Icon"
                />
              </span>
            </a>
            <a
              className="text-[0.8rem] font-normal flex items-center  hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out"
              href="https://www.instagram.com/se_kmitl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
              <span className="ml-4">
                <img
                  src={ArrowUpIcon}
                  className="w-[0.625rem] h-[0.625rem]"
                  alt="Arrow Up Icon"
                />
              </span>
            </a>
          </ul>
        </div>

        <div className="flex flex-col justify-start items-center space-y-8 mr-5">
          <ul className="space-y-3">
            <li
              className="text-[0.8rem] font-normal hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out"
              onClick={() => {
                navigate("/");
                scrollToTop();
              }}
            >
              Home
            </li>
            <li
              className="text-[0.8rem] font-normal hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out"
              onClick={() => {
                navigate("/about")
                scrollToTop();
              }}
            >
              About us
            </li>
            <li
              className="text-[0.8rem] font-normal hover:translate-x-1 hover:underline hover:-translate-y-1 transition duration-500 ease-in-out"
              onClick={() => {
                navigate("/programs")
                scrollToTop();
              }}
            >
              Programs
            </li>
          </ul>
        </div>
      </div>
      <button
        className="bg-black-background rounded-[3rem] h-full p-6 hover:bg-button-hover transition duration-500 mb-10"
        onClick={toggleLoginModal}
      >
        <p className="text-white text-sm">Join the SE Family</p>
      </button>
      <div className="text-black text-[0.65rem]">
        © {new Date().getFullYear()}{" "}
        <span className="text-primary">Mesan Tech.</span> All Rights
        Reserved.
      </div>
      {isLoginModalOpen ? <LoginModal onClose={toggleLoginModal} /> : null}
    </footer>
  );
};

export default Footer;
