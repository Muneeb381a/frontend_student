import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Fee = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFees = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:3000/api/fees` // API endpoint for fetching fee details
        );
        const data = await response.json();

        if (response.ok) {
          setFees(data.data); // set the fee data in state
        } else {
          setFees([]);
          setError(data.error || "No fee records found.");
        }
      } catch (error) {
        console.error("Error fetching fees:", error);
        setError("An error occurred while fetching fees.");
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-extrabold text-gray-800">Fee List</h2>
        <button>
          <Link
            to="/add-fee"
            className="text-center bg-green-600 px-4 py-2 rounded-full font-bold text-white"
          >
            Add Student Fee
          </Link>
        </button>
      </div>

      {loading ? (
        <div className="text-center my-8">
          <p className="text-xl font-medium text-gray-700">Loading fees...</p>
        </div>
      ) : error ? (
        <div className="text-center my-8">
          <p className="text-xl font-medium text-red-600">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white text-left text-sm uppercase tracking-wide">
                <th className="py-4 px-6 font-semibold">Student Name</th>
                <th className="py-4 px-6 font-semibold">Roll No</th>
                <th className="py-4 px-6 font-semibold">Class</th>
                <th className="py-4 px-6 font-semibold">Section</th>
                <th className="py-4 px-6 font-semibold">Fee Type</th>
                <th className="py-4 px-6 font-semibold">Fee Amount</th>
                <th className="py-4 px-6 font-semibold">Due Date</th>
                <th className="py-4 px-6 font-semibold">Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr
                  key={index} // Use a unique key (fee.fee_id if available)
                  className="border-b hover:bg-blue-50 transition duration-150 ease-in-out"
                >
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {fee.student_name}
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {fee.roll_no}
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {fee.class_name}
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {fee.section}
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {fee.fee_type}
                  </td>
                  <td className="py-4 px-6 text-green-600 font-bold">
                    Rs. {fee.fee_amount}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {new Date(fee.fee_due_date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        fee.fee_status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {fee.fee_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fee;
