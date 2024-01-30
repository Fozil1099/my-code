import Children from "./views/Children";
import Additionally from "./views/Children/ChildrenDetail/Additionally";
import ChildInformation from "./views/Children/ChildrenDetail/ChildInformation";
import Documents from "./views/Children/ChildrenDetail/Documents";
import MedicalRecord from "./views/Children/ChildrenDetail/MedicalRecord";
import Schedule from "./views/Children/ChildrenDetail/Schedule";
import Favorites from "./views/Favorites";
import Orders from "./views/Orders";
import { Profile, ChangeProfile } from "./views/Profile";
import Settings from "./views/Settings";
import Support from "./views/Support";

export default [
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      layout: "profile",
    },
  },
  {
    path: "/profile/change",
    name: "profile-change",
    component: ChangeProfile,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "Profile",
          to: "profile",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
  // profile
  {
    path: "/profile/children",
    name: "profile-children",
    component: Children,
    meta: {
      layout: "profile",
    },
  },
  {
    path: "/profile/children/:id",
    name: "profile-children-general",
    component: ChildInformation,
    meta: {
      layout: "profileChild",
      breadcrumb: [
        {
          name: "Children",
          to: "profile-children",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
  {
    path: "/profile/children/:id/schedule",
    name: "profile-children-schedule",
    component: Schedule,
    meta: {
      layout: "profileChild",
      breadcrumb: [
        {
          name: "Children",
          to: "profile-children",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
  {
    path: "/profile/children/:id/medical-records",
    name: "profile-children-medical-records",
    component: MedicalRecord,
    meta: {
      layout: "profileChild",
      breadcrumb: [
        {
          name: "Children",
          to: "profile-children",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
  {
    path: "/profile/children/:id/additionally",
    name: "profile-children-additionally",
    component: Additionally,
    meta: {
      layout: "profileChild",
      breadcrumb: [
        {
          name: "Children",
          to: "profile-children",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
  {
    path: "/profile/children/:id/documents",
    name: "profile-children-documents",
    component: Documents,
    meta: {
      layout: "profileChild",
      breadcrumb: [
        {
          name: "Children",
          to: "profile-children",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },

  // orders
  {
    path: "/profile/orders",
    name: "profile-orders",
    component: Orders,
    meta: {
      layout: "profile",
    },
  },

  // favorites
  {
    path: "/profile/favorites",
    name: "profile-favorites",
    component: Favorites,
    meta: {
      layout: "profile",
    },
  },

  //settings
  {
    path: "/profile/settings",
    name: "profile-settings",
    component: Settings,
    meta: {
      layout: "profile",
    },
  },

  // support
  {
    path: "/profile/support",
    name: "profile-support",
    component: Support,
    meta: {
      layout: "profile",
    },
  },
];
