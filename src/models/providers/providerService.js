import axios from '../../plugins/axios';

//GET Providers
const getProviders = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
  try {
    const response = await axios.get('http://localhost:8080/providers', {
      params: {
        pageNumber,
        pageSize,
        sort,
        ...filters,
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const { content, totalElements, totalPages, number } = response.data;

    console.log('Provedores recibidos:', content);

    return {
      providers: content, // Lista de Provedores
      pagination: {
        totalElements,     // Total de elementos (Provedores)
        totalPages,        // Total de páginas
        currentPage: number, // Página actual
        pageSize,          // Tamaño de la página
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de Provedores:', error);
    throw error;
  }
};

//GET Providers BY ID
const getProviderById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/providers/${id}`);

    const {
      id: providersId,
      name,
      provinceId,
      serviceTypeId,
      providerTypeId,
      address,
      phone,
      email,
      responsibleName,
      provinceName,
      serviceTypeName,
      providerTypeName,
    } = response.data;

    if(providerTypeId === 1){
      console.log("si es veterinarisimo")
      const { fax, cityDistance, clinicId, specialityId, clinicName, specialityName} = restOfData.veterinarianOutputDTO;
    }
    console.log('Provedor recibido:', response.data);

    return {
        id: providersId,
        name,
        provinceId,
        serviceTypeId,
        providerTypeId,
        address,
        phone,
        email,
        responsibleName,
        provinceName,
        serviceTypeName,
        providerTypeName,
    };
  } catch (error) {
    console.error(`Error al obtener el Provedor con ID ${id}:`, error);
    throw error;
  }
};

//POST SEARCH Providers
const searchProviders = async (searchCriteria) => {
  try {
    const response = await axios.post('http://localhost:8080/providers/search', searchCriteria, {
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
      providers: content, // Lista de Providers filtrados
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
    console.error('Error al buscar Provedores con filtros:', error);
    throw error;
  }
};

//POST CREATE Providers
const createProvider = async (providerData) => {
  try {
    const response = await axios.post('http://localhost:8080/providers', providerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      id,
      name,
      provinceId,
      serviceTypeId,
      providerTypeId,
      address,
      phone,
      email,
      responsibleName,
      fax,
      cityDistance,
      clinicId,
      specialityId,
    } = response.data;

    console.log('Provedor creado:', response.data);

    return {
        id,
        name,
        provinceId,
        serviceTypeId,
        providerTypeId,
        address,
        phone,
        email,
        responsibleName,
        fax,
        cityDistance,
        clinicId,
        specialityId,
    };
  } catch (error) {
    console.error('Error al crear un nuevo Provedor:', error);
    throw error;
  }
};

//PUT UPTADE Providers
const updateProvider = async (id, providerData) => {
  console.log("el provedor con id: " + id)
  console.log(providerData)
  try {
    const response = await axios.put(`http://localhost:8080/providers/${id}`, providerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Desestructuramos la respuesta para obtener los datos del Provedor actualizado
    const {
      id: providerId,
      name,
      provinceId,
      serviceTypeId,
      providerTypeId,
      address,
      phone,
      email,
      responsibleName,
      fax,
      cityDistance,
      clinicId,
      specialityId,
    } = response.data;

    console.log('Provedor actualizado:', response.data);

    return {
        id: providerId,
        name,
        provinceId,
        serviceTypeId,
        providerTypeId,
        address,
        phone,
        email,
        responsibleName,
        fax,
        cityDistance,
        clinicId,
        specialityId,
    };
  } catch (error) {
    console.error(`Error al actualizar el Provedor con ID ${id}:`, error);
    throw error;
  }
};

//DELETE Providers
const deleteProvider = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/providers/${id}`);

    console.log(`Provedor con ID ${id} eliminado exitosamente.`);
    return response.data; // Si el servidor devuelve algún mensaje de confirmación
  } catch (error) {
    console.error(`Error al eliminar el Proveedor con ID ${id}:`, error);
    throw error;
  }
};

// Exportar todas las funciones
export default {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  searchProviders
};
