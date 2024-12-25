import React, { useState } from 'react';

function Shift_Daily_Logs({ title }) {
  const [reason, setReason] = useState('');

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        {title}
      </h2>

      {/* Reason Input */}
      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Reason/Subject
        </label>
        <textarea
          id="reason"
          name="reason"
          placeholder="Enter the reason or subject for this shift log"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm resize-none p-3"
          rows="4"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">
          Please provide a detailed reason or subject for this shift.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={() => console.log('Reason:', reason)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Shift_Daily_Logs;
