import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FeeForm = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [feeDetails, setFeeDetails] = useState({
    fee_amount: '',
    fee_due_date: '',
    fee_status: 'Pending',
    fee_type: '', // Fee type field
  });
  const [feeTypes, setFeeTypes] = useState([]); // Store available fee types

  // Fetch fee types when component mounts
  useEffect(() => {
    const fetchFeeTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/fee-types');
        setFeeTypes(response.data);
      } catch (error) {
        console.error('Error fetching fee types:', error);
        toast.error('Failed to load fee types.');
      }
    };
    fetchFeeTypes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/students/${studentId}`);
      setStudentDetails(response.data);

      toast.success('Student details fetched successfully!');
    } catch (error) {
      console.error('Error fetching student details:', error);
      setStudentDetails(null);
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
      // Prepare the request payload
      const response = await axios.post('http://localhost:3000/api/fee', {
        student_id: studentDetails.student_id, // Use student ID from fetched student data
        amount: feeDetails.fee_amount,
        due_date: feeDetails.fee_due_date,
        status: feeDetails.fee_status,
        type_id: feeDetails.fee_type, // Use selected fee type ID
      });

      toast.success(response.data.message);
      setStudentDetails(null);
      setFeeDetails({ fee_amount: '', fee_due_date: '', fee_status: 'Pending', fee_type: '' });
      navigate('/fees');
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
            <p><strong>Class:</strong> {studentDetails.class_name || 'N/A'}</p>
            <p><strong>Fee Amount:</strong> {studentDetails.amount || 'N/A'}</p>
            <p><strong>Fee Status:</strong> {studentDetails.fee_status || 'N/A'}</p>
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

          {/* Fee Type Dropdown */}
          <div className="mb-4">
            <label className="block mb-1">
              Fee Type:
              <select
                name="fee_type"
                value={feeDetails.fee_type}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select Fee Type</option>
                {feeTypes.map((feeType) => (
                  <option key={feeType.type_id} value={feeType.type_id}>
                    {feeType.type_name}
                  </option>
                ))}
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
