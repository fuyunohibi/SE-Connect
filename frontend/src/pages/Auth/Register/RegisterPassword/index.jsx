import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Container } from "@mui/material";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";

const RegisterPassword = () => {
  const navigate = useNavigate();
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: "#d0514a" },
            }}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: "#d0514a" },
            }}
          />
          {/* Your password must contain: At least 12 characters */}
          <button
            type="submit"
            onClick={() => navigate("/auth/signup/password")}
            className="mt-3 bg-black-background rounded-[3rem]  h-full w-full p-6 hover:bg-button-hover transition duration-500"
          >
            <p className="text-white text-sm">Continue</p>
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-primary hover:underline"
              onClick={() => navigate("/auth/login")}
            >
              Log in
            </span>
          </p>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPassword;
