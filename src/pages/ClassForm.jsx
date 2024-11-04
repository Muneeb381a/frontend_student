import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ClassForm = () => {
  const [formData, setFormData] = useState({
    class_name: '',
    section: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.class_name || !formData.section) {
      return toast.error('Please fill in all fields.');
    }

    try {
      const response = await fetch('https://bakend-student.vercel.app/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Class added successfully!');
        navigate('/classes');
      } else {
        toast.error(result.error || 'Failed to add class');
      }
    } catch (error) {
      toast.error('An error occurred while adding the class.');
      console.error('Error adding class:', error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="class_name"
          value={formData.class_name}
          onChange={handleChange}
          placeholder="Class Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Section"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
