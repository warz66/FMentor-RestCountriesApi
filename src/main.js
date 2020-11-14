import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);

app.use(store).use(router).use(VueAxios, axios).mount('body')

app.directive("click-outside", {
    beforeMount: function (el, binding) {
        const ourClickEventHandler = event => {
            if (!el.contains(event.target) && el !== event.target) {
                binding.value(event);
            }
        };
        el.__vueClickEventHandler__ = ourClickEventHandler;
        document.addEventListener("click", ourClickEventHandler);
    },
    unmounted: function (el) {
        document.removeEventListener("click", el.__vueClickEventHandler__);
    }
})
