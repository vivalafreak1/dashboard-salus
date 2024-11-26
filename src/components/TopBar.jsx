import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // User icon from react-icons
import logo from "../assets/hospitallogo.png";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({ name: "Arief Taufik Rahman" }); // Default user name
  const dropdownRef = useRef(null); // To detect clicks outside of the dropdown
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    // Clear session or localStorage for logout
    console.log("Logging out...");
    setUser({ name: null });
    navigate("/login");
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-4 text-black bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Hotel Management Logo"
          className="object-contain w-12 h-12" // Adjust size for better mobile responsiveness
        />
        <span className="text-xl font-bold">PT Klinik Sehat Bahagia</span>
      </div>

      {/* Account Section */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 text-lg focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen ? "true" : "false"}
        >
          <FaUserCircle className="text-2xl" />
          <span>{user.name}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 z-10 w-48 mt-2 text-gray-800 bg-white rounded-lg shadow-lg"
            aria-label="User menu"
          >
            <div className="px-4 py-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 mt-2 text-sm text-left text-red-500 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
