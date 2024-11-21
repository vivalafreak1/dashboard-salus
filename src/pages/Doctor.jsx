// src/pages/Doctor.jsx
import React from "react";

const Doctor = () => {
  const doctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiology" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Neurology" },
    // More doctors...
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Doctors</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Specialty</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="border px-4 py-2">{doctor.name}</td>
              <td className="border px-4 py-2">{doctor.specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctor;
