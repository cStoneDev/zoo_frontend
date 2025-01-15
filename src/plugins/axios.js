import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // Asegúrate de que esta ruta sea correcta
import { storeToRefs } from 'pinia';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto por tu URL de backend
  timeout: 10000, // Tiempo máximo de espera
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en las solicitudes
instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    if (token.value) {
      config.headers['Authorization'] = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
instance.interceptors.response.use(
  (response) => response,  // Si la respuesta es exitosa, devuelve la respuesta.
  async (error) => {
    console.log('Error de respuesta:', error);  // Para depurar el error

    if (error.response) {
      const { status, data } = error.response;

      // Depuración de la respuesta de error
      console.log('Estado de la respuesta:', status);
      console.log('Detalles del error:', data);

      // Si el código de estado es 403 (Forbidden), intenta renovar el token.
      if (status === 403) {
        console.log('Token expirado o no autorizado, intentando renovar...');

        try {
          const newAccessToken = await useAuthStore().renewToken();  // Llamamos a renewToken
          if (newAccessToken) {
            console.log('Token renovado:', newAccessToken);
            // Ahora repite la solicitud original con el nuevo token
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(error.config);  // Vuelve a hacer la solicitud original con el nuevo token
          }
        } catch (renewError) {
          console.error('Error al renovar el token:', renewError);
          // Si la renovación del token falla, desloguea al usuario
          useAuthStore().logout(); 
        }
      }
    }

    return Promise.reject(error);  // Devuelve el error si no se pudo renovar el token.
  }
);

export default instance;
