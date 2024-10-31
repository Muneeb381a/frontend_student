import { useEffect, useState } from "react";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "https://bakend-student.vercel.app/api/teachers"
        );
        const data = await response.json();
        if (response.ok) {
          setTeachers(data);
        } else {
          console.error("No Teachers found error occured");
        }
      } catch (error) {
        console.error("Error occured while fetching teachers", error);
      }
    };
    fetchTeachers();
  }, []);
  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Teachers List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-green-500 text-white text-left">
              <th className="py-3 px-4 font-medium">Teacher ID</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Phone Number</th>
              <th className="py-3 px-4 font-medium">Address</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher.teacher_id}
                className="border-b hover:bg-green-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-700">
                  {teacher.teacher_id}
                </td>
                <td className="py-3 px-4 text-gray-700">{teacher.name}</td>
                <td className="py-3 px-4 text-gray-700">{teacher.email}</td>
                <td className="py-3 px-4 text-gray-700">
                  {teacher.phone_number}
                </td>
                <td className="py-3 px-4 text-gray-700">{teacher.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
