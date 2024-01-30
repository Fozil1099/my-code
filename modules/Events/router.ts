import EventDetail from "./views/EventDetail/EventDetail.vue";
import Events from "./views/Events.vue";

export default [
  {
    path: "/events",
    name: "events",
    component: Events,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/events/:id",
    name: "events-detail",
    component: EventDetail,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "events",
          to: "events",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
];
