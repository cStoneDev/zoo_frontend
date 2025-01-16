import axios from 'axios';

const forgotPasswordService = {
  /**
   * Envía una solicitud al backend para iniciar el proceso de recuperación de contraseña.
   *
   * @param {string} email - El correo electrónico del usuario.
   * @returns {Promise<object>} Respuesta del servidor.
   */
  async sendRecoveryEmail(email) {
    try {
      // Realiza la solicitud POST al backend
      const response = await axios.post('http://localhost:8080/users/forgot-password', {
        email, // El correo electrónico se pasa en el cuerpo de la solicitud
      });
      
      // Devuelve los datos de la respuesta
      return response.data; 
    } catch (error) {
      // Manejo de errores: muestra el error en la consola y lanza una excepción
      console.error('Error en forgotPasswordService:', error.response || error);
      throw error.response?.data || error.message || 'Error al enviar el correo de recuperación';
    }
  },
};

export default forgotPasswordService;