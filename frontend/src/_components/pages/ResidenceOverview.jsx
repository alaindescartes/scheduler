import Client from '@/_components/clientComponents/Client.jsx';
import { useParams } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import ClientForm from '../clientComponents/ClientForm';

function ResidentOverview() {
  const { id } = useParams();
  const [residence, setResidence] = useState({});
  const userRole =
    useSelector((state) => state?.user?.user?.details?.role) || 'caregiver';

  //get residence info
  const getResidence = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/res/${id}`;
    const response = await axios.get(url, { withCredentials: true });
    if (response.status === 200) {
      setResidence(response.data?.residence);
    }
  };
  useEffect(() => {
    getResidence();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Residence Name */}
      <h1 className="text-3xl mt-3 mb-6 text-center font-extrabold text-gray-800">
        {residence?.name}
      </h1>

      {/* Admin Functionalities */}
      <div className="flex justify-center space-x-4 mb-6">
        {/* add client */}
        {userRole === 'admin' && (
          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all">
                ADD CLIENT
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <ClientForm id={id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        {/* add tasks */}
        <Button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all">
          ADD HOUSE TASKS
        </Button>
      </div>

      {/* Client list */}
      <div
        className="grid grid-cols-1 gap-6 overflow-y-scroll border border-gray-200 rounded-lg shadow-md p-4"
        style={{ maxHeight: '400px', scrollbarGutter: 'stable' }}
      >
        <Client />
        <Client />
      </div>
    </div>
  );
}
export default ResidentOverview;
