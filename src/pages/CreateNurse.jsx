// CreateNurse.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; // Assuming you have a BackButton component

const CreateNurse = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("Day");

  const navigate = useNavigate(); // For navigation after creation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle adding the new nurse to your state or database
    console.log("New Nurse Data", { name, position, department, shift });

    // After submitting, redirect back to the nurse list
    navigate("/nurse");
  };

  return (
    <div className="p-4 mb-16">
      <BackButton />{" "}
      {/* Assuming this is a button that goes back to the previous page */}
      <h1 className="mb-4 text-3xl font-bold">Create New Nurse</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Nurse Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Shift:</label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md"
          >
            Create Nurse
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNurse;
