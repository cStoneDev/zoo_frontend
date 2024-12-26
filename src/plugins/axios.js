import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto por tu URL de backend
  timeout: 10000, // Tiempo máximo de espera
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token expira, intenta refrescarlo
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config);  // Realiza la solicitud original con el nuevo token
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await instance.post('/auth/refresh', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      return response.data.access_token;
    }
  } catch (error) {
    console.error('Error al refrescar el token', error);
    throw new Error('No se pudo renovar el token');
  }
};

export default instance;