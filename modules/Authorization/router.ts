import Login from "@m/Authorization/views/Login";
import { Register, ConfirmSignUp } from "@m/Authorization/views/Register";
import { ForgotPassword, ConfirmCode } from "./views/ForgotPassword";
import { ChooseRole, TeacherInformation } from "./views/ChooseRole";
import {
  NewChild,
  Children,
} from "./views/ChooseRole/components/Customer/Children";
import AddEducation from "./views/ChooseRole/components/Teacher/Tabs/Education/AddEducation";
import AddWork from "./views/ChooseRole/components/Teacher/Tabs/Work/AddWork";
import General from "./views/ChooseRole/components/Customer/General";

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/register/confirm",
    name: "register-confirm",
    component: ConfirmSignUp,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/confirm-code",
    name: "confirm-code",
    component: ConfirmCode,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/choose-role",
    name: "choose-role",
    component: ChooseRole,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/choose-role/customer",
    name: "fill-information-customer",
    component: General,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/customer-child",
    name: "fill-information-customer-child",
    component: Children,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/customer/new-child",
    name: "fill-information-customer-new-child",
    component: NewChild,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/customer/child/:id",
    name: "fill-information-customer-edit-child",
    component: NewChild,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/teacher",
    name: "fill-information-teacher",
    component: TeacherInformation,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/teacher/add-education",
    name: "fill-information-teacher-add-education",
    component: AddEducation,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/teacher/add-education/:id",
    name: "fill-information-teacher-edit-education",
    component: AddEducation,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/teacher/add-work",
    name: "fill-information-teacher-add-work",
    component: AddWork,
    meta: {
      layout: "information",
    },
  },
  {
    path: "/choose-role/teacher/add-work/:id",
    name: "fill-information-teacher-edit-work",
    component: AddWork,
    meta: {
      layout: "information",
    },
  },
];
