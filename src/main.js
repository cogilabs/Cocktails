import { createApp } from 'vue'

import App from './App.vue'
import IngredientComp from './components/IngredientComp.vue'
import CocktailComp from './components/CocktailComp.vue'
import DetailsComp from './components/DetailsComp.vue'

const app = createApp(App)
app.component('ingredient-comp', IngredientComp);
app.component('cocktail-comp', CocktailComp);
app.component('details-comp', DetailsComp);
app.mount('#app');