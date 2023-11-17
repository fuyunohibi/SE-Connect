import React, { useState, useEffect } from 'react'
import LockerBooking from "@/lib/api/lockerBooking.js"
import { CreateLockerReservation } from '@/pages';
import { useQuery, useQueryClient } from "react-query";

const LockerReservation = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-full">
          <div className="px-7 pt-10 pb-6">
            <h1 className="text-primary text-xl font-bold">Locker Reservation</h1>
          </div>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}

const DashboardContent = () => {

  const queryClient = useQueryClient();
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
  }

  if (isFetching) {
    return <div>Loading lockers...</div>; // Or any other loading state representation
  }

  if (isError) {
    return <div>Error fetching lockers: {error.message}</div>;
  }

  if (!lockerData || lockerData.length === 0) {
    return <div>No lockers available</div>; // Handle empty data
  }

  return (
    <div
      className="flex bg-primary rounded-t-[3rem] px-10 py-8 w-full
        md:rounded-tr-[0rem]
    "
    >
      <div className="grid grid-cols-4 gap-4 w-full">
        {lockerData.map((locker) => (
          <LockerComponent
            key={locker.lockerID}
            lockerID={locker.lockerID}
            status={locker.status}
            lockerPassword={locker.lockerPassword}
            owner={locker.owner}
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

export default LockerReservation


const LockerComponent = ({ lockerID, owner, lockerPassword, status, handleClick }) => {

  return (
    <button
      key={lockerID}
      className={`px-7 py-8 border-[1.75px] flex justify-center items-center border-white rounded-xl
        ${status === "unavailable" ? "bg-white text-black" : "bg-transparent text-white"}
      `}
      onClick={status === "available" ? () => handleClick(lockerID) : null}    >
      <p className=" font-semibold text-md">{lockerID}</p>
    </button>
  );
}