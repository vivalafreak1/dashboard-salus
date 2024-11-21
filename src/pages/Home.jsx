// src/pages/Home.jsx
import React from "react";

const Home = () => {
  // Example data for total patients, nurses, etc.
  const totalPatients = 100;
  const totalDoctors = 20;
  const totalNurses = 50;
  const totalMedicines = 200;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Patients</h2>
          <p className="text-2xl font-bold">{totalPatients}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Doctors</h2>
          <p className="text-2xl font-bold">{totalDoctors}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Nurses</h2>
          <p className="text-2xl font-bold">{totalNurses}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Medicines</h2>
          <p className="text-2xl font-bold">{totalMedicines}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
