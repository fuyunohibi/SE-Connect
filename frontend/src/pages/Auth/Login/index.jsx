import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Container } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import useUserStore from "@/store/useUserStore";

const Register = () => {
  const navigate = useNavigate();

  const { email, setEmail } = useUserStore();

  const emailRef = useRef(null);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const isEmailValid = () => {
    return email.includes("@kmitl.ac.th");
  };

  const handleContinueClick = (event) => {
    event.preventDefault();
    if (isEmailValid()) {
      navigate("/auth/login/password");
    } else {
      setEmailError("Email is not valid needs to be @kmitl.ac.th only");
      setShakeEmail(true);

      setTimeout(() => {
        setShakeEmail(false);
        if (emailRef.current) {
          emailRef.current.focus();
        }
      }, 500);
    }
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
            inputRef={emailRef}
            onChange={handleEmailChange}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            sx={{
              animation: shakeEmail
                ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                : "none",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: emailError && shakeEmail ? "#d0514a" : "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: isEmailFocused ? "#d0514a" : "" },
            }}
          />
          {email !== "" && !isEmailValid() && (
            <div className="flex items-center text-red-500 mt-2">
              <WarningIcon fontSize="small" />
              <span className="ml-2 text-sm">
                Email is not valid needs to be @kmitl.ac.th only
              </span>
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

export default Register;
