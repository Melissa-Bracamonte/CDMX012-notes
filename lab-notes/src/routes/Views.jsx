import React, { useContext } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Notes from "../components/Notes";
import NotFound from "../components/NotFound";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../database/UserProvider";

const Views = () => {
  const { user } = useContext(UserContext);

  return (
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        {user && <Route exact path="/notes" element={<Notes />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default Views;
