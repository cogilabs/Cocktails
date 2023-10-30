import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import CardComp from './components/CardComp.vue'
import DetailsComp from './components/DetailsComp.vue'
import LegendComp from './components/LegendComp.vue'
import CocktailDetails from './components/CocktailDetails.vue'
import YourComponentWithIngredientSearch from './components/YourComponentWithIngredientSearch.vue';


const routes = [
  { path: '/', component: YourComponentWithIngredientSearch },
  { path: '/cocktails/:id', component: CocktailDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router) // Use the router in the app

app.component('card-comp', CardComp)
app.component('details-comp', DetailsComp)
app.component('legend-comp', LegendComp)

app.mount('#app')
