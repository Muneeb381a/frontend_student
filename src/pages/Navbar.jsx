import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Navbar = ({ toggleSidebar }) => (
 <header className="bg-white shadow-md p-4 flex justify-between items-center md:relative z-10 w-full">
 <button onClick={toggleSidebar} className="text-gray-600 md:hidden">
   <FaBars className="w-6 h-6" />
 </button>

 <div className="text-lg font-bold text-gray-800">Student Management System</div>

 <div className="flex items-center relative w-[500px]">
   <input
     type="text"
     placeholder="Search here..."
     className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
   />
   <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
 </div>

 <div className="flex items-center space-x-4">
   <FaBell className="w-6 h-6 text-gray-600 cursor-pointer" />
   <FaUserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
 </div>
</header>

);

export default Navbar;
