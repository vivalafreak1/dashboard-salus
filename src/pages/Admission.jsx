import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const Admission = () => {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    // Mock data for admissions (to simulate localStorage or API response)
    const mockAdmissions = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Patient ${index + 1}`,
      doctor: `Dr. ${
        index % 3 === 0 ? "Smith" : index % 3 === 1 ? "Jones" : "Williams"
      }`,
      admissionDate: new Date(
        2024,
        index % 12,
        ((index + 1) % 28) + 1
      ).toLocaleDateString(),
      reason: index % 2 === 0 ? "Routine Checkup" : "Emergency Surgery",
    }));

    setAdmissions(mockAdmissions);
    // If you want to persist the data in localStorage, uncomment the next line
    // localStorage.setItem("admissions", JSON.stringify(mockAdmissions));
  }, []);

  return (
    <div className="p-6">
      <BackButton />
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Admissions</h1>

      {/* Create New Admission Button */}
      <div className="flex items-center mb-4">
        <Link
          to="/admission/create"
          className="px-6 py-2 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Create New Admission
        </Link>
      </div>

      {/* Admissions Table */}
      {admissions.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm table-auto">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="px-6 py-3 font-medium text-left">
                  Patient Name
                </th>
                <th className="px-6 py-3 font-medium text-left">Doctor</th>
                <th className="px-6 py-3 font-medium text-left">
                  Admission Date
                </th>
                <th className="px-6 py-3 font-medium text-left">Reason</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {admissions.map((admission) => (
                <tr
                  key={admission.id}
                  className="transition-all duration-200 border-t hover:bg-gray-100"
                >
                  <td className="px-6 py-4">{admission.name}</td>
                  <td className="px-6 py-4">{admission.doctor}</td>
                  <td className="px-6 py-4">{admission.admissionDate}</td>
                  <td className="px-6 py-4">{admission.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-gray-700">No admissions found.</p>
      )}
    </div>
  );
};

export default Admission;
