import { createApp } from 'vue'
import Toast from 'vue-toastification'
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import 'unfonts.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

registerPlugins(app)
app.use(Toast)
app.mount('#app')
