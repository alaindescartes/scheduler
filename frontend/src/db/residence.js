import axios from 'axios';
import { setResidences } from '../store/residence/residenceSlice';

/**
 * Fetches all residences from the server and updates the Redux store.
 *
 * This function performs an HTTP GET request to fetch residence data from the server
 * and dispatches an action to update the Redux store with the retrieved data.
 *
 * @async
 * @function getResidences
 * @param {Function} dispatch - The Redux dispatch function to update the store.
 * @returns {Promise<void>} Resolves when the data has been fetched and dispatched.
 * @throws Will log an error to the console if the HTTP request fails.
 *
 * @example
 * import { getResidences } from './path/to/this/file';
 * import { useDispatch } from 'react-redux';
 *
 * const dispatch = useDispatch();
 * await getResidences(dispatch);
 */
export const getResidences = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/res/all_residence`,
      { withCredentials: true }
    );

    if (response.status === 200) {
      const res = response.data.residences;
      if (res.length > 0) {
        dispatch(setResidences(res));
      }
    }
  } catch (error) {
    throw error;
  }
};
