import jwtDecode from "jwt-decode";

// Función para verificar si el usuario tiene un rol específico
export function hasRole(requiredRoles) {
  const token = localStorage.getItem("jwt-token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return requiredRoles.includes(decoded.role);
  } catch (error) {
    console.error("Error al decodificar el token", error);
    return false;
  }
}
