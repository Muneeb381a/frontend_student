import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Class = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate(); 

  const formatDate = (date) => {
    const options = {
      weekday: 'short',  
      year: 'numeric',   
      month: 'short',    
      day: 'numeric',    
      hour: '2-digit',   
      minute: '2-digit', 
      hour12: true,      
      timeZone: 'Asia/Karachi',  
    };

    return new Date(date).toLocaleString('en-US', options);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/class");
        const data = await response.json();

        if (response.ok) {
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


  const handleEdit = (classId) => {
    
    navigate(`/edit-class/${classId}`);  
  };


  const handleDelete = async (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/class/${classId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setClasses(classes.filter(cls => cls.id !== classId));
          alert("Class deleted successfully.");
        } else {
          alert("Failed to delete the class.");
        }
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("An error occurred while deleting the class.");
      }
    }
  };

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
              <th className="py-3 px-4 font-medium">Actions</th>  
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="border-b hover:bg-blue-50 transition-colors">
                <td className="py-3 px-4 text-gray-700">{cls.id}</td>
                <td className="py-3 px-4 text-gray-700">{cls.class_name}</td>
                <td className="py-3 px-4 text-gray-700">{cls.section}</td>
                <td className="py-3 px-4 text-gray-700">{cls.created_at}</td>
                <td className="py-3 px-4 text-gray-700">{cls.updated_at}</td>
                <td className="py-3 px-4 text-gray-700">
                  {/* Edit and Delete buttons */}
                  <button 
                    onClick={() => handleEdit(cls.id)} 
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cls.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Class;
