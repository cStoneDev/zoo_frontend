import axios from '../../../plugins/axios';

//GET Breeds
const getBreeds = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/breeds', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('Razas recibidas:', content);
  
      return {
        breeds: content, // Lista de razas
        pagination: {
          totalElements,     // Total de elementos (razas)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de razas:', error);
      throw error;
    }
  };


  //POST SEARCH BREEDS
const searchBreeds = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/breeds/search', searchCriteria, {
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
        breeds: content, // Lista de razas filtrados
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
      console.error('Error al buscar razas con filtros:', error);
      throw error;
    }
  };


  //POST CREATE BREED
const createBreed = async (breedData) => {
    try {
      const response = await axios.post('http://localhost:8080/breeds', breedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        name,
        specieId,
        specieName,
      } = response.data;
  
      console.log('Raza creada:', response.data);
  
      return {
        id,
        name,
        specieId,
        specieName,
      };
    } catch (error) {
      console.error('Error al crear un nueva raza:', error);
      throw error;
    }
  };


  //DELETE BREED
const deleteBreed = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/breeds/${id}`);
  
      console.log(`Raza con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el raza con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE BREEDS
const updateBreed = async (id, breedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/breeds/${id}`, breedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del raza actualizado
      const {
        id: breedId,
        name,
        specieId,
        specieName,
      } = response.data;
  
      console.log('Raza actualizado:', response.data);
  
      return {
        id: breedId,
        name,
        specieId,
        specieName,
      };
    } catch (error) {
      console.error(`Error al actualizar la raza con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getBreeds,
    searchBreeds,
    createBreed,
    deleteBreed,
    updateBreed,
};