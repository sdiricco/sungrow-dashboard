import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import PowerStationList from '@/views/PowerStationList.vue';
import PowerStationDetails from '@/views/PowerStationDetails.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/powerstationlist', component: PowerStationList },
  { path: '/powerstationdetails/:id', component: PowerStationDetails },
  { path: '/home', component: Home }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
