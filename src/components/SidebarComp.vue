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

          <!-- Primer link -->
          <v-card class="my-3">
            <v-card-title class="pr-5">
              <span class="headline custom-text">
                <RouterLink to="/dashboard" exact>
                  <!-- Para reducirles el tamano y que coincidan con los de la lista que se expande -->
                  <v-defaults-provider :defaults="{ 'VIcon': { 'size': '22.5' } }">
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" class="custom-text"></v-list-item>
                  </v-defaults-provider>
                </RouterLink>
              </span>
            </v-card-title>
          </v-card>

          <v-card class="my-3">
            <v-card-title class="pr-5">
              <span class="headline custom-text">
                <RouterLink to="/about" exact>
                  <!-- Para reducirles el tamano y que coincidan con los de la lista que se expande -->
                  <v-defaults-provider :defaults="{ 'VIcon': { 'size': '22.5' } }">
                    <v-list-item prepend-icon="mdi-pencil" title="About" class="custom-text"></v-list-item>
                  </v-defaults-provider>
                </RouterLink>
              </span>
            </v-card-title>
          </v-card>

          <v-expansion-panels>
            <!-- Panel para tablas -->

            <v-expansion-panel class="mb-3">
              <v-expansion-panel-title class="custom-text">
                <v-list-item prepend-icon="mdi-table" title="Tablas"></v-list-item>
              </v-expansion-panel-title>
              <!-- Sacar lo que expande -->
              <v-expansion-panel-text>

                <!-- Aca irian los router link de las tablas-->
                <RouterLink to="/animals">
                  <v-list-item prepend-icon="mdi-cat" title="Animales" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/activities">
                  <v-list-item prepend-icon="mdi-clipboard-text-outline" title="Actividades" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/providers">
                  <v-list-item prepend-icon="mdi-account-tie" title="Proveedores" class="custom-text mb-3"></v-list-item>
                </RouterLink>

              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Panel para reportes -->
            <v-expansion-panel class="mb-3">
              <v-expansion-panel-title>
                <v-list-item prepend-icon="mdi-file-chart" title="Reportes" class="custom-text mb-3"></v-list-item>
              </v-expansion-panel-title>
              <!-- Sacar lo que expande -->
              <v-expansion-panel-text>

                <!-- Aca irian los router link de los reportes-->
                <RouterLink to="/animals">
                  <v-list-item prepend-icon="mdi-cat" title="Animals" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/" exact>
                  <v-list-item prepend-icon="mdi-view-dashboard" title="Home" class="custom-text mb-3"></v-list-item>
                </RouterLink>

              </v-expansion-panel-text>
            </v-expansion-panel>

          </v-expansion-panels>
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
  height: calc(100vh);
  /* Ajusta para el app-bar */
}

.custom-text {
  color: black;
  /* Cambia el color del texto a negro */
}

.custom-text .v-list-item__prepend {
  color: black;
  /* Cambia el color del icono a negro */
}

/* Para que coincidan los tamanos de las cards, ademas de la posicion de icono y letras */
.headline .custom-text{
  padding: 9%;
}
</style>
