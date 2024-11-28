<template>
    <v-card class="full-height">
      <v-layout class="full-height">
        <v-app-bar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" dark prominent>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Vuetify</v-toolbar-title>
          <v-spacer></v-spacer>
          <RouterLink to="/login">
            <v-btn icon>
            <v-icon>mdi-export</v-icon>
          </v-btn>
          </RouterLink>
          
        </v-app-bar>
  
        <v-navigation-drawer v-model="drawer" temporary>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider"></v-list-item>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <RouterLink to="/" exact>
              <v-list-item prepend-icon="mdi-view-dashboard" title="Home"></v-list-item>
            </RouterLink>
            <RouterLink to="/about">
              <v-list-item prepend-icon="mdi-forum" title="About"></v-list-item>
            </RouterLink>
            <RouterLink to="/dashboard">
              <v-list-item prepend-icon="mdi-forum" title="Dashboard"></v-list-item>
            </RouterLink>
            <RouterLink to="/animals">
              <v-list-item prepend-icon="mdi-forum" title="Animals"></v-list-item>
            </RouterLink>
          </v-list>
        </v-navigation-drawer>
  
        <v-main class="main-container">
          <!-- Aquí se renderizan las vistas hijas -->
          <RouterView />
        </v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  
  const drawer = ref(false);
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
    color: gray;
  }
  
  .full-height {
    height: 100%;
  }
  
  .main-container {
    height: calc(100vh); /* Ajusta para el app-bar */
  }
  </style>
  