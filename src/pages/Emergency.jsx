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

  const [ambulances, setAmbulances] = useState([
    {
      id: 1,
      name: "Ambulance 101",
      available: true,
      phone: "+1-800-111-2222",
      patient: "",
    },
    {
      id: 2,
      name: "Ambulance 102",
      available: false,
      phone: "+1-800-222-3333",
      patient: "",
    },
    {
      id: 3,
      name: "Ambulance 103",
      available: true,
      phone: "+1-800-333-4444",
      patient: "",
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

  const handleCall = (phone) => {
    // Handle calling the ambulance
    alert(`Calling ambulance at: ${phone}`);
  };

  const handleEditStatus = (id) => {
    const updatedAmbulances = ambulances.map((ambulance) =>
      ambulance.id === id
        ? { ...ambulance, available: !ambulance.available }
        : ambulance
    );
    setAmbulances(updatedAmbulances);
  };

  const handleAssignPatient = (id) => {
    const patientName = prompt("Enter patient name:");
    const updatedAmbulances = ambulances.map((ambulance) =>
      ambulance.id === id ? { ...ambulance, patient: patientName } : ambulance
    );
    setAmbulances(updatedAmbulances);
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

      {/* Ambulance List */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Available Ambulances</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border">Ambulance Name</th>
              <th className="px-4 py-2 text-left border">Phone</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Patient</th>
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ambulances.map((ambulance) => (
              <tr key={ambulance.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{ambulance.name}</td>
                <td className="px-4 py-2 border">{ambulance.phone}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 text-white rounded-md ${
                      ambulance.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {ambulance.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-4 py-2 border">{ambulance.patient}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleCall(ambulance.phone)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  >
                    <FaPhone className="mr-2" />
                  </button>
                  <button
                    onClick={() => handleEditStatus(ambulance.id)}
                    className="px-4 py-2 ml-2 text-white bg-yellow-500 rounded-md"
                  >
                    Edit Status
                  </button>
                  <button
                    onClick={() => handleAssignPatient(ambulance.id)}
                    className="px-4 py-2 ml-2 text-white bg-green-500 rounded-md"
                  >
                    Assign Patient
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <th className="px-4 py-2 text-left border">Patient</th>
                <th className="px-4 py-2 text-left border">Emergency Type</th>
                <th className="px-4 py-2 text-left border">Status</th>
                <th className="px-4 py-2 text-left border">Priority</th>
                <th className="px-4 py-2 text-left border">Assigned Doctor</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{caseItem.name}</td>
                  <td className="px-4 py-2 border">{caseItem.type}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-3 py-1 text-white rounded-md ${
                        priorityColors[caseItem.priority]
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{caseItem.priority}</td>
                  <td className="px-4 py-2 border">{caseItem.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
