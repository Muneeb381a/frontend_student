import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaUserGraduate, FaChalkboardTeacher, FaDollarSign, FaChartPie } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const statistics = [
    { label: "Total Students", count: "1,200", icon: FaUserGraduate },
    { label: "Total Teachers", count: "80", icon: FaChalkboardTeacher },
    { label: "Total Fee", count: "$150,000", icon: FaDollarSign },
    { label: "Expenses", count: "$60,000", icon: FaChartPie },
  ];

  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Enrollments",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };

  const doughnutChartData = {
    labels: ["Salaries", "Supplies", "Utilities", "Miscellaneous"],
    datasets: [
      {
        data: [30000, 15000, 10000, 5000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF9F40"]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-auto space-y-6">
          {/* Statistic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statistics.map((stat, index) => (
              <StatCard
                key={index}
                icon={<stat.icon className="text-3xl" />}
                label={stat.label}
                count={stat.count}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-lg shadow-md h-[350px]">
              <h2 className="text-lg font-semibold text-gray-700">Monthly Students Enrollment</h2>
              <div className="h-full">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md h-[350px]">
              <h2 className="text-lg font-semibold text-gray-700">Expense Distribution</h2>
              <div className="h-full">
                <Doughnut data={doughnutChartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* News and Calendar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* News Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Latest News</h2>
              <ul className="space-y-4 mt-4">
                {newsData.map((news, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-semibold text-gray-800">{news.title}</p>
                    <p className="text-sm text-gray-600">{news.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calendar Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Calendar</h2>
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, count }) => (
  <div className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{count}</p>
    </div>
  </div>
);

const newsData = [
  { title: "School Annual Day", description: "The Annual Day celebrations will be held on the 25th of this month." },
  { title: "New Teacher Hiring", description: "Interviews for new teacher positions start next week." },
  { title: "Fee Deadline", description: "The deadline for fee submission is the end of this month." },
];

export default Dashboard;
