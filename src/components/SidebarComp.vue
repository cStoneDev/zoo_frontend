<template>
  <v-card class="full-height" :style="{ backgroundColor: '#F5F1E3' }">
    <v-layout class="full-height">
      <v-app-bar :color="'#1A3E45'">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ titleStore.titulo }}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="handleLogout">
          <v-icon>mdi-export</v-icon>
        </v-btn>

      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary :color="'#F5F1E3'" class="p-3  ma-0" :width="290">
        <v-list-item prepend-avatar="/src/assets/logos/5.png" title="Fauna Viva"></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>

          <!-- Primer link -->
          <v-card>
            <v-card-title class="pr-5">
              <span class="headline custom-text">
                <RouterLink to="/dashboard" exact>
                  <!-- Para reducirles el tamano y que coincidan con los de la lista que se expande -->
                  <v-defaults-provider :defaults="{ 'VIcon': { 'size': '22.5' } }">
                    <v-list-item prepend-icon="mdi-chart-line" title="Estadísticas" class="custom-text"></v-list-item>
                  </v-defaults-provider>
                </RouterLink>
              </span>
            </v-card-title>
          </v-card>

          <v-divider />

          <v-expansion-panels>
            <!-- Panel para tablas -->

            <v-expansion-panel class="mb-3">
              <v-expansion-panel-title class="custom-text">
                <v-list-item prepend-icon="mdi-table" title="Animales"></v-list-item>
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

                <RouterLink to="/programs">
                  <v-list-item prepend-icon="mdi-calendar" title="Programación" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/especie">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Especie" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/raza">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Raza" class="custom-text"></v-list-item>
                </RouterLink>

              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title class="custom-text">
                <v-list-item prepend-icon="mdi-table" title="Proveedores"></v-list-item>
              </v-expansion-panel-title>
              <!-- Sacar lo que expande -->
              <v-expansion-panel-text>

                <RouterLink to="/providers">
                  <v-list-item prepend-icon="mdi-account-tie" title="Proveedores"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/contracts">
                  <v-list-item prepend-icon="mdi-file-sign" title="Contratos" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/provincia">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Provincias"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/especialidad">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Especialidades"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/clinica">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Clinicas" class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/tipoproveedor">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Tipo Proveedor"
                    class="custom-text mb-3"></v-list-item>
                </RouterLink>

                <RouterLink to="/tiposervicio">
                  <v-list-item prepend-icon="mdi-tag-multiple" title="Tipo Servicio" class="custom-text"></v-list-item>
                </RouterLink>

              </v-expansion-panel-text>
            </v-expansion-panel>

          </v-expansion-panels>

          <v-card class="my-3">
            <v-card-title class="pr-5">
              <span class="headline custom-text">
                <RouterLink to="/users">
                  <v-defaults-provider :defaults="{ 'VIcon': { 'size': '22.5' } }">
                    <v-list-item prepend-icon="mdi-account-group" title="Usuarios" class="custom-text"></v-list-item>
                  </v-defaults-provider>
                </RouterLink>
              </span>
            </v-card-title>
          </v-card>

          <v-divider />

          <v-expansion-panels>

            <!-- Panel para reportes -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-list-item prepend-icon="mdi-file-chart" title="Reportes" class="custom-text"></v-list-item>
              </v-expansion-panel-title>
              <!-- Sacar lo que expande -->
              <v-expansion-panel-text>

                <!-- Aca irian los router link de los reportes-->

                <v-list-item @click="showModal2('vet')" prepend-icon="mdi-cat" title="Veterinarian contracts"
                  class="custom-text mb-3"></v-list-item>



                <v-list-item @click="showModal2('feeder')" prepend-icon="mdi-view-dashboard" title="Feeder contracts"
                  class="custom-text mb-3"></v-list-item>



                <v-list-item @click="showModal2('complementary')" prepend-icon="mdi-view-dashboard"
                  title="Complementary contracts" class="custom-text mb-3"></v-list-item>

              </v-expansion-panel-text>
              <VetCompFeedModal ref="modalRef2" :mode="mode" />
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
import VetCompFeedModal from '@/models/reports/modals/VetCompFeedModal.vue';
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router';

import { useTitleStore } from '../stores/titleStore'

const titleStore = useTitleStore(); // Creamos una instancia del store

const router = useRouter();

const handleLogout = () => {
  // Borra el token del almacenamiento local
  localStorage.removeItem('token');

  // Redirige a la ruta de inicio de sesión
  router.push('/login');
}

let mode = ref('');
const drawer = ref(false);


const modalRef2 = ref();

const showModal2 = (modeText) => {
  mode = modeText;
  modalRef2.value.openModal();
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
  min-height: 100dvh;
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
