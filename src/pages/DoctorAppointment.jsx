import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import BackButton from "../components/BackButton";

const DoctorAppointment = () => {
  // State for appointments and form data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      appointmentDate: "2024-11-25",
      time: "10:00",
      status: "Ongoing",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Lee",
      appointmentDate: "2024-11-26",
      time: "02:00",
      status: "Finished",
    },
    {
      id: 3,
      patientName: "Mark Lee",
      doctorName: "Dr. Williams",
      appointmentDate: "2024-11-27",
      time: "09:00",
      status: "Cancelled",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    time: "",
    status: "Ongoing", // Default status
  });

  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get current date for date validation
  const currentDate = new Date().toISOString().split("T")[0];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingId
          ? { ...appointment, ...formData }
          : appointment
      );
      setAppointments(updatedAppointments);
      setEditingId(null);
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
      };
      setAppointments([...appointments, newAppointment]);
    }

    setFormData({
      patientName: "",
      doctorName: "",
      appointmentDate: "",
      time: "",
      status: "Ongoing", // Reset to default status
    });
  };

  // Handle deleting an appointment
  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
  };

  // Handle editing an appointment
  const handleEdit = (appointment) => {
    setFormData(appointment);
    setEditingId(appointment.id);
  };

  // Handle searching appointments
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchQuery) ||
      appointment.doctorName.toLowerCase().includes(searchQuery)
  );

  // Sorting appointments by date
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);
    return dateA - dateB;
  });

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">
        Doctor Appointments
      </h1>

      {/* Create/Update Appointment Form */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          {editingId ? "Edit Appointment" : "Create New Appointment"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Patient Name
              </label>
              <input
                type="text"
                name="patientName"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
                maxLength="50" // Limit to 50 characters
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Doctor Name
              </label>
              <input
                type="text"
                name="doctorName"
                placeholder="Enter doctor name"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
                maxLength="50" // Limit to 50 characters
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Appointment Date
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
                min={currentDate} // Prevent selecting past dates
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
              />
            </div>
            {/* Status Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
                required
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Finished">Finished</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {editingId ? "Update Appointment" : "Save Appointment"}
            </button>
          </div>
        </form>
      </div>

      {/* Appointments List */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Appointments List</h2>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by patient or doctor"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 mb-4 border rounded-md focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-200 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border border-gray-200">
                  ID
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Patient Name
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Doctor Name
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Date
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Time
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Status
                </th>{" "}
                {/* New column */}
                <th className="px-4 py-2 text-left border border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No data
                  </td>
                </tr>
              ) : (
                sortedAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-4 py-2 border border-gray-200">
                      {appointment.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {appointment.patientName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {appointment.doctorName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {appointment.appointmentDate}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {appointment.time}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      <span
                        className={`px-2 py-1 rounded ${
                          appointment.status === "Ongoing"
                            ? "bg-yellow-400"
                            : appointment.status === "Finished"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="px-2 py-1 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
