import React, { useState, useEffect, useMemo } from "react";
import {
  FaUserMd,
  FaUsers,
  FaHeartbeat,
  FaStethoscope, // For Doctor
  FaClinicMedical, // For Nurse
  FaProcedures, // For Patient
  FaHandshake, // For BPJS Patient
  FaUserShield, // For Employee
  FaCog, // For Operator
  FaBoxes,
  FaAmbulance,
  FaFileAlt,
  FaCalendarCheck,
  FaHospitalAlt,
} from "react-icons/fa";
import Switch from "react-switch"; // Import react-switch for the toggle
import CompactModeCard from "../components/CompactModeCard";

const Home = () => {
  // State to track compact mode
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Example data for total patients, nurses, etc.
  const totalPatients = 100;
  const totalDoctors = 20;
  const totalNurses = 50;
  const totalMedicines = 200;
  const totalBPJSPatients = 30;
  const totalEmployees = 100;
  const totalOperators = 15;

  // Use useMemo to memoize values that are not changing frequently
  const stats = useMemo(
    () => [
      {
        title: "Total Patients",
        value: totalPatients,
        color: "bg-blue-100",
        icon: FaHeartbeat,
      },
      {
        title: "Total Doctors",
        value: totalDoctors,
        color: "bg-green-100",
        icon: FaUserMd,
      },
      {
        title: "Total Nurses",
        value: totalNurses,
        color: "bg-purple-100",
        icon: FaClinicMedical,
      },
      {
        title: "Total BPJS Patients",
        value: totalBPJSPatients,
        color: "bg-teal-100",
        icon: FaHandshake,
      },
      {
        title: "Total Employees",
        value: totalEmployees,
        color: "bg-orange-100",
        icon: FaUserShield,
      },
      {
        title: "Total Operators",
        value: totalOperators,
        color: "bg-red-100",
        icon: FaCog,
      },
      {
        title: "Total Medicines",
        value: totalMedicines,
        color: "bg-yellow-100",
        icon: FaBoxes,
      },
    ],
    [
      totalPatients,
      totalDoctors,
      totalNurses,
      totalBPJSPatients,
      totalEmployees,
      totalOperators,
      totalMedicines,
    ]
  );

  const cardData = useMemo(
    () => [
      {
        title: "Doctors",
        value: "View and manage doctors",
        color: "bg-green-700",
        icon: FaUserMd,
        link: "/doctor",
      },
      {
        title: "Nurses",
        value: "View and manage nurses",
        color: "bg-blue-700",
        icon: FaUsers,
        link: "/nurse",
      },
      {
        title: "Patients",
        value: "View and manage patients",
        color: "bg-pink-700",
        icon: FaHeartbeat,
        link: "/patients",
      },
      {
        title: "Appointments",
        value: "Schedule and manage appointments",
        color: "bg-orange-600",
        icon: FaCalendarCheck,
        link: "/appointment",
      },
      {
        title: "Admissions",
        value: "Manage patient admissions",
        color: "bg-indigo-700",
        icon: FaHospitalAlt,
        link: "/admission",
      },
      {
        title: "Inventory",
        value: "View and manage medicines",
        color: "bg-purple-700",
        icon: FaBoxes,
        link: "/inventory",
      },
      {
        title: "Emergency Services",
        value: "View emergency services",
        color: "bg-red-700",
        icon: FaAmbulance,
        link: "/emergency",
      },
      {
        title: "Reports",
        value: "View system reports",
        color: "bg-teal-700",
        icon: FaFileAlt,
        link: "/report",
      },
    ],
    []
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

  // Example doctor and nurse data
  const doctors = [
    { id: 1, name: "Dr. John Doe", specialization: "Cardiology" },
    { id: 2, name: "Dr. Jane Smith", specialization: "Neurology" },
    { id: 3, name: "Dr. Mary Johnson", specialization: "Pediatrics" },
  ];

  const nurses = [
    { id: 1, name: "Nurse Alice", department: "Emergency" },
    { id: 2, name: "Nurse Bob", department: "ICU" },
    { id: 3, name: "Nurse Charlie", department: "Orthopedics" },
  ];

  return (
    <div className="p-4 mb-16">
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
              className={`p-6 ${stat.color} rounded-lg shadow-lg flex items-center`}
            >
              <stat.icon className="mr-4 text-4xl" />
              <div>
                <h2 className="text-xl">{stat.title}</h2>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compact Mode Cards */}
      {isCompactMode && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cardData.map((card, index) => (
            <CompactModeCard
              key={index}
              title={card.title}
              value={card.value}
              color={card.color}
              icon={card.icon}
              link={card.link}
            />
          ))}
        </div>
      )}

      {/* Doctors and Nurses Tables */}
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Doctors</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Specialization</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-4 py-2 border">{doctor.name}</td>
                  <td className="px-4 py-2 border">{doctor.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Nurses</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {nurses.map((nurse) => (
                <tr key={nurse.id}>
                  <td className="px-4 py-2 border">{nurse.name}</td>
                  <td className="px-4 py-2 border">{nurse.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
