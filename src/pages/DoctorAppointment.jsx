import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import BackButton from "../components/BackButton";

const DoctorAppointment = () => {
  // State for appointments and form data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      appointmentDate: "2024-11-25",
      time: "10:00 AM",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Lee",
      appointmentDate: "2024-11-26",
      time: "02:00 PM",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    time: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: appointments.length + 1,
      ...formData,
    };
    setAppointments([...appointments, newAppointment]);
    setFormData({
      patientName: "",
      doctorName: "",
      appointmentDate: "",
      time: "",
    });
  };

  // Handle deleting an appointment
  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div className="p-4 mb-16 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">
        Doctor Appointments
      </h1>

      {/* Create Appointment Form */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Create New Appointment</h2>
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
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>

      {/* Appointments List */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Appointments List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-200 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border border-gray-200">
                  #
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
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
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
