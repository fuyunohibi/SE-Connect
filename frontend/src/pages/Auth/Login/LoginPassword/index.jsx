import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Container, InputAdornment } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning'; 
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import useUserStore from "@/store/useUserStore";

const LoginPassword = () => {
  const navigate = useNavigate();

  const { email, clearEmail } = useUserStore();

  const [password, setPassword] = useState("");
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }

  const handleEditClick = () => {
    clearEmail();
    navigate("/auth/login/identifier");
  }

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
        <h1 className="text-3xl font-bold">Enter your password</h1>
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
            value={email}
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
            type="password"
            id="password"
            onChange={handlePasswordChange}
            autoComplete="new-password"
            margin="normal"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: isPasswordFocused ? "#d0514a" : "" },
            }}
          />
          {password.length > 0 && password.length < 12 && (
            <div className="flex items-center text-red-500 mt-2">
              <WarningIcon fontSize="small" />
              <span className="ml-2 text-sm">
                Password must be at least 12 characters
              </span>
            </div>
          )}
          <button
            type="submit"
            onClick={() => navigate()}
            className="mt-3 bg-black-background rounded-[3rem]  h-full w-full p-6 hover:bg-button-hover transition duration-500"
          >
            <p className="text-white text-sm">Continue</p>
          </button>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-primary hover:underline"
              onClick={() => navigate("/auth/login/password")}
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
