import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import LockerBooking from "@/lib/api/lockerBooking.js";
import { CreateLockerReservation } from "@/pages";
import { useQuery, useQueryClient } from "react-query";


const LockerReservation = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-full">
          <div className="px-7 pt-10 pb-6">
            <h1 className="text-primary text-xl font-bold">
              Locker Reservation
            </h1>
          </div>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

const DashboardContent = () => {

  const queryClient = useQueryClient();

  const [hoveredLocker, setHoveredLocker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLockerID, setSelectedLockerID] = useState("");

  const {
    data: lockerData,
    isError,
    error,
    isFetching,
  } = useQuery("allLockerReservation", LockerBooking.getAllLockerReservation);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching locker:", error);
    }
  }, [isError, error]);

  const refetchLockerData = () => {
    queryClient.invalidateQueries("allLockerReservation");
  };

  useEffect(() => {
    refetchLockerData();
  }, []);

  const handleToggleCreateLockerReservationModal = (lockerID, status) => {
    console.log("received lockerID:", lockerID);
    setSelectedLockerID(lockerID);
    setIsModalOpen(!isModalOpen);
  };

  if (isFetching) {
    return <div>Loading lockers...</div>; 
  }

  if (isError) {
    return <div>Error fetching lockers: {error.message}</div>;
  }

  if (!lockerData || lockerData.length === 0) {
    return <div>No lockers available</div>; 
  }

  return (
    <div className="flex bg-primary rounded-t-[3rem] px-10 py-8 w-full">
      <div
        className="grid grid-cols-4 gap-4 w-full
        md:grid-cols-3 md:gap-6
        lg:grid-cols-4 lg:gap-8
        xl:grid-cols-5 xl:gap-10
      "
      >
        {lockerData.map((locker) => (
          <LockerComponent
            lockerID={locker.lockerID}
            status={locker.status}
            setHoveredLocker={setHoveredLocker}
            handleClick={handleToggleCreateLockerReservationModal}
          />
        ))}
      </div>
      {isModalOpen && (
        <CreateLockerReservation
          lockerID={selectedLockerID}
          onClose={handleToggleCreateLockerReservationModal}
        />
      )}
    </div>
  );
};

export default LockerReservation;



const LockerComponent = ({ lockerID, status, handleClick }) => {
  const tooltipContent = (
    <div>
      <p>Locker ID: {lockerID}</p>
      <p>Status: {status}</p>
      {/* Add more information as needed */}
    </div>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement="top"
      enterDelay={300}
      leaveDelay={200}
    >
      <button
        className={`px-7 py-8 border-[1.75px] flex justify-center items-center border-white rounded-xl ${
          status === "unavailable"
            ? "bg-white text-black"
            : "bg-transparent text-white"
        }`}
        onClick={status === "available" ? () => handleClick(lockerID) : null}
      >
        <p className="font-semibold text-md">{lockerID}</p>
      </button>
    </Tooltip>
  );
};
