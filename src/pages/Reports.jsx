import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import BackButton from "../components/BackButton";

const Reports = () => {
  // Sample data for reports
  const [reportData, setReportData] = useState([
    { id: 1, name: "John Doe", age: 35, diagnosis: "Flu", date: "2024-11-15" },
    {
      id: 2,
      name: "Jane Smith",
      age: 29,
      diagnosis: "Fracture",
      date: "2024-11-16",
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 42,
      diagnosis: "COVID-19",
      date: "2024-11-17",
    },
    {
      id: 4,
      name: "Emily Clark",
      age: 55,
      diagnosis: "Diabetes",
      date: "2024-11-18",
    },
    {
      id: 5,
      name: "Sarah Lee",
      age: 60,
      diagnosis: "Hypertension",
      date: "2024-11-19",
    },
    {
      id: 6,
      name: "David Wilson",
      age: 48,
      diagnosis: "Asthma",
      date: "2024-11-20",
    },
    {
      id: 7,
      name: "Rachel Adams",
      age: 33,
      diagnosis: "Flu",
      date: "2024-11-21",
    },
  ]);

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Filter reports by date range
  const filteredReports = reportData.filter((report) => {
    if (!dateRange.startDate || !dateRange.endDate) return true;
    const reportDate = new Date(report.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    return reportDate >= startDate && reportDate <= endDate;
  });

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Hospital Management System - Report", 20, 20);
    filteredReports.forEach((report, index) => {
      doc.text(
        `${index + 1}. Name: ${report.name}, Age: ${report.age}, Diagnosis: ${
          report.diagnosis
        }, Date: ${report.date}`,
        20,
        30 + index * 10
      );
    });
    doc.save("Report.pdf");
  };

  // Data for chart (e.g., patients per diagnosis)
  const diagnosisData = reportData.reduce((acc, report) => {
    acc[report.diagnosis] = (acc[report.diagnosis] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(diagnosisData),
    datasets: [
      {
        label: "Number of Patients",
        data: Object.values(diagnosisData),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Summary statistics
  const totalReports = filteredReports.length;
  const avgAge =
    filteredReports.reduce((sum, report) => sum + report.age, 0) /
    (totalReports || 1);

  return (
    <div className="p-4 sm:p-6">
      <BackButton />
      <h1 className="mb-4 text-2xl font-bold text-center">Reports</h1>

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div>
            <label className="block mb-1 text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Report Summary</h2>
        <p>Total Reports: {totalReports}</p>
        <p>Average Age: {avgAge.toFixed(2)}</p>
      </div>

      {/* Chart Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Diagnosis Distribution</h2>
        <Line data={chartData} />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border border-gray-200">#</th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Name
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Age
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Diagnosis
              </th>
              <th className="px-4 py-2 text-left border border-gray-200">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={report.id}>
                <td className="px-4 py-2 border border-gray-200">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {report.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {report.age}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {report.diagnosis}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {report.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download PDF Button */}
      <div className="mt-6 text-center">
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <FaDownload />
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default Reports;
