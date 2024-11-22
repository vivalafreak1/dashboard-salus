import React, { useState } from "react";
import { FaAmbulance, FaPhone, FaUsers, FaHeartbeat } from "react-icons/fa";
import BackButton from "../components/BackButton";

const Emergency = () => {
  const [activeCases, setActiveCases] = useState([
    {
      id: 1,
      name: "John Doe",
      type: "Heart Attack",
      status: "In Treatment",
      arrivalTime: "12:30 PM",
      priority: "High",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Fracture",
      status: "Waiting",
      arrivalTime: "01:15 PM",
      priority: "Medium",
      doctor: "Dr. Lee",
    },
    {
      id: 3,
      name: "Mark Lee",
      type: "Stroke",
      status: "In Treatment",
      arrivalTime: "02:00 PM",
      priority: "High",
      doctor: "Dr. Brown",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = activeCases.filter(
    (caseItem) =>
      (selectedCategory === "All" || caseItem.type === selectedCategory) &&
      (selectedStatus === "All" || caseItem.status === selectedStatus) &&
      (selectedPriority === "All" || caseItem.priority === selectedPriority) &&
      caseItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <div className="p-6 mb-16 space-y-8">
      <BackButton />
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Emergency Services
      </h1>

      {/* Emergency Contacts */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Emergency Contacts</h2>
        <ul className="space-y-6">
          <li className="flex items-center text-lg">
            <FaPhone className="mr-4 text-xl text-red-500" />
            Ambulance:{" "}
            <span className="font-bold text-gray-800">+1-800-123-4567</span>
          </li>
          <li className="flex items-center text-lg">
            <FaPhone className="mr-4 text-xl text-orange-500" />
            Fire Department:{" "}
            <span className="font-bold text-gray-800">+1-800-234-5678</span>
          </li>
          <li className="flex items-center text-lg">
            <FaPhone className="mr-4 text-xl text-blue-500" />
            Police:{" "}
            <span className="font-bold text-gray-800">+1-800-345-6789</span>
          </li>
        </ul>
      </div>

      {/* Active Emergency Cases */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Active Emergency Cases</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Emergencies</option>
            <option value="Heart Attack">Heart Attack</option>
            <option value="Fracture">Fracture</option>
            <option value="Stroke">Stroke</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Status</option>
            <option value="In Treatment">In Treatment</option>
            <option value="Waiting">Waiting</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Priority Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Patient Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left border">Patient Name</th>
                <th className="px-4 py-2 text-left border">
                  Type of Emergency
                </th>
                <th className="px-4 py-2 text-left border">Status</th>
                <th className="px-4 py-2 text-left border">Arrival Time</th>
                <th className="px-4 py-2 text-left border">Priority Level</th>
                <th className="px-4 py-2 text-left border">Assigned Doctor</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{caseItem.name}</td>
                  <td className="px-4 py-2 border">{caseItem.type}</td>
                  <td className="px-4 py-2 border">{caseItem.status}</td>
                  <td className="px-4 py-2 border">{caseItem.arrivalTime}</td>
                  <td
                    className={`px-4 py-2 border ${
                      priorityColors[caseItem.priority]
                    }`}
                  >
                    {caseItem.priority}
                  </td>
                  <td className="px-4 py-2 border">{caseItem.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Room Availability */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">
          Emergency Room Availability
        </h2>
        <ul className="space-y-6">
          <li className="flex items-center text-lg">
            <FaUsers className="mr-4 text-xl text-green-500" />
            Room 1: <span className="font-bold text-green-600">Available</span>
          </li>
          <li className="flex items-center text-lg">
            <FaUsers className="mr-4 text-xl text-red-500" />
            Room 2: <span className="font-bold text-red-600">Occupied</span>
          </li>
          <li className="flex items-center text-lg">
            <FaUsers className="mr-4 text-xl text-green-500" />
            Room 3: <span className="font-bold text-green-600">Available</span>
          </li>
        </ul>
      </div>

      {/* Quick Access */}
      <div className="flex flex-wrap justify-center gap-6">
        <button className="flex items-center w-full px-6 py-3 text-white transition-all duration-300 bg-red-600 rounded-lg shadow-md hover:bg-red-700 sm:w-auto">
          <FaAmbulance className="mr-3 text-xl" />
          Request Ambulance
        </button>
        <button className="flex items-center w-full px-6 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 sm:w-auto">
          <FaUsers className="mr-3 text-xl" />
          Call Emergency Team
        </button>
      </div>
    </div>
  );
};

export default Emergency;
