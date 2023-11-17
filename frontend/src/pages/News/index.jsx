import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import CreateNews from "./CreateNews";
import News from "./News";
import { Navbar } from "@/components/global";

const NewsPage = () => {
  const navigate = useNavigate();
  const [isCreateNewsModalOpen, setIsCreateNewsModalOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  const closeCreateNewsModal = () => {
    setIsCreateNewsModalOpen(false);
    navigate("/news");
  };

  const toggleCreateNewsModal = () => {
    if (!authState.isAuthenticated && toggleCreateNewsModal) {
      console.log("Not authenticated");
      navigate("/auth/login/identifier");
    } else {
      setIsCreateNewsModalOpen((prev) => !prev);
    }
  };


  return (
    <>
      <Navbar onToggleModal={toggleCreateNewsModal} />
      <News />
      {isCreateNewsModalOpen && <CreateNews onClose={closeCreateNewsModal} />}
    </>
  );
};

export default NewsPage;
