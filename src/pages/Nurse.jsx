import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BackButton from "../components/BackButton";
const Nurse = () => {
  // Example data for nurses
  const nurses = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Head Nurse",
      department: "Emergency",
      shift: "Day",
    },
    {
      id: 2,
      name: "Emily Davis",
      position: "Nurse",
      department: "Pediatrics",
      shift: "Night",
    },
    {
      id: 3,
      name: "John Smith",
      position: "Nurse",
      department: "ICU",
      shift: "Day",
    },
    {
      id: 4,
      name: "Linda White",
      position: "Nurse",
      department: "Orthopedics",
      shift: "Night",
    },
    {
      id: 5,
      name: "James Brown",
      position: "Nurse",
      department: "Surgery",
      shift: "Day",
    },
    {
      id: 6,
      name: "Rachel Green",
      position: "Nurse",
      department: "Cardiology",
      shift: "Night",
    },
    {
      id: 7,
      name: "Monica Geller",
      position: "Nurse",
      department: "Neurology",
      shift: "Day",
    },
    {
      id: 8,
      name: "Phoebe Buffay",
      position: "Nurse",
      department: "Emergency",
      shift: "Night",
    },
    {
      id: 9,
      name: "Ross Geller",
      position: "Nurse",
      department: "ICU",
      shift: "Day",
    },
    {
      id: 10,
      name: "Chandler Bing",
      position: "Nurse",
      department: "Pediatrics",
      shift: "Night",
    },
    {
      id: 11,
      name: "Janet Jackson",
      position: "Head Nurse",
      department: "Orthopedics",
      shift: "Day",
    },
    {
      id: 12,
      name: "Sophie Turner",
      position: "Nurse",
      department: "Cardiology",
      shift: "Night",
    },
    {
      id: 13,
      name: "Luke Hemsworth",
      position: "Nurse",
      department: "Surgery",
      shift: "Day",
    },
    {
      id: 14,
      name: "Ariana Grande",
      position: "Nurse",
      department: "Neurology",
      shift: "Night",
    },
    {
      id: 15,
      name: "Tom Hanks",
      position: "Nurse",
      department: "Emergency",
      shift: "Day",
    },
    {
      id: 16,
      name: "Taylor Swift",
      position: "Nurse",
      department: "ICU",
      shift: "Night",
    },
    {
      id: 17,
      name: "Chris Hemsworth",
      position: "Head Nurse",
      department: "Cardiology",
      shift: "Day",
    },
    {
      id: 18,
      name: "Kendall Jenner",
      position: "Nurse",
      department: "Pediatrics",
      shift: "Night",
    },
    {
      id: 19,
      name: "Rihanna",
      position: "Nurse",
      department: "Orthopedics",
      shift: "Day",
    },
    {
      id: 20,
      name: "Johnny Depp",
      position: "Nurse",
      department: "Surgery",
      shift: "Night",
    },
    {
      id: 21,
      name: "Emma Stone",
      position: "Head Nurse",
      department: "Neurology",
      shift: "Day",
    },
    {
      id: 22,
      name: "Zendaya",
      position: "Nurse",
      department: "Emergency",
      shift: "Night",
    },
    {
      id: 23,
      name: "Will Smith",
      position: "Nurse",
      department: "Cardiology",
      shift: "Day",
    },
    {
      id: 24,
      name: "Margot Robbie",
      position: "Nurse",
      department: "ICU",
      shift: "Night",
    },
    {
      id: 25,
      name: "Leonardo DiCaprio",
      position: "Head Nurse",
      department: "Surgery",
      shift: "Day",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShift, setSelectedShift] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter nurses by search query and selected shift
  const filteredNurses = nurses.filter(
    (nurse) =>
      (nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.department.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedShift === "All" || nurse.shift === selectedShift)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNurses = filteredNurses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNurses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 mb-16">
      {/* Back Button */}
      <BackButton />

      <h1 className="mb-4 text-3xl font-bold">Nurses</h1>

      {/* Search Bar and Shift Filter */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row">
        <div className="flex items-center w-full p-2 border border-gray-300 rounded-md md:w-2/3">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, position, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.slice(0, 50))} // Limit to 50 characters
            className="w-full outline-none"
          />
        </div>
        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/3"
        >
          <option value="All">All Shifts</option>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
        </select>
      </div>

      {/* Nurses Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        {currentNurses.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border">Name</th>
                <th className="px-4 py-2 text-left border">Position</th>
                <th className="px-4 py-2 text-left border">Department</th>
                <th className="px-4 py-2 text-left border">Shift</th>
              </tr>
            </thead>
            <tbody>
              {currentNurses.map((nurse) => (
                <tr key={nurse.id}>
                  <td className="px-4 py-2 border">{nurse.name}</td>
                  <td className="px-4 py-2 border">{nurse.position}</td>
                  <td className="px-4 py-2 border">{nurse.department}</td>
                  <td className="px-4 py-2 border">{nurse.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-gray-500">No nurses found</div>
        )}
      </div>

      {/* Pagination */}
      {filteredNurses.length > itemsPerPage && (
        <div className="flex flex-wrap justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-md text-sm ${
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

export default Nurse;
