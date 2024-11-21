import React from "react";

const Inventory = () => {
  // Example data for medicines
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
    // More medicine data here...
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Inventory</h1>
      {/* Inventory Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Medicine Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Quantity Available</th>
              <th className="border px-4 py-2 text-left">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td className="border px-4 py-2">{medicine.name}</td>
                <td className="border px-4 py-2">{medicine.category}</td>
                <td className="border px-4 py-2">{medicine.quantity}</td>
                <td className="border px-4 py-2">{medicine.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
