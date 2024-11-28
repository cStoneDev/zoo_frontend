import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import AnimalsView from '@/models/animals/AnimalsView.vue';
import LoginView from '@/models/LoginView.vue';
import SidebarComp from '@/components/SidebarComp.vue';
import DashboardView from '@/views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      /*path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },*/

    // Persistent Layout
      path: '/',
      component: SidebarComp, // Sidebar persistente
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView, // Renderizado en el slot
        },
        {
          path: 'about',
          name: 'About',
          component: AboutView, // Renderizado en el slot
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardView,
        },
      ],
    },
    {
      path: "/animals",
      name: "animals",
      component: AnimalsView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router
