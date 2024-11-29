import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const PatientDetail = () => {
  const { patientId } = useParams(); // Get the patientId from the route parameter

  // Dummy patient data for now
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
    ],
  };

  const [patient, setPatient] = useState(initialPatient);
  const [newHistory, setNewHistory] = useState({
    date: "",
    condition: "",
    notes: "",
    doctor: "",
  });
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editedPatient, setEditedPatient] = useState(initialPatient);

  // Handle input changes for editing details
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited details
  const handleSaveDetails = () => {
    setPatient(editedPatient);
    setIsEditingDetails(false);
  };

  // Handle input changes for new medical history
  const handleHistoryChange = (e) => {
    const { name, value } = e.target;
    setNewHistory((prevHistory) => ({
      ...prevHistory,
      [name]: value,
    }));
  };

  // Add new medical history entry
  const handleAddHistory = () => {
    const updatedHistory = [
      ...patient.medicalHistory,
      { ...newHistory, id: Date.now() },
    ];
    setPatient((prevPatient) => ({
      ...prevPatient,
      medicalHistory: updatedHistory,
    }));
    setNewHistory({ date: "", condition: "", notes: "", doctor: "" }); // Reset form
  };

  // Remove a medical history entry
  const handleRemoveHistory = (id) => {
    const updatedHistory = patient.medicalHistory.filter(
      (entry) => entry.id !== id
    );
    setPatient((prevPatient) => ({
      ...prevPatient,
      medicalHistory: updatedHistory,
    }));
  };

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">Patient Details</h1>

      <div className="space-y-6">
        {/* Edit Patient Details Section */}
        {isEditingDetails ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={editedPatient.name}
              onChange={handleDetailChange}
              className="w-full p-2 border rounded-md"
              placeholder="Name"
            />
            <input
              type="number"
              name="age"
              value={editedPatient.age}
              onChange={handleDetailChange}
              className="w-full p-2 border rounded-md"
              placeholder="Age"
            />
            <select
              name="gender"
              value={editedPatient.gender}
              onChange={handleDetailChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={editedPatient.phoneNumber}
              onChange={handleDetailChange}
              className="w-full p-2 border rounded-md"
              placeholder="Phone Number"
            />
            <input
              type="email"
              name="email"
              value={editedPatient.email}
              onChange={handleDetailChange}
              className="w-full p-2 border rounded-md"
              placeholder="Email"
            />
            <button
              onClick={handleSaveDetails}
              className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingDetails(false)}
              className="px-6 py-2 ml-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl font-semibold">
              Name: <span className="font-normal">{patient.name}</span>
            </p>
            <p className="text-xl font-semibold">
              Age: <span className="font-normal">{patient.age}</span>
            </p>
            <p className="text-xl font-semibold">
              Gender: <span className="font-normal">{patient.gender}</span>
            </p>
            <p className="text-xl font-semibold">
              Phone Number:{" "}
              <span className="font-normal">{patient.phoneNumber}</span>
            </p>
            <p className="text-xl font-semibold">
              Email: <span className="font-normal">{patient.email}</span>
            </p>
            <button
              onClick={() => setIsEditingDetails(true)}
              className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Edit Details
            </button>
          </div>
        )}

        {/* Medical History Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Medical History</h2>
          <div className="mt-4 space-y-4">
            {patient.medicalHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between p-4 border rounded-md"
              >
                <div>
                  <p>
                    <strong>Date:</strong> {entry.date}
                  </p>
                  <p>
                    <strong>Condition:</strong> {entry.condition}
                  </p>
                  <p>
                    <strong>Notes:</strong> {entry.notes}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {entry.doctor}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveHistory(entry.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add New History Entry */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Add New Entry</h3>
            <div className="space-y-2">
              <input
                type="date"
                name="date"
                value={newHistory.date}
                onChange={handleHistoryChange}
                className="w-full p-2 border rounded-md"
                placeholder="Date"
              />
              <input
                type="text"
                name="condition"
                value={newHistory.condition}
                onChange={handleHistoryChange}
                className="w-full p-2 border rounded-md"
                placeholder="Condition"
              />
              <textarea
                name="notes"
                value={newHistory.notes}
                onChange={handleHistoryChange}
                className="w-full p-2 border rounded-md"
                placeholder="Notes"
              />
              <input
                type="text"
                name="doctor"
                value={newHistory.doctor}
                onChange={handleHistoryChange}
                className="w-full p-2 border rounded-md"
                placeholder="Doctor"
              />
            </div>
            <button
              onClick={handleAddHistory}
              className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
