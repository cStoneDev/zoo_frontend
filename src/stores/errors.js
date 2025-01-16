import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useErrorsStore = defineStore('errors', () =>  {

    const isVisible = ref(false)
    const message = ref("") 

    function showError(error) {
        isVisible.value = true
        message.value = error
    }

    function hideError() {
        isVisible.value = false
        message.value = ""
    }


    return { 
        isVisible, 
        message, 
        showError,
        hideError,
      }
  
})
