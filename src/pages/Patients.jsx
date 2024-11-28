import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import BackButton from "../components/BackButton";

export default function Patients() {
  // State for patients and form data
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
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
  };

  // Handle deleting a patient
  const handleDelete = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  // Handle editing a patient
  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient.id);
  };

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">Manage Patients</h1>

      {/* Create/Update Patient Form */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {editingId ? "Edit Patient" : "Add New Patient"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter patient name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
                maxLength="50"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter patient age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter patient phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter patient email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {editingId ? "Update Patient" : "Add Patient"}
            </button>
          </div>
        </form>
      </div>

      {/* Patients List */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Patients List</h2>
        {patients.length === 0 ? (
          <p className="text-center text-gray-500">No Patients Found</p>
        ) : (
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
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{patient.name}</td>
                  <td className="px-4 py-2 border-b">{patient.age}</td>
                  <td className="px-4 py-2 border-b">{patient.gender}</td>
                  <td className="px-4 py-2 border-b">{patient.phoneNumber}</td>
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
        )}
      </div>
    </div>
  );
}
