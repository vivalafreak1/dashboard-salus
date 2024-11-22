import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa"; // Import the search icon
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";

const Inventory = () => {
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      category: "Painkiller",
      quantity: 50,
      expiryDate: "2025-05-01",
    },
    {
      id: 2,
      name: "Amoxicillin",
      category: "Antibiotic",
      quantity: 120,
      expiryDate: "2026-08-15",
    },
    {
      id: 3,
      name: "Ibuprofen",
      category: "Painkiller",
      quantity: 200,
      expiryDate: "2024-12-30",
    },
    {
      id: 4,
      name: "Aspirin",
      category: "Painkiller",
      quantity: 75,
      expiryDate: "2025-02-20",
    },
    {
      id: 5,
      name: "Diphenhydramine",
      category: "Antihistamine",
      quantity: 150,
      expiryDate: "2024-11-25",
    },
    {
      id: 6,
      name: "Loratadine",
      category: "Antihistamine",
      quantity: 100,
      expiryDate: "2026-06-10",
    },
    {
      id: 7,
      name: "Cetirizine",
      category: "Antihistamine",
      quantity: 80,
      expiryDate: "2025-09-14",
    },
    {
      id: 8,
      name: "Omeprazole",
      category: "Antacid",
      quantity: 40,
      expiryDate: "2026-04-22",
    },
    {
      id: 9,
      name: "Ranitidine",
      category: "Antacid",
      quantity: 60,
      expiryDate: "2025-01-11",
    },
    {
      id: 10,
      name: "Lisinopril",
      category: "Blood Pressure",
      quantity: 90,
      expiryDate: "2027-03-19",
    },
    {
      id: 11,
      name: "Amlodipine",
      category: "Blood Pressure",
      quantity: 110,
      expiryDate: "2026-05-23",
    },
    {
      id: 12,
      name: "Metformin",
      category: "Diabetes",
      quantity: 140,
      expiryDate: "2027-07-17",
    },
    {
      id: 13,
      name: "Glibenclamide",
      category: "Diabetes",
      quantity: 55,
      expiryDate: "2025-10-05",
    },
    {
      id: 14,
      name: "Atorvastatin",
      category: "Cholesterol",
      quantity: 80,
      expiryDate: "2026-02-02",
    },
    {
      id: 15,
      name: "Simvastatin",
      category: "Cholesterol",
      quantity: 120,
      expiryDate: "2026-07-15",
    },
    {
      id: 16,
      name: "Losartan",
      category: "Blood Pressure",
      quantity: 95,
      expiryDate: "2027-01-01",
    },
    {
      id: 17,
      name: "Hydrochlorothiazide",
      category: "Diuretic",
      quantity: 50,
      expiryDate: "2025-03-18",
    },
    {
      id: 18,
      name: "Fluoxetine",
      category: "Antidepressant",
      quantity: 30,
      expiryDate: "2025-04-25",
    },
    {
      id: 19,
      name: "Sertraline",
      category: "Antidepressant",
      quantity: 60,
      expiryDate: "2025-12-12",
    },
    {
      id: 20,
      name: "Venlafaxine",
      category: "Antidepressant",
      quantity: 110,
      expiryDate: "2026-06-14",
    },
    {
      id: 21,
      name: "Levothyroxine",
      category: "Thyroid",
      quantity: 200,
      expiryDate: "2027-08-01",
    },
    {
      id: 22,
      name: "Furosemide",
      category: "Diuretic",
      quantity: 65,
      expiryDate: "2025-07-09",
    },
    {
      id: 23,
      name: "Dexamethasone",
      category: "Steroid",
      quantity: 80,
      expiryDate: "2026-01-14",
    },
    {
      id: 24,
      name: "Prednisolone",
      category: "Steroid",
      quantity: 70,
      expiryDate: "2026-04-18",
    },
    {
      id: 25,
      name: "Mupirocin",
      category: "Antibiotic",
      quantity: 90,
      expiryDate: "2025-06-30",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedicines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 mb-16">
      {/* Back Button */}
      <BackButton />
      <h1 className="mb-4 text-3xl font-bold">Inventory</h1>

      {/* Add Create Medicine button */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/inventory/create"
          className="flex items-center px-4 py-2 space-x-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FaPlus />
          <span>Create New Medicine</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center p-2 mb-4 border border-gray-300 rounded-md">
        <FaSearch className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 text-sm outline-none"
          maxLength="50"
        />
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        {filteredMedicines.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm text-left border">
                  Medicine Name
                </th>
                <th className="px-4 py-2 text-sm text-left border">Category</th>
                <th className="px-4 py-2 text-sm text-left border">
                  Quantity Available
                </th>
                <th className="px-4 py-2 text-sm text-left border">
                  Expiration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((medicine) => (
                <tr key={medicine.id}>
                  <td className="px-4 py-2 text-sm border">{medicine.name}</td>
                  <td className="px-4 py-2 text-sm border">
                    {medicine.category}
                  </td>
                  <td className="px-4 py-2 text-sm border">
                    {medicine.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm border">
                    {medicine.expiryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-gray-500">Item not found</div>
        )}
      </div>

      {/* Pagination */}
      {filteredMedicines.length > itemsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === index + 1
                  ? "bg-green-700 text-white"
                  : "bg-white text-black hover:bg-green-200"
              } text-sm`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
