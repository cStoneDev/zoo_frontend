import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const itemsPerPage = ref(10)


  return { itemsPerPage }
})
