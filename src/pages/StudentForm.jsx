import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

// Zod schema for form validation
const studentSchema = z.object({
  name: z.string().min(1, { message: "Student name is required" }),
  father_name: z.string().min(1, { message: "Father's name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  roll_no: z.string().min(1, { message: "Roll number is required" }), // Adjusted to string
  class_id: z.string().min(1, { message: "Please select a class" }),
});

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    address: "",
    phone_number: "",
    email: "",
    roll_no: "",
    class_id: "",
  });

  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://bakend-student.vercel.app/class");
        const data = await response.json();
        if (response.ok) {
          setClasses(data);
        } else {
          toast.error("Error fetching classes");
        }
      } catch (error) {
        toast.error("Error fetching classes", error);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = studentSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await fetch("https://bakend-student.vercel.app/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Student added successfully!");
        navigate("/students");
      } else {
        toast.error(result.error || "Failed to add student");
      }
    } catch (error) {
      toast.error("An error occurred while adding the student.", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg max-w-md mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
        Add New Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: "name", placeholder: "Student Name" },
          { name: "father_name", placeholder: "Father's Name" },
          { name: "address", placeholder: "Address" },
          { name: "phone_number", placeholder: "Phone Number" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "roll_no", placeholder: "Roll Number" },
        ].map(({ name, placeholder, type = "text" }) => (
          <div key={name} className="relative">
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full py-2.5 px-4 bg-white border border-blue-200 rounded-md text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div className="relative">
          <select
            name="class_id"
            value={formData.class_id}
            onChange={(e) => handleChange(e)}
            className="w-full py-2.5 px-4 bg-white border border-blue-200 rounded-md text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_id}>
                {cls.class_name} - {cls.section}
              </option>
            ))}
          </select>
          {errors.class_id && (
            <p className="text-red-500 text-xs mt-1">{errors.class_id}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
