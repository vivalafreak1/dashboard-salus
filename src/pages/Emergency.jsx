import React, { useState } from "react";
import { FaAmbulance, FaPhone, FaUsers } from "react-icons/fa";
import BackButton from "../components/BackButton";

const Emergency = () => {
  const [activeCases, setActiveCases] = useState([
    { id: 1, name: "John Doe", type: "Heart Attack", status: "In Treatment" },
    { id: 2, name: "Jane Smith", type: "Fracture", status: "Waiting" },
    { id: 3, name: "Mark Lee", type: "Stroke", status: "In Treatment" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCases = activeCases.filter(
    (caseItem) =>
      selectedCategory === "All" || caseItem.type === selectedCategory
  );

  return (
    <div className="p-4 mb-16">
      <BackButton />
      <h1 className="mb-4 text-3xl font-bold">Emergency Services</h1>

      {/* Emergency Contacts */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Emergency Contacts</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FaPhone className="mr-4 text-xl" />
            Ambulance: <span className="font-bold">+1-800-123-4567</span>
          </li>
          <li className="flex items-center">
            <FaPhone className="mr-4 text-xl" />
            Fire Department: <span className="font-bold">+1-800-234-5678</span>
          </li>
          <li className="flex items-center">
            <FaPhone className="mr-4 text-xl" />
            Police: <span className="font-bold">+1-800-345-6789</span>
          </li>
        </ul>
      </div>

      {/* Active Emergency Cases */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Active Emergency Cases</h2>
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Emergencies</option>
            <option value="Heart Attack">Heart Attack</option>
            <option value="Fracture">Fracture</option>
            <option value="Stroke">Stroke</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border">Patient Name</th>
                <th className="px-4 py-2 text-left border">
                  Type of Emergency
                </th>
                <th className="px-4 py-2 text-left border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="px-4 py-2 border">{caseItem.name}</td>
                  <td className="px-4 py-2 border">{caseItem.type}</td>
                  <td className="px-4 py-2 border">{caseItem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Room Availability */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Emergency Room Availability
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FaUsers className="mr-4 text-xl" />
            Room 1: <span className="font-bold text-green-500">Available</span>
          </li>
          <li className="flex items-center">
            <FaUsers className="mr-4 text-xl" />
            Room 2: <span className="font-bold text-red-500">Occupied</span>
          </li>
          <li className="flex items-center">
            <FaUsers className="mr-4 text-xl" />
            Room 3: <span className="font-bold text-green-500">Available</span>
          </li>
        </ul>
      </div>

      {/* Quick Access */}
      <div className="flex flex-wrap gap-6">
        <button className="flex items-center px-4 py-2 text-white bg-red-600 rounded-lg">
          <FaAmbulance className="mr-2 text-xl" />
          Request Ambulance
        </button>
        <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg">
          <FaUsers className="mr-2 text-xl" />
          Call Emergency Team
        </button>
      </div>
    </div>
  );
};

export default Emergency;
