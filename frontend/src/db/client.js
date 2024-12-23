import axios from 'axios';

/**
 * Fetches the details of a client by their unique ID.
 *
 * @async
 * @function getClient
 * @param {string|number} id - The unique identifier of the client.
 * @returns {Promise<Object|null>} Resolves with the client object if successful, or `null` for unexpected responses.
 * @throws {Error} Throws an error if the request fails (e.g., network issues, server error).
 *
 *
 */
export const getClient = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/client/${id}`;

  try {
    const response = await axios.get(url, { withCredentials: true });

    if (response.status === 200) {
      return response.data.client;
    } else {
      console.error(
        'Error fetching client: Unexpected response status',
        response.status
      );
      return null;
    }
  } catch (error) {
    console.error(
      'Error fetching client:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while fetching the client'
    );
  }
};
