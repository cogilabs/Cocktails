import { createApp } from 'vue'

import App from './App.vue'
import IngredientComp from './components/IngredientComp.vue'
import CocktailComp from './components/CocktailComp.vue'

const app = createApp(App)
app.component('ingredient-comp', IngredientComp);
app.component('cocktail-comp', CocktailComp)
app.mount('#app')