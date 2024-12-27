import { defineStore } from 'pinia';

export const useTitleStore = defineStore('title', {
  state: () => ({
    titulo: 'Página principal', // Título por defecto
  }),
  actions: {
    setTitulo(nuevoTitulo) {
      this.titulo = nuevoTitulo; // Método para cambiar el título
    },
  },
});