import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaHospitalUser,
  FaBirthdayCake,
  FaVenusMars,
  FaUserMd,
  FaNotesMedical,
} from "react-icons/fa";
import BackButton from "../components/BackButton";

const CreateAdmission = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "Male",
    doctor: "",
    admissionDate: "",
    reason: "",
  });

  const navigate = useNavigate(); // For navigation after creating admission

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Admission Data:", patientData);
    navigate("/admission");
  };

  return (
    <div className="p-6 mb-16">
      <BackButton />
      <h1 className="mb-6 text-3xl font-bold">Create New Admission</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block mb-2 text-lg font-medium" htmlFor="name">
            Patient Name
          </label>
          <div className="flex items-center p-2 border border-gray-300 rounded-lg">
            <FaUserAlt className="mr-2" />
            <input
              type="text"
              id="name"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              className="w-full p-2"
              required
            />
          </div>
        </div>

        {/* Age Input */}
        <div>
          <label className="block mb-2 text-lg font-medium" htmlFor="age">
            Age
          </label>
          <div className="flex items-center p-2 border border-gray-300 rounded-lg">
            <FaBirthdayCake className="mr-2" />
            <input
              type="number"
              id="age"
              name="age"
              value={patientData.age}
              onChange={handleChange}
              className="w-full p-2"
              required
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block mb-2 text-lg font-medium" htmlFor="gender">
            Gender
          </label>
          <div className="flex items-center p-2 border border-gray-300 rounded-lg">
            <FaVenusMars className="mr-2" />
            <select
              id="gender"
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="w-full p-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Doctor Input */}
        <div>
          <label className="block mb-2 text-lg font-medium" htmlFor="doctor">
            Assigned Doctor
          </label>
          <div className="flex items-center p-2 border border-gray-300 rounded-lg">
            <FaUserMd className="mr-2" />
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={patientData.doctor}
              onChange={handleChange}
              className="w-full p-2"
              required
            />
          </div>
        </div>

        {/* Admission Date Input */}
        <div>
          <label
            className="block mb-2 text-lg font-medium"
            htmlFor="admissionDate"
          >
            Admission Date
          </label>
          <div className="flex items-center p-2 border border-gray-300 rounded-lg">
            <FaCalendarAlt className="mr-2" />
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={patientData.admissionDate}
              onChange={handleChange}
              className="w-full p-2"
              required
            />
          </div>
        </div>

        {/* Reason Input */}
        <div>
          <label className="block mb-2 text-lg font-medium" htmlFor="reason">
            Reason for Admission
          </label>
          <div className="flex items-center p-2 border border-gray-300 rounded-lg">
            <FaNotesMedical className="mr-2" />
            <input
              type="text"
              id="reason"
              name="reason"
              value={patientData.reason}
              onChange={handleChange}
              className="w-full p-2"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg"
          >
            Create Admission
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmission;
