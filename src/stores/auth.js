import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "../plugins/axios";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const refreshToken = ref(localStorage.getItem("refresh_token") || null); // Definir refreshToken

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });

      if (
        response.data.access_token &&
        response.data.refresh_token
      ) {
        token.value = response.data.access_token;
        refreshToken.value = response.data.refresh_token; 

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        isAuthenticated.value = true;
        user.value = response.data.user;

        return response.data;
      } else {
        throw new Error("Respuesta del servidor inválida");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Credenciales incorrectas");
    }
  };

  const logout = () => {
    token.value = null;
    refreshToken.value = null; // Limpiar el refreshToken
    user.value = null;
    isAuthenticated.value = false;
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
  };
});
