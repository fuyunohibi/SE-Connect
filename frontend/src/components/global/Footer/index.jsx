import React from "react";
import KmitlLogo from "@/assets/icons/Logo/KmitlLogo.png";
import LoginModal from "@/components/global/Modals/LoginModal";

const Footer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const toggleLoginModal = () => {
    console.log("toggleLoginModal");
    setIsLoginModalOpen(!isLoginModalOpen);
  };
  return (
    <footer className="bg-neutral-gray p-8 rounded-3xl mx-4  text-black">
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
          <p className="font-medium">Contacts</p>
          <ul>
            <li>02-329-8000</li>
            <li>02-329-8321</li>
          </ul>
        </div>

        <div className="flex flex-col justify-start items-center space-y-8">
          <p className="font-medium">Follow us</p>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div className="flex flex-col justify-start items-center space-y-8">
          <p className="font-medium">Website</p>
        </div>
      </div>
      <div className="flex  w-full h-20 justify-start items-center mt-10 mb-16">
        <button 
          className="bg-black rounded-[3rem] h-full p-6 hover:bg-button-hover" 
          onClick={toggleLoginModal}
        >
          <p className="text-white text-sm">Join the SE Family</p>
        </button>
      </div>
      <div className="text-black text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-primary">Ko-Kwan Mongkholtham.</span> All Rights
        Reserved.
      </div>
      {isLoginModalOpen
        ? <LoginModal onClose={toggleLoginModal}/>
        : null
      }
    </footer>
  );
};

export default Footer;
