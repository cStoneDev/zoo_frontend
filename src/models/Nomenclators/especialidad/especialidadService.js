import axios from '../../../plugins/axios';

//GET Speciality
const getSpeciality = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/speciality', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('especialidades recibidas:', content);
  
      return {
        speciality: content, // Lista de especialidades
        pagination: {
          totalElements,     // Total de elementos (especialidades)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de especialidades:', error);
      throw error;
    }
  };


  //POST SEARCH Speciality
const searchSpeciality = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/speciality/search', searchCriteria, {
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
        speciality: content, // Lista de  especialidaes filtrados
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
      console.error('Error al buscar Especialidades con filtros:', error);
      throw error;
    }
  };


  //POST CREATE Speciality
const createSpeciality = async (specialityData) => {
    try {
      const response = await axios.post('http://localhost:8080/speciality', specialityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        name,
      } = response.data;
  
      console.log('especialidad creada:', response.data);
  
      return {
        id,
        name,
      };
    } catch (error) {
      console.error('Error al crear un nuevo especialidad:', error);
      throw error;
    }
  };


  //DELETE Speciality
const deleteSpeciality = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/speciality/${id}`);
  
      console.log(`Tipo de especialidad con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el tipo de Speciality con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE Speciality
const updateSpeciality = async (id, specialityData) => {
    try {
      const response = await axios.put(`http://localhost:8080/speciality/${id}`, specialityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del especialidad actualizado
      const {
        id:specialityId,
        name,

      } = response.data;
  
      console.log('especialidad actualizado:', response.data);
  
      return {
        id: specialityId,
        name,

      };
    } catch (error) {
      console.error(`Error al actualizar la especialidad con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getSpeciality,
    searchSpeciality,
    createSpeciality,
    deleteSpeciality,
    updateSpeciality,
};