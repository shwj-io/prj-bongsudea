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

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', {
      email,
      password,
    });

    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('fail');
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginEmail = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/login/email',
      {
        type: 'email',
        email,
        password,
      }
    );

    if (response.status === 200) {
      console.log(response.data.access_token); //토큰
      return response.data.user;
    }

    throw new Error('fail');
  } catch (error: any) {
    throw new Error(error);
  }
};
