import React from 'react';

function ClientProfile() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-xl">
      {/* Basic Information */}
      <section className="flex items-center border-b border-gray-200 pb-6 mb-8">
        {/* Profile Picture */}
        <div className="w-36 h-36 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shadow-md border-4 border-blue-300">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name and Status */}
        <div className="ml-8 space-y-3">
          <p className="text-3xl font-extrabold text-gray-800">John Doe</p>
          <p className="text-lg font-medium text-gray-600">
            Status:{' '}
            <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Onsite
            </span>
          </p>
        </div>
      </section>

      {/* Contact and Demographics */}
      <section className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Contact & Demographics
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Date of Birth:</strong> January 1, 1985
          </li>
          <li>
            <strong>Phone Number:</strong> (123) 456-7890
          </li>
          <li>
            <strong>Emergency Contact:</strong> Jane Doe (Spouse) - (987)
            654-3210
          </li>
          <li>
            <strong>Address:</strong> 123 Elm Street, Springfield, USA
          </li>
        </ul>
      </section>

      {/* Health and Medical Records */}
      <section className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Health & Medical Records
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Medical History:</strong> Diabetes, Hypertension
          </li>
          <li>
            <strong>Current Medications:</strong> Metformin 500mg, Lisinopril
            20mg
          </li>
          <li>
            <strong>Next Appointment:</strong> Dr. Smith - December 12, 2024, at
            10:00 AM
          </li>
        </ul>
      </section>

      {/* Interaction Logs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Interaction Logs
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Last Visit:</strong> December 5, 2024 - John checked in for
            therapy
          </li>
          <li>
            <strong>Recent Activity:</strong> Attended group yoga session on
            December 6, 2024
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ClientProfile;
