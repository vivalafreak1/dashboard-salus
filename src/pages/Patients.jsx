import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";

export default function Patients() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      phoneNumber: "8213456789",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      gender: "Female",
      phoneNumber: "987-654-3210",
      email: "jane.smith@example.com",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editingId ? { ...patient, ...formData } : patient
      );
      setPatients(updatedPatients);
      setEditingId(null);
    } else {
      const newPatient = {
        id: patients.length + 1,
        ...formData,
      };
      setPatients([...patients, newPatient]);
    }

    setFormData({
      name: "",
      age: "",
      gender: "",
      phoneNumber: "",
      email: "",
    });

    setShowPopup(false);
  };

  const handleDelete = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient.id);
    setShowPopup(true);
  };

  // Pagination
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = patients.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">Manage Patients</h1>

      <button
        className="px-4 py-2 mb-6 text-sm font-medium text-white bg-green-700 rounded-lg sm:text-base hover:bg-blue-600"
        onClick={() => {
          setFormData({
            name: "",
            age: "",
            gender: "",
            phoneNumber: "",
            email: "",
          });
          setEditingId(null);
          setShowPopup(true);
        }}
      >
        Add New Patient
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg sm:max-w-md">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">
              {editingId ? "Edit Patient" : "Add New Patient"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-md sm:text-base focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-md sm:text-base focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-md sm:text-base focus:ring focus:ring-blue-500"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-md sm:text-base focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-md sm:text-base focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg sm:text-base hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg sm:text-base hover:bg-blue-600"
                  >
                    {editingId ? "Update Patient" : "Add Patient"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patients List */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Patients List</h2>
        {patients.length === 0 ? (
          <p className="text-center text-gray-500">No Patients Found</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left border-b">Name</th>
                  <th className="px-4 py-2 text-left border-b">Age</th>
                  <th className="px-4 py-2 text-left border-b">Gender</th>
                  <th className="px-4 py-2 text-left border-b">Phone Number</th>
                  <th className="px-4 py-2 text-left border-b">Email</th>
                  <th className="px-4 py-2 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      <Link
                        to={`/patients/detail/${patient.id}`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {patient.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border-b">{patient.age}</td>
                    <td className="px-4 py-2 border-b">{patient.gender}</td>
                    <td className="px-4 py-2 border-b">
                      {patient.phoneNumber}
                    </td>
                    <td className="px-4 py-2 border-b">{patient.email}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="p-2 text-sm text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="p-2 text-sm text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-green-700 text-white"
                      : "bg-white text-black hover:bg-green-200"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
