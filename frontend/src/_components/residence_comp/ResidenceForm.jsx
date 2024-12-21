import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorState, resetErrorState } from '@/store/error/errorSlice.js';
import axios from 'axios';
import { toast } from 'sonner';
import { getResidences } from '@/db/residence.js';
import {
  resetLoadingState,
  setLoadingState,
} from '@/store/loading/loadingSlice.js';
import imageCompression from 'browser-image-compression';

/**
 * A React form component to add a new residence.
 *
 * - Handles the addition of residence details including name, location, description, and images.
 * - Validates image file uploads for size, type, and count.
 * - Displays error messages and manages loading state during the submission process.
 *
 * @component
 * @returns {React.ReactElement} The rendered form component.
 *
 * @example
 * <ResidenceForm />
 */
function ResidenceForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    images: [], // Holds uploaded image files
  });

  const [ImageError, setImageError] = useState(null);

  const dispatch = useDispatch();
  const appError = useSelector((state) => state.error.error);
  const message = useSelector((state) => state.error.errorMessage);
  const loading = useSelector((state) => state.loading.isLoading);

  const handleChange = (event) => {
    console.log('Selected files:', event.target.files); //files are null when printed

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    dispatch(resetErrorState());
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Selected files

    // Compression options
    const options = {
      maxSizeMB: 1, // Maximum file size in MB
      maxWidthOrHeight: 1024, // Maximum width or height of the image
      useWebWorker: true, // Use web worker for faster compression
    };

    try {
      // Compress each file
      const compressedFiles = await Promise.all(
        files.map((file) => imageCompression(file, options))
      );

      // Update the state with compressed files
      setFormData({ ...formData, images: compressedFiles });
    } catch (error) {
      console.error('Error compressing images:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      description: '',
      images: [], // Holds uploaded image files
    });
    //clear images
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

    // Check total file count
    if (images.length > maxFiles) {
      errors.push(`You can only upload up to ${maxFiles} files.`);
    }

    for (const file of images) {
      // Check file size
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large. Maximum file size is 5 MB.`);
      }

      // Check file type
      if (!validTypes.includes(file.type)) {
        errors.push(
          `${file.name} is not a supported format. Supported formats are JPEG, PNG, and WebP.`
        );
      }
    }

    if (errors.length > 0) {
      const message = errors.join('\n');
      console.log(message);
      setImageError(message);
      return false; // Validation failed
    }

    if (errors.length === 0) {
      setImageError(null); // Clear previous errors
    }

    return true; // Validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateImage(formData.images)) {
      console.log('Image validation failed');
      return;
    }

    if (!formData.location || !formData.name) {
      dispatch(setErrorState('Name and Location are required.'));
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('description', formData.description);

    // Append each file to FormData
    formData.images.forEach((file) => {
      formDataToSend.append('images', file);
    });

    console.log('formData:');
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      console.log('Submitting FormData:', [...formDataToSend.entries()]);
      console.log('Making API request...');
      dispatch(setLoadingState(true));
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/res/add_residence`,
        formDataToSend,
        {
          //headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        await getResidences(dispatch);
        resetForm();
        toast('Added RenderResidence Successfully', {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        getResidences(dispatch); // Refresh residences list
      }
    } catch (error) {
      toast('Could not add residence, try again later', {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
      console.error('Error submitting residence data: ', error);
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
      <h2 className="text-2xl font-bold text-gray-800">Add Residence</h2>

      {appError && <div className="text-xs text-red-500">{message}</div>}

      {ImageError && (
        <div className="text-xs text-red-500">
          {ImageError.split('\n').map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Enter residence name"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        />
      </div>

      {/* Location Field */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          placeholder="Enter location"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        />
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          placeholder="Enter description"
          rows="4"
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
        {loading ? 'Adding Residence...' : 'Submit'}
      </button>
    </form>
  );
}

export default ResidenceForm;
