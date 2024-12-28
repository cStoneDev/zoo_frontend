import axios from '../../../plugins/axios';

//GET provinces
const getProvinces = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/province', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('provincias recibidas:', content);
  
      return {
        provinces: content, // Lista de provincias
        pagination: {
          totalElements,     // Total de elementos (provincia)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de provincia:', error);
      throw error;
    }
  };


  //POST SEARCH provinces
const searchProvinces = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/province/search', searchCriteria, {
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
        provinces: content, // Lista de provincia filtrados
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
      console.error('Error al buscar provincia con filtros:', error);
      throw error;
    }
  };


  //POST CREATE province
const createProvince = async (provinceData) => {
    try {
      const response = await axios.post('http://localhost:8080/province', provinceData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        name,
      } = response.data;
  
      console.log('Provincia creada:', response.data);
  
      return {
        id,
        name,
      };
    } catch (error) {
      console.error('Error al crear un nueva provincia:', error);
      throw error;
    }
  };


  //DELETE province
const deleteProvince = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/province/${id}`);
  
      console.log(`Provincia con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el provincia con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE province
const updateProvince = async (id, provinceData) => {
    try {
      const response = await axios.put(`http://localhost:8080/province/${id}`, provinceData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del provincia actualizado
      const {
        id: provinceId,
        name,
      } = response.data;
  
      console.log('provincia actualizado:', response.data);
  
      return {
        id: provinceId,
        name,
      };
    } catch (error) {
      console.error(`Error al actualizar la provincia con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getProvinces,
    searchProvinces,
    createProvince,
    deleteProvince,
    updateProvince,
};