import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserMd, FaUsers, FaBoxes } from "react-icons/fa"; // Importing icons

const NavigationDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State for toggling the drawer

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded); // Toggle drawer visibility
  };

  return (
    <div className="lg:flex">
      {/* Desktop Sidebar */}
      <div
        className={`w-${
          isExpanded ? "64" : "16"
        } bg-green-950 text-white min-h-screen p-6 transition-all duration-300 lg:block hidden`}
      >
        <button onClick={toggleDrawer} className="text-white mb-8 text-2xl">
          {isExpanded ? "<" : ">"} {/* Arrow symbol to show expand/collapse */}
        </button>
        <h2 className={`text-3xl font-bold mb-8 ${isExpanded ? "" : "hidden"}`}>
          Hospital Dashboard
        </h2>
        <ul>
          <li className="mb-4">
            <Link
              to="/"
              className="block py-3 flex items-center text-lg hover:bg-green-700 px-4 rounded transition-all"
            >
              <FaHome className="mr-4 text-2xl" /> {/* Home icon */}
              {isExpanded && "Home"}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/doctor"
              className="block py-3 flex items-center text-lg hover:bg-green-700 px-4 rounded transition-all"
            >
              <FaUserMd className="mr-4 text-2xl" /> {/* Doctor icon */}
              {isExpanded && "Doctors"}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/nurse"
              className="block py-3 flex items-center text-lg hover:bg-green-700 px-4 rounded transition-all"
            >
              <FaUsers className="mr-4 text-2xl" /> {/* Nurse icon */}
              {isExpanded && "Nurses"}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/inventory"
              className="block py-3 flex items-center text-lg hover:bg-green-700 px-4 rounded transition-all"
            >
              <FaBoxes className="mr-4 text-2xl" /> {/* Inventory icon */}
              {isExpanded && "Inventory"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-green-950 text-white p-4 flex justify-around items-center">
        <Link
          to="/"
          className="flex flex-col items-center text-lg hover:bg-green-700 p-2 rounded transition-all"
        >
          <FaHome className="text-2xl" /> {/* Home icon */}
          {isExpanded && "Home"}
        </Link>
        <Link
          to="/doctor"
          className="flex flex-col items-center text-lg hover:bg-green-700 p-2 rounded transition-all"
        >
          <FaUserMd className="text-2xl" /> {/* Doctor icon */}
          {isExpanded && "Doctors"}
        </Link>
        <Link
          to="/nurse"
          className="flex flex-col items-center text-lg hover:bg-green-700 p-2 rounded transition-all"
        >
          <FaUsers className="text-2xl" /> {/* Nurse icon */}
          {isExpanded && "Nurses"}
        </Link>
        <Link
          to="/inventory"
          className="flex flex-col items-center text-lg hover:bg-green-700 p-2 rounded transition-all"
        >
          <FaBoxes className="text-2xl" /> {/* Inventory icon */}
          {isExpanded && "Inventory"}
        </Link>
      </div>
    </div>
  );
};

export default NavigationDrawer;
