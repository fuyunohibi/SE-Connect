import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  AdmissionsIcon,
  NewsIcon,
  ConnectionsIcon,
  ProgramsIcon,
  ReservationIcon,
  CloseIcon,
  AboutIcon,
  BurgerIcon,
} from "@/assets/icons/Navbar";
import LoginModal from "@/components/global/Modals/LoginModal";
import { ArrowIcon } from "@/assets/icons/NavigationIcon";
import { KmitlDarkBackground } from '@/assets/images/Home';
import TransitionBurgerIconButton from "@/assets/icons/Navbar/TransitionBurgerIconButton";
import SELogo from '@/components/global/Logo';
import useCheckScreenSize from '@/hooks/useCheckScreenSize';
import { newsData } from "@/data";
import { NavLink } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { AuthContext } from "@/components/AuthProvider";
import { DefaultUserProfile } from '@/assets/images/Auth';

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
];


const Home = () => {
  const { authState } = useContext(AuthContext);
  const { userProfile } = useUserStore();

  const isLaptop = useCheckScreenSize('laptop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toggleLoginModal = () => {

    console.log("toggleLoginModal");
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const toggleLargeScreenModal = () => {
    console.log("toggleLargeScreenMenu");
    setIsMenuOpen(!isMenuOpen);
  }
  console.log("HELLO", userProfile.firstName);


  return (
    <section className="relative flex flex-1 flex-col h-screen p-4">
      <SELogo className="absolute left-0 right-0 lg:scale-125" />
      <TransitionBurgerIconButton onClick={toggleLargeScreenModal} />
      <img
        src={KmitlDarkBackground}
        alt="Home background"
        className="object-cover w-full h-full rounded-3xl "
      />
      <div className="absolute left-12 bottom-48 flex flex-col justify-center items-start text-white">
        <p className="text-[0.7rem] mb-5">International Program</p>
        <h1 className="text-[3rem] leading-[3.75rem] font-semibold mb-4">
          B.Eng. Software Engineering
        </h1>
        <p className="text-md">(International Program)</p>
      </div>
      {isLaptop && (
        <button
          className="absolute bottom-16 left-12 bg-white rounded-[3rem] p-6 hover:bg-button-hover transition duration-500 mb-10 textblack hover:text-white"
          onClick={toggleLoginModal}
        >
          {authState.isAuthenticated ? (
            <p className=" text-sm">Welcome back, {userProfile.firstName}!</p>
          ) : (
            <p className=" text-sm">Join the SE Family!</p>
          )}
          
        </button>
      )}
      {isLoginModalOpen ? <LoginModal onClose={toggleLoginModal} /> : null}
      {isMenuOpen && (
        <>
          <Navbar toggleMenu={toggleLargeScreenModal}  toggleLoginModal={toggleLoginModal}/>
          <LargeMenuModal
            onClick={toggleLargeScreenModal}
            onClose={toggleLargeScreenModal}
          />
        </>
      )}
    </section>
  );
};

const Navbar = ({ toggleMenu, toggleLoginModal }) => {
  const { authState } = useContext(AuthContext);
  const { userProfile } = useUserStore();

  return (
    <nav
      className="hidden fixed slide-from-top mx-12 bottom-9 left-0 right-0 bg-white px-3 py-2 text-white rounded-[3rem] shadow-md
      z-50 h-16
      sm:mx-32 md:block
      md:top-6 md:bottom-auto md:mx-5 md:h-18 md:rounded-[4rem]
      "
    >
      <button
        className="absolute left-2 flex 
          w-12 h-12 rounded-full 
          md:w-[3.25rem] md:h-[3.25rem] md:top-[0.375rem] p-1
        "
        onClick={toggleLoginModal}
      >
        <img
          src={
            authState.isAuthenticated ? userProfile.avatar : DefaultUserProfile
          }
          alt="My Profile"
          type="file"
          accept="image/*"
          className="object-contain w-full h-full"
        />
      </button>
      <SELogo className="absolute left-0 right-0 -top-[1rem] scale-75" />
      <button
        onClick={toggleMenu}
        className={`absolute right-2 flex justify-center items-center bg-black-background rounded-full
          hover:bg-button-hover transition duration-500 hover:rotate-90
          h-12 w-12 p-[0.95rem]
          md:w-[3.25rem] md:h-[3.25rem] md:top-[0.375rem] md:p-[1.25rem] `}
      >
        <img
          src={CloseIcon}
          alt="Close Icon"
          className="object-contain w-full h-full"
        />
      </button>
    </nav>
  );
};


const SmallMenuModal = ({ onClick, onClose }) => {
  const { authState } = useContext(AuthContext);

  const computedNavbarData = [
    ...NavbarData,
    ...(authState.isAuthenticated
      ? [
          {
            id: 8,
            name: "Reservation",
            icon: ReservationIcon,
            link: "/room-reservation",
          },
        ]
      : []),
  ];
  return (
    <div
      className="hidden fixed slide-from-bottom mx-12 bottom-9 left-0 right-0 bg-white px-3 py-2 text-white rounded-[2rem] shadow-md
      sm:mx-32 md:block"
    >
      <div className="flex flex-col">
        <div
          className="grid grid-cols-3 mx-auto content-between 
          gap-x-20 gap-y-5 pt-6 pb-10
          md:grid-cols-4 lg:gap-x-36
        "
        >
          {computedNavbarData.map((item) => (
            <NavLink
              key={item.id}
              id={item.id}
              to={item.link}
              className="flex flex-col justify-center items-center  rounded-full w-12 h-12"
              onClick={onClose}
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
         hover:bg-button-hover transition duration-500 hover:rotate-90
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

const LargeMenuModal = ({ onClick, onClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden fixed slide-from-top md:grid grid-cols-3 gap-x-3 mx-5 left-0 right-0 mb-auto top-24 px-3 py-3 bg-white h-72 shadow-md rounded-[2rem]">
        {newsData.map((news) => (
          <div className="relative flex flex-1 bg-black-background rounded-[1.75rem] aspect-w-16 aspect-h-9">
            <img
              src={news.image}
              alt="News Image"
              className="object-cover w-full h-full rounded-[1.75rem]"
            />
            <button
              className="absolute top-3 left-3 bg-button-black h-11 w-11 rounded-full p-4
             hover:bg-button-hover hover:translate-x-1 hover:translate-y-1 transition duration-500 ease-in-out"
              onClick={() => {
                navigate(`/news/${news.id}`);
                onClose();
              }}
            >
              <img
                src={ArrowIcon}
                alt="Arrow Icon"
                className="object-contain w-full h-full"
              />
            </button>
          </div>
        ))}
      </div>
      <SmallMenuModal
        onClick={onClick}
        onClose={onClose}
      />
    </>
  );
};

export default Home;