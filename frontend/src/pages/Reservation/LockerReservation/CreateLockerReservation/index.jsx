import React, { useState, useRef, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useUserStore from "@/store/useUserStore";
import LockerBooking from "@/lib/api/lockerBooking.js";
import { useQueryClient } from "react-query";

const CreateLockerReservation = ({ lockerID, onClose }) => {

  const queryClient = useQueryClient();

  const { userProfile } = useUserStore();

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const passwordRef = useRef(null);

  const [firstname, setFirstname] = useState(userProfile.firstName);
  const [lastname, setLastname] = useState(userProfile.lastName);
  const [isFirstnameFocused, setFirstnameFocused] = useState(false);
  const [isLastnameFocused, setLastnameFocused] = useState(false);
  const [shakeFirstname, setShakeFirstname] = useState(false);
  const [shakeLastname, setShakeLastname] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  const handleModalLastnameClick = (e) => {
    e.stopPropagation();
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
    console.log(firstname);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
    console.log(lastname);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLockerBooking = async () => {
    let error = false;
    if (firstname === "") {
      triggerShakeAnimation("firstname");
      error = true;
    }
    if (lastname === "") {
      triggerShakeAnimation("lastname");
      error = true;
    }
    if (password === "") {
      triggerShakeAnimation("password");
      error = true;
    }

    if (!error) {
      const lockerData = {
        lockerID: lockerID,
        lockerPassword: password,
        owner: {
          firstname: userProfile.firstName,
          lastname: userProfile.lastName,
        },
      };

      console.log("Locker Data:", lockerData);

      LockerBooking.requestLockerBooking(lockerData)
        .then((res) => {
          console.log("Request Locker Booking Response:", res);
          queryClient.invalidateQueries("allLockerReservation");
          onClose();
        })
        .catch((err) => {
          console.log("Request Locker Booking Error:", err);
        });
    }
  };

  const triggerShakeAnimation = (subject) => {
    if (subject === "firstname") {
      setShakeFirstname(true);
      if (firstnameRef.current) firstnameRef.current.focus();
      setTimeout(() => setShakeFirstname(false), 500);
    } else if (subject === "lastname") {
      setShakeLastname(true);
      if (lastnameRef.current) lastnameRef.current.focus();
      setTimeout(() => setShakeLastname(false), 500);
    } else if (subject === "password") {
      setShakePassword(true);
      if (passwordRef.current) passwordeRef.current.focus();
      setTimeout(() => setShakePassword(false), 500);
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="slide-from-bottom fixed bottom-0 left-0 right-0 flex flex-col justify-end items-center  rounded-t-[3rem] bg-white"
        onClick={handleModalLastnameClick}
      >
        <div className="w-full space-y-5 px-11 pb-11 pt-7">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-black font-semibold text-bold text-2xl">
              Create
              <br />
              Locker Reservation
            </h1>
            <div className="px-4 py-[0.65rem] border-[1.75px] flex justify-center items-center border-white rounded-xl bg-primary">
              <h1 className="text-xl text-white">{lockerID}</h1>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-black font-semibold text-xl">Firstname</p>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Firstname"
              value={firstname}
              inputRef={firstnameRef}
              onChange={handleFirstnameChange}
              onFocus={() => setFirstnameFocused(true)}
              onBlur={() => setFirstnameFocused(false)}
              sx={{
                animation: shakeFirstname
                  ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                  : "none",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: shakeFirstname ? "#d0514a" : "#d0514a",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: isFirstnameFocused ? "#d0514a" : "" },
              }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-black font-semibold text-xl">Lastname</p>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Lastname"
              value={lastname}
              inputRef={lastnameRef}
              onChange={handleLastnameChange}
              onFocus={() => setLastnameFocused(true)}
              onBlur={() => setLastnameFocused(false)}
              sx={{
                animation: shakeLastname
                  ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                  : "none",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: shakeLastname ? "#d0514a" : "#d0514a",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: isLastnameFocused ? "#d0514a" : "" },
              }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-black font-semibold text-xl">Locker Password</p>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              inputRef={passwordRef}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              margin="normal"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              sx={{
                animation: shakePassword
                  ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                  : "none",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: shakePassword ? "#d0514a" : "#d0514a",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: isPasswordFocused ? "#d0514a" : "" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <button
            className="bg-black-background rounded-[3rem] h-full p-6 hover:bg-button-hover transition duration-500 mb-10 
              w-full 
              md:max-w-[18rem]
            "
            onClick={handleLockerBooking}
          >
            <p className="text-white text-sm">Submit your locker reservation</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLockerReservation;
