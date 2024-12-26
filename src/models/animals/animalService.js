import axios from '../../plugins/axios';


const getAnimals = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
  try {
    const response = await axios.get('http://localhost:8080/animals', {
      params: {
        pageNumber, // Ajuste del nombre del parámetro
        pageSize,   // Ajuste del nombre del parámetro
        sort,
        ...filters, // Filtros adicionales
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const { content, totalElements, totalPages, number } = response.data;

    console.log('Animales recibidos:', content);

    return {
      animals: content, // Lista de animales
      pagination: {
        totalElements,     // Total de elementos (animales)
        totalPages,        // Total de páginas
        currentPage: number, // Página actual
        pageSize,          // Tamaño de la página
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de animales:', error);
    throw error;
  }
};

// // Función para obtener un animal por su ID
// const getAnimalById = async (id) => {
//   try {
//     const response = await axios.get(`/animals/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error al obtener el animal con ID ${id}:`, error);
//     throw error;
//   }
// };

// // Función para agregar un nuevo animal
// const createAnimal = async (animalData) => {
//   try {
//     const response = await axios.post(`/animals`, animalData);
//     return response.data;
//   } catch (error) {
//     console.error('Error al crear un nuevo animal:', error);
//     throw error;
//   }
// };

// // Función para actualizar un animal existente
// const updateAnimal = async (id, animalData) => {
//   try {
//     const response = await axios.put(`/animals/${id}`, animalData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error al actualizar el animal con ID ${id}:`, error);
//     throw error;
//   }
// };

// // Función para eliminar un animal
// const deleteAnimal = async (id) => {
//   try {
//     const response = await axios.delete(`/animals/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error al eliminar el animal con ID ${id}:`, error);
//     throw error;
//   }
// };

// Exportar todas las funciones
export default {
  getAnimals,
  // getAnimalById,
  // createAnimal,
  // updateAnimal,
  // deleteAnimal,
};
