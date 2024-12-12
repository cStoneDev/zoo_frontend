import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import AnimalsView from '@/models/animals/AnimalsView.vue';
import LoginView from '@/models/LoginView.vue';
import SidebarComp from '@/components/SidebarComp.vue';
import DashboardView from '@/views/DashboardView.vue';
import ActivitiesView from '@/models/activities/ActivitiesView.vue';
import ProvidersView from '@/models/providers/ProvidersView.vue';


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
      ],
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

// Guard global
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication(); //  función para comprobar autenticación

  // Si la ruta actual NO es '/login' Y el usuario NO está autenticado, redirige a '/login'
  if (!to.path.startsWith('/login') && !isAuthenticated) {
    next('/login');
  } else {
    next(); // Permite la navegación
  }
});

// Funcion para comprobar autentificacion
function checkAuthentication() {
  // Ejemplo: usando localStorage para un token
  return localStorage.getItem('token') !== null;
}



export default router
