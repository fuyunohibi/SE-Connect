import React from "react";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import { DefaultUserProfile } from "@/assets/images/Auth";
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
import { NavLink } from "react-router-dom";

// import RoomMap from "./RoomMap";
// import AddReservationButton from "./AddReservationButton";

const RoomReservationSidebarData = [
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

const RoomReservation = () => {
  return (
    <>
      <SideBar />
      <TitleBar />
      <div className="flex bg-white ml-32">
        <Dashboard />
      </div>
    </>
  );
};
const TitleBar = () => {
  return (
    <nav className="fixed z-10 w-[100%] pl-12 pt-10 pb-5 pr-[10.5rem] flex justify-between items-start top-0 left-32 right-0 bg-white">
      <h1 className="text-primary text-xl font-bold">Room Reservation</h1>
      <div className="flex space-x-3">
        <p className="text-sm font-semibold ">Hello, John</p>
        <div className="rounded-full h-12 w-12 -mt-3">
          <img src={DefaultUserProfile} alt="User Profile" />
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  return (
    <div className="flex bg-[#e9ebef] rounded-tl-[3rem] px-10  py-10 mt-24 w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-[52rem] mb-6">
          <h1 className="text-xl font-semibold  text-gray-500">Reserved</h1>
          <p className="text-sm font-semibold">15 Nov, 2023</p>
        </div>
        <div className="relative z-0 bg-white shaodw-3xl drop-shadow-lg text-center w-36 py-2 rounded-lg text-black font-semibold">
          Confirm
          <span className="absolute bottom-0 left-14 bg-primary w-7 h-1"></span>
        </div>
        <div className="flex flex-col space-y-2 mt-5">
          <ReservationCard
            firstName="John"
            lastName="Doe"
            mobileNo="080-594-5005"
            yearOfStudy="2nd year"
            startTime="18:00"
            endTime="21:00"
            building="HM"
            roomID="806"
            reservationStatus="Active"
          />
          <ReservationCard
            firstName="John"
            lastName="Doe"
            mobileNo="080-594-5005"
            yearOfStudy="2nd year"
            startTime="18:00"
            endTime="21:00"
            building="HM"
            roomID="806"
            reservationStatus="Active"
          />
          <ReservationCard
            firstName="John"
            lastName="Doe"
            mobileNo="080-594-5005"
            yearOfStudy="2nd year"
            startTime="18:00"
            endTime="21:00"
            building="HM"
            roomID="806"
            reservationStatus="Active"
          />
        </div>
      </div>
    </div>
  );
};

const SideBar = () => {
  return (
    <nav className="fixed h-[100%] px-8 py-10  space-y-7">
      <div className="w-16 h-16">
        <img src={SoftwareEngineeringLogo} alt="Logo" />
      </div>
      {RoomReservationSidebarData.map((item) => (
        <NavLink
          key={item.id}
          id={item.id}
          to={item.link}
          className="flex flex-col justify-center items-center rounded-xl w-16 h-16 bg-primary"
          // onClick={onClose}
        ></NavLink>
      ))}
    </nav>
  );
};

const ReservationCard = ({
  firstName,
  lastName,
  mobileNo,
  yearOfStudy,
  startTime,
  endTime,
  building,
  roomID,
  reservationStatus,
}) => {
  return (
    <div className="flex justify-between w-[36rem] pr-28 px-8 py-6  rounded-xl bg-white">
      <div>
        <p className="text-gray-500 font-semibold">Name</p>
        <div className="flex justify-between space-x-4 mt-4">
          <div className="rounded-full h-12 w-12 ">
            <img src={DefaultUserProfile} alt="User Profile" />
          </div>
          <div>
            <p className="text-black font-semibold">
              {firstName} {lastName}
            </p>
            <p className=" text-gray-600 font-semibold">{yearOfStudy}</p>
          </div>
        </div>
        <div className="space-y-3 mt-10">
          <p className="text-gray-500 font-semibold">Mobile no</p>
          <p className=" text-gray-600 font-semibold">{mobileNo}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <p className="text-gray-500 font-semibold">Time/place</p>
          <p className="mt-4 text-black font-semibold">
            {startTime} - {endTime}
          </p>
          <p className="text-gray-500 font-semibold">
            {building}-{roomID}
          </p>
        </div>

        <div className="space-y-3 mt-10">
          <p className="text-gray-500 font-semibold">Status</p>
          <div className="bg-[#f0fcee] text- px-5 py-2 rounded-lg text-center">
            <p className=" text-[#9ce3a4] font-semibold">{reservationStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;
