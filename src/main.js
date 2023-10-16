import { createApp } from 'vue'

import App from './App.vue'
import CardComp from './components/CardComp.vue'
import DetailsComp from './components/DetailsComp.vue'

const app = createApp(App)
app.component('card-comp', CardComp);
app.component('details-comp', DetailsComp);
app.mount('#app');