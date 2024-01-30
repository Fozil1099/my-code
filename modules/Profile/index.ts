import store from "./store";
import router from "./router";
import Profile from "./layouts/Profile.vue";
import Children from "./layouts/Children.vue";

const localLayouts = {
  profile: Profile,
  profileChild: Children,
};

export { store, router, localLayouts };
