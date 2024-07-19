import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import { memo } from "react";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default memo(Router);
