import axios from '../../plugins/axios';

//GET User
const getUser = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/users', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('usuarios recibidas:', content);
  
      return {
        user: content, // Lista de usuarios
        pagination: {
          totalElements,     // Total de elementos (Usuarios)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de Usuarios:', error);
      throw error;
    }
  };


  //POST SEARCH Usuarios
const searchUser = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/users/search', searchCriteria, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const {
        totalElements,
        totalPages,
        size,
        content,
        number,
        sort,
        first,
        last,
        numberOfElements,
        pageable,
        empty,
      } = response.data;
  
      console.log('Resultados de la búsqueda:', content);
  
      return {
        user: content, // Lista de  Usuarios filtrados
        pagination: {
          totalElements,      // Total de elementos encontrados
          totalPages,         // Total de páginas
          currentPage: number, // Página actual
          pageSize: size,     // Tamaño de la página
          sort,               // Información del ordenamiento
          first,              // Indica si es la primera página
          last,               // Indica si es la última página
          numberOfElements,   // Número de elementos en la página actual
          pageable,           // Información adicional sobre la paginación
          empty,              // Indica si los resultados están vacíos
        },
      };
    } catch (error) {
      console.error('Error al buscar Usuarios con filtros:', error);
      throw error;
    }
  };


  //POST CREATE User
const createUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/users', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        username,
        email,
        roleId,
        
      } = response.data;
  
      console.log('Usuarios creado creada:', response.data);
  
      return {
        id,
        username,
        email,
        roleId,
      };
    } catch (error) {
      console.error('Error al crear un nuevo Usuarios:', error);
      throw error;
    }
  };


  //DELETE User
const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${id}`);
  
      console.log(`Tipo de User con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el tipo de User con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE User
const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`http://localhost:8080/users/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del usuarios actualizado
      const {
        id:userId,
        username,
        email,
        roleId,

      } = response.data;
  
      console.log('Usuarios actualizado:', response.data);
  
      return {
        id: userId,
        username,
        email,
        roleId,

      };
    } catch (error) {
      console.error(`Error al actualizar la Usuarios con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getUser,
    searchUser,
    createUser,
    deleteUser,
    updateUser,
};