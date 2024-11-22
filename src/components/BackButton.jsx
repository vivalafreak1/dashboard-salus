import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Navigate back to the previous page
      className="flex items-center mb-4 text-gray-500 hover:text-gray-800"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
