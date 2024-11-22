import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; // Assuming BackButton exists

const CreateInventory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log or add the new medicine data to your state or database
    console.log("New Medicine Data", { name, category, quantity, expiryDate });

    // After creation, redirect back to the inventory list
    navigate("/inventory");
  };

  return (
    <div className="p-4 mb-16">
      <BackButton />
      <h1 className="mb-4 text-3xl font-bold">Create New Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Medicine Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Expiration Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md"
          >
            Create Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInventory;
