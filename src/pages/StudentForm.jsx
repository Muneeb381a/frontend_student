import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    father_cnic: "",
    mother_cnic: "",
    phone_number_with_code: "",
    whatsapp_number: "",
    email: "",
    roll_no: "",
    dob: "",
    age: "",
    gender: "",
    blood_group: "",
    religion: "",
    nationality: "",
    previous_class: "",
    previous_school: "",
    certificates: null,
    disability: "",
    hobbies: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_number: "",
    address_1: "",
    address_2: "",
    profile_pic: null,
    admission_date: "",
    class_id: "",
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/class");
        const data = await response.json();
        if (response.ok) {
          setClasses(data);
        } else {
          toast.error("Error fetching classes");
        }
      } catch (error) {
        toast.error("Error fetching classes");
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    
    if (name === "dob") {
      const today = new Date();
      const birthDate = new Date(value);
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      setFormData((prevData) => ({
        ...prevData,
        age: calculatedAge,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:3000/api/student", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Student added successfully!");
        navigate("/students");
      } else {
        toast.error(result.error || "Failed to add student");
      }
    } catch (error) {
      toast.error("An error occurred while adding the student.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Add New Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 " method="POST" action="/api/student" enctype="multipart/form-data">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="father_name" className="block text-sm font-medium text-gray-700">Father Name</label>
          <input
            type="text"
            id="father_name"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
        
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="phone_number_with_code" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="number"
            id="phone_number_with_code"
            name="phone_number_with_code"
            value={formData.phone_number_with_code}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="roll_no" className="block text-sm font-medium text-gray-700">Roll No</label>
          <input
            type="number"
            id="roll_no"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
         
        </div>
        <div>
          <label htmlFor="previous_school" className="block text-sm font-medium text-gray-700">Previous School</label>
          <input
            type="text"
            id="previous_school"
            name="previous_school"
            value={formData.previous_school}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="previous_class" className="block text-sm font-medium text-gray-700">Previous Class</label>
          <input
            type="text"
            id="previous_class"
            name="previous_class"
            value={formData.previous_class}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="mother_name" className="block text-sm font-medium text-gray-700">Mother Name</label>
          <input
            type="text"
            id="mother_name"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="father_occupation" className="block text-sm font-medium text-gray-700">Father Occupation</label>
          <input
            type="text"
            id="father_occupation"
            name="father_occupation"
            value={formData.father_occupation}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="mother_email" className="block text-sm font-medium text-gray-700">Mother Email</label>
          <input
            type="email"
            id="mother_email"
            name="mother_email"
            value={formData.mother_email}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
        
        </div>
        <div>
          <label htmlFor="father_email" className="block text-sm font-medium text-gray-700">Father Email</label>
          <input
            type="email"
            id="father_email"
            name="father_email"
            value={formData.father_email}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
        
        </div>
        <div>
          <label htmlFor="b_form_number" className="block text-sm font-medium text-gray-700">B-Form Number</label>
          <input
            type="number"
            id="b_form_number"
            name="b_form_number"
            value={formData.b_form_number}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
          <input
            type="number"
            id="whatsapp_number"
            name="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="father_cnic" className="block text-sm font-medium text-gray-700">Father CNIC</label>
          <input
            type="number"
            id="father_cnic"
            name="father_cnic"
            value={formData.father_cnic}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
         
        </div>
        <div>
          <label htmlFor="mother_cnic" className="block text-sm font-medium text-gray-700">Mother CNIC</label>
          <input
            type="number"
            id="mother_cnic"
            name="mother_cnic"
            value={formData.mother_cnic}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="address_1" className="block text-sm font-medium text-gray-700">Present Address</label>
          <input
            type="text"
            id="address_1"
            name="address_1"
            value={formData.address_1}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="address_2" className="block text-sm font-medium text-gray-700">Permanant Address</label>
          <input
            type="text"
            id="address_2"
            name="address_2"
            value={formData.address_2}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="admission_date" className="block text-sm font-medium text-gray-700">Admission Date</label>
          <input
            type="date"
            id="admission_date"
            name="admission_date"
            value={formData.admission_date}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
          <input
            type="text"
            id="emergency_contact_name"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="emergency_contact_number" className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
          <input
            type="number"
            id="emergency_contact_number"
            name="emergency_contact_number"
            value={formData.emergency_contact_number}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="emergency_contact_relationship" className="block text-sm font-medium text-gray-700">Emergency Contact RelationShip</label>
          <input
            type="text"
            id="emergency_contact_relationship"
            name="emergency_contact_relationship"
            value={formData.emergency_contact_relationship}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="religion" className="block text-sm font-medium text-gray-700">Religion</label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="blood_group" className="block text-sm font-medium text-gray-700">Blood Group</label>
          <input
            type="text"
            id="blood_group"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            readOnly
            className="mt-2 w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">Class</label>
          <select
            id="class_id"
            name="class_id"
            value={formData.class_id}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          >
            <option value="" disabled>Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.class_name}</option>
            ))}
          </select>
          
        </div>
        <div>
          <label htmlFor="certificates" className="block text-sm font-medium text-gray-700">Certificates</label>
          <input
            type="file"
            id="certificates"
            name="certificates"
            onChange={handleChange}
            accept="image/*,.pdf"
            className="mt-2 w-full p-3 border rounded-md"
          />
          
        </div>
        <div>
          <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData((prevData) => ({
                ...prevData,
                profile_pic: file,
              }));
            }}
            className="mt-2 w-full p-3 border rounded-md focus:outline-none"
          />
          
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="any_disability"
            name="any_disability"
            checked={formData.any_disability}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="any_disability" className="text-sm font-medium text-gray-700">Any Disability</label>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
