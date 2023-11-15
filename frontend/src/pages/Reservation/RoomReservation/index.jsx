import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import { DefaultUserProfile } from "@/assets/images/Auth";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";
import PhoneIcon from "@mui/icons-material/Phone";


const RoomReservationSidebarData = [
  {
    id: 1,
    name: "Dashboard",
    icon: DashboardIcon,
    link: "/room-reservation",
  },
  {
    id: 2,
    name: "Create",
    icon: AddIcon,
    link: "/create/room-reservation",
  },
];

const RoomReservation = () => {
  const isTablet = useCheckScreenSize("tablet");
  return (
    <div className=" top-0 left-0 right-0 fixed flex flex-col">
      <div className="flex flex-row">
        {isTablet ? <SideBar /> : null}
        <div className="w-full">
          <div 
            className="px-7 pt-10 pb-6

          ">
            <h1 className="text-primary text-xl font-bold">Room Reservation</h1>
          </div>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;



const TitleBar = ({ title, date }) => {
  return (
    <div className="flex justify-between items-end pb-6">
      <h1 className="text-lg font-semibold  text-gray-500">{title}</h1>
      <p className="text-sm font-semibold">{date}</p>
    </div>
  );
};

const DashboardContent = () => {
  let content;
  if (location.pathname === "/room-reservation") {
    content = (
      <div className="flex flex-col w-full">
        <TitleBar title="Reserved" date="15 Nov, 2023" />
        <div
          className="reservation-list flex flex-col space-y-6 items-start
            md:flex-row md:justify-between md:space-x-6 md:space-y-0
          "
        >
          <div className="space-y-2 w-full">
            <ReservationCard
              firstName="John"
              lastName="Doe"
              phoneNumber="080-594-5005"
              yearOfStudy="2nd year"
              startTime="18:00"
              endTime="21:00"
              building="HM"
              roomID="806"
              reservationStatus="success"
            />
          </div>
          <div className="flex w-full">
            <BookingDetailsCard 
              building="HM"
              room="806"
              date="15 Nov, 2023"
              startTime="18:00"
              endTime="21:00"
              bookedBy="John Doe"
              showButton={false}
            />
          </div>
        </div>
      </div>
    );
  } else if (location.pathname === "/create/room-reservation") {
    content = (
      <div className="flex flex-col w-full">
        <TitleBar title="Create a Reservation" date="15 Nov, 2023" />
        <div
          className="reservation-list flex flex-col space-y-6 items-start
            md:flex-row md:justify-between md:space-x-6 md:space-y-0
          "
        >
          <div className="w-full space-y-2">
            <DateSelectionCard />
            <TimeSelectionCard />
            <MobileInputCard />
          </div>
          <div className="flex w-full">
            <BookingDetailsCard 
              
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex h-screen bg-[#e9ebef] rounded-t-[3rem] px-10 py-8 w-full
        md:rounded-tr-[0rem]
    ">
      {content}
    </div>
  );
};

const ReservationCard = ({
  firstName,
  lastName,
  phoneNumber,
  yearOfStudy,
  startTime,
  endTime,
  building,
  roomID,
  status,
  reservationStatus,
}) => {
  return (
    <div 
      className="flex justify-between px-8 py-6 rounded-xl bg-white"
    >
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
          <p className=" text-gray-600 font-semibold">{phoneNumber}</p>
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

const DateSelectionCard = () => {
  return (
    <div className="flex flex-col justify-start items-start bg-white px-5 py-6 rounded-xl">
      <h1 className=" font-semibold  text-black mb-3">
        Select Date <span className="text-gray-500">- November 2023</span>
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-primary px-6 py-3 rounded-md text-center">
          <p className="text-white">Fri</p>
          <span className="font-bold text-white">07</span>
        </button>
        <button className="bg-primary px-6 py-3 rounded-md text-center">
          <p className="text-white">Mon</p>
          <span className="font-bold text-white text-center">10</span>
        </button>
        <button className="bg-primary px-6 py-3 rounded-md text-center">
          <p className="text-white">Tue</p>
          <span className="font-bold text-white">11</span>
        </button>
      </div>
    </div>
  );
} 

const TimeSelectionCard = () => {
  return (
    <div className="flex flex-col justify-start items-start bg-white px-5 py-6 rounded-xl">
      <h1 className=" font-semibold  text-black mb-3">
        Select Time
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-primary px-6 py-3 rounded-md text-center">
          <p className="text-white">08 - 10 AM</p>
        </button>
        <button className="bg-primary px-6 py-3 rounded-md text-center">
          <p className="text-white">11 - 12 AM</p>
        </button>
        <button className="bg-primary px-6 py-3 rounded-md text-center">
          <p className="text-white">01 - 02 PM</p>
        </button>
      </div>
    </div>
  );
}; 

const MobileInputCard = () => {
  return (
    <div className="flex flex-row justify-start items-start bg-white px-5 py-6 rounded-xl">
      <div className="mr-5">
        <PhoneIcon />
      </div>
      <div>
        <h1 className=" font-semibold  text-black">Mobile Number</h1>
        <p className="   text-gray-500">
          Enter the number on which you which to reserve the room
        </p>
        <input
          type="text"
          className="w-full h-10 mt-3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};

const BookingDetailsCard = ({ building = "", room = "", date = "", startTime = "" , endTime = "",  bookedBy ="", showButton = true  }) => {
  return (
    <div className="flex flex-1 flex-col bg-[#fafafa] rounded-xl mb-40">
      <div className="flex flex-1 flex-col justify-start items-start bg-white px-5 py-6 rounded-xl rounded-b-[3rem]">
        <h1 className="font-semibold text-black">
          {!showButton && "My Latest "}Booking Details
        </h1>
        <hr className="w-full bg-gray-300 my-3" />
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-500">Building & Room</p>
            {building === "" || room === "" ? null : (
              <h1 className="font-semibold text-black">
                {building} - {room}
              </h1>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-500">Date & Time</p>
            {startTime === "" || endTime === "" || date === "" ? null : (
              <p className="font-semibold text-black">
                {startTime} - {endTime}, {date}
              </p>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-500">Booked by</p>
            {bookedBy === "" ? null : (
              <div className="w-fit px-3 py-1 pb-2 bg-red-200 text-center text-primary rounded-[3rem] mt-2">
                {bookedBy}
              </div>
            )}
          </div>
        </div>
      </div>
      {showButton ? (
        <div className="bg-[#fafafa] px-5 py-6 rounded-xl">
          <button
            className="text-center bg-primary text-white px-6 py-3 rounded-xl w-full hover:bg-gray-200 hover:scale-105 transition-all duration-300"
            onClick={() => alert("Room reserved successfully")}
          >
            Confirm
          </button>
        </div>
      ) : null}
    </div>
  );
};

const SideBar = () => {
  const getNavLinkClass = (isActive) => {
    return `flex flex-col justify-center items-center rounded-xl w-16 h-16 transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bg-primary text-white scale-110"
              : "bg-transparent text-gray-400 hover:bg-gray-200 hover:scale-105"
          }`;
  };

  return (
    <nav className="px-8 py-10 space-y-7 rounded-br-[3rem] ">
      <div className="w-16 h-16">
        <img src={SoftwareEngineeringLogo} alt="Logo" />
      </div>
      {RoomReservationSidebarData.map((item) => (
        <NavLink
          key={item.id}
          id={item.id}
          to={item.link}
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <item.icon />
        </NavLink>
      ))}
    </nav>
  );
};
