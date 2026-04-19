import { createRouter, createWebHistory } from 'vue-router'
import DictionaryView from '../Dictionary/DictionaryView.vue'
import PhraseView from '../views/PhraseView.vue'
import PhoneticsView from '../views/PhoneticsView.vue'

const routes = [
   { 
    path: '/', 
    redirect: '/dictionary' // Redirects base URL to /dashboard on load
  },
  {
    path: '/dictionary',
    name: 'dictionary',
    component: DictionaryView
  },
  {
    path: '/phrases',
    name: 'phrases',

    component: PhraseView
  },
  {
    path: '/phonetics',
    name: 'phonetics',

    component: PhoneticsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
