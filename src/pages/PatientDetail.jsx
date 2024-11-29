import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaNotesMedical,
  FaTrashAlt,
} from "react-icons/fa";

export default function PatientDetail() {
  const { patientId } = useParams();

  const initialPatient = {
    id: patientId,
    name: "John Doe",
    age: 30,
    gender: "Male",
    phoneNumber: "8213456789",
    email: "john.doe@example.com",
    medicalHistory: [
      {
        id: 1,
        date: "2023-11-01",
        condition: "Flu",
        notes: "Prescribed antibiotics",
        doctor: "Dr. Smith",
      },
      {
        id: 2,
        date: "2024-01-15",
        condition: "Sprained Ankle",
        notes: "Recommended physiotherapy",
        doctor: "Dr. Johnson",
      },
      {
        id: 3,
        date: "2024-05-20",
        condition: "Back Pain",
        notes: "Prescribed painkillers",
        doctor: "Dr. Taylor",
      },
      {
        id: 4,
        date: "2024-06-12",
        condition: "Hypertension",
        notes: "Recommended low-sodium diet",
        doctor: "Dr. Green",
      },
      {
        id: 5,
        date: "2024-07-03",
        condition: "Allergy",
        notes: "Prescribed antihistamines",
        doctor: "Dr. White",
      },
      {
        id: 6,
        date: "2024-08-21",
        condition: "Diabetes Check",
        notes: "Routine check-up",
        doctor: "Dr. Black",
      },
    ],
  };

  const [patient, setPatient] = useState(initialPatient);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const itemsPerPage = 3;

  // Sort and filter medical history
  const filteredHistory = [...patient.medicalHistory]
    .filter((entry) =>
      Object.values(entry)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Here you can send the updated patient data to a server or local storage
    setIsEditing(false); // Exit edit mode after saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const handleDeleteHistory = (id) => {
    setPatient({
      ...patient,
      medicalHistory: patient.medicalHistory.filter((entry) => entry.id !== id),
    });
  };

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">Patient Details</h1>

      <div className="space-y-6">
        {/* Patient Info Section */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="space-y-2">
            {/* Name */}
            <div className="flex items-center">
              <FaUser className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                />
              ) : (
                <span>Name: {patient.name}</span>
              )}
            </div>
            {/* Age */}
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                />
              ) : (
                <span>Age: {patient.age}</span>
              )}
            </div>
            {/* Phone */}
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={patient.phoneNumber}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                />
              ) : (
                <span>Phone: {patient.phoneNumber}</span>
              )}
            </div>
            {/* Email */}
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={patient.email}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                />
              ) : (
                <span>Email: {patient.email}</span>
              )}
            </div>
          </div>

          {/* Edit/Save Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 text-white bg-green-500 rounded-md"
              >
                Save
              </button>
            )}
          </div>
        </div>

        {/* Medical History Section */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">Medical History</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search medical history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />

          <table className="min-w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm text-left border">Date</th>
                <th className="px-4 py-2 text-sm text-left border">
                  Condition
                </th>
                <th className="px-4 py-2 text-sm text-left border">Notes</th>
                <th className="px-4 py-2 text-sm text-left border">Doctor</th>
                <th className="px-4 py-2 text-sm text-left border">
                  Action
                </th>{" "}
                {/* New Action Column */}
              </tr>
            </thead>
            <tbody>
              {currentHistory.length > 0 ? (
                currentHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-2 text-sm border">{entry.date}</td>
                    <td className="px-4 py-2 text-sm border">
                      {entry.condition}
                    </td>
                    <td className="px-4 py-2 text-sm border">{entry.notes}</td>
                    <td className="px-4 py-2 text-sm border">{entry.doctor}</td>
                    <td className="px-4 py-2 text-sm text-center border">
                      <button
                        onClick={() => handleDeleteHistory(entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-sm text-center border"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredHistory.length > itemsPerPage && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md border ${
                    index + 1 === currentPage
                      ? "bg-green-700 text-white"
                      : "bg-white text-black hover:bg-green-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
