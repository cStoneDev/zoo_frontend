import { createRouter, createWebHistory } from "vue-router";
import AnimalsView from "@/models/animals/AnimalsView.vue";
import LoginView from "@/models/LoginView.vue";
import SidebarComp from "@/components/SidebarComp.vue";
import DashboardView from "@/views/DashboardView.vue";
import ActivitiesView from "@/models/activities/ActivitiesView.vue";
import ProvidersView from "@/models/providers/ProvidersView.vue";
import ContractsView from "@/models/contracts/ContractsView.vue";
import UsersView from "@/models/users/UsersView.vue";
import ProgramsView from "@/models/programs/ProgramsView.vue";
import forgotPassword from "@/components/forgotPassword.vue";

// nomencladores
import ClinicaView from "@/models/Nomenclators/clinica/ClinicaView.vue";
import EspecialidadView from "@/models/Nomenclators/especialidad/EspecialidadView.vue";
import EspecieView from "@/models/Nomenclators/especie/EspecieView.vue";
import ProvinciaView from "@/models/Nomenclators/provincia/ProvinciaView.vue";
import RazaView from "@/models/Nomenclators/raza/RazaView.vue";
import TipoProveedorView from "@/models/Nomenclators/tipoproveedor/TipoProveedorView.vue";
import TipoServicioView from "@/models/Nomenclators/tiposervicio/TipoServicioView.vue";

//reports
import VetReportView from "@/models/reports/vet_contract/VetReportView.vue";
import FeederReportView from "@/models/reports/feeder_contract/FeederReportView.vue";
import ComplementaryReportView from "@/models/reports/complementary-contract/ComplementaryReportView.vue";
import resetPassword from "@/components/resetPassword.vue";

//Manejo de titulos con pinia
import { useTitleStore } from '../stores/titleStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Persistent Layout
      path: "/",
      component: SidebarComp, // Sidebar persistente
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: DashboardView,
          meta: { titulo: 'Estadísticas' }
        },
        {
          path: "/animals",
          name: "animals",
          component: AnimalsView,
          meta: { titulo: 'Animales' }
        },
        {
          path: "/activities",
          name: "activities",
          component: ActivitiesView,
          meta: { titulo: 'Actividades' }
        },
        {
          path: "/providers",
          name: "providers",
          component: ProvidersView,
          meta: { titulo: 'Proveedores' }
        },
        {
          path: "/users",
          name: "users",
          component: UsersView,
          meta: { titulo: 'Usuarios' }
        },
        {
          path: "/contracts",
          name: "contracts",
          component: ContractsView,
          meta: { titulo: 'Contratos' }
        },
        {
          path: "/programs",
          name: "programs",
          component: ProgramsView,
          meta: { titulo: 'Programación' }
        },

        // nomencladores
        {
          path: "/clinica",
          name: "clinica",
          component: ClinicaView,
          meta: { titulo: 'Clinicas' }
        },
        {
          path: "/especialidad",
          name: "especialidad",
          component: EspecialidadView,
          meta: { titulo: 'Especialidades' }
        },
        {
          path: "/especie",
          name: "especie",
          component: EspecieView,
          meta: { titulo: 'Especies' }
        },
        {
          path: "/provincia",
          name: "provincia",
          component: ProvinciaView,
          meta: { titulo: 'Provincias' }
        },
        {
          path: "/raza",
          name: "raza",
          component: RazaView,
          meta: { titulo: 'Razas' }
        },
        {
          path: "/tipoproveedor",
          name: "tipoproveedor",
          component: TipoProveedorView,
          meta: { titulo: 'Tipos de proveedores' }
        },
        {
          path: "/tiposervicio",
          name: "tiposervicio",
          component: TipoServicioView,
          meta: { titulo: 'Tipos de Servicios' }
        },
        //reports
        {
          path: "reports",
          name: "Reports",
          children: [
            {
              path: "vet",
              name: "VetReport",
              component: VetReportView,
              meta: { titulo: 'VetReport' }
            },
            {
              path: "feeder",
              name: "FeederReport",
              component: FeederReportView,
              meta: { titulo: 'FeederReport' }
            },
            {
              path: "complementary",
              name: "ComplementaryReport",
              component: ComplementaryReportView,
              meta: { titulo: 'ComplementaryReport' }
            },
          ],
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: forgotPassword,
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: resetPassword,
    },
  ],
});

// Guard global
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication(); // Comprueba si hay autenticación

  const tituloStore = useTitleStore(); // Accedemos al store de Pinia
  if (to.meta.titulo) {
    tituloStore.setTitulo(to.meta.titulo); // Actualizamos el título según la ruta
  }

  // Si la ruta actual NO es '/login' NI '/forgotPassword' Y el usuario NO está autenticado
  if (!["/login", "/forgotPassword"].includes(to.path) && !isAuthenticated) {
    next("/login"); // Redirige a '/login'
  } else {
    next(); // Permite la navegación
  }
  
});

// Funcion para comprobar autentificacion
function checkAuthentication() {
  // Ejemplo: usando localStorage para un token
  return localStorage.getItem("token") !== null;
}

export default router;
