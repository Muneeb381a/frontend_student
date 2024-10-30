import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-2 mr-2 flex justify-center items-center gap-2">
      <Link
        to="/students"
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
      >
        Student
      </Link>
      <Link
        to="/classes"
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
      >
        Class
      </Link>
      <Link
        to="/fees"
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
      >
        Student Fee
      </Link>
    </div>
  );
};

export default Home;
