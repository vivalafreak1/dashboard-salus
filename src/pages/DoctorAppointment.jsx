import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import BackButton from "../components/BackButton";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [displayMode, setDisplayMode] = useState("table"); // State to control display mode
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null); // State to store hovered date for hover details

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter appointments based on search query and selected status
  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchQuery) ||
        appointment.doctorName.toLowerCase().includes(searchQuery)
    )
    .filter(
      (appointment) =>
        selectedStatus === "All" || appointment.status === selectedStatus
    )
    .filter(
      (appointment) =>
        new Date(appointment.appointmentDate).toDateString() ===
        selectedDate.toDateString()
    );

  const historyAppointments = appointments
    .filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchQuery) ||
        appointment.doctorName.toLowerCase().includes(searchQuery)
    )
    .filter(
      (appointment) =>
        selectedStatus === "All" || appointment.status === selectedStatus
    );

  // Sorting appointments by date
  const sortedAppointments = historyAppointments.sort((a, b) => {
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);
    return dateA - dateB;
  });

  // Highlight days with appointments
  const tileClassName = ({ date }) => {
    const appointmentsOnDate = appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDate).toDateString() ===
        date.toDateString()
    );
    if (appointmentsOnDate.length > 0) {
      return "bg-blue-100"; // Highlight days with appointments
    }
    return "";
  };

  const tileContent = ({ date }) => {
    const appointmentsOnDate = appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDate).toDateString() ===
        date.toDateString()
    );
    if (appointmentsOnDate.length > 0) {
      return (
        <div className="text-xs text-center">
          {appointmentsOnDate.map((appointment) => (
            <div key={appointment.id} className="p-1">
              <div className="overflow-hidden text-blue-600">
                {appointment.doctorName}
              </div>
              <div className="text-gray-600">{appointment.time}</div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">
        Doctor Appointments
      </h1>

      {/* Calendar Display */}
      <div className="mb-6">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          tileContent={tileContent}
          onMouseEnter={(e) => setHoveredDate(e.target)} // Hover event to show details
        />
      </div>

      {/* Display Appointment Info on Calendar Date Hover */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Appointments on {selectedDate.toDateString()}
        </h2>
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-gray-500">No Appointments</p>
          ) : (
            appointments
              .filter(
                (appointment) =>
                  new Date(appointment.appointmentDate).toDateString() ===
                  selectedDate.toDateString()
              )
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 bg-white border rounded-md shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{appointment.patientName}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2 text-sm text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="p-2 text-sm text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">
                    <strong>Doctor:</strong> {appointment.doctorName}
                  </p>
                  <p className="text-sm">
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p
                    className={`text-sm ${
                      appointment.status === "Finished"
                        ? "text-green-500"
                        : appointment.status === "Cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>

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
        {/* Display Mode Toggle */}
        <div className="flex items-center mb-4 space-x-4">
          <button
            onClick={() => setDisplayMode("list")}
            className={`px-4 py-2 text-sm rounded-md ${
              displayMode === "list" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            List Mode
          </button>
          <button
            onClick={() => setDisplayMode("table")}
            className={`px-4 py-2 text-sm rounded-md ${
              displayMode === "table" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            Table Mode
          </button>
        </div>

        {/* Search and Status Filter */}
        <div className="flex items-center mb-4 space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Patient or Doctor"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          />

          {/* Status Filter Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Finished">Finished</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Appointments Rendering */}
        {displayMode === "list" ? (
          <div className="space-y-4">
            {sortedAppointments.length === 0 ? (
              <p className="text-center text-gray-500">No Data</p>
            ) : (
              sortedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 bg-white border rounded-md shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{appointment.patientName}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2 text-sm text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="p-2 text-sm text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">
                    <strong>Doctor:</strong> {appointment.doctorName}
                  </p>
                  <p className="text-sm">
                    <strong>Date:</strong> {appointment.appointmentDate}{" "}
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p
                    className={`text-sm ${
                      appointment.status === "Finished"
                        ? "text-green-500"
                        : appointment.status === "Cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Patient Name</th>
                <th className="px-4 py-2 text-left">Doctor Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No Data
                  </td>
                </tr>
              ) : (
                sortedAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t">
                    <td className="px-4 py-2">{appointment.patientName}</td>
                    <td className="px-4 py-2">{appointment.doctorName}</td>
                    <td className="px-4 py-2">{appointment.appointmentDate}</td>
                    <td className="px-4 py-2">{appointment.time}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`${
                          appointment.status === "Finished"
                            ? "text-green-500"
                            : appointment.status === "Cancelled"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2 mr-1 text-sm text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="p-2 text-sm text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
