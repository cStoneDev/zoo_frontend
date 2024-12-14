<template>
  <v-card class="full-height">
    <v-layout class="full-height">
      <v-app-bar :color="'#1A3E45'">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Sección</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="handleLogout">
          <v-icon>mdi-export</v-icon>
        </v-btn>

      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary :color="'#F5F1E3'" class="p-3">
        <v-list-item prepend-avatar="/src/assets/logos/3.png" title="ZO'NA"></v-list-item>
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


          <v-card class="my-3">
            <v-card-title class="pr-5">
              <span class="headline custom-text">
                <v-defaults-provider :defaults="{ 'VIcon': { 'size': '22.5' } }">
                  <v-list-item prepend-icon="mdi-pencil" title="Nomencladores" class="custom-text"
                    @click="showModal"></v-list-item>
                </v-defaults-provider>
              </span>
            </v-card-title>
            <NomenclatorsModal ref="modalRef" />
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
                  <v-list-item prepend-icon="mdi-clipboard-text-outline" title="Actividades"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/providers">
                  <v-list-item prepend-icon="mdi-account-tie" title="Proveedores"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/contracts">
                  <v-list-item prepend-icon="mdi-note-text" title="Contratos"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/users">
                  <v-list-item prepend-icon="mdi-account-tie" title="Usuarios"
                    class="custom-text mb-3"></v-list-item>
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
                <RouterLink to="/reports/vet">
                  <v-list-item prepend-icon="mdi-cat" title="Veterinarian contracts" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/reports/feeder">
                  <v-list-item prepend-icon="mdi-view-dashboard" title="Feeder contracts" class="custom-text mb-3"></v-list-item>
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
import NomenclatorsModal from '@/models/Nomenclators/components/NomenclatorsModal.vue';
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  // Borra el token del almacenamiento local
  localStorage.removeItem('token');

  // Redirige a la ruta de inicio de sesión
  router.push('/login');
}

const drawer = ref(false);

const modalRef = ref();

const showModal = () => {
  modalRef.value.openModal();
};

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
.headline .custom-text {
  padding: 9%;
}
</style>
