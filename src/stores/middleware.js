import { jwtDecode } from "jwt-decode";

// Función para verificar si el usuario tiene un rol específico
export function hasRole(requiredRoles) {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token); // Cambiar jwtDecode aquí
    return requiredRoles.includes(decoded.role.name); // Ajusta si es necesario según tu estructura de payload
  } catch (error) {
    console.error("Error al decodificar el token", error);
    return false;
  }
}
