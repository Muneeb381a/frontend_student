import { useState } from "react";
import { 
  FaBars, FaTimes, FaHome, FaUser, FaCog, FaChevronDown, FaChevronRight 
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [expanded, setExpanded] = useState({});
  
  const toggleSubmenu = (item) => {
    setExpanded((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div
      className={`h-full fixed inset-y-0 left-0 ${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col z-20`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes className="w-6 h-6 text-white" /> : <FaBars className="w-6 h-6 text-white" />}
        </button>
      </div>
      
      <div className={`p-4 text-xl font-bold text-center ${!isOpen && "hidden"}`}>Dashboard</div>

      <nav className="flex-1 px-4">
        <ul>
          <li className="flex items-center py-3 px-2 text-sm hover:bg-gray-700 rounded cursor-pointer group">
            <FaHome className="w-5 h-5 mr-2" />
            <span className={`${isOpen ? "inline" : "hidden"} group-hover:inline`}>Home</span>
          </li>
          <li className="py-3 px-2 text-sm hover:bg-gray-700 rounded cursor-pointer">
            <div className="flex items-center" onClick={() => toggleSubmenu("students")}>
              <FaUser className="w-5 h-5 mr-2" />
              <span className={`${isOpen ? "inline" : "hidden"} group-hover:inline`}>Students</span>
              {isOpen && (
                <span className="ml-auto">
                  {expanded.students ? <FaChevronDown className="w-5 h-5" /> : <FaChevronRight className="w-5 h-5" />}
                </span>
              )}
            </div>
            {expanded.students && isOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer">All Students</li>
                <li className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer">Add Student</li>
                <li className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer">Manage Students</li>
              </ul>
            )}
          </li>
          <li className="py-3 px-2 text-sm hover:bg-gray-700 rounded cursor-pointer">
            <div className="flex items-center" onClick={() => toggleSubmenu("class")}>
              <FaCog className="w-5 h-5 mr-2" />
              <span className={`${isOpen ? "inline" : "hidden"} group-hover:inline`}>Class</span>
              {isOpen && (
                <span className="ml-auto">
                  {expanded.class ? <FaChevronDown className="w-5 h-5" /> : <FaChevronRight className="w-5 h-5" />}
                </span>
              )}
            </div>
            {expanded.class && isOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer">All Classes</li>
                <li className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer">Add Class</li>
                <li className="text-sm hover:bg-gray-700 p-2 rounded cursor-pointer">Manage Classes</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
