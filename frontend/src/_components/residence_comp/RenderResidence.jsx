import { Button } from '../../components/ui/button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.jsx';
import ResidenceForm from '@/_components/residence_comp/ResidenceForm.jsx';
import EditResidence from '@/_components/residence_comp/EditResidence.jsx';

/**
 * A component to render a residence card with an image, details, and admin controls.
 * Displays a loading animation if data is not yet available.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.residence - The residence data to render.
 * @param {boolean} props.loading - Whether the data is still loading.
 * @returns {React.ReactElement} The rendered residence card component.
 *
 * @example
 * const residence = {
 *   name: "GroupHome 30",
 *   location: "12245 102street NW",
 *   description: "A supportive home environment for residents.",
 *   images: [{ url: "https://example.com/image.jpg" }],
 * };
 *
 * <RenderResidence residence={residence} loading={false} />;
 */
function RenderResidence({ residence, loading }) {
  const imageAddrress =
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D';
  const userRole =
    useSelector((state) => state?.user?.user?.details?.role) || 'caregiver';

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 border border-gray-200 rounded-lg shadow-lg p-6 gap-6 m-3 animate-pulse">
        {/* Loading Image Placeholder */}
        <div className="w-full md:w-[450px] bg-gray-300 rounded-lg h-48"></div>
        {/* Loading Info Placeholder */}
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white border border-gray-200 rounded-lg shadow-lg p-6 gap-6 m-3">
      {/* RenderResidence Image */}
      <div className="w-full md:w-[450px]">
        <img
          src={residence?.images?.[0]?.url || imageAddrress}
          alt="photo of residence"
          loading="lazy"
          className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full h-48 object-cover"
        />
      </div>

      {/* RenderResidence Info */}
      <div className="flex-1 text-left space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {residence?.name || 'Grouphome 20'}
        </h2>
        <p className="text-gray-600">
          {residence?.location || '1234 Elm Street, Edmonton, AB, Canada'}
        </p>
        <p className="text-gray-500 text-sm">
          {residence.description ||
            'This residence provides supportive living for individuals requiring additional care and resources.'}
        </p>
      </div>

      {/* Admin Controls */}
      {userRole === 'admin' && (
        <div className="flex flex-row space-x-4">
          <Dialog>
            <DialogTrigger>
              <Button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <EditResidence residence={residence} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default RenderResidence;
