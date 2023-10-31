import React, { useState } from "react";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import {
  BurgerIcon,
  HomeIcon,
  AdmissionsIcon,
  NewsIcon,
  ConnectionsIcon,
  ProgramsIcon,
  ReservationIcon,
  CloseIcon,
  AboutIcon,
} from "@/assets/icons/Navbar";
import { newsData } from "@/data";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";
import LoginModal from "@/components/global/Modals/LoginModal";
import { NavLink } from "react-router-dom";

const NavbarData = [
  {
    id: 1,
    name: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    id: 2,
    name: "About",
    icon: AboutIcon,
    link: "/about",
  },
  {
    id: 3,
    name: "Programs",
    icon: ProgramsIcon,
    link: "/programs",
  },
  {
    id: 4,
    name: "Admissions",
    icon: AdmissionsIcon,
    link: "/admissions",
  },
  {
    id: 5,
    name: "Connections",
    icon: ConnectionsIcon,
    link: "/connections",
  },
  {
    id: 6,
    name: "News",
    icon: NewsIcon,
    link: "/news",
  },
  {
    id: 7,
    name: "Events",
    icon: HomeIcon,
    link: "/events",
  },
  {
    id: 8,
    name: "Reservation",
    icon: ReservationIcon,
    link: "/reservation",
  },
];

const Navbar = () => {
  const isLaptop = useCheckScreenSize("laptop");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginModal = () => {
    console.log("toggleLoginModal");
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  console.log("isLaptop:", isLaptop);
  console.log("isMenuOpen:", isMenuOpen);

  return (
    <nav
      className="fixed mx-12 bottom-9 left-0 right-0 bg-white px-3 py-2 text-white rounded-[3rem] shadow-md
      z-50 h-16
      sm:mx-32 
      md:top-2 md:bottom-auto md:mx-5 md:h-20 md:rounded-[2rem]"
    >
      <button
        className="absolute left-3 flex 
          w-12 h-12 rounded-full
          md:w-16 md:h-16 bg-black-background
        "
        onClick={toggleLoginModal}
      >
        <img
          src={SoftwareEngineeringLogo}
          alt="Logo"
          className="object-contain w-full h-full"
        />
      </button>
      <button
        onClick={toggleMenu}
        className={`absolute right-3 flex justify-center items-center bg-black-background rounded-full
          hover:bg-button-hover
          h-12 w-12 p-[0.95rem]
          md:h-16 md:w-16  ${
            isLaptop && isMenuOpen ? "md:p-[1.5rem]" : "md:p-[1.4rem]"
          }`}
      >
        <img
          src={isLaptop && isMenuOpen ? CloseIcon : BurgerIcon}
          alt="Burger Icon"
          className="object-contain w-full h-full"
        />
      </button>
      {isLaptop
        ? isMenuOpen && <LargeMenuModal />
        : isMenuOpen && <SmallMenuModal onClick={toggleMenu} />}
      {isLoginModalOpen ? <LoginModal onClose={toggleLoginModal} /> : null}
    </nav>
  );
};

const SmallMenuModal = ({ onClick }) => {
  return (
    <div
      className="fixed slide-from-bottom mx-12 bottom-9 left-0 right-0 bg-white px-3 py-2 text-white rounded-[2rem] shadow-md
      sm:mx-32 "
    >
      <div className="flex flex-col">
        <div
          className="grid grid-cols-3 mx-auto content-between 
          gap-x-20 gap-y-5 pt-6 pb-10
          md:grid-cols-4 lg:gap-x-36
        "
        >
          {NavbarData.map((item) => (
            <NavLink
              key={item.id}
              id={item.id}
              to={item.link}
              className="flex flex-col justify-center items-center  rounded-full w-12 h-12 "
            >
              <p
                className={"text-black font-medium text-center hover:underline"}
              >
                {item.name}
              </p>
            </NavLink>
          ))}
        </div>
        <button
          onClick={onClick}
          className="absolute right-3 bottom-2 flex justify-center items-center bg-black-background rounded-full
        hover:bg-button-hover
          h-12 w-12 p-[1.1rem]
          md:h-16 md:w-16 md:p-[1.4rem] md:hidden"
        >
          <img
            src={CloseIcon}
            alt="Close Icon"
            className="object-contain w-full h-full"
          />
        </button>
      </div>
    </div>
  );
};

const LargeMenuModal = ({ onClick }) => {
  return (
    <>
      <div className="fixed slide-from-top grid grid-cols-3 gap-x-3 mx-5 left-0 right-0 mb-auto top-24 px-3 py-3 bg-white h-64 shadow-md rounded-[2rem]">
        {newsData.map((news) => (
          <div className="relative flex flex-1 bg-black-background rounded-[1.75rem] aspect-w-16 aspect-h-9">
            <img
              src={news.image}
              alt="News Image"
              className="object-cover w-full h-full rounded-[1.75rem]"
            />
            <button className="absolute bottom-4 left-4 bg-button-black h-11 w-11 rounded-full p-4 hover:bg-button-hover"></button>
          </div>
        ))}
      </div>
      <SmallMenuModal onClick={onClick} />
    </>
  );
};

export default Navbar;
