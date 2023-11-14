import React from "react";
import { DefaultUserProfile } from "@/assets/images/Auth";

// import RoomMap from "./RoomMap";
// import AddReservationButton from "./AddReservationButton";

const RoomReservation = () => {
  return (
    <div className="flex  justify-between bg-[#e9ebef] md:px-16 md:py-10">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-6">Room Reservation</h1>
        <div className="relative bg-white shaodw-3xl drop-shadow-lg text-center w-36 py-2 rounded-lg text-black font-semibold">
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
      <div className="text-sm font-semibold mb-6">15 Nov, 2023</div>
    </div>
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
