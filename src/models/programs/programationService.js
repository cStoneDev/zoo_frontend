import axios from '../../plugins/axios';

//GET Programation
const getProgramation = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
  try {
    const response = await axios.get('http://localhost:8080/programation', {
      params: {
        pageNumber,
        pageSize,
        sort,
        ...filters,
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const { content, totalElements, totalPages, number } = response.data;

    console.log('Programacion recibidos:', content);

    return {
      programation: content, // Lista de Programacion
      pagination: {
        totalElements,     // Total de elementos (Programacion)
        totalPages,        // Total de páginas
        currentPage: number, // Página actual
        pageSize,          // Tamaño de la página
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de Programacion:', error);
    throw error;
  }
};

//GET Programation BY ID
const getProgramationById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/programation/${id}`);

    const {
      id: programationId,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Programacion recibido:', response.data);

    return {
        id: programationId,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error(`Error al obtener el Programacion con ID ${id}:`, error);
    throw error;
  }
};

//POST SEARCH Programation
const searchProgramation = async (searchCriteria) => {
  try {
    const response = await axios.post('http://localhost:8080/programation/search', searchCriteria, {
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
      programation: content, // Lista de Programation filtrados
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
    console.error('Error al buscar Programacion con filtros:', error);
    throw error;
  }
};

//POST CREATE Programation
const createProgramation = async (programationData) => {
  try {
    const response = await axios.post('http://localhost:8080/programation', programationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      id,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Programacion creado:', response.data);

    return {
        id,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error('Error al crear un nuevo Programacion:', error);
    throw error;
  }
};

//PUT UPTADE Programation
const updateProgramation = async (id, programationData) => {
  try {
    const response = await axios.put(`http://localhost:8080/programation/${id}`, programationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Desestructuramos la respuesta para obtener los datos del Programaicon actualizado
    const {
      id: programationId,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Programacion actualizado:', response.data);

    return {
        id: programationId,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error(`Error al actualizar el Programacion con ID ${id}:`, error);
    throw error;
  }
};

//DELETE Programation
const deleteProgramation = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/programation/${id}`);

    console.log(`Programacion con ID ${id} eliminado exitosamente.`);
    return response.data; // Si el servidor devuelve algún mensaje de confirmación
  } catch (error) {
    console.error(`Error al eliminar el Programation con ID ${id}:`, error);
    throw error;
  }
};

// Exportar todas las funciones
export default {
  getProgramation,
  getProgramationById,
  createProgramation,
  updateProgramation,
  deleteProgramation,
  searchProgramation
};
