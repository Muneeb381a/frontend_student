import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceForm = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/class"); 
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch students when a class is selected
  useEffect(() => {
    if (!selectedClass) return;

    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/students/class/${selectedClass}`
        ); 
        setStudents(response.data);

        // Initialize attendance status
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.id] = "Present"; // Default status
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [selectedClass]);

  // Handle attendance change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const attendanceRecords = students.map((student) => ({
        student_id: student.id,
        class_id: selectedClass,
        date: new Date().toISOString().split("T")[0], // Current date
        status: attendance[student.id],
        remarks: "",
      }));

      await axios.post("http://localhost:3000/attendance", { attendanceRecords }); 
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Form</h1>

      {/* Class Dropdown */}
      <div className="mb-4">
        <label htmlFor="classDropdown" className="block text-lg font-medium mb-2">
          Select Class:
        </label>
        <select
          id="classDropdown"
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select Class --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Student Table */}
      {students.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Students in Class</h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border border-gray-300 p-2">{student.name}</td>
                  <td className="border border-gray-300 p-2">
                    <select
                      className="p-2 border border-gray-300 rounded"
                      value={attendance[student.id]}
                      onChange={(e) =>
                        handleAttendanceChange(student.id, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                      <option value="Excused">Excused</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Button */}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceForm;
