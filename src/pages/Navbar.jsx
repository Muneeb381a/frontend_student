import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center md:relative z-10 w-full">
    <button onClick={toggleSidebar} className="text-gray-600 md:hidden">
      <FaBars className="w-6 h-6" />
    </button>
    <div className="text-lg font-bold text-gray-800">Student Management System</div>
    <div className="flex items-center space-x-4">
      <FaBell className="w-6 h-6 text-gray-600 cursor-pointer" />
      <FaUserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
    </div>
  </header>
);

export default Navbar;
