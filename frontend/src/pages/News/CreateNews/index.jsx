import React, { useState, useRef } from "react";
import { TextField } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { PaperTexture } from "@/assets/images/News";

const CreateNews = ({ onClose }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isTitleFocused, setTitleFocused] = useState(false);
  const [isContentFocused, setContentFocused] = useState(false);

  

  const [shakeTitle, setShakeTitle] = useState(false);
  const [shakeContent, setShakeContent] = useState(false);

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleChangeBackgroundImage = () => {
    console.log("Change background image");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(content);
  }


  const handleSubmit = () => {
    let error = false;
    if (title === "") {
      triggerShakeAnimation("title");
      error = true;
    }
    if (content === "") {
      triggerShakeAnimation("content");
      error = true;
    }

    if (!error) {
      console.log("Submit");
      // TODO: Submit form
    }
  };


  const triggerShakeAnimation = (subject) => {
    if (subject === 'title') {
      setShakeTitle(true);
      if (titleRef.current) titleRef.current.focus();
      setTimeout(() => setShakeTitle(false), 500);
    } else if (subject === 'content') {
      setShakeContent(true);
      if (contentRef.current) contentRef.current.focus();
      setTimeout(() => setShakeContent(false), 500);
    }
  };


  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="slide-from-bottom fixed bottom-0 left-0 right-0 flex flex-col justify-end items-center  rounded-t-[3rem] bg-white"
        onClick={handleModalContentClick}
      >
        <div className="relative w-full">
          <div className="news-item h-[15rem] w-[100%] rounded-t-[3rem] cursor-pointer">
            <img
              src={PaperTexture}
              className="object-cover w-full h-full rounded-[3rem]"
            />
          </div>
          <h1 className="absolute z-[100] top-[10rem] left-11 text-white font-semibold text-bold text-[2.5rem] cursor-pointer">
            Create News
          </h1>
          <button
            className="absolute z-[100] top-[10.85rem] right-11 bg-black-background rounded-xl py-[0.6rem] px-3 hover:bg-button-hover transition duration-500 mb-10 "
            onClick={handleChangeBackgroundImage}
          >
            <PhotoLibraryIcon style={{ fontSize: "1.25rem", color: "white" }} />
          </button>
        </div>

        <div className="w-full space-y-5 px-11 pb-11 pt-7">
          <div className="space-y-2">
            <p className="text-black font-semibold text-xl">Title</p>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Title"
              inputRef={titleRef}
              onChange={handleTitleChange}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              sx={{
                animation: shakeTitle
                  ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                  : "none",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: shakeTitle ? "#d0514a" : "#d0514a",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: isTitleFocused ? "#d0514a" : "" },
              }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-black font-semibold text-xl">Content</p>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              placeholder="Content"
              inputRef={contentRef}
              onChange={handleContentChange}
              onFocus={() => setContentFocused(true)}
              onBlur={() => setContentFocused(false)}
              sx={{
                animation: shakeContent
                  ? "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
                  : "none",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: shakeContent ? "#d0514a" : "#d0514a",
                  },
                },
              }}
              InputLabelProps={{
                style: { color: isContentFocused ? "#d0514a" : "" },
              }}
            />
          </div>

          <button
            className="bg-black-background rounded-[3rem] h-full p-6 hover:bg-button-hover transition duration-500 mb-10 
              w-full 
              md:max-w-[18rem]
            "
            onClick={handleSubmit}
          >
            <p className="text-white text-sm">
              Submit your news post your dream
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNews;
