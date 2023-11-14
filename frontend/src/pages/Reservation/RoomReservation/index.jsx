import React from "react";
import Dashboard from "./Dashboard";
import RoomMap from "./RoomMap";
import AddReservationButton from "./AddReservationButton";

const RoomReservation = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Dashboard />
      <RoomMap />
      <AddReservationButton />
    </div>
  );
};

export default RoomReservation;
