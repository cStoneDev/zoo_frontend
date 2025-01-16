import axios from 'axios';

const forgotPasswordService = {
  /**
   * Envía una solicitud al backend para iniciar el proceso de recuperación de contraseña.
   *
   * @param {string} email - El correo electrónico del usuario.
   * @throws {string} Mensaje de error en caso de fallo.
   */
  async sendRecoveryEmail(email) {
    try {
      // Construir el cuerpo de la solicitud
      const requestBody = { email };

      // Realiza la solicitud POST al backend
      await axios.post('http://localhost:8080/users/forgot-password', requestBody, {
        headers: { 'Content-Type': 'application/json' }, // Asegura que se envía como JSON
      });
    } catch (error) {
      // Manejo de errores según el código de estado HTTP
      if (error.response) {
        // Si el servidor respondió con un código de estado distinto de 2xx
        console.error(`Error en forgotPasswordService: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
        throw error.response.data.message || 'Error en el servidor al procesar la solicitud';
      } else if (error.request) {
        // Si no se recibió respuesta del servidor
        console.error('Error en forgotPasswordService: No se recibió respuesta del servidor');
        throw 'No se recibió respuesta del servidor. Inténtalo de nuevo más tarde.';
      } else {
        // Otro tipo de error
        console.error('Error en forgotPasswordService:', error.message);
        throw 'Ocurrió un error desconocido. Inténtalo de nuevo.';
      }
    }
  },

async resetPassword(newPassword) {
  // Extraer el token de la URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    throw 'Token no encontrado en la URL. Verifica el enlace recibido.';
  }

  console.log('Token:', token);

  const requestBody = {
    token: token, // Token extraído de la URL
    password: newPassword, // Nueva contraseña
  };

  try {
    const response = await axios.post('http://localhost:8080/users/reset-password', requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Contraseña restablecida con éxito:', response.data);
    alert('Tu contraseña ha sido restablecida con éxito.');
  } catch (error) {
    if (error.response) {
      console.error(`Error en resetPassword: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
      throw error.response.data.message || 'Error al restablecer la contraseña.';
    } else if (error.request) {
      console.error('Error en resetPassword: No se recibió respuesta del servidor');
      throw 'No se recibió respuesta del servidor. Inténtalo de nuevo más tarde.';
    } else {
      console.error('Error en resetPassword:', error.message);
      throw 'Ocurrió un error desconocido. Inténtalo de nuevo.';
    }
  }
},
};

export default forgotPasswordService;