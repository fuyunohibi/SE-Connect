import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Container, InputAdornment } from "@mui/material";
import { CheckIcon } from "@/assets/icons/Auth";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import useUserStore from "@/store/useUserStore";
import Authentication from "@/lib/api/authentication";
import { AuthContext } from "@/components/AuthProvider";

const LoginPassword = () => {
  const navigate = useNavigate();

  const { setAuthToken } = useContext(AuthContext);
  const {
    userProfile,
    clearEmail,
    setKmitlID,
    setYearOfStudy,
    setAvatar,
    setFirstName,
    setLastName,
  } = useUserStore();

  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const isPasswordValid = () => {
    return password.length >= 12;
  };

  const handleContinueClick = async (event) => {
    event.preventDefault();
    if (!isPasswordValid()) {
      setPasswordError("Password must be at least 12 characters long");
      triggerShakeAnimation();
      return;
    }

    console.log(
      JSON.stringify({ email: userProfile.email, password: password })
    );

    Authentication.loginWithPassword(userProfile.email, password)
      .then((res) => {
        if (res.access_token) {
          console.log("Response: ", res);
          setAuthToken(res.access_token); 

          const userData = res.user;
          setKmitlID(userData.ID);
          setYearOfStudy(userData.year_of_study);
          setAvatar(userData.profile_picture);
          setFirstName(userData.firstname);
          setLastName(userData.lastname);

          localStorage.setItem("userProfile", JSON.stringify(userData));

          navigate("/");
        } else {
          // NOTE: Handle the case where no token is returned
          console.error("Login successful, but no token received.");
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
        handleRegistrationError(err);
      });
  };

  const handleRegistrationError = (err) => {
    if (err.response) {
      setPasswordError(
        err.response.data.detail || "Registration failed due to a server error."
      );
      triggerShakeAnimation();
    } else {
      setEmailError("An unexpected network error occurred. Please try again.");
      triggerShakeAnimation();
    }
  };

  const triggerShakeAnimation = () => {
    setShakePassword(true);
    setTimeout(() => {
      setShakePassword(false);
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }, 500);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditClick = () => {
    clearEmail();
    navigate("/auth/signup/identifier");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="flex w-full justify-center items-center h-8  mt-10">
        <img
          src={SoftwareEngineeringLogo}
          alt="Software Engineering Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
        }}
      >
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            margin="normal"
            value={userProfile.email}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: isEmailFocused ? "#d0514a" : "" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={handleEditClick}
                  >
                    Edit
                  </span>
                </InputAdornment>
              ),
            }}
          />
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
                  borderColor:
                    passwordError && shakePassword ? "#d0514a" : "#d0514a",
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
          {password.length > 0 && (
            <div className="flex items-center mt-2">
              {password.length < 12 ? (
                <div className="border w-full px-3 pb-4 rounded-md mb-2 border-textFieldBorder">
                  <p className="mt-4 mb-2 text-sm text-start">
                    Your password must contain:
                  </p>
                  <li className="ml-2 text-sm ">At least 12 characters</li>
                </div>
              ) : (
                <div className="border w-full px-3 pb-4 rounded-md mb-2 border-textFieldBorder">
                  <p className="mt-4 mb-2 text-sm text-start">
                    Your password must contain:
                  </p>
                  <div className="flex items-center ml-[0.425rem]">
                    <img src={CheckIcon} alt="Check Icon" className="w-3 h-3" />
                    <span className="ml-2 text-sm text-status-success">
                      At least 12 characters
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={(e) => handleContinueClick(e)}
            className="mt-3 bg-black-background rounded-[3rem]  h-full w-full p-6 hover:bg-button-hover transition duration-500"
          >
            <p className="text-white text-sm">Continue</p>
          </button>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-primary hover:underline"
              onClick={() => navigate("/auth/signup/identifier")}
            >
              Sign up
            </span>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPassword;
