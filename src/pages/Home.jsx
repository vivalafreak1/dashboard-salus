import React, { useState, useEffect, useMemo } from "react";
import {
  FaUserMd,
  FaUsers,
  FaBoxes,
  FaAmbulance,
  FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Switch from "react-switch"; // Import react-switch for the toggle

const Card = ({ title, value, color, icon: Icon, link }) => (
  <Link
    to={link}
    className={`flex items-center justify-between p-6 text-white ${color} rounded-lg shadow-lg`}
  >
    <div>
      <h2 className="text-xl">{title}</h2>
      <p className="text-sm">{value}</p>
    </div>
    <Icon className="text-4xl" />
  </Link>
);

const Home = () => {
  // State to track compact mode
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Example data for total patients, nurses, etc.
  const totalPatients = 100;
  const totalDoctors = 20;
  const totalNurses = 50;
  const totalMedicines = 200;

  // Use useMemo to memoize values that are not changing frequently
  const stats = useMemo(
    () => [
      { title: "Total Patients", value: totalPatients, color: "bg-blue-100" },
      { title: "Total Doctors", value: totalDoctors, color: "bg-green-100" },
      { title: "Total Nurses", value: totalNurses, color: "bg-purple-100" },
      {
        title: "Total Medicines",
        value: totalMedicines,
        color: "bg-yellow-100",
      },
    ],
    [totalPatients, totalDoctors, totalNurses, totalMedicines]
  );

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
      window.location.reload();
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
      {!isCompactMode && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 ${stat.color} rounded-lg shadow-lg`}
            >
              <h2 className="text-xl">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* New Compact Mode Cards */}
      {isCompactMode && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            title="Doctors"
            value="View and manage doctors"
            color="bg-green-700"
            icon={FaUserMd}
            link="/doctor"
          />
          <Card
            title="Nurses"
            value="View and manage nurses"
            color="bg-blue-700"
            icon={FaUsers}
            link="/nurse"
          />
          <Card
            title="Inventory"
            value="View and manage medicines"
            color="bg-purple-700"
            icon={FaBoxes}
            link="/inventory"
          />
          {/* Emergency Services Card */}
          <Card
            title="Emergency Services"
            value="View emergency services"
            color="bg-red-700"
            icon={FaAmbulance}
            link="/emergency"
          />
          <Card
            title="Reports"
            value="View system reports"
            color="bg-teal-700"
            icon={FaFileAlt}
            link="/report"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
