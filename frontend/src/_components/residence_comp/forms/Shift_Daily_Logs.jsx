import React, { useState } from 'react';

function Shift_Daily_Logs({ title }) {
  const [reason, setReason] = useState('');

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        {title}
      </h2>

      {/* Reason Input */}
      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700"
        >
          Reason/Subject
        </label>
        <input
          type="text"
          id="reason"
          name="reason"
          placeholder="Enter reason for the shift"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={() => console.log('Reason:', reason)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Shift_Daily_Logs;
