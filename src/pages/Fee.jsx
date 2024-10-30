import  { useEffect, useState } from 'react';

const Fee = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch("https://bakend-student.vercel.app/api/fees");
        const data = await response.json();

        if (response.ok) {
          setFees(data);
        } else {
          console.error("No fee records found or an error occurred.");
        }
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
    };

    fetchFees();
  }, []);

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Fee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="py-3 px-4 font-medium">Student Name</th>
              <th className="py-3 px-4 font-medium">Roll No</th>
              <th className="py-3 px-4 font-medium">Class</th>
              <th className="py-3 px-4 font-medium">Section</th>
              <th className="py-3 px-4 font-medium">Fee Amount</th>
              <th className="py-3 px-4 font-medium">Due Date</th>
              <th className="py-3 px-4 font-medium">Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.fee_id} className="border-b hover:bg-blue-50 transition-colors">
                <td className="py-3 px-4 text-gray-700">{fee.student_name}</td>
                <td className="py-3 px-4 text-gray-700">{fee.roll_no}</td>
                <td className="py-3 px-4 text-gray-700">{fee.class_name}</td>
                <td className="py-3 px-4 text-gray-700">{fee.section}</td>
                <td className="py-3 px-4 text-gray-700">${fee.fee_amount}</td>
                <td className="py-3 px-4 text-gray-700">{new Date(fee.fee_due_date).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-gray-700">{fee.fee_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fee;
