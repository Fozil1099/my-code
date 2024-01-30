import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/tailwind.css";
import router from "./router/index";
import { vMaska } from "maska";
import { createPinia } from "pinia";
import "@/assets/styles/mian.scss";
import "swiper/css";
import { Icon, LazyScroll } from "@com";
import i18n from "@/plugins/i18n";
import { vModal } from "@/components/Modal/Directives";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import vSelect from "vue-select";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// toast
import Vue3Toasity, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


const pinia = createPinia();
const app = createApp(App);

app.directive("maska", vMaska);
app.directive("modal", vModal);

app.component("Icon", Icon);
app.component("LazyScroll", LazyScroll);
app.component("DatePicker", Datepicker);
app.component("v-select", vSelect);

// toastfy
app.use(Vue3Toasity, {
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  position: toast.POSITION.BOTTOM_RIGHT,
  theme: "colored",
});

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_KEY,
  },
});

app.mount("#app");
