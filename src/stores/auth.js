import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../plugins/axios";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("token"));
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const refreshToken = ref(localStorage.getItem("refresh_token") || null);

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
  };

  //renovar token
  const renewToken = async () => {
    try {
      if (!refreshToken.value) throw new Error("No hay refresh token disponible");
  
      console.log("Renovando token con refresh token:", refreshToken.value);
  
      // Agregar el token de acceso actual en el encabezado Authorization
      const response = await axios.post(
        "http://localhost:8080/auth/refresh", // URL para la renovación
        null, // No se pasa cuerpo 
        {
         params: { refresh_token: refreshToken.value }, // Pasamos el refresh_token como parámetro en la URL
          headers: {
            Authorization: `Bearer ${token.value}`, // Pasar el token de acceso actual en el encabezado
          },
        }
      );
  
      if (response.data?.access_token && response.data?.refresh_token) {
        token.value = response.data.access_token;
        refreshToken.value = response.data.refresh_token;
  
        // Guardar los nuevos tokens en el almacenamiento local
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
  
        return response.data.access_token; // Retornar el nuevo token de acceso
      } else {
        throw new Error("Error al renovar el token");
      }
    } catch (error) {
      console.error("Error al renovar el token:", error);
      logout(); // Si falla la renovación, cierra sesión
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

  return {
    isAuthenticated,
    user,
    token,
    refreshToken,
    login,
    logout,
    renewToken,
  };
});
