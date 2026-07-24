import { createRouter, createWebHistory } from 'vue-router';
import Introducao from '../views/Introducao.vue';
import Cadastro from '../views/Cadastro.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'introducao', component: Introducao },
  { path: '/login', name: 'login', component: Login },
  { path: '/cadastro', name: 'cadastro', component: Cadastro },
  { path: '/contato', name: 'contato', component: Contato },
]

const router = createRouter({
    history: createWebHistory(), 
    routes,
});

export default router;