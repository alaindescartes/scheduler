import Client from '@/_components/clientComponents/Client.jsx';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSelector, useDispatch } from 'react-redux';
import ClientForm from '../clientComponents/ClientForm';
import {
  resetLoadingState,
  setLoadingState,
} from '../../store/loading/loadingSlice';
import ResidenceLinks from '../residence_comp/ResidenceLinks';

function ResidentOverview() {
  const { id } = useParams();
  const [residence, setResidence] = useState({});
  const [clients, setClients] = useState([]);
  const userRole =
    useSelector((state) => state?.user?.user?.details?.role) || 'caregiver';
  const loading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const { clientId } = useParams();

  //get residence info
  const getResidence = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/res/${id}`;
    const response = await axios.get(url, { withCredentials: true });
    if (response.status === 200) {
      setResidence(response.data?.residence);
    }
  };

  //get clients associated with the residence
  const getClients = async () => {
    try {
      dispatch(setLoadingState(true));
      const url = `${import.meta.env.VITE_BASE_URL}/client/${id}/clients`;
      const response = await axios.get(url, { withCredentials: true });
      if (response.status === 200) {
        setClients(response.data.clients);
      }
    } catch (error) {
      console.log('error getting clients', error);
    } finally {
      dispatch(resetLoadingState());
    }
  };

  useEffect(() => {
    getResidence();
    getClients();
  }, [id]);

  return (
    <>
      {!clientId && (
        <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-lg">
          {/* Residence Name */}
          <h1 className="text-3xl mt-3 mb-6 text-center font-extrabold text-gray-800">
            {residence?.name}
          </h1>

          {/* Admin Functionalities */}
          <div className="flex justify-center space-x-4 mb-6">
            {/* Add Client */}
            {userRole === 'admin' && (
              <Dialog>
                <DialogTrigger>
                  <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all">
                    ADD CLIENT
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-red-400 font-semibold text-xl">
                      Click on the "View" button to complete setting up the
                      profile.
                    </DialogTitle>

                    <DialogDescription>
                      <ClientForm id={id} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}

            {/* Add Tasks */}
            <Button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all">
              ADD HOUSE TASKS
            </Button>
          </div>

          {/* residence links */}
          <ResidenceLinks />

          {/* Client List */}
          {clients.length !== 0 ? (
            <div
              className="grid grid-cols-1 gap-6 overflow-y-scroll border border-gray-200 rounded-lg shadow-md p-4"
              style={{ maxHeight: '400px', scrollbarGutter: 'stable' }}
            >
              {clients.map((client) => (
                <Client
                  loading={loading}
                  client={client}
                  residenceId={id}
                  key={client._id}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col text-center bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6">
              <p className="text-lg font-semibold text-gray-700">
                No clients available
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This residence currently has no registered clients. Please check
                back later.
              </p>
            </div>
          )}

          {/* Past Shift Contact Notes */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Past Shift Contact Notes
            </h2>
            <div className="overflow-y-scroll max-h-64">
              {/** Replace with actual notes data */}
              <ul className="space-y-2">
                <li className="p-3 bg-white rounded shadow text-gray-700">
                  <strong>Shift Date:</strong> 2024-12-15
                  <br />
                  <strong>Contact:</strong> Notes about this shift...
                  <br />
                  <strong>Staff Initials:</strong> A.D
                </li>
                <li className="p-3 bg-white rounded shadow text-gray-700">
                  <strong>Shift Date:</strong> 2024-12-14
                  <br />
                  <strong>Contact:</strong> Another note about a shift...
                  <br />
                  <strong>Staff Initials:</strong> A.D
                </li>
                {/* Add more notes dynamically */}
              </ul>
            </div>
          </div>
          {/* Shifts history section */}
          {userRole === 'admin' && (
            <section className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Shift History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-600">
                        Date
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-600">
                        Staff Name
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-600">
                        Clock In Time
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-600">
                        Clock Out Time
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-600">
                        Total Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        date: '2024-12-21',
                        staffName: 'Jane Doe',
                        clockIn: '8:00 AM',
                        clockOut: '4:00 PM',
                        totalHours: '8',
                      },
                      {
                        date: '2024-12-20',
                        staffName: 'John Smith',
                        clockIn: '9:00 AM',
                        clockOut: '5:00 PM',
                        totalHours: '8',
                      },
                      {
                        date: '2024-12-19',
                        staffName: 'Emily Johnson',
                        clockIn: '7:00 AM',
                        clockOut: '3:00 PM',
                        totalHours: '8',
                      },
                    ].map((shift, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                          {shift.date}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                          {shift.staffName}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                          {shift.clockIn}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                          {shift.clockOut}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-gray-700">
                          {shift.totalHours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}

      <Outlet />
    </>
  );
}
export default ResidentOverview;
