import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import router from './router/index';
import { createPinia } from 'pinia';
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions).use(Quasar, quasarUserOptions);
const pinia = createPinia();

app.use(Quasar, {
  config: {},
  plugins: {}
});

app.use(router);
app.use(pinia);

app.mount('#app');
