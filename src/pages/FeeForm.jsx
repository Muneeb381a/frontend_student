import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FeeForm = () => {
 const navigate = useNavigate()
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [classDetails, setClassDetails] = useState(null); 
  const [feeDetails, setFeeDetails] = useState({
    fee_amount: '',
    fee_due_date: '',
    fee_status: 'Pending',
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://bakend-student.vercel.app/api/students/${studentId}`);
      setStudentDetails(response.data);

      // Set class details based on the response data
      setClassDetails({
        name: response.data.class_name || 'N/A',
        section: response.data.section || 'N/A'
      });

      toast.success('Student details fetched successfully!');
    } catch (error) {
      console.error('Error fetching student details:', error);
      setStudentDetails(null);
      setClassDetails(null); // Reset class details on error
      toast.error('Student not found or an error occurred.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeeDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bakend-student.vercel.app/api/class', {
        student_id: studentDetails.id, 
        amount: feeDetails.fee_amount,
        due_date: feeDetails.fee_due_date,
        status: feeDetails.fee_status,
      });
      
      toast.success(response.data.message);
      setStudentDetails(null); 
      setClassDetails(null); 
      setFeeDetails({ fee_amount: '', fee_due_date: '', fee_status: 'Pending' });
      navigate("/fees") 
    } catch (error) {
      console.error('Error submitting fee:', error);
      toast.error('An error occurred while submitting the fee.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Fee Form</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-blue-500 text-white rounded-md p-2 w-full"
        >
          Search
        </button>
      </div>
      {studentDetails && (
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-2">Student Details</h3>
          <div className="mb-2">
            <p><strong>Name:</strong> {studentDetails.name || 'N/A'}</p>
            <p><strong>Roll No:</strong> {studentDetails.roll_no || 'N/A'}</p>
            <p><strong>Class:</strong> {classDetails ? classDetails.name : 'N/A'}</p>
            <p><strong>Section:</strong> {classDetails ? classDetails.section : 'N/A'}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Fee Amount:
              <input
                type="number"
                name="fee_amount"
                value={feeDetails.fee_amount}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Fee Due Date:
              <input
                type="date"
                name="fee_due_date"
                value={feeDetails.fee_due_date}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Fee Status:
              <select
                name="fee_status"
                value={feeDetails.fee_status}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-md p-2 w-full"
          >
            Submit Fee
          </button>
        </form>
      )}
    </div>
  );
};

export default FeeForm;
