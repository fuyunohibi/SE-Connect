import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Container } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning"; 
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailFocused, setEmailFocused] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const isEmailValid = () => {
    return email.includes("@kmitl.ac.th");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmailValid()) {
      navigate("/auth/signup/password");
    } else {
      alert("Email is not valid");
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
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-sm text-center w-[84%]">
          Note that KMITL Email may be required for signup. Your KMITL Email
          will only be used to verify your identity for secuity purposes.
        </p>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            margin="normal"
            onChange={handleEmailChange}
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
            type="submit"
            className="mt-3 bg-black-background rounded-[3rem]  h-full w-full p-6 hover:bg-button-hover transition duration-500"
          >
            <p className="text-white text-sm">Continue</p>
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-primary hover:underline"
              onClick={() => navigate("/auth/login/identifier")}
            >
              Log in
            </span>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
