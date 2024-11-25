import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing necessary icons
import { Link } from "react-router-dom"; // Import Link to handle navigation
import BackButton from "../components/BackButton";

const Doctor = () => {
  const initialDoctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiology", shift: "Morning" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Neurology", shift: "Evening" },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Pediatrics",
      shift: "Night",
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      specialty: "Orthopedics",
      shift: "Morning",
    },
    {
      id: 5,
      name: "Dr. Sarah Davis",
      specialty: "Dermatology",
      shift: "Evening",
    },
    { id: 6, name: "Dr. Kevin Lee", specialty: "Cardiology", shift: "Night" },
    {
      id: 7,
      name: "Dr. Olivia Martinez",
      specialty: "Radiology",
      shift: "Morning",
    },
    {
      id: 8,
      name: "Dr. William Harris",
      specialty: "Neurology",
      shift: "Evening",
    },
    {
      id: 9,
      name: "Dr. Sophia Clark",
      specialty: "Pediatrics",
      shift: "Night",
    },
    {
      id: 10,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      shift: "Morning",
    },
    {
      id: 11,
      name: "Dr. Mia Thomas",
      specialty: "Dermatology",
      shift: "Evening",
    },
    {
      id: 12,
      name: "Dr. Alexander Moore",
      specialty: "Radiology",
      shift: "Night",
    },
    {
      id: 13,
      name: "Dr. Emma Walker",
      specialty: "Cardiology",
      shift: "Morning",
    },
    {
      id: 14,
      name: "Dr. Benjamin Hall",
      specialty: "Neurology",
      shift: "Evening",
    },
    {
      id: 15,
      name: "Dr. Isabella Young",
      specialty: "Pediatrics",
      shift: "Night",
    },
    {
      id: 16,
      name: "Dr. Daniel Allen",
      specialty: "Orthopedics",
      shift: "Morning",
    },
    {
      id: 17,
      name: "Dr. Chloe Scott",
      specialty: "Dermatology",
      shift: "Evening",
    },
    { id: 18, name: "Dr. Lucas Adams", specialty: "Radiology", shift: "Night" },
    {
      id: 19,
      name: "Dr. Harper Nelson",
      specialty: "Cardiology",
      shift: "Morning",
    },
    {
      id: 20,
      name: "Dr. Ella Carter",
      specialty: "Neurology",
      shift: "Evening",
    },
  ];

  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShift, setSelectedShift] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter doctors by search query and selected shift
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedShift === "All" || doctor.shift === selectedShift)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    }
  };

  const handleEdit = (id) => {
    const doctor = doctors.find((doctor) => doctor.id === id);
    const updatedName = prompt("Edit Doctor's Name:", doctor.name);
    const updatedSpecialty = prompt(
      "Edit Doctor's Specialty:",
      doctor.specialty
    );
    const updatedShift = prompt("Edit Doctor's Shift:", doctor.shift);

    if (updatedName && updatedSpecialty && updatedShift) {
      setDoctors(
        doctors.map((doctor) =>
          doctor.id === id
            ? {
                ...doctor,
                name: updatedName,
                specialty: updatedSpecialty,
                shift: updatedShift,
              }
            : doctor
        )
      );
    }
  };

  return (
    <div className="p-4 mb-16">
      <BackButton />

      <h1 className="mb-4 text-3xl font-bold">Doctors</h1>

      {/* Add Create Doctor button */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/doctor/create"
          className="flex items-center px-4 py-2 space-x-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FaPlus /> {/* Plus icon */}
          <span>Create New Doctor</span>
        </Link>
      </div>

      {/* Search Bar and Shift Filter */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:gap-6">
        <div className="flex items-center p-2 border border-gray-300 rounded-md md:w-2/3">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className="p-2 border border-gray-300 rounded-md md:w-1/3"
        >
          <option value="All">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        {currentDoctors.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border">Doctor Name</th>
                <th className="px-4 py-2 text-left border">Specialty</th>
                <th className="px-4 py-2 text-left border">Shift</th>
                <th className="px-4 py-2 text-left border">Action</th>{" "}
                {/* New column */}
              </tr>
            </thead>
            <tbody>
              {currentDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-4 py-2 border">{doctor.name}</td>
                  <td className="px-4 py-2 border">{doctor.specialty}</td>
                  <td className="px-4 py-2 border">{doctor.shift}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(doctor.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit /> {/* Edit Icon */}
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt /> {/* Delete Icon */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-gray-500">No doctors found</div>
        )}
      </div>

      {/* Pagination */}
      {filteredDoctors.length > itemsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === index + 1
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
  );
};

export default Doctor;
