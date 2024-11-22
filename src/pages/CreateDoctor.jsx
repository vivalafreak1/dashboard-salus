// CreateDoctor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; // Assuming you have a BackButton component

const CreateDoctor = () => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [shift, setShift] = useState("Morning");

  const navigate = useNavigate(); // For navigation after creation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle adding the new doctor to your state or database
    console.log("New Doctor Data", { name, specialty, shift });

    // After submitting, redirect back to the doctor list
    navigate("/doctor");
  };

  return (
    <div className="p-4 mb-16">
      <BackButton />{" "}
      {/* Assuming this is a button that goes back to the previous page */}
      <h1 className="mb-4 text-3xl font-bold">Create New Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Doctor Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Specialty:</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
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
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md"
          >
            Create Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDoctor;
