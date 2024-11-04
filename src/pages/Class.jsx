import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Class = () => {
 const [classes, setClasses] = useState([]);

 useEffect(() => {
   const fetchClasses = async () => {
     try {
       const response = await fetch("https://bakend-student.vercel.app/class");
       const data = await response.json();

       if (response.ok) {
         setClasses(data);
       } else {
         console.error("No classes found or error occurred");
       }
     } catch (error) {
       console.error("Error fetching classes:", error);
     }
   };

   fetchClasses();
 }, []);
  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-2">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Class List</h2>
        <button>
          <Link to="/add-class" className="text-center bg-green-600 p-4 rounded-full font-bold text-white">
            Add Class
          </Link>
        </button>
      </div>
      
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="py-3 px-4 font-medium">Class ID</th>
              <th className="py-3 px-4 font-medium">Class Name</th>
              <th className="py-3 px-4 font-medium">Section</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr
                key={cls.class_id}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-700">{cls.class_id}</td>
                <td className="py-3 px-4 text-gray-700">{cls.class_name}</td>
                <td className="py-3 px-4 text-gray-700">{cls.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Class;
