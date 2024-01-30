import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { router as Authorization } from "@m/Authorization";
import { router as Specialists } from "@m/Specialists";
import { router as Home } from "@m/Home";
import { router as Orders } from "@m/Orders";
import { router as Events } from "@m/Events";
import { router as AboutUs } from "@m/AboutUs";
import { router as Profile } from "@m/Profile";

const routes: Array<RouteRecordRaw> = [
  ...Authorization,
  ...Specialists,
  ...Home,
  ...Orders,
  ...Events,
  ...AboutUs,
  ...Profile,
  {
    path: "/",
    redirect: () => {
      return { name: "login" };
    },
  },
  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/Error"),
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "error-404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, _, next) => {
//   const isLoggedIn = isUserLoggedIn();

//   if (to.meta.loginNotRequired) return next();

//   if (!isLoggedIn) {
//     return next({ name: "login" });
//   }

//   if (to.meta.permissions && !check(to?.meta?.permissions)) {
//     return next({ name: "error-404" });
//   }
//   next();
// });

export default router;
