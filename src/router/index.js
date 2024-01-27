import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import Map from '../views/Map.vue'
import Reseau from '@/views/home_pages/Reseau.vue'
import Ibombo from '@/views/home_pages/Ibombo.vue'
import BP from '@/views/home_pages/BP.vue'
import Captage from '@/views/home_pages/Captage.vue'
import Pompe from '@/views/home_pages/Pompe.vue'
import Puit from '@/views/home_pages/Puit.vue'
import Forage from '@/views/home_pages/Forage.vue'
import Reservoir from '@/views/home_pages/Reservoir.vue'
import Rusengo from '@/views/home_pages/Rusengo.vue'
import SNA from '@/views/home_pages/SNA.vue'
import Moderne from '@/views/home_pages/Moderne.vue'
import Collinaire from '@/views/home_pages/Collinaire.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', name: "reseau", component: Reseau },
      { path: 'ibombo', name: "ibombo", component: Ibombo },
      { path: 'bp', name: "bp", component: BP },
      { path: 'captage', name: "captage", component: Captage },
      { path: 'pompe', name: "pompe", component: Pompe },
      { path: 'puit', name: "puit", component: Puit },
      { path: 'forage', name: "forage", component: Forage },
      { path: 'reservoir', name: "reservoir", component: Reservoir },
      { path: 'rusengo', name: "rusengo", component: Rusengo },
      { path: 'sna', name: "sna", component: SNA },
      { path: 'moderne', name: "moderne", component: Moderne },
      { path: 'collinaire', name: "collinaire", component: Collinaire }
    ]
  },
  { path: '/map', name: "map", component: Map },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

