import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaBoxes,
  FaAmbulance,
  FaFileAlt,
} from "react-icons/fa";

const navigationItems = [
  { path: "/", label: "Home", icon: <FaHome /> },
  { path: "/doctor", label: "Doctors", icon: <FaUserMd /> },
  { path: "/nurse", label: "Nurses", icon: <FaUsers /> },
  { path: "/inventory", label: "Inventory", icon: <FaBoxes /> },
  {
    path: "/emergency",
    label: "Emergency",
    icon: <FaAmbulance />,
  },
  { path: "/report", label: "Reports", icon: <FaFileAlt /> },
];

const NavItem = ({ path, label, icon, isExpanded }) => (
  <li className="mb-4">
    <Link
      to={path}
      className="flex items-center block px-4 py-3 text-lg transition-all rounded hover:bg-green-700"
    >
      <span className="mr-4 text-2xl">{icon}</span>
      {isExpanded && label}
    </Link>
  </li>
);

const NavigationDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCompactMode, setIsCompactMode] = useState(false);

  useEffect(() => {
    // Check localStorage for compact mode state
    const savedMode = JSON.parse(localStorage.getItem("compactMode"));
    if (savedMode !== null) {
      setIsCompactMode(savedMode);
    }
  }, []);

  const toggleDrawer = () => setIsExpanded(!isExpanded);

  if (isCompactMode) {
    return null; // Hide navigation drawer if compact mode is enabled
  }

  return (
    <div className="lg:flex">
      <div
        className={`w-${
          isExpanded ? "64" : "16"
        } bg-green-950 text-white min-h-screen p-6 transition-all duration-300 lg:block hidden`}
      >
        <button onClick={toggleDrawer} className="mb-8 text-2xl text-white">
          {isExpanded ? "<" : ">"}
        </button>
        {isExpanded && (
          <h2 className="mb-8 text-3xl font-bold">Hospital Dashboard</h2>
        )}
        <ul>
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              isExpanded={isExpanded}
            />
          ))}
        </ul>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around p-4 text-white lg:hidden bg-green-950">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center p-2 text-lg transition-all rounded hover:bg-green-700"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationDrawer;
