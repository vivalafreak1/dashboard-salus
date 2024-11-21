import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserMd, FaUsers, FaBoxes } from "react-icons/fa"; // Importing icons

const NavigationDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State for toggling the drawer

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded); // Toggle drawer visibility
  };

  return (
    <div
      className={`w-${
        isExpanded ? "64" : "16"
      } bg-green-950 text-white min-h-screen p-4 transition-all duration-300`}
    >
      <button onClick={toggleDrawer} className="text-white mb-6 text-lg">
        {isExpanded ? "<" : ">"} {/* Arrow symbol to show expand/collapse */}
      </button>
      <h2 className={`text-2xl font-bold mb-6 ${isExpanded ? "" : "hidden"}`}>
        Hospital Dashboard
      </h2>
      <ul>
        <li>
          <Link to="/" className="block py-2 flex items-center">
            <FaHome className="mr-3" /> {/* Home icon */}
            {isExpanded && "Home"}
          </Link>
        </li>
        <li>
          <Link to="/doctor" className="block py-2 flex items-center">
            <FaUserMd className="mr-3" /> {/* Doctor icon */}
            {isExpanded && "Doctors"}
          </Link>
        </li>
        <li>
          <Link to="/nurse" className="block py-2 flex items-center">
            <FaUsers className="mr-3" /> {/* Nurse icon */}
            {isExpanded && "Nurses"}
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="block py-2 flex items-center">
            <FaBoxes className="mr-3" /> {/* Inventory icon */}
            {isExpanded && "Inventory"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationDrawer;
