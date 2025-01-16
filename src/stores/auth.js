import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../plugins/axios";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("token"));
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const refreshToken = ref(localStorage.getItem("refresh_token") || null);
  const resetPasswordToken = ref(localStorage.getItem("reset_password_token") || null); // Nuevo token para restablecer la contraseña

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });

      if (response.data?.access_token && response.data?.refresh_token) {
        setTokens(response.data.access_token, response.data.refresh_token);
        user.value = response.data.user || null;
        isAuthenticated.value = true;

        return response.data;
      } else {
        throw new Error("Respuesta del servidor inválida");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      throw new Error(
        error.response?.data?.message || "Credenciales incorrectas"
      );
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    clearTokens();
    user.value = null;
    isAuthenticated.value = false;
    clearResetPasswordToken(); // Limpiar el token de restablecimiento al hacer logout
  };

  // Función para renovar el token
  const renewToken = async () => {
    try {
      if (!refreshToken.value) throw new Error("No hay refresh token disponible");

      console.log("Renovando token con refresh token:", refreshToken.value);

      const response = await axios.post(
        "http://localhost:8080/auth/refresh", 
        null, 
        {
         params: { refresh_token: refreshToken.value },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      if (response.data?.access_token && response.data?.refresh_token) {
        token.value = response.data.access_token;
        refreshToken.value = response.data.refresh_token;

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        return response.data.access_token;
      } else {
        throw new Error("Error al renovar el token");
      }
    } catch (error) {
      console.error("Error al renovar el token:", error);
      logout();
      throw error;
    }
  };

  // Función para establecer los tokens en el almacenamiento
  const setTokens = (access, refresh) => {
    token.value = access;
    refreshToken.value = refresh;

    localStorage.setItem("token", access);
    localStorage.setItem("refresh_token", refresh);
  };

  // Función para limpiar los tokens del almacenamiento
  const clearTokens = () => {
    token.value = null;
    refreshToken.value = null;

    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  };

  // Función para establecer el resetPasswordToken
  const setResetPasswordToken = (resetToken) => {
    resetPasswordToken.value = resetToken;
    localStorage.setItem("reset_password_token", resetToken); // Guardar en el localStorage
  };

  // Función para limpiar el resetPasswordToken
  const clearResetPasswordToken = () => {
    resetPasswordToken.value = null;
    localStorage.removeItem("reset_password_token"); // Limpiar el localStorage
  };

  return {
    isAuthenticated,
    user,
    token,
    refreshToken,
    resetPasswordToken,
    login,
    logout,
    renewToken,
    setResetPasswordToken,
    clearResetPasswordToken,
  };
});
