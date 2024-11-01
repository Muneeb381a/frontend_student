import { useEffect, useState } from "react";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://bakend-student.vercel.app/api/students"
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Student List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-green-500 text-white text-left">
              <th className="py-3 px-4 font-medium">Student Id</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Father Name</th>
              <th className="py-3 px-4 font-medium">Address</th>
              <th className="py-3 px-4 font-medium">Phone Number</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Roll No</th>
              <th className="py-3 px-4 font-medium">Class Name</th>
              <th className="py-3 px-4 font-medium">Fee Amount</th>
              <th className="py-3 px-4 font-medium">Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-green-50 transition-colors`}
              >
                <td className="py-3 px-4 text-gray-700">{student.id}</td>
                <td className="py-3 px-4 text-gray-700">{student.name}</td>
                <td className="py-3 px-4 text-gray-700">
                  {student.father_name}
                </td>
                <td className="py-3 px-4 text-gray-700">{student.address}</td>
                <td className="py-3 px-4 text-gray-700">
                  {student.phone_number}
                </td>
                <td className="py-3 px-4 text-gray-700">{student.email}</td>
                <td className="py-3 px-4 text-gray-700">{student.roll_no}</td>
                <td className="py-3 px-4 text-gray-700">
                  {student.class_name || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {student.fee_amount || "N/A"}
                </td>
                <td
                  className={`py-3 px-4 ${
                    student.fee_status === "Paid"
                      ? " bg-green-600 text-center text-white font-bold"
                      : " bg-red-600 text-center text-white font-bold"
                  }`}
                >
                  {student.fee_status || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
