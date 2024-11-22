// src/components/Loading.jsx
import React from "react";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BarLoader color="#4CAF50" loading={true} size={50} />
    </div>
  );
};

export default Loading;
