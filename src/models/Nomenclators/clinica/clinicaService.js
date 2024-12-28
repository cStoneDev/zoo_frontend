import axios from '../../../plugins/axios';

//GET clinic
const getClinic = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/clinic', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('clinicas recibidas:', content);
  
      return {
        clinic: content, // Lista de clinicas
        pagination: {
          totalElements,     // Total de elementos (Clinicas)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de Clinicas:', error);
      throw error;
    }
  };


  //POST SEARCH Clinic
const searchClinic = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/clinic/search', searchCriteria, {
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
        clinic: content, // Lista de  Clinicas filtrados
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
      console.error('Error al buscar Clinicas con filtros:', error);
      throw error;
    }
  };


  //POST CREATE Clinic
const createClinic = async (clinicData) => {
    try {
      const response = await axios.post('http://localhost:8080/clinic', clinicData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        name,
      } = response.data;
  
      console.log('Clinicas creado creada:', response.data);
  
      return {
        id,
        name,
      };
    } catch (error) {
      console.error('Error al crear un nuevo Clinicas:', error);
      throw error;
    }
  };


  //DELETE Clinic
const deleteClinic = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/clinic/${id}`);
  
      console.log(`Tipo de clinic con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el tipo de clinic con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE Clinic
const updateClinic = async (id, clinicData) => {
    try {
      const response = await axios.put(`http://localhost:8080/clinic/${id}`, clinicData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del clinicas actualizado
      const {
        id:clinicId,
        name,

      } = response.data;
  
      console.log('clinica actualizado:', response.data);
  
      return {
        id: clinicId,
        name,

      };
    } catch (error) {
      console.error(`Error al actualizar la clinica con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getClinic,
    searchClinic,
    createClinic,
    deleteClinic,
    updateClinic,
};