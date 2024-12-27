import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Este estore esta hecho para tener las variables del filtrado y paginado
//mas accecibles, dado que es dificil la comunicacion de padres a hijos y modificarlas
//y ya sabia usar pinia asi que asi se fue

export const useUtilDataStore = defineStore('utilData', () => {

  const itemsPerPage = ref(5)       //items por paginas
  const page = ref(1)  // pagina donde estamos (para la tabla la primera pagina es 1, para el backend es 0, asi que en las peticiones se pone dato-1)
  let searchCriteria = ref([])    //el json para el post de filtrar

  //hacer una funcion para resetear todos estos valores para que cuando cambies de tabla no se mantengan esos datos

  return { itemsPerPage, page, searchCriteria }
})
