import React from "react";

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
    // More nurse data here...
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Nurses</h1>
      {/* Nurse Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Position</th>
              <th className="border px-4 py-2 text-left">Department</th>
              <th className="border px-4 py-2 text-left">Shift</th>
            </tr>
          </thead>
          <tbody>
            {nurses.map((nurse) => (
              <tr key={nurse.id}>
                <td className="border px-4 py-2">{nurse.name}</td>
                <td className="border px-4 py-2">{nurse.position}</td>
                <td className="border px-4 py-2">{nurse.department}</td>
                <td className="border px-4 py-2">{nurse.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nurse;
