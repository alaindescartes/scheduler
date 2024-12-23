import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button.jsx';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line react/prop-types
function Client({ loading, client, residenceId }) {
  const onsite = client.status;
  const userRole =
    useSelector((state) => state?.user?.user?.details?.role) || 'caregiver';
  const imageUrl = client.images?.[0]?.url;
  const name = `${client.firstname} ${client.lastname}`;

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row items-center bg-gray-100 border border-gray-200 rounded-lg shadow-lg p-4 animate-pulse space-y-4 md:space-y-0 md:space-x-4 mb-4">
        {/* Image skeleton */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300"></div>

        {/* Text skeleton */}
        <div className="flex flex-col items-start space-y-2 flex-1">
          <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded-md"></div>
        </div>

        {/* Button skeletons */}
        {userRole === 'admin' && (
          <div className="flex flex-wrap space-x-2 space-y-2">
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow space-y-4 md:space-y-0 md:space-x-4 mb-4">
      {/* Image of a resident */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden rounded-full border border-gray-300 shadow-sm bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="picture of a resident"
            className="object-cover w-full h-full"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-gray-400 text-5xl" />
        )}
      </div>

      {/* Details of resident */}
      <div className="flex flex-col items-start space-y-2 flex-1">
        <p className="text-xl font-semibold text-gray-800">{name}</p>
        {onsite === 'onsite' && (
          <p className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
            Status: {onsite}
          </p>
        )}
        {onsite === 'offsite' && (
          <p className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
            Status: {onsite}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap md:space-x-2 space-y-2 md:space-y-0">
        {/* View button: Visible to everyone */}
        <Link
          to={`/homepage/visit_residence/${residenceId}/${client._id}`}
          className="bg-green-500 text-white px-4 py-1 w-full md:w-auto rounded-md hover:bg-green-600 transition-all flex items-center justify-center"
        >
          VIEW
        </Link>

        {/* Admin-only buttons */}
        {userRole === 'admin' && (
          <>
            <Button className="bg-blue-500 text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-blue-600 transition-all">
              EDIT INFO
            </Button>
            <Button className="bg-red-500 text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-red-600 transition-all">
              DELETE CLIENT
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Client;
