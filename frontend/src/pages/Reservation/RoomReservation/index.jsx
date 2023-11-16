import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import {
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import { DefaultUserProfile } from "@/assets/images/Auth";
import useCheckScreenSize from "@/hooks/useCheckScreenSize";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomBooking from "@/lib/api/roomBooking";
import { useInfiniteQuery } from "react-query";
import { useQueryClient } from "react-query";
import useUserStore from "@/store/useUserStore";

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

          "
          >
            <h1 className="text-primary text-xl font-bold">Room Reservation</h1>
          </div>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;

const TitleBar = ({
  title,
  buttonTitle,
  showButton = false,
  handleDateChange,
  uniqueDates,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between items-end pb-6">
      <h1 className="text-lg font-semibold text-gray-500">{title}</h1>
      {showButton ? (
        <>
          <button
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300"
            aria-controls="date-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {buttonTitle}
          </button>
          <Menu
            id="date-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleDateChange("all");
                handleClose();
              }}
              value="all"
            >
              All Dates
            </MenuItem>
            {uniqueDates.map((date) => (
              <MenuItem
                key={date}
                onClick={() => {
                  handleDateChange(date);
                  handleClose();
                }}
              >
                {dayjs(date).format("DD MMM, YYYY")}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : null}
    </div>
  );
};

const DashboardContent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userProfile } = useUserStore();

  useEffect(() => {
    console.log("FROM ROOM RESERVATION");
    console.log(userProfile.firstName);
    console.log(userProfile.lastName);
    console.log(userProfile.yearOfStudy);
  }, []);

  const fetchReservations = async ({ pageParam = 1 }) => {
    try {
      const data = await RoomBooking.getAllReservations(pageParam);
      if (!data) {
        throw new Error("Problem fetching reservations");
      }
      return data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "reservations",
    fetchReservations,
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage;
      },
    }
  );

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    console.log(
      `ScrollTop: ${scrollTop}, ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}`
    );
    console.log(
      `Condition Check: ${scrollHeight - scrollTop === clientHeight}`
    );

    if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
      console.log("Bottom reached, fetching next page");
      fetchNextPage();
    }
  };

  let content;

  const phoneNumberRef = useRef(null);

  const [shakePhoneNumber, setShakePhoneNumber] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterDate, setFilterDate] = useState("all"); // "all" as default value

  const triggerShakeAnimation = () => {
    setShakePhoneNumber(true);
    setTimeout(() => {
      setShakePhoneNumber(false);
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 500);
  };

  const handleBooking = () => {
    setErrorMessage("");

    if (
      !selectedBuilding ||
      !selectedRoom ||
      !selectedDate ||
      !selectedTime ||
      !phoneNumber
    ) {
      if (!phoneNumber) {
        triggerShakeAnimation();
      }
      setErrorMessage("Please fill in all the information first.");
      return;
    }

    const bookingDetails = {
      ID: selectedRoom.name,
      building: selectedBuilding.name,
      room: selectedRoom.name,
      date: selectedDate.format("DD/MM/YYYY"),
      availability: {
        startTime: selectedTime.startTime,
        endTime: selectedTime.endTime,
      },
      status: "idle", // TODO: Change to "Pending" when backend is ready
      bookedBy: {
        avatar: `http://localhost:8000/${userProfile.avatar.replace(/\\/g,"/")}`,
        firstname: userProfile.firstName,
        lastname: userProfile.lastName,
        yearOfStudy: userProfile.yearOfStudy,
        phoneNumber: phoneNumber,
      },
    };
    RoomBooking.requestBooking({ body: bookingDetails })
      .then((res) => {
        console.log("Booking Successful:", res);
        handleClearStateData();

        queryClient.invalidateQueries("reservations");
        navigate("/room-reservation");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.status === 409) {
            setErrorMessage(
              "This room is already booked at the selected time."
            );
            return;
          }
          console.error("Detailed error message:", err.response.data.detail);
        } else {
          console.error("Error during booking:", err);
        }
      });
  };

  const handleClearStateData = () => {
    setSelectedBuilding("");
    setPhoneNumber("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedRoom("");
    setPhoneNumber("");
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
  };

  const uniqueDates = new Set();
  data?.pages.forEach((page) =>
    page.forEach((reservation) => uniqueDates.add(reservation.date))
  );

  const getFormattedDateForButton = () => {
    if (filterDate === "all") {
      return "All";
    } else {
      return dayjs(filterDate).format("DD MMM");
    }
  };

  const buttonTitle = getFormattedDateForButton();

  if (location.pathname === "/room-reservation") {
    content = (
      <div className="flex flex-col w-full mb-24">
        <TitleBar
          title="Reserved"
          date="15 Nov, 2023"
          showButton
          buttonTitle={buttonTitle}
          handleDateChange={handleDateChange}
          uniqueDates={[...uniqueDates]}
        />
        <div
          className="flex flex-col space-y-6 items-start h-full w-full
            md:flex-row md:justify-between md:space-x-6 md:space-y-0 
          "
        >
          <div
            className="flex flex-col space-y-6 items-start w-full h-[39rem] overflow-y-scroll
              no-scrollbar
            "
            onScroll={handleScroll}
          >
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page
                  .filter(
                    (reservation) =>
                      filterDate === "all" || reservation.date === filterDate
                  )
                  .map((reservation) => {
                    const {
                      bookedBy,
                      availability,
                      ID,
                      building,
                      status,
                      date,
                    } = reservation;
                    const { avatar, firstname, yearOfStudy, phoneNumber } =
                      bookedBy || {};
                    const { startTime, endTime } = availability || {};
                    return (
                      <ReservationCard
                        key={reservation.requestID}
                        avatar={avatar}
                        firstName={firstname}
                        phoneNumber={phoneNumber}
                        yearOfStudy={yearOfStudy}
                        date={date}
                        startTime={startTime}
                        endTime={endTime}
                        building={building}
                        roomID={ID}
                        reservationStatus={status}
                      />
                    );
                  })}
              </React.Fragment>
            ))}
          </div>
          <div className="flex w-full">
            <BookingDetailsCard
              building="HM"
              room="806"
              date="15 Nov, 2023"
              startTime="18:00"
              endTime="21:00"
              bookedBy="080-594-5005"
              showButton={false}
            />
          </div>
        </div>
      </div>
    );
  } else if (location.pathname === "/create/room-reservation") {
    content = (
      <div className="flex flex-col w-full">
        <TitleBar title="Create a Reservation" />
        <div
          className="flex flex-col space-y-6 items-start 
            md:flex-row md:justify-between md:space-x-6 md:space-y-0 pb-32 
          "
        >
          <div className="reservation-list w-full h-[100rem] md:h-[39rem] overflow-y-scroll space-y-2">
            <BuildingSelectionCard onBuildingSelect={setSelectedBuilding} />
            {selectedBuilding ? (
              <RoomSelectionCard
                selectedBuilding={selectedBuilding ? selectedBuilding.name : ""}
                onRoomSelect={setSelectedRoom}
              />
            ) : null}
            <DateSelectionCard onDateSelect={setSelectedDate} />
            <TimeSelectionCard onTimeSelect={setSelectedTime} />
            <MobileInputCard
              onPhoneNumberChange={setPhoneNumber}
              ref={phoneNumberRef}
              shakePhoneNumber={shakePhoneNumber}
            />
          </div>

          <div className="flex w-full">
            <BookingDetailsCard
              showButton
              building={selectedBuilding ? selectedBuilding.name : ""}
              room={selectedRoom ? selectedRoom.name : ""}
              date={selectedDate ? selectedDate.format("DD MMM, YYYY") : ""}
              startTime={selectedTime ? selectedTime.startTime : ""}
              endTime={selectedTime ? selectedTime.endTime : ""}
              bookedBy={phoneNumber}
              onClick={handleBooking}
              errorMessage={errorMessage}
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
    "
    >
      {content}
    </div>
  );
};
const ReservationCard = ({
  avatar,
  firstName,
  phoneNumber,
  yearOfStudy,
  date,
  startTime,
  endTime,
  building,
  roomID,
  reservationStatus,
}) => {
  return (
    <div className="relative flex justify-between px-8 py-6 rounded-xl bg-white w-full">
      <div>
        <p className="text-gray-500 font-semibold">Name</p>
        <div className="flex justify-between space-x-4 mt-4">
          <div className="rounded-full h-12 w-12 ">
            <img src={avatar} alt="User Profile" className="object-cover w-full h-full rounded-full scale-110" />
          </div>
          <div>
            <p className="text-black font-semibold">{firstName ?? "-"}</p>
            <p className=" text-gray-600 font-semibold">{yearOfStudy ?? "-"}</p>
          </div>
        </div>
        <div className="space-y-3 mt-10">
          <p className="text-gray-500 font-semibold">Mobile no</p>
          <p className=" text-gray-600 font-semibold">{phoneNumber}</p>
        </div>
      </div>

      <div className="flex flex-col ">
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

const BuildingSelectionCard = ({ onBuildingSelect }) => {
  const buildings = [
    { id: 1, name: "HM" },
    { id: 2, name: "ECC" },
    { id: 3, name: "Prathep" },
  ];

  const [selectedBuildingId, setSelectedBuildingId] = useState(null);

  const handleBuildingSelect = (buildingId) => {
    setSelectedBuildingId(buildingId);
    const selectedBuilding = buildings.find(
      (building) => building.id === buildingId
    );
    onBuildingSelect(selectedBuilding);
  };

  return (
    <div className="flex flex-col justify-start items-start bg-white px-5 py-6 rounded-xl">
      <h1 className="font-semibold text-black mb-3">Select Building</h1>
      <div className="grid grid-cols-3 gap-4">
        {buildings.map((building) => (
          <button
            key={building.id}
            className={`px-6 py-3 rounded-md text-center transition-all duration-300 ease-in-out ${
              selectedBuildingId === building.id
                ? "bg-primary text-white scale-110"
                : "bg-transparent text-gray-400 hover:bg-gray-200 hover:scale-105"
            }`}
            onClick={() => handleBuildingSelect(building.id)}
          >
            {building.name}
          </button>
        ))}
      </div>
    </div>
  );
};


const RoomSelectionCard = ({ selectedBuilding, onRoomSelect }) => {
  const rooms = {
    HM: [
      { id: 1, name: "301" },
      { id: 2, name: "302" },
      { id: 3, name: "303" },
      { id: 4, name: "304" },
      { id: 5, name: "305" },
      { id: 6, name: "306" },
    ],
    ECC: [
      { id: 1, name: "801" },
      { id: 2, name: "802" },
      { id: 3, name: "803" },
      { id: 4, name: "804" },
      { id: 5, name: "805" },
      { id: 6, name: "806" },
    ],
    Prathep: [
      { id: 1, name: "101" },
      { id: 2, name: "102" },
      { id: 3, name: "103" },
      { id: 4, name: "104" },
      { id: 5, name: "105" },
      { id: 6, name: "106" },
    ],
  };

  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId);
    const selectedRoom = rooms[selectedBuilding].find(
      (room) => room.id === roomId
    );
    onRoomSelect(selectedRoom);
  };

  return (
    <div className="flex flex-col justify-start items-start bg-white px-5 py-6 rounded-xl">
      <h1 className="font-semibold text-black mb-3">Select Room</h1>
      <div className="grid grid-cols-3 gap-4">
        {selectedBuilding && rooms[selectedBuilding].map((room) => (
          <button
            key={room.id}
            className={`px-6 py-3 rounded-md text-center transition-all duration-300 ease-in-out ${
              selectedRoomId === room.id
                ? "bg-primary text-white scale-110"
                : "bg-transparent text-gray-400 hover:bg-gray-200 hover:scale-105"
            }`}
            onClick={() => handleRoomSelect(room.id)}
          >
            {room.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const DateSelectionCard = ({ onDateSelect }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setDates(getDatesForCurrentWeek());
  }, []);

  const getDatesForCurrentWeek = () => {
    let currentDate = dayjs();
    let weekDates = [];

    while (currentDate.day() !== 5 && currentDate.day() !== 6) {
      weekDates.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    if (currentDate.day() === 5 || currentDate.day() === 6) {
      let nextMonday = currentDate.day(8);
      for (let i = 0; i < 5; i++) {
        weekDates.push(nextMonday.add(i, "day"));
      }
    }

    return weekDates;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date); 
  };


  return (
    <div className="flex flex-col justify-start items-start bg-white px-5 py-6 rounded-xl">
      <h1 className="font-semibold text-black mb-3">
        Select Date{" "}
        <span className="text-gray-500">- {dayjs().format("MMMM YYYY")}</span>
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {dates.map((date, index) => (
          <button
            key={index}
            className={`px-6 py-3 rounded-md text-center transition-all duration-300 ease-in-out ${
              selectedDate && selectedDate.isSame(date, "day")
                ? "bg-primary text-white scale-110"
                : "bg-transparent text-gray-400 hover:bg-gray-200 hover:scale-105"
            }`}
            onClick={() => {
              handleDateSelect(date);
            }}
          >
            <p>{date.format("ddd")}</p>
            <span className="font-bold">{date.format("DD")}</span>
          </button>
        ))}
      </div>
    </div>
  );
};


const TimeSelectionCard = ({ onTimeSelect }) => {
  const times = [
    { id: 1, startTime: "08:00 AM", endTime: "10:00 AM" },
    { id: 2, startTime: "11:00 AM", endTime: "12:00 PM" },
    { id: 3, startTime: "01:00 PM", endTime: "02:00 PM" },
  ];

  const [selectedTimeRangeId, setSelectedTimeRangeId] = useState(null);

  const handleTimeSelect = (timeId) => {
    setSelectedTimeRangeId(timeId);
    const selectedTimeRange = times.find((time) => time.id === timeId);
    onTimeSelect(selectedTimeRange);
  };

  return (
    <div className="flex flex-col justify-start items-start bg-white px-5 py-6 rounded-xl">
      <h1 className="font-semibold text-black mb-3">Select Time</h1>
      <div className="grid grid-cols-3 gap-4">
        {times.map((time) => (
          <button
            key={time.id}
            className={`px-6 py-3 rounded-md text-center transition-all duration-300 ease-in-out ${
              selectedTimeRangeId === time.id
                ? "bg-primary text-white scale-110"
                : "bg-transparent text-gray-400 hover:bg-gray-200 hover:scale-105"
            }`}
            onClick={() => handleTimeSelect(time.id)}
          >
            <p>
              {time.startTime} - {time.endTime}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};



const MobileInputCard = ({ onPhoneNumberChange, ref, shakePhoneNumber }) => {
  return (
    <div className="flex flex-row justify-start items-start bg-white px-5 py-6 pb-10 rounded-xl">
      <div className="mr-5 text-primary">
        <PhoneIcon />
      </div>
      <div>
        <h1 className=" font-semibold  text-black">Mobile Number</h1>
        <p className="mb-3  text-gray-500">
          Enter the number on which you want to reserve the room
        </p>
        <TextField
          required
          type="text"
          inputRef={ref}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          sx={{
            animation: shakePhoneNumber
              ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
              : "none",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor:
                  shakePhoneNumber ? "#d0514a" : "#d0514a",
              },
            },
          }}
          className="w-full h-10  px-4 py-2 m rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};

const BookingDetailsCard = ({
  building = "",
  room = "",
  date = "",
  startTime = "",
  endTime = "",
  bookedBy = "",
  showButton = true,
  onClick,
  errorMessage = ""
  ,
}) => {
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
            onClick={onClick}
          >
            Confirm
          </button>
        </div>
      ) : null}
      {errorMessage ? (
        <div className="bg-[#fafafa] px-5 py-6 pt-0 rounded-xl">
          <p className="text-center text-red-500">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
};

const SideBar = () => {
  const navigate = useNavigate();
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
      <div className="w-16 h-16" onClick={() => navigate("/")}>
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
