import { defineStore } from "pinia";
import $axios from "@/plugins/axios";
import {
  Registration,
  Verification,
  UserData,
  UserView,
  CityView,
  ChildrenView,
  Language,
  ChildrenData,
  Religion,
  TeacherSchedule,
  TeacherService,
  ServiceType,
  TeacherServiceView,
  TeacherSkills,
  TeacherLanguage,
  Skills,
  TeacherEducationView,
  TeacherEducation,
  TeacherWorkView,
  TeacherWork,
  WeekDayView,
  Schedule,
} from "./types";
import { Pagination, Response } from "@/store/types";

export default defineStore("Authorization", {
  state: () => {
    return {
      currentUser: {
        profile: {
          id: 19,
          full_name: null,
          city_of_residence: null,
          birth_date: null,
          image: null,
          language: "en",
          phone_number: null,
          gender: null,
          address: null,
          location: null,
          description: null,
          camera: false,
          info: null,
        },
        email_verified: true,
        phone_verified: false,
        role: null,
      } as UserView,

      cityList: {
        results: [] as CityView[],
      } as Response<CityView>,
      children: {
        full_name: "",
        birth_date: "",
        gender: "",
        description: "",
        language: [],
        medical_records: {},
        additionally: {},
      } as ChildrenView,
      childrenList: {
        results: [] as ChildrenView[],
      } as Response<ChildrenView>,
      languageList: {
        results: [] as Language[],
      } as Response<Language>,
      skillsList: {
        results: [] as Skills[],
      } as Response<Skills>,
      religionList: {
        results: [] as Religion[],
      } as Response<Religion>,
      teacherScheduleList: {
        results: [] as TeacherSchedule[],
      } as Response<TeacherSchedule>,
      teacherServiceList: {
        results: [] as TeacherServiceView[],
      } as Response<TeacherServiceView>,
      serviceTypeList: {
        results: [] as ServiceType[],
      } as Response<ServiceType>,
      teacherSkillsList: {
        results: [] as TeacherSkills[],
      } as Response<TeacherSkills>,
      teacherLanguageList: {
        results: [] as TeacherLanguage[],
      } as Response<TeacherLanguage>,
      teacherEducationList: {
        results: [] as TeacherEducationView[],
      } as Response<TeacherEducationView>,
      teacherWorkList: {
        results: [] as TeacherWorkView[],
      } as Response<TeacherWorkView>,
      weekDayList: {
        results: [] as WeekDayView[],
      } as Response<WeekDayView>,
      childrenScheduleList: {
        results: [] as Schedule[],
      } as Response<Schedule>,
    };
  },

  actions: {
    register(data: Registration) {
      return $axios.post("/registration", data, {
        headers: { no_add_token: true },
      });
    },
    verificationSignUp(data: Verification) {
      return $axios.post("/verification_sign_up", data, {
        headers: { no_add_token: true },
      });
    },
    updateCurrentUser(data: UserData | FormData) {
      return $axios.patch("/user/update", data);
    },
    async getCurrentUser(params?, isSaveData: boolean = true) {
      if (!isSaveData) return $axios.get("/user/profile", { params });
      const { data } = await $axios.get("/user/profile", { params });
      this.currentUser = data;
      return data;
    },
    async getCityList(params?: { parent_id?: number }) {
      const { data } = await $axios.get("/knowledge_base/city", { params });
      this.cityList = data;
    },
    async getChildrenList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/customer/children", { params });
      if (isLazy) {
        this.childrenList.next = data.next;
        this.childrenList.count = data.count;
        if (params.page === 1) this.childrenList = data;
        else
          this.childrenList.results = [
            ...this.childrenList.results,
            ...data.results,
          ];
      } else {
        this.childrenList = data;
      }
    },
    async getLanguageList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/knowledge_base/language", { params });
      if (isLazy) {
        this.languageList.next = data.next;
        this.languageList.count = data.count;
        if (params.page === 1) this.languageList = data;
        else
          this.languageList.results = [
            ...this.languageList.results,
            ...data.results,
          ];
      } else {
        this.languageList = data;
      }
    },
    async getServiceTypeList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/knowledge_base/service_type", {
        params,
      });
      if (isLazy) {
        this.serviceTypeList.next = data.next;
        this.serviceTypeList.count = data.count;
        if (params.page === 1) this.serviceTypeList = data;
        else
          this.serviceTypeList.results = [
            ...this.serviceTypeList.results,
            ...data.results,
          ];
      } else {
        this.serviceTypeList = data;
      }
      return data;
    },
    async getSkillsList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/knowledge_base/skills", {
        params,
      });
      if (isLazy) {
        this.skillsList.next = data.next;
        this.skillsList.count = data.count;
        if (params.page === 1) this.skillsList = data;
        else
          this.skillsList.results = [
            ...this.skillsList.results,
            ...data.results,
          ];
      } else {
        this.skillsList = data;
      }
      return data;
    },
    async getWeekDayList() {
      const { data } = await $axios.get("/knowledge_base/weekday");
      this.weekDayList = data;
      return data;
    },
    createChildren(data: ChildrenData) {
      return $axios.post("/customer/children", data);
    },
    async getChildren(id: number | string) {
      const { data } = await $axios.get(`/customer/children/${id}`);
      Object.assign(this.children, data);
    },
    updateChildren(data) {
      return $axios.patch(
        `/customer/children/${data.id || data.get("id")}`,
        data
      );
    },
    deleteChildren(id: number | string) {
      return $axios.delete(`/customer/children/${id}`);
    },
    async getReligionList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/knowledge_base/religion", { params });
      if (isLazy) {
        this.religionList.next = data.next;
        this.religionList.count = data.count;
        if (params.page === 1) this.religionList = data;
        else
          this.religionList.results = [
            ...this.religionList.results,
            ...data.results,
          ];
      } else {
        this.religionList = data;
      }
    },

    // schedule

    async getChildrenScheduleList({
      isLazy,
      ...params
    }: Pagination & { children: string }) {
      const { data } = await $axios.get(`/customer/schedule_template`, {
        params,
      });
      if (isLazy) {
        this.childrenScheduleList.next = data.next;
        this.childrenScheduleList.count = data.count;
        if (params.page === 1) this.childrenScheduleList = data;
        else
          this.childrenScheduleList.results = [
            ...this.childrenScheduleList.results,
            ...data.results,
          ];
      } else {
        this.childrenScheduleList = data;
      }
    },
    getChildrenSchedule(id): Promise<{ data: Schedule }> {
      return $axios.get(`/customer/schedule_template/${id}`);
    },
    updateChildrenSchedule(data) {
      return $axios.patch(`/customer/schedule_template/${data.id}`, data);
    },
    createChildrenSchedule(data: Schedule) {
      return $axios.post(`/customer/schedule_template`, data);
    },
    deleteChildrenSchedule(id: number) {
      return $axios.delete(`/customer/schedule_template/${id}`);
    },

    // teacher
    createTeacherSchedule(data: TeacherSchedule) {
      return $axios.post("/teacher/schedule", data);
    },
    updateTeacherSchedule(data: TeacherSchedule) {
      return $axios.patch(`/teacher/schedule/${data.id}`, data);
    },
    async getTeacherScheduleList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/teacher/schedule", { params });
      if (isLazy) {
        this.teacherScheduleList.next = data.next;
        this.teacherScheduleList.count = data.count;
        if (params.page === 1) this.teacherScheduleList = data;
        else
          this.teacherScheduleList.results = [
            ...this.teacherScheduleList.results,
            ...data.results,
          ];
      } else {
        this.teacherScheduleList = data;
      }
    },
    deleteTeacherSchedule(id: number) {
      return $axios.delete(`/teacher/schedule/${id}`);
    },
    async getTeacherServiceList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get("/teacher/service", { params });
      if (isLazy) {
        this.teacherServiceList.next = data.next;
        this.teacherServiceList.count = data.count;
        if (params.page === 1) this.teacherServiceList = data;
        else
          this.teacherServiceList.results = [
            ...this.teacherServiceList.results,
            ...data.results,
          ];
      } else {
        this.teacherServiceList = data;
      }
    },
    createTeacherService(data: TeacherService) {
      return $axios.post("/teacher/service", data);
    },
    updateTeacherService(data: TeacherService) {
      return $axios.patch(`/teacher/service/${data.id}`, data);
    },
    getTeacherService(id: number) {
      return $axios.get(`/teacher/service/${id}`);
    },
    deleteTeacherService(id: number) {
      return $axios.delete(`/teacher/service/${id}`);
    },

    async getTeacherSkills(params?) {
      const { data } = await $axios.get(`/teacher/teacher_skills`, { params });
      this.teacherSkillsList = data;
    },
    updateTeacherSkills(data: { skills: number[] }) {
      return $axios.post(`/teacher/teacher_skills`, data);
    },

    async getTeacherLanguage(params?) {
      const { data } = await $axios.get(`/teacher/teacher_language`, { params });
      this.teacherLanguageList = data;
    },
    updateTeacherLanguage(data: { languages: number[] }) {
      return $axios.post(`/teacher/teacher_language`, data);
    },
    updateTeacherAttachment(data) {
      return $axios.patch(
        `/files/teacher_attachment/${data.id || data.get("id")}`,
        data
      );
    },
    createTeacherAttachment(data) {
      return $axios.post(`/files/teacher_attachment`, data);
    },

    // education
    async getTeacherEducationList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get(`/teacher/education`, { params });
      if (isLazy) {
        this.teacherEducationList.next = data.next;
        this.teacherEducationList.count = data.count;
        if (params.page === 1) this.teacherEducationList = data;
        else
          this.teacherEducationList.results = [
            ...this.teacherEducationList.results,
            ...data.results,
          ];
      } else {
        this.teacherEducationList = data;
      }
    },
    getTeacherEducation(id): Promise<{ data: TeacherEducation }> {
      return $axios.get(`/teacher/education/${id}`);
    },
    updateTeacherEducation(data) {
      return $axios.patch(
        `/teacher/education/${data.id || data.get("id")}`,
        data
      );
    },
    createTeacherEducation(data: TeacherEducation) {
      return $axios.post(`/teacher/education`, data);
    },
    deleteTeacherEducation(id: number) {
      return $axios.delete(`/teacher/education/${id}`);
    },

    // work
    async getTeacherWorkList({ isLazy, ...params }: Pagination) {
      const { data } = await $axios.get(`/teacher/work`, { params });
      if (isLazy) {
        this.teacherWorkList.next = data.next;
        this.teacherWorkList.count = data.count;
        if (params.page === 1) this.teacherWorkList = data;
        else
          this.teacherWorkList.results = [
            ...this.teacherWorkList.results,
            ...data.results,
          ];
      } else {
        this.teacherWorkList = data;
      }
    },
    getTeacherWork(id): Promise<{ data: TeacherWork }> {
      return $axios.get(`/teacher/work/${id}`);
    },
    updateTeacherWork(data) {
      return $axios.patch(`/teacher/work/${data.id || data.get("id")}`, data);
    },
    createTeacherWork(data: TeacherWork) {
      return $axios.post(`/teacher/work`, data);
    },
    deleteTeacherWork(id: number) {
      return $axios.delete(`/teacher/work/${id}`);
    },
  },
});
