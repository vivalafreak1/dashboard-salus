import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";

const Admission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Retrieve data from localStorage
    const storedAdmissions =
      JSON.parse(localStorage.getItem("admissions")) || [];

    if (storedAdmissions.length === 0) {
      // If no data in localStorage, use mock data
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
      localStorage.setItem("admissions", JSON.stringify(mockAdmissions));
      setAdmissions(mockAdmissions);
    } else {
      setAdmissions(storedAdmissions);
    }
  }, []);

  useEffect(() => {
    // Save admissions to localStorage whenever they change
    localStorage.setItem("admissions", JSON.stringify(admissions));
  }, [admissions]);

  // Filtered admissions based on search and doctor selection
  const filteredAdmissions = admissions.filter(
    (admission) =>
      (admission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admission.reason.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDoctor === "All" || admission.doctor === selectedDoctor)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmissions = filteredAdmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admission?")) {
      setAdmissions(admissions.filter((admission) => admission.id !== id));
    }
  };

  const handleEdit = (id) => {
    const admission = admissions.find((admission) => admission.id === id);
    const updatedName = prompt("Edit Patient's Name:", admission.name);
    const updatedReason = prompt("Edit Admission Reason:", admission.reason);
    const updatedDoctor = prompt("Edit Assigned Doctor:", admission.doctor);

    if (updatedName && updatedReason && updatedDoctor) {
      setAdmissions(
        admissions.map((admission) =>
          admission.id === id
            ? {
                ...admission,
                name: updatedName,
                reason: updatedReason,
                doctor: updatedDoctor,
              }
            : admission
        )
      );
    }
  };

  return (
    <div className="p-6 mb-16">
      <BackButton />
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Admissions</h1>

      {/* Create New Admission Button */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/admission/create"
          className="px-6 py-2 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          Create New Admission
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:gap-6">
        <div className="flex items-center p-2 border border-gray-300 rounded-md md:w-2/3">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="p-2 border border-gray-300 rounded-md md:w-1/3"
        >
          <option value="All">All Doctors</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Jones">Dr. Jones</option>
          <option value="Dr. Williams">Dr. Williams</option>
        </select>
      </div>

      {/* Admissions Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        {currentAdmissions.length > 0 ? (
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
                <th className="px-6 py-3 font-medium text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {currentAdmissions.map((admission) => (
                <tr
                  key={admission.id}
                  className="transition-all duration-200 border-t hover:bg-gray-100"
                >
                  <td className="px-6 py-4">{admission.name}</td>
                  <td className="px-6 py-4">{admission.doctor}</td>
                  <td className="px-6 py-4">{admission.admissionDate}</td>
                  <td className="px-6 py-4">{admission.reason}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(admission.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(admission.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center text-gray-500">No admissions found.</p>
        )}
      </div>

      {/* Pagination */}
      {filteredAdmissions.length > itemsPerPage && (
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

export default Admission;
