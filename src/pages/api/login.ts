import axios from 'axios';

export const getAdministrative = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/administrative'
    );

    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('fail');
  } catch (error: any) {
    throw new Error(error);
  }
};
