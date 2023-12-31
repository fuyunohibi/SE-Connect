import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import AddIcon from "@mui/icons-material/Add";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";
import LoginModal from "@/components/global/Modals/LoginModal";
import { NavLink } from "react-router-dom";
import { AuthContext } from "@/components/AuthProvider";
import useUserStore from "@/store/useUserStore";
import { useLocation } from "react-router-dom";

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
];

const Navbar = ({ onToggleModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTablet = useCheckScreenSize("tablet");
  const isNewsRoute = location.pathname.startsWith("/news");
  const isRoomReservationRoute = location.pathname.startsWith("/room-reservation");
  const isLockerReservationRoute = location.pathname.startsWith("/locker-reservation");
  const isNormalRoute = !isNewsRoute && !isRoomReservationRoute && !isLockerReservationRoute;


  const { authState } = useContext(AuthContext);
  const { userProfile } = useUserStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginModal = () => {
    console.log("toggleLoginModal");
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const computedNavbarData = [
    ...NavbarData,
    ...(authState.isAuthenticated
      ? [
          {
            id: 7,
            name: "Locker Reservation",
            icon: ReservationIcon,
            link: "/locker-reservation",
          },
          {
            id: 8,
            name: "Room Reservation",
            icon: ReservationIcon,
            link: "/room-reservation",
          },
        ]
      : []),
  ];

  const handleNavigateToCreateRoomReservation = () => {
    navigate("/create/room-reservation");
  }

  const handleToggleModal = () => {
    if (isNewsRoute) {
      onToggleModal();
    } else if (isRoomReservationRoute) {
      handleNavigateToCreateRoomReservation();
    } else {
      toggleMenu();
    }
  };

  return (
    <nav
      className={`fixed mx-12 bottom-9 left-0 right-0 bg-white px-3 py-2 text-white rounded-[3rem] shadow-md
        z-50 h-14
        sm:mx-32 
        md:mx-56
        md:h-20
        lg:mx-80
        xl:mx-96
      ${isNewsRoute ? "md:block" : ""}
      ${isLockerReservationRoute ? "md:block lg:block xl:block" : ""}
      ${isTablet ? "block" : ""}
      ${isNormalRoute ? "md:hidden lg:hidden xl:hidden" : ""}
      `}
    >
      <button
        className={`absolute top-1 left-2 p-1 flex  rounded-full 
          ${
            authState.isAuthenticated
              ? "w-12 h-12 md:top-[0.35rem] md:h-[4.3rem] md:w-[4.3rem]"
              : "h-[3rem] w-[5rem] left-[0rem] md:h-[3rem] md:w-[5rem] md:top-[1rem] md:left-[0.35rem]"
          }
        `}
        onClick={toggleLoginModal}
      >
        <img
          src={
            authState.isAuthenticated
              ? `http://localhost:8000/${userProfile.avatar.replace(
                  /\\/g,
                  "/"
                )}`
              : SoftwareEngineeringLogo
          }
          alt="Logo"
          className={`rounded-full w-full h-full object-cover ${
            authState.isAuthenticated ? "scale-110" : "scale-75  md:scale-90 "
          }`}
        />
      </button>
      <button
        onClick={handleToggleModal}
        className={`absolute right-2 flex justify-center top-1  items-center bg-black-background rounded-full
          hover:bg-button-hover transition duration-500 hover:rotate-90
          h-12 w-12 p-[0.95rem]
          md:w-[4.25rem] md:h-[4.25rem] md:top-[0.375rem] md:p-[1.25rem]
          `}
      >
        {isMenuOpen ? (
          <img
            src={CloseIcon}
            alt="Close Icon"
            className="object-contain w-full h-full"
          />
        ) : isNewsRoute || isRoomReservationRoute ? (
          <AddIcon style={{ color: "white", fontSize: "1.5rem" }} />
        ) : (
          <img
            src={BurgerIcon}
            alt="Burger Icon"
            className="object-contain w-full h-full"
          />
        )}
      </button>
      {isMenuOpen && (
        <SmallMenuModal
          onClick={toggleMenu}
          onClose={toggleMenu}
          navbarData={computedNavbarData}
        />
      )}
      {isLoginModalOpen ? <LoginModal onClose={toggleLoginModal} /> : null}
    </nav>
  );
};

const SmallMenuModal = ({ onClick, onClose, navbarData }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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
          {navbarData.map((item) => (
            <NavLink
              key={item.id}
              id={item.id}
              to={item.link}
              className="flex flex-col justify-center items-center  rounded-full w-12 h-12"
              onClick={() => {
                onClose(); // Close the menu
                scrollToTop(); // Scroll to the top
              }}
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

export default Navbar;
