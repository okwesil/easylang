import { createRouter, createWebHistory } from 'vue-router'
import DictionaryView from '../Dictionary/DictionaryView.vue'
import PhraseView from '../Phrases/PhraseView.vue'
import PhoneticsView from '../Phonetics/PhoneticsView.vue'
import SettingsView from '../Settings/SettingsView.vue'
import GrammarView from '../Grammar/GrammarView.vue'

const routes = [
   { 
    path: '/', 
    redirect: '/dictionary' // Redirects base URL to /dashboard on load
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
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
  },
  {
    path: '/grammar',
    name: 'grammar',
    component: GrammarView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
