import axios from '../../../plugins/axios';

//GET providertype
const getProvidertype = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
    try {
      const response = await axios.get('http://localhost:8080/providertype', {
        params: {
          pageNumber,
          pageSize,
          sort,
          ...filters,
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos paginados
      const { content, totalElements, totalPages, number } = response.data;
  
      console.log('tipo proveedor recibidas:', content);
  
      return {
        providertype: content, // Lista de tipo de provedores
        pagination: {
          totalElements,     // Total de elementos (tipo de proveedores)
          totalPages,        // Total de páginas
          currentPage: number, // Página actual
          pageSize,          // Tamaño de la página
        },
      };
    } catch (error) {
      console.error('Error al obtener la lista de tipo de proveedores:', error);
      throw error;
    }
  };


  //POST SEARCH providertype
const searchProvidertype = async (searchCriteria) => {
    try {
      const response = await axios.post('http://localhost:8080/providertype/search', searchCriteria, {
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
        providertype: content, // Lista de tipo de proveedores filtrados
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
      console.error('Error al buscar tipos de proveedores con filtros:', error);
      throw error;
    }
  };


  //POST CREATE providertype
const createProvidertype = async (providertypeData) => {
    try {
      const response = await axios.post('http://localhost:8080/providertype', providertypeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const {
        id,
        name,
      } = response.data;
  
      console.log('Tipo de proveedor creado creada:', response.data);
  
      return {
        id,
        name,
      };
    } catch (error) {
      console.error('Error al crear un nuevo tipo de proveedor:', error);
      throw error;
    }
  };


  //DELETE providertype
const deleteProvidertype = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/providertype/${id}`);
  
      console.log(`Tipo de proveedor con ID ${id} eliminada exitosamente.`);
      return response.data; // Si el servidor devuelve algún mensaje de confirmación
    } catch (error) {
      console.error(`Error al eliminar el tipo de proveedor con ID ${id}:`, error);
      throw error;
    }
  };
  
//PUT UPTADE providertype
const updateProvidertype = async (id, providertypeData) => {
    try {
      const response = await axios.put(`http://localhost:8080/providertype/${id}`, providertypeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Desestructuramos la respuesta para obtener los datos del tipo de proveedor actualizado
      const {
        id: providertypeId,
        name,

      } = response.data;
  
      console.log('tipo de proveedor actualizado:', response.data);
  
      return {
        id: providertypeId,
        name,

      };
    } catch (error) {
      console.error(`Error al actualizar la tipo de proveedor con ID ${id}:`, error);
      throw error;
    }
  };

  // Exportar todas las funciones
export default {
    getProvidertype,
    searchProvidertype,
    createProvidertype,
    deleteProvidertype,
    updateProvidertype,
};