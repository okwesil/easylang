import { createRouter, createWebHistory } from 'vue-router'
import DictionaryView from '../Dictionary/DictionaryView.vue'
import SentenceView from '../Sentences/SentenceView.vue'
import SettingsView from '../Settings/SettingsView.vue'
import GrammarView from '../Grammar/GrammarView.vue'
import ScriptView from '../Script/ScriptView.vue'

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
    path: '/sentences',
    name: 'sentences',
    component: SentenceView
  },
  {
    path: '/grammar',
    name: 'grammar',
    component: GrammarView
  },
  {
    path: '/script',
    name: 'script',
    component: ScriptView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
