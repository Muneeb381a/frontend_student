import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Class = () => {
  const [classes, setClasses] = useState([]);

  // function to format date an time make it human readable

  const formatDate = (date) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return new Date(date).toLocaleDateString('en-US', options);
  };
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/class");
        const data = await response.json();

        if (response.ok) {
          // Format created_at and updated_at for each class
          const formattedClasses = data.map((cls) => ({
            ...cls,
            created_at: formatDate(cls.created_at),
            updated_at: formatDate(cls.updated_at),
          }));

          setClasses(formattedClasses);
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
              <th className="py-3 px-4 font-medium">Created At</th>
              <th className="py-3 px-4 font-medium">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr
                key={cls.class_id}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-700">{cls.id}</td>
                <td className="py-3 px-4 text-gray-700">{cls.class_name}</td>
                <td className="py-3 px-4 text-gray-700">{cls.section}</td>
                <td className="py-3 px-4 text-gray-700">{cls.created_at}</td>
                <td className="py-3 px-4 text-gray-700">{cls.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Class;
