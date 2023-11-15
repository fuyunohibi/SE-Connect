import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SoftwareEngineeringLogo from "@/assets/icons/Logo/SoftwareEngineeringLogo.png";
import useUserStore from "@/store/useUserStore";
import Authentication from "@/lib/api/authentication";
import { AuthContext } from "@/components/AuthProvider";

const RegisterUserDetails = () => {
  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);
  const {
    userProfile,
    setEmail,
    setKmitlID,
    setYearOfStudy,
    setFirstName,
    setLastName,
    setAvatar,
  } = useUserStore();

  const [isKmitlIDFocused, setKmitlIDFocused] = useState(false);
  const [isYearOfStudyFocused, setYearOfStudyFocused] = useState(false);
  const [isFirstNameFocused, setFirstNameFocused] = useState(false);
  const [isLastNameFocused, setLastNameFocused] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setAvatarUrl(imageUrl); // Set the temporary URL to state
      setAvatar(event.target.files[0]);
      console.log(imageUrl);
    } 
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    console.log(userProfile.firstName);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    console.log(userProfile.lastName);
  };

  const handleYearOfStudyChange = (event) => {
    setYearOfStudy(event.target.value);
    console.log(userProfile.yearOfStudy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Authentication.registerUserDetails(
      userProfile.registrationID,
      userProfile.firstName,
      userProfile.lastName,
      userProfile.KmitlID,
      userProfile.yearOfStudy,
      userProfile.avatar
    )
      .then((res) => {
        console.log("Response: ", res);
        console.log("ACCESS TOKEN:", res.access_token)
        if (res.access_token) {
          authenticateUser(res.access_token, res.user);
          const userData = res.user;
          setEmail(userData.email);
          setKmitlID(userData.ID);
          setYearOfStudy(userData.year_of_study);
          setAvatar(userData.profile_picture);
          setFirstName(userData.firstname);
          setLastName(userData.lastname);
          localStorage.setItem("userProfile", JSON.stringify(userData));


          console.log(
            "User details registration uccessful & now logged in:",
            res
          );
          navigate("/");
        } else {
          console.error("Register & Login successful, but no token received.");
        }
      })
      .catch((err) => {
        console.error("Error registering user details:", err);
      });
  };

  useEffect(() => {
    if (userProfile.email.includes("@kmitl.ac.th")) {
      const id = userProfile.email.split("@kmitl.ac.th")[0];
      setKmitlID(id);
    }
  }, [userProfile.email, setKmitlID]);

  // useEffect(() => {
  //   return () => {
  //     // Revoke the object URL when the component is unmounted
  //     if (avatarUrl) {
  //       URL.revokeObjectURL(avatarUrl);
  //     }
  //   };
  // }, [avatarUrl]);


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
          Complete your account details to get started.
        </p>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <input
            accept="image/*"
            type="file"
            id="icon-button-file"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Avatar
                alt="Profile Picture"
                src={avatarUrl} // NOTE: Use the temporary URL or default logo
                sx={{ width: 56, height: 56 }}
              />
            </IconButton>
          </label>
          <TextField
            fullWidth
            id="KmitlID"
            label="KMITL ID"
            name="ID"
            value={userProfile.KmitlID}
            autoFocus
            margin="normal"
            onFocus={() => setKmitlIDFocused(true)}
            onBlur={() => setKmitlIDFocused(false)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: isKmitlIDFocused ? "#d0514a" : "" },
            }}
          />
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#c5c5c4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
          >
            <InputLabel
              id="year-label"
              style={{ color: isYearOfStudyFocused ? "#d0514a" : "" }}
            >
              Year of Study
            </InputLabel>
            <Select
              labelId="year-label"
              id="year"
              autoFocus
              label="Year of Study"
              value={userProfile.yearOfStudy}
              onChange={handleYearOfStudyChange}
              onFocus={() => setYearOfStudyFocused(true)}
              onBlur={() => setYearOfStudyFocused(false)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#d0514a",
                  },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#d0514a",
                  },
                },
              }}
              MenuProps={{
                sx: {
                  "& .MuiPaper-root": {
                    borderRadius: "10px",
                  },
                },
              }}
            >
              <MenuItem value={1}>1st Year</MenuItem>
              <MenuItem value={2}>2nd Year</MenuItem>
              <MenuItem value={3}>3rd Year</MenuItem>
              <MenuItem value={4}>4th Year</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            placeholder="John"
            margin="normal"
            onChange={handleFirstNameChange}
            onFocus={() => setFirstNameFocused(true)}
            onBlur={() => setFirstNameFocused(false)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: isFirstNameFocused ? "#d0514a" : "" },
            }}
          />
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastname"
            placeholder="Doe"
            margin="normal"
            onChange={handleLastNameChange}
            onFocus={() => setLastNameFocused(true)}
            onBlur={() => setLastNameFocused(false)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#d0514a",
                },
              },
            }}
            InputLabelProps={{
              style: { color: isLastNameFocused ? "#d0514a" : "" },
            }}
          />
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

export default RegisterUserDetails;
