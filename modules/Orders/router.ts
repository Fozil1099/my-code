import OrderDetail from "./views/OrderDetail/OrderDetail.vue";
import Orders from "./views/Orders.vue";

export default [
  {
    path: "/orders",
    name: "orders",
    component: Orders,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/orders/:id",
    name: "orders-detail",
    component: OrderDetail,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "Orders",
          to: "orders",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
];
