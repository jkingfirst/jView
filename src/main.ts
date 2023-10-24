import './styles/index.scss'
import { createApp } from 'vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
library.add(fas)
const app = createApp(App)
app.mount('#app')
