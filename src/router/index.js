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
import { hasRole } from "@/stores/middleware";


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
          meta: {
            titulo: "Estadísticas",
            roles: ["Administrador", "Moderador"],
            requiresAuth: true,
          },
        },
        {
          path: "/animals",
          name: "animals",
          component: AnimalsView,
          meta: { titulo: "Animales", roles: ["Administrador", "Moderador"] },
          requiresAuth: true,
        },
        {
          path: "/activities",
          name: "activities",
          component: ActivitiesView,
          meta: {
            titulo: "Actividades",
            requiresAuth: true,
            roles: ["Administrador", "Moderador"],
          },
        },
        {
          path: "/providers",
          name: "providers",
          component: ProvidersView,
          meta: {
            titulo: "Proveedores",
            requiresAuth: true,
            roles: ["Administrador", "Moderador"],
          },
        },
        {
          path: "/users",
          name: "users",
          component: UsersView,
          meta: {
            titulo: "Usuarios",
            roles: ["Administrador"],
            requiresAuth: true,
          },
        },
        {
          path: "/contracts",
          name: "contracts",
          component: ContractsView,
          meta: { titulo: "Contratos", roles: ["Administrador", "Moderador"] },
          requiresAuth: true,
        },
        {
          path: "/programs",
          name: "programs",
          component: ProgramsView,
          meta: {
            titulo: "Programación",
            roles: ["Administrador", "Moderador"],
            requiresAuth: true,
          },
        },

        // nomencladores
        {
          path: "/clinica",
          name: "clinica",
          component: ClinicaView,
          meta: { titulo: "Clinicas", roles: ["Administrador", "Moderador"] },
          requiresAuth: true,
        },
        {
          path: "/especialidad",
          name: "especialidad",
          component: EspecialidadView,
          meta: {
            titulo: "Especialidades",
            roles: ["Administrador", "Moderador"],
            requiresAuth: true,
          },
        },
        {
          path: "/especie",
          name: "especie",
          component: EspecieView,
          meta: { titulo: "Especies", roles: ["Administrador", "Moderador"] },
          requiresAuth: true,
        },
        {
          path: "/provincia",
          name: "provincia",
          component: ProvinciaView,
          meta: { titulo: "Provincias", roles: ["Administrador", "Moderador"] },
          requiresAuth: true,
        },
        {
          path: "/raza",
          name: "raza",
          component: RazaView,
          meta: { titulo: "Razas", roles: ["Administrador", "Moderador"] },
          requiresAuth: true,
        },
        {
          path: "/tipoproveedor",
          name: "tipoproveedor",
          component: TipoProveedorView,
          meta: {
            titulo: "Tipos de proveedores",
            roles: ["Administrador", "Moderador"],
            requiresAuth: true,
          },
        },
        {
          path: "/tiposervicio",
          name: "tiposervicio",
          component: TipoServicioView,
          meta: {
            titulo: "Tipos de Servicios",
            roles: ["Administrador", "Moderador"],
            requiresAuth: true,
          },
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
              meta: {
                titulo: "VetReport",
                roles: ["Administrador", "Moderador"],
                requiresAuth: true,
              },
            },
            {
              path: "feeder",
              name: "FeederReport",
              component: FeederReportView,
              meta: {
                titulo: "FeederReport",
                roles: ["Administrador", "Moderador"],
                requiresAuth: true,
              },
            },
            {
              path: "complementary",
              name: "ComplementaryReport",
              component: ComplementaryReportView,
              meta: {
                titulo: "ComplementaryReport",
                roles: ["Administrador", "Moderador"],
                requiresAuth: true,
              },
            },
          ],
        },
      ],
    },

    //DEFINIR COMPONETE VUE PARA EL FORBIDDEN
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/utils/notFound.vue"), // Define un componente de error
      meta: { requiresAuth: false },
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: forgotPassword,
      meta: { requiresAuth: false },
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: resetPassword,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        const token = to.query.token; // Obtener el token de la URL

        if (token) {
          // Si el token está presente en la URL, se permite el acceso
          next();
        } else {
          next("/login"); // O redirigir a una página de error
        }
      },
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

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth !== false && !isAuthenticated) {
    if (!isAuthenticated) {
      return next("/login");
    }
    
  } else {
    const requiredRoles = to.meta.roles;
    if (requiredRoles && !hasRole(requiredRoles)) {
      return next("/dashboard"); // Redirige al Dashboard u otra página de acceso denegado
    }
    next(); // Permite la navegación
  }
});

// Funcion para comprobar autentificacion
function checkAuthentication() {
  return localStorage.getItem("token") !== null;
}

export default router;
