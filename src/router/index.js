import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Persistent Layout
      path: "/",
      component: SidebarComp, // Sidebar persistente
      children: [
        {
          path: "",
          name: "Home",
          component: HomeView, // Renderizado en el slot
        },
        {
          path: "about",
          name: "About",
          component: AboutView, // Renderizado en el slot
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: DashboardView,
        },
        {
          path: "/animals",
          name: "animals",
          component: AnimalsView,
        },
        {
          path: "/activities",
          name: "activities",
          component: ActivitiesView,
        },
        {
          path: "/providers",
          name: "providers",
          component: ProvidersView,
        },
        {
          path: "/users",
          name: "users",
          component: UsersView,
        },
        {
          path: "/contracts",
          name: "contracts",
          component: ContractsView,
        },
        {
          path: "/programs",
          name: "programs",
          component: ProgramsView,
        },

        // nomencladores
        {
          path: "/clinica",
          name: "clinica",
          component: ClinicaView,
        },
        {
          path: "/especialidad",
          name: "especialidad",
          component: EspecialidadView,
        },
        {
          path: "/especie",
          name: "especie",
          component: EspecieView,
        },
        {
          path: "/provincia",
          name: "provincia",
          component: ProvinciaView,
        },
        {
          path: "/raza",
          name: "raza",
          component: RazaView,
        },
        {
          path: "/tipoproveedor",
          name: "tipoproveedor",
          component: TipoProveedorView,
        },
        {
          path: "/tiposervicio",
          name: "tiposervicio",
          component: TipoServicioView,
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
            },
            {
              path: "feeder",
              name: "FeederReport",
              component: FeederReportView,
            },
            {
              path: "complementary",
              name: "ComplementaryReport",
              component: ComplementaryReportView,
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
  ],
});

// Guard global
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication(); // Comprueba si hay autenticación

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
