import { useEffect, useState } from "react";

const Fee = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch(
          "https://bakend-student.vercel.app/api/fees"
        );
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
    <div className="p-8 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Fee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left text-sm uppercase tracking-wide">
              <th className="py-4 px-6 font-semibold">Student Name</th>
              <th className="py-4 px-6 font-semibold">Roll No</th>
              <th className="py-4 px-6 font-semibold">Class</th>
              <th className="py-4 px-6 font-semibold">Section</th>
              <th className="py-4 px-6 font-semibold">Fee Amount</th>
              <th className="py-4 px-6 font-semibold">Due Date</th>
              <th className="py-4 px-6 font-semibold">Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr
                key={fee.fee_id}
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
    </div>
  );
};

export default Fee;
