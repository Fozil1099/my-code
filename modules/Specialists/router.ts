import { RouteLocation } from "vue-router";
import SpecialistDetailVue from "./views/SpecialistDetail/SpecialistDetail.vue";
import Specialists from "./views/Specialists.vue";
import Reviews from "./views/SpecialistDetail/Reviews";
import { EducationDetail } from "./views/SpecialistDetail/components/Education";
import { WorkDetail } from "./views/SpecialistDetail/components/Work";

export default [
  {
    path: "/specialists",
    name: "specialists",
    component: Specialists,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/specialists/:id",
    name: "specialists-detail",
    component: SpecialistDetailVue,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "Specialists",
          to: "specialists",
        },
        {
          name: "Details",
          active: true,
        },
      ],
    },
  },
  {
    path: "/specialists/:id/reviews",
    name: "specialists-detail-reviews",
    component: Reviews,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "Specialists",
          to: "specialists",
        },
        {
          name: "Details",
          redirectWithParams: (route: RouteLocation) => ({
            name: "specialists-detail",
            params: { id: route.params.id },
          }),
        },
        {
          name: "Reviews",
          active: true,
        },
      ],
    },
  },
  {
    path: "/specialists/:id/education/:educationId",
    name: "specialists-detail-education",
    component: EducationDetail,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "Specialists",
          to: "specialists",
        },
        {
          name: "Details",
          redirectWithParams: (route: RouteLocation) => ({
            name: "specialists-detail",
            params: { id: route.params.id },
          }),
        },
        {
          name: "Education details",
          active: true,
        },
      ],
    },
  },
  {
    path: "/specialists/:id/work/:workId",
    name: "specialists-detail-work",
    component: WorkDetail,
    meta: {
      layout: "default",
      breadcrumb: [
        {
          name: "Specialists",
          to: "specialists",
        },
        {
          name: "Details",
          redirectWithParams: (route: RouteLocation) => ({
            name: "specialists-detail",
            params: { id: route.params.id },
          }),
        },
        {
          name: "Work details",
          active: true,
        },
      ],
    },
  },
];
