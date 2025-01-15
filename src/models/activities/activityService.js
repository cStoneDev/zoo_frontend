import axios from '../../plugins/axios';

//GET Activities
const getActivities = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
  try {
    const response = await axios.get('http://localhost:8080/activity', {
      params: {
        pageNumber,
        pageSize,
        sort,
        ...filters,
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const { content, totalElements, totalPages, number } = response.data;

    console.log('Actividades recibidos:', content);

    return {
      activities: content, // Lista de actividades
      pagination: {
        totalElements,     // Total de elementos (Actividades)
        totalPages,        // Total de páginas
        currentPage: number, // Página actual
        pageSize,          // Tamaño de la página
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de Actividades:', error);
    throw error;
  }
};

//GET Activities BY ID
const getActivityById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/activity/${id}`);

    const {
      id: activityId,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Actividad recibido:', response.data);

    return {
        id: activityId,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error(`Error al obtener el Actividad con ID ${id}:`, error);
    throw error;
  }
};

//POST SEARCH Activities
const searchActivity = async (searchCriteria) => {
  try {
    const response = await axios.post('http://localhost:8080/activity/search', searchCriteria, {
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
      activities: content, // Lista de Activities filtrados
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
    console.error('Error al buscar actividades con filtros:', error);
    throw error;
  }
};

//POST CREATE Activities
const createActivity = async (activityData) => {
  try {
    const response = await axios.post('http://localhost:8080/activity', activityData, {
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

    console.log('actividades creado:', response.data);

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
    console.error('Error al crear un nuevo Actividades:', error);
    throw error;
  }
};

//PUT UPTADE Activity
const updateActivity = async (id, activityData) => {
  try {
    const response = await axios.put(`http://localhost:8080/activity/${id}`, activityData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Desestructuramos la respuesta para obtener los datos del actividades actualizado
    const {
      id: activityId,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Actividades actualizado:', response.data);

    return {
        id: activityId,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error(`Error al actualizar el actividades con ID ${id}:`, error);
    throw error;
  }
};

//DELETE activity
const deleteActivity = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/activity/${id}`);

    console.log(`actividad con ID ${id} eliminado exitosamente.`);
    return response.data; // Si el servidor devuelve algún mensaje de confirmación
  } catch (error) {
    console.error(`Error al eliminar el Activity con ID ${id}:`, error);
    throw error;
  }
};

// Exportar todas las funciones
export default {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  searchActivity
};
