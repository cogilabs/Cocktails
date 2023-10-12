import { createApp } from 'vue'

import App from './App.vue'
import CocktailComp from './components/CocktailComp.vue'

const app = createApp(App)
app.component('cocktail-comp', CocktailComp)
app.mount('#app')