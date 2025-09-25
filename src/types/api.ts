// API Types based on the provided specifications

export interface Doctor {
  primary_key: string;
  facility_id: string;
  employee_id: string;
  member_username: string;
  medical_specialty_type_code: string | null;
  bank_details: string | null;
  contact_number: string;
  languages_known: string;
  current_city: string;
  status: number;
  unique_individual_health_care_provider_number: string;
  abha_health_id: string;
  health_care_provider_role_code: number;
  health_care_provider_role_freetext: string | null;
  health_care_provider_type: number;
  registration_council_code: string;
  registration_number: string;
  creation_date: string;
}

export interface AppointmentSession {
  start_time: string;
  end_time: string;
  duration_mins: number;
  status: boolean;
}

export interface AppointmentSchedule {
  day_of_the_week: string;
  is_working: boolean;
  sessions: AppointmentSession[];
}

export interface PatientRegistrationRequest {
  person_id: string;
  patient_dob: string;
  patient_name: string;
  patient_gender: string;
  patient_address_type: string;
  address: string;
  location: string;
  city: string;
  pin: string;
  patient_landline: string;
  patient_mobile: string;
  patient_email_url: string;
  contact_person_name: string;
  contact_type: string;
  contact_relationship: string;
  contact_person_landline: string;
  contact_person_email_url: string;
  facility_id: string;
}

export interface AppointmentBookingRequest {
  facility_id: string;
  employee_id: string;
  date: string;
  start_time: string;
}

// Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
