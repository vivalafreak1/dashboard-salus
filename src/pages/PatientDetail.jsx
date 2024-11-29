import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaNotesMedical,
  FaStethoscope,
} from "react-icons/fa";

export default function PatientDetail() {
  const { patientId } = useParams();

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

  const [patient] = useState(initialPatient);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Sort medical history by date in descending order
  const sortedMedicalHistory = [...patient.medicalHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = sortedMedicalHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(patient.medicalHistory.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">Patient Details</h1>

      <div className="space-y-6">
        {/* Patient Info Section */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="space-y-2">
            <div className="flex items-center">
              <FaUser className="mr-2" /> <span>Name: {patient.name}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" /> <span>Age: {patient.age}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2" />{" "}
              <span>Phone: {patient.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />{" "}
              <span>Email: {patient.email}</span>
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">Medical History</h2>
          <table className="min-w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm text-left border">Date</th>
                <th className="px-4 py-2 text-sm text-left border">
                  Condition
                </th>
                <th className="px-4 py-2 text-sm text-left border">Notes</th>
                <th className="px-4 py-2 text-sm text-left border">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {currentHistory.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-2 text-sm border">{entry.date}</td>
                  <td className="px-4 py-2 text-sm border">
                    {entry.condition}
                  </td>
                  <td className="px-4 py-2 text-sm border">{entry.notes}</td>
                  <td className="px-4 py-2 text-sm border">{entry.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {patient.medicalHistory.length > itemsPerPage && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-green-700 text-white"
                      : "bg-white text-black hover:bg-green-200"
                  } text-sm`}
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
