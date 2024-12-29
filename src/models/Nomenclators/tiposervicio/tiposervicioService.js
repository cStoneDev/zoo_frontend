import axios from '../../../plugins/axios';

//GET servicetype
const getServicetype = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/servicetype', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('tipo de servicio recibidas:', content);
  
      return {
        servicetype: content, // Lista de tipo de servicio
        pagination: {
          totalElements,     // Total de elementos (tipo de servicio)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de tipo de servicio:', error);
      throw error;
    }
  };


  //POST SEARCH servicetype
const searchServicetype = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/servicetype/search', searchCriteria, {
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
        servicetype: content, // Lista de tipo de servicio filtrados
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
      console.error('Error al buscar tipos de servicio con filtros:', error);
      throw error;
    }
  };


  //POST CREATE servicetype
const createServicetype = async (servicetypeData) => {
    try {
      const response = await axios.post('http://localhost:8080/servicetype', servicetypeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        name,
      } = response.data;
  
      console.log('Tipo de servicio creado creada:', response.data);
  
      return {
        id,
        name,
      };
    } catch (error) {
      console.error('Error al crear un nuevo tipo de sercvicio:', error);
      throw error;
    }
  };


  //DELETE servicetype
const deleteServicetype = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/servicetype/${id}`);
  
      console.log(`Tipo de servicio con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el tipo de servicoio con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE servicetype
const updateServicetype = async (id, servicetypeData) => {
    try {
      const response = await axios.put(`http://localhost:8080/servicetype/${id}`, servicetypeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del tipo de service actualizado
      const {
        id: servicetypeId,
        name,

      } = response.data;
  
      console.log('tipo de servicio actualizado:', response.data);
  
      return {
        id: servicetypeId,
        name,

      };
    } catch (error) {
      console.error(`Error al actualizar la tipo de servicio con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getServicetype,
    searchServicetype,
    createServicetype,
    deleteServicetype,
    updateServicetype,
};