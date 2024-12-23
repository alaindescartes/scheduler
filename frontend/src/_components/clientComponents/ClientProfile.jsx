import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClient } from '../../db/client';
import { formatDate } from '../../helpers/format';

function ClientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentClient, setCurrentClient] = useState(null);
  const [tempAllergies, setTempAllergies] = useState([]);

  const userRole =
    useSelector((state) => state?.user?.user?.details?.role) || 'caregiver';
  const { clientId } = useParams();
  const [profile, setProfile] = useState({
    name: '',
    status: '',
    dateOfBirth: '',
    phoneNumber: '',
    emergencyContact: '',
    address: '',
    medicalHistory: '',
    currentMedications: '',
    nextAppointment: '',
    imageUrl: '',
    carePlan: '',
    notes: '',
    maritalStatus: '',
    preferredLanguage: '',
    allergies: [],
    dietaryRestrictions: [],
    primaryPhysician: '',
    albertaHealthNbr: '',
    riskAssessment: '',
  });
  const [tempDietaryRestrictions, setTempDietaryRestrictions] = useState(
    profile.dietaryRestrictions
  );

  // Fetch current client data
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientData = await getClient(clientId);
        setCurrentClient(clientData);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  // Update profile when currentClient changes
  useEffect(() => {
    if (currentClient) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: `${currentClient.firstname} ${currentClient.lastname}`,
        status: currentClient.status,
        dateOfBirth: formatDate(currentClient.dateOfBirth),
        phoneNumber: currentClient.phoneNumber,
        address: currentClient.address,
        medicalHistory: currentClient.medicalHistory,
        currentMedications: currentClient.currentMedications,
        emergencyContact: currentClient.emergencyContact,
        imageUrl: currentClient.images?.[0]?.url,
        carePlan: currentClient.carePlan,
        notes: currentClient.notes,
        maritalStatus: currentClient.maritalStatus,
        preferredLanguage: currentClient.preferredLanguage,
        allergies: currentClient.allergies,
        dietaryRestrictions: currentClient.dietaryRestrictions,
        primaryPhysician: `${currentClient.primaryPhysician?.name} - ${currentClient.primaryPhysician?.phone}`,
        albertaHealthNbr: currentClient.albertaHealthNbr,
        riskAssessment: currentClient.riskAssessment,
      }));
    }
  }, [currentClient]);

  useEffect(() => {
    if (isEditing) {
      setTempAllergies(profile.allergies);
    }
  }, [isEditing, profile.allergies]);

  useEffect(() => {
    if (isEditing) {
      setTempDietaryRestrictions(profile.dietaryRestrictions);
    }
  }, [isEditing, profile.dietaryRestrictions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'phoneNumber':
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(value)
          ? ''
          : 'Phone number must follow the format (123) 456-7890.';
      case 'dateOfBirth':
        return !isNaN(new Date(value).getTime())
          ? ''
          : 'Invalid date format. Use a valid date.';
      case 'emergencyContact':
        return value.trim() !== '' ? '' : 'Emergency contact cannot be empty.';
      case 'albertaHealthNbr':
        return /^[A-Za-z0-9]{8,12}$/.test(value)
          ? ''
          : 'Alberta Health Number must be 8-12 alphanumeric characters.';
      case 'name':
        return value.trim() !== '' ? '' : 'Name cannot be empty.';
      case 'address':
        return value.trim() !== '' ? '' : 'Address cannot be empty.';
      case 'dietaryRestrictions':
        return Array.isArray(value) &&
          value.every((item) => typeof item === 'string')
          ? ''
          : 'Dietary restrictions must be an array of strings.';
      case 'allergies':
        return Array.isArray(value) &&
          value.every((item) => typeof item === 'string')
          ? ''
          : 'Allergies must be an array of strings.';
      default:
        return '';
    }
  };

  const validateAllFields = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(profile)) {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempAllergies(profile.allergies);
    setTempDietaryRestrictions(profile.dietaryRestrictions);
  };

  const handleSave = () => {
    if (validateAllFields()) {
      // Update profile with tempAllergies and tempDietaryRestrictions
      const updatedProfile = {
        ...profile,
        allergies: tempAllergies,
        dietaryRestrictions: tempDietaryRestrictions,
      };
      setProfile(updatedProfile);
      setIsEditing(false);

      // Simulate saving or send updatedProfile to backend
      console.log('Profile saved:', updatedProfile);
    } else {
      console.error('Validation failed:', errors);
    }
  };

  const handleAddDietaryRestriction = () => {
    setTempDietaryRestrictions((prev) => [...prev, '']);
  };

  const handleDietaryChange = (index, value) => {
    const updatedRestrictions = [...tempDietaryRestrictions];
    updatedRestrictions[index] = value;
    setTempDietaryRestrictions(updatedRestrictions);
  };

  const handleRemoveDietaryRestriction = (index) => {
    const updatedRestrictions = tempDietaryRestrictions.filter(
      (_, i) => i !== index
    );
    setTempDietaryRestrictions(updatedRestrictions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Client Profile
        </h1>
        {userRole === 'admin' && (
          <div className="flex space-x-2">
            <button
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              className={`px-4 py-2 rounded-lg text-white transition ${
                isEditing
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition"
              >
                Save
              </button>
            )}
          </div>
        )}
      </div>

      {/* Basic Information */}
      <section className="flex flex-col md:flex-row items-center md:items-start border-b border-gray-200 pb-6 mb-6">
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shadow-md border-4 border-blue-300">
          <img
            src={
              profile.imageUrl
                ? profile.imageUrl
                : 'https://via.placeholder.com/150'
            }
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-8 space-y-3 w-full">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className={`text-xl md:text-3xl font-bold text-gray-800 w-full border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded px-3 py-2`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </>
          ) : (
            <p className="text-xl md:text-3xl font-bold text-gray-800">
              {profile.name}
            </p>
          )}

          <p className="text-lg font-medium text-gray-600">
            Status:{' '}
            <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {profile.status}
            </span>
          </p>
        </div>
      </section>

      {/* Contact and Demographics */}
      <section className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Contact & Demographics
        </h2>
        <ul className="space-y-3 text-gray-700">
          {/* Existing fields */}
          <li>
            <strong>Date of Birth:</strong>{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  } rounded px-2 py-1`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </>
            ) : (
              profile.dateOfBirth
            )}
          </li>

          <li>
            <strong>Phone Number:</strong>{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  } rounded px-2 py-1`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </>
            ) : (
              profile.phoneNumber
            )}
          </li>

          <li>
            <strong>Emergency Contact:</strong>{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.emergencyContact
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded px-2 py-1`}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyContact}
                  </p>
                )}
              </>
            ) : (
              profile.emergencyContact
            )}
          </li>

          <li>
            <strong>Address:</strong>{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } rounded px-2 py-1`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </>
            ) : (
              profile.address
            )}
          </li>

          <li>
            <strong>Marital Status:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="maritalStatus"
                value={profile.maritalStatus}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              profile.maritalStatus
            )}
          </li>
          <li>
            <strong>Preferred Language:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="preferredLanguage"
                value={profile.preferredLanguage}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              profile.preferredLanguage
            )}
          </li>
        </ul>
      </section>

      {/* Health and Medical Records */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Health & Medical Records
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Care Plan:</strong>{' '}
            {isEditing ? (
              <textarea
                name="carePlan"
                value={profile.carePlan}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
                rows="4"
              />
            ) : (
              profile.carePlan
            )}
          </li>
          <li>
            <strong>Notes:</strong>{' '}
            {isEditing ? (
              <textarea
                name="notes"
                value={profile.notes}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
                rows="4"
              />
            ) : (
              profile.notes
            )}
          </li>
          <li>
            <strong>Medical History:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="medicalHistory"
                value={profile.medicalHistory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              profile.medicalHistory
            )}
          </li>
          <li>
            <strong>Current Medications:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="currentMedications"
                value={profile.currentMedications}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              profile.currentMedications
            )}
          </li>
          <li>
            <strong>Allergies:</strong>{' '}
            {isEditing ? (
              <div>
                {tempAllergies.map((allergy, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={allergy}
                      onChange={(e) => {
                        const updatedAllergies = [...tempAllergies];
                        updatedAllergies[index] = e.target.value;
                        setTempAllergies(updatedAllergies);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                      onClick={() => {
                        const updatedAllergies = tempAllergies.filter(
                          (_, i) => i !== index
                        );
                        setTempAllergies(updatedAllergies);
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setTempAllergies([...tempAllergies, ''])}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Allergy
                </button>
              </div>
            ) : (
              <ul className="list-disc pl-5">
                {profile.allergies.length > 0 ? (
                  profile.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))
                ) : (
                  <li>No allergies provided</li>
                )}
              </ul>
            )}
          </li>

          <li>
            <strong>Dietary Restrictions:</strong>{' '}
            {isEditing ? (
              <div>
                {tempDietaryRestrictions.map((restriction, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={restriction}
                      onChange={(e) =>
                        handleDietaryChange(index, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                      onClick={() => handleRemoveDietaryRestriction(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddDietaryRestriction}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Restriction
                </button>
              </div>
            ) : (
              <ul className="list-disc pl-5">
                {profile.dietaryRestrictions.length > 0 ? (
                  profile.dietaryRestrictions.map((restriction, index) => (
                    <li key={index}>{restriction}</li>
                  ))
                ) : (
                  <li>No dietary restrictions provided</li>
                )}
              </ul>
            )}
          </li>

          <li>
            <strong>Primary Physician:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="primaryPhysician"
                value={profile.primaryPhysician}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              profile.primaryPhysician
            )}
          </li>
          <li>
            <strong>Alberta Health Number:</strong>{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="albertaHealthNbr"
                  value={profile.albertaHealthNbr}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.albertaHealthNbr
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded px-2 py-1`}
                />
                {errors.albertaHealthNbr && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.albertaHealthNbr}
                  </p>
                )}
              </>
            ) : (
              profile.albertaHealthNbr
            )}
          </li>

          <li>
            <strong>Risk Assessment:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="riskAssessment"
                value={profile.riskAssessment}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              profile.riskAssessment
            )}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ClientProfile;
