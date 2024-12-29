import axios from '../../plugins/axios';

//GET Contracts
const getContracts = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
  try {
    const response = await axios.get('http://localhost:8080/contract', {
      params: {
        pageNumber,
        pageSize,
        sort,
        ...filters,
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const { content, totalElements, totalPages, number } = response.data;

    console.log('Contratos recibidos:', content);

    return {
      contracts: content, // Lista de contratos
      pagination: {
        totalElements,     // Total de elementos (contratos)
        totalPages,        // Total de páginas
        currentPage: number, // Página actual
        pageSize,          // Tamaño de la página
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de contratos:', error);
    throw error;
  }
};

//GET ContractS BY ID
const getContractById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/contract/${id}`);

    const {
      id: contractId,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Contrato recibido:', response.data);

    return {
        id: contractId,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error(`Error al obtener el contrato con ID ${id}:`, error);
    throw error;
  }
};

//POST SEARCH ContractS
const searchContracts = async (searchCriteria) => {
  try {
    const response = await axios.post('http://localhost:8080/contract/search', searchCriteria, {
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
      contracts: content, // Lista de Contracts filtrados
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
    console.error('Error al buscar contratos con filtros:', error);
    throw error;
  }
};

//POST CREATE Contract
const createContract = async (contractData) => {
  try {
    const response = await axios.post('http://localhost:8080/contract', contractData, {
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

    console.log('Contrato creado:', response.data);

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
    console.error('Error al crear un nuevo Contrato:', error);
    throw error;
  }
};

//PUT UPTADE Contract
const updateContract = async (id, contractData) => {
  try {
    const response = await axios.put(`http://localhost:8080/contract/${id}`, contractData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Desestructuramos la respuesta para obtener los datos del contrato actualizado
    const {
      id: contractId,
      providerId,
      startingDate,
      endingDate,
      conciliationDate,
      description,
      basePrice,
    } = response.data;

    console.log('Contrato actualizado:', response.data);

    return {
        id: contractId,
        providerId,
        startingDate,
        endingDate,
        conciliationDate,
        description,
        basePrice,
    };
  } catch (error) {
    console.error(`Error al actualizar el contrato con ID ${id}:`, error);
    throw error;
  }
};

//DELETE contract
const deleteContract = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/contract/${id}`);

    console.log(`Contrato con ID ${id} eliminado exitosamente.`);
    return response.data; // Si el servidor devuelve algún mensaje de confirmación
  } catch (error) {
    console.error(`Error al eliminar el contract con ID ${id}:`, error);
    throw error;
  }
};

// Exportar todas las funciones
export default {
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  searchContracts
};
