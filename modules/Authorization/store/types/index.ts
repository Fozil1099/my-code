export interface Registration {
  email: string;
  password: string;
}

export interface Verification {
  email: string;
  code: string;
}

export interface UserData {
  profile?: {
    full_name?: string | null;
    city_of_residence?: number | null;
    birth_date?: string | null;
    language?: string;
    phone_number?: string;
    gender?: string | null;
    image?: null | string;
    address?: string;
    location?: {
      lat?: number;
      lng?: number;
    } | null;
    description?: string | null;
    camera?: boolean;
    info?: {};
    martial_status?: null | string;
    zodiac_sign?: null | string;
    religion?: null | number;
  };
  password?: string;
  role_unique_name?: "teacher" | "customer";
}

export interface UserView {
  id: number;
  profile: {
    id: number;
    full_name: null | string;
    city_of_residence: null | CityView;
    birth_date: null | string;
    image: null | string;
    language: string;
    phone_number: null | string;
    gender: null | string;
    address: null | string;
    location: null | {
      lat?: number;
      lng?: number;
    };
    description: null | string;
    camera: boolean;
    info: null | {};
    martial_status: null | string;
    zodiac_sign: null | string;
    religion: null | Religion;
  };
  email_verified: boolean;
  phone_verified: boolean;
  registration_type: string;
  role: null | {
    id: number;
    title: "";
  };
}

export interface CityView {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  parent: {
    ar: string;
    en: string;
  };
  region_code: number;
}

export interface ChildrenView {
  id?: number;
  full_name: string;
  birth_date: string;
  image: null | string;
  gender: string;
  description: string;
  language: Language[] | [];
  medical_records: {
    medication: string;
    special_equipment_needs: string;
    allergies: string;
  };
  additionally: {
    hobby: string;
  };
  schedule: Schedule[];
}

export interface Schedule {
  id?: number;
  weekday: number[];
  children: number | null;
  title: string;
  description: string;
  time_start: string;
  time_end: string;
}

export interface ChildrenData extends Omit<ChildrenView, "language"> {
  language: number[] | [];
}

// knowledge base
export interface Language {
  id: number;
  name: string;
}

export interface Religion {
  id: number;
  name: string;
}
export interface Skills {
  id: number;
  name: string;
}

export interface TeacherSchedule {
  id?: number;
  start_week: number | null;
  end_week: number | null;
  start_time: string;
  end_time: string;
}
export interface TeacherServiceView {
  id: number;
  service_type: ServiceType;
  description: string;
  info: {
    children: string;
    price: number;
  };
}

export interface TeacherService {
  id?: number;
  service_type?: number | null;
  description?: string;
  service_cost?: {
    amount: number | null;
    price: number | null;
  }[];
}

export interface oneTeacherService {
  id: number;
  service_type: ServiceType;
  description: string;
  service_cost: {
    amount: number | null;
    price: number | null;
  }[];
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface TeacherSkills {
  id: number;
  name: string;
}
export interface TeacherLanguage {
  id: number;
  name: string;
}

export interface WeekDayView {
  id: number;
  name: string;
}

export interface TeacherEducationView {
  id?: number | null;
  content_type: number | null;
  educational_institution: string;
  faculty: string;
  start_date: string;
  end_date: string;
  until_now: boolean;
}

export interface TeacherWorkView {
  id?: number | null;
  content_type: number | null;
  post: string;
  organization: string;
  start_date: string;
  end_date: string;
  until_now: boolean;
}

export interface AttachmentsView {
  id: number;
  title: string;
  files: {
    id: number;
    file: string;
    info_file: {
      ext: string;
      name: string;
      size: number;
    };
  }[];
}

export interface Attachments {
  id?: number | null;
  title?: string | null;
  content_type?: number | null;
  object_id?: number | null;
  deleted_files?: number[];
}

export interface TeacherEducation {
  id?: number | null;
  educational_institution: string;
  faculty: string;
  start_date: string;
  end_date: string;
  until_now?: boolean;
  files?: File[];
  attachment_title?: string;
  content_type?: number;
  attachments?: AttachmentsView[];
}

export interface TeacherWork {
  id?: number | null;
  post: string;
  organization: string;
  start_date: string;
  end_date: string;
  until_now?: boolean;
  files?: File[];
  attachment_title?: string;
  content_type?: number;
  attachments?: AttachmentsView[];
}
