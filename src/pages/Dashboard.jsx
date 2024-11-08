import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Dashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
