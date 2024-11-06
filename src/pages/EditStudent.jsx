import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const studentSchema = z.object({
  name: z.string().min(1, { message: "Student name is required" }),
  father_name: z.string().min(1, { message: "Father's name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  roll_no: z.string().min(1, { message: "Roll number is required" }),
  class_id: z.string().min(1, { message: "Please select a class" }),
});

const EditStudent = () => {
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
  const [profilePic, setProfilePic] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Fetch the student data to prefill the form
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://bakend-student.vercel.app/api/student/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching student data"); 
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error("Error fetching student data", error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await fetch("https://bakend-student.vercel.app/class");
        if (!response.ok) {
          throw new Error("Error fetching classes"); // Explicit error for non-OK responses
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        toast.error("Error fetching classes", error);
      }
    };

    fetchStudent();
    fetchClasses();
  }, [id]);

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

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // Set profile picture
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

    // Create a FormData object to send form data and profile picture
    const updateData = new FormData();
    Object.keys(formData).forEach((key) =>
      updateData.append(key, formData[key])
    );
    if (profilePic) {
      updateData.append("profile_pic", profilePic);
    }

    try {
      const response = await fetch(
        `https://bakend-student.vercel.app/api/student/${id}`,
        {
          method: "PUT",
          body: updateData,
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast.success("Student updated successfully!");
        navigate("/students");
      } else {
        toast.error(result.error || "Failed to update student");
      }
    } catch (error) {
      toast.error("An error occurred while updating the student.", error);
    }
  };
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg max-w-md mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
        Update Student
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

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full py-2.5 px-4 bg-white border border-blue-200 rounded-md text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
