import React, { useState, useEffect } from "react";
import { FaSearch, FaUserMd, FaUsers, FaBoxes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Switch from "react-switch"; // Import react-switch for the toggle

const Home = () => {
  // State to track compact mode
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Example data for total patients, nurses, etc.
  const totalPatients = 100;
  const totalDoctors = 20;
  const totalNurses = 50;
  const totalMedicines = 200;

  useEffect(() => {
    // Check localStorage for compact mode state on initial load
    const savedMode = JSON.parse(localStorage.getItem("compactMode"));
    if (savedMode !== null) {
      setIsCompactMode(savedMode);
    }
  }, []);

  const toggleCompactMode = () => {
    setIsCompactMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("compactMode", JSON.stringify(newMode)); // Save mode to localStorage
      window.location.reload(); // Refresh the page on toggle
      return newMode;
    });
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Home</h1>

      {/* Compact Mode Toggle */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-lg">Compact Mode</label>
        <Switch
          checked={isCompactMode}
          onChange={toggleCompactMode}
          offColor="#888"
          onColor="#4CAF50"
          uncheckedIcon={false}
          checkedIcon={false}
          height={25}
          width={50}
          handleDiameter={20}
        />
      </div>

      {/* Stats Section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
          isCompactMode ? "hidden" : ""
        }`}
      >
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Patients</h2>
          <p className="text-2xl font-bold">{totalPatients}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Doctors</h2>
          <p className="text-2xl font-bold">{totalDoctors}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Nurses</h2>
          <p className="text-2xl font-bold">{totalNurses}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
          <h2 className="text-xl">Total Medicines</h2>
          <p className="text-2xl font-bold">{totalMedicines}</p>
        </div>
      </div>

      {/* New Compact Mode Cards */}
      {isCompactMode && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            to="/doctor"
            className="flex items-center justify-between p-6 text-white bg-green-700 rounded-lg shadow-lg"
          >
            <div>
              <h2 className="text-xl">Doctors</h2>
              <p className="text-sm">View and manage doctors</p>
            </div>
            <FaUserMd className="text-4xl" />
          </Link>

          <Link
            to="/nurse"
            className="flex items-center justify-between p-6 text-white bg-blue-700 rounded-lg shadow-lg"
          >
            <div>
              <h2 className="text-xl">Nurses</h2>
              <p className="text-sm">View and manage nurses</p>
            </div>
            <FaUsers className="text-4xl" />
          </Link>

          <Link
            to="/inventory"
            className="flex items-center justify-between p-6 text-white bg-purple-700 rounded-lg shadow-lg"
          >
            <div>
              <h2 className="text-xl">Inventory</h2>
              <p className="text-sm">View and manage medicines</p>
            </div>
            <FaBoxes className="text-4xl" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
