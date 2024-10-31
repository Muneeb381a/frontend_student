import { useState, useEffect } from "react";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          "https://bakend-student.vercel.app/api/subjects"
        );
        const data = await response.json();
        if (response.ok) {
          setSubjects(data);
        } else {
          console.error("An error occured while getting data from subjects");
        }
      } catch (error) {
        console.error("Error fetching subjects", error.message);
      }
    };
    fetchSubjects();
  }, []);
  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Subjects List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="py-3 px-4 font-medium">Subject ID</th>
              <th className="py-3 px-4 font-medium">Subject Name</th>
              <th className="py-3 px-4 font-medium">Teacher Name</th>
              <th className="py-3 px-4 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject.subject_id}
                className="border-b hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-700">
                  {subject.subject_id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {subject.subject_name}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {subject.teacher_name}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {subject.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
