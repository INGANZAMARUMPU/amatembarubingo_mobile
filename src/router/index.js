import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import Thematique from '../views/Thematique.vue'

const routes = [
  { path: '/', name: "map", component: Home},
  { path: '/thematique', name: "thematique", component: Thematique },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

