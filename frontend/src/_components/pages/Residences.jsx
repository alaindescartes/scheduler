import { useEffect } from 'react';
import { Button } from '../../components/ui/button.jsx';
import RenderResidence from '../residence_comp/RenderResidence.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ResidenceForm from '../residence_comp/ResidenceForm.jsx';
import { getResidences } from '@/db/residence.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetLoadingState,
  setLoadingState,
} from '@/store/loading/loadingSlice.js';
import axios from 'axios';
import { toast } from 'sonner';

/**
 * Renders a list of residences and provides administrative functionality for managing them.
 *
 * - Admin users can add new residences using the "Add Residences" dialog.
 * - Residences are fetched from the database and displayed in a list.
 * - Non-admin users see a read-only view of the residences.
 *
 * @component
 * @returns {React.ReactElement} The rendered `Residences` component.
 *
 * @example
 * <Residences />
 */
function Residences() {
  const userRole =
    useSelector((state) => state?.user?.user?.details?.role) || 'caregiver';
  const loading = useSelector((state) => state?.loading.isLoading);

  const dispatch = useDispatch();

  const residences =
    useSelector((state) => state?.residences?.residences) || [];

  useEffect(() => {
    async function putResidenceInStore() {
      try {
        dispatch(setLoadingState(true));
        await getResidences(dispatch);
      } catch (error) {
        console.error('Error fetching residences:', error);
      } finally {
        dispatch(resetLoadingState());
      }
    }

    if (residences.length === 0) {
      putResidenceInStore();
    }
  }, [dispatch, residences.length]);

  const deleteResidence = async (id) => {
    try {
      dispatch(setLoadingState(true));
      const result = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/res/delete_residence/${id}`,
        { withCredentials: true }
      );
      if (result.status === 200) {
        toast('Residence Deleted', {
          style: { background: 'green', color: 'white' },
        });
        await getResidences(dispatch);
      }
    } catch (error) {
      console.log('Error while deleting residence: ', error);
    } finally {
      dispatch(resetLoadingState());
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      {userRole === 'admin' && (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-blue-400 w-[300px] text-center m-auto mt-3 hover:bg-blue-500">
              ADD RESIDENCES
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                <ResidenceForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {/* list of residences */}
      <div>
        <div>
          {Array.isArray(residences) && residences.length > 0 ? (
            residences.map((res) => (
              <RenderResidence
                key={res._id}
                residence={res}
                loading={loading}
                deleteFunc={() => deleteResidence(res._id)}
              />
            ))
          ) : (
            <p>No residences available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Residences;
