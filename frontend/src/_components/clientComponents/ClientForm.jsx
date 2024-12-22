import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorState, resetErrorState } from '@/store/error/errorSlice.js';
import axios from 'axios';
import { toast } from 'sonner';
import {
  resetLoadingState,
  setLoadingState,
} from '@/store/loading/loadingSlice.js';
import imageCompression from 'browser-image-compression';

function ClientForm({ id }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    images: [], // Holds uploaded and compressed image files
  });

  const [imageError, setImageError] = useState(null);

  const dispatch = useDispatch();
  const appError = useSelector((state) => state.error.error);
  const message = useSelector((state) => state.error.errorMessage);
  const loading = useSelector((state) => state.loading.isLoading);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    dispatch(resetErrorState());
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Get selected files
    const options = {
      maxSizeMB: 1, // Maximum file size in MB
      maxWidthOrHeight: 1024, // Maximum width or height of the image
      useWebWorker: true, // Use web worker for faster compression
    };

    try {
      const compressedFiles = await Promise.all(
        files.map((file) => imageCompression(file, options))
      );
      setFormData({ ...formData, images: compressedFiles });
    } catch (error) {
      console.error('Error compressing images:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      images: [],
    });
    const fileInput = document.getElementById('images');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateImage = (images) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const maxFiles = 5;
    const errors = [];

    if (images.length > maxFiles) {
      errors.push(`You can only upload up to ${maxFiles} files.`);
    }

    for (const file of images) {
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large. Maximum file size is 5 MB.`);
      }
      if (!validTypes.includes(file.type)) {
        errors.push(`${file.name} is not a supported format.`);
      }
    }

    if (errors.length > 0) {
      setImageError(errors.join('\n'));
      return false;
    }

    setImageError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateImage(formData.images)) {
      console.log('Image validation failed');
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      dispatch(setErrorState('First Name and Last Name are required.'));
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);

    formData.images.forEach((file) => {
      formDataToSend.append('images', file);
    });

    try {
      dispatch(setLoadingState(true));
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/client/${id}/add_client`,
        formDataToSend,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast('Client added successfully', {
          style: { backgroundColor: 'green', color: 'white' },
        });
        resetForm();
      }
    } catch (error) {
      toast('Could not add client, try again later', {
        style: { backgroundColor: 'red', color: 'white' },
      });
      console.error('Error submitting client data: ', error);
    } finally {
      dispatch(resetLoadingState());
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md space-y-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add Client</h2>

      {appError && <div className="text-xs text-red-500">{message}</div>}

      {imageError && (
        <div className="text-xs text-red-500">
          {imageError.split('\n').map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}

      {/* First Name Field */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter first name"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        />
      </div>

      {/* Last Name Field */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter last name"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        />
      </div>

      {/* Image Upload Field */}
      <div>
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Upload Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.images.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {formData.images.length} image(s) selected.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
        disabled={loading}
      >
        {loading ? 'Adding Client...' : 'Submit'}
      </button>
    </form>
  );
}

export default ClientForm;
