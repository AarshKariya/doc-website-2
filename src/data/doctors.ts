import { API_CONFIG_EXPORT } from "@/lib/api-client-real";
import drAnuragImage from "@/assets/dr-anurag-aggarwal.jpg";
import drKavyaImage from "@/assets/dr-kavya-reddy.jpg";
import drVikramImage from "@/assets/dr-vikram-singh-new.jpg";

export interface UIDoctor {
  primary_key: string;
  facility_id: string;
  employee_id: string;
  member_username?: string | null;
  medical_specialty_type_code?: string | null;
  bank_details?: unknown | null;
  contact_number?: string;
  languages_known?: string;
  current_city?: string;
  status?: number;
  unique_individual_health_care_provider_number?: string;
  abha_health_id?: string;
  health_care_provider_role_code?: number;
  health_care_provider_role_freetext?: string | null;
  health_care_provider_type?: number;
  registration_council_code?: string;
  registration_number?: string;
  creation_date?: string;
  display_name?: string;
  specialization?: string;
  experience?: string;
  image?: string;
}

export const DOCTORS: UIDoctor[] = [
  {
    primary_key: "6932daebfe5b43538f5cda02b5b374fd",
    facility_id: API_CONFIG_EXPORT.facilityId,
    employee_id: "E314864344",
    member_username: "dr_anurag_aggarwal",
    medical_specialty_type_code: "ORAL_SURGERY",
    bank_details: null,
    contact_number: "7777777777",
    languages_known: "English, Hindi",
    current_city: "Mumbai",
    status: 1,
    unique_individual_health_care_provider_number: "UHPID0001",
    abha_health_id: "AHID0001",
    health_care_provider_role_code: 1,
    health_care_provider_role_freetext: null,
    health_care_provider_type: 2221,
    registration_council_code: "MCI",
    registration_number: "123XYZ",
    creation_date: "2023-12-14T15:44:33.694819+05:30",
    display_name: "Dr. Anurag Aggarwal",
    specialization: "Chief Dentist & Oral Surgeon",
    experience: "20+ Years",
    image: drAnuragImage,
  },
  {
    primary_key: "7842daebfe5b43538f5cda02b5b374fe",
    facility_id: API_CONFIG_EXPORT.facilityId,
    employee_id: "E314864345",
    member_username: "dr_kavya_reddy",
    medical_specialty_type_code: "COSMETIC_DENTISTRY",
    bank_details: null,
    contact_number: "8888888888",
    languages_known: "English, Hindi, Telugu",
    current_city: "Mumbai",
    status: 1,
    unique_individual_health_care_provider_number: "UHPID0002",
    abha_health_id: "AHID0002",
    health_care_provider_role_code: 1,
    health_care_provider_role_freetext: null,
    health_care_provider_type: 2221,
    registration_council_code: "MCI",
    registration_number: "123XYZ",
    creation_date: "2023-12-14T15:44:33.694819+05:30",
    display_name: "Dr. Kavya Reddy",
    specialization: "Cosmetic Dentistry & Orthodontics",
    experience: "15+ Years",
    image: drKavyaImage,
  },
  {
    primary_key: "8952daebfe5b43538f5cda02b5b374ff",
    facility_id: API_CONFIG_EXPORT.facilityId,
    employee_id: "E314864346",
    member_username: "dr_vikram_singh",
    medical_specialty_type_code: "PERIODONTICS",
    bank_details: null,
    contact_number: "9999999999",
    languages_known: "English, Hindi",
    current_city: "Mumbai",
    status: 1,
    unique_individual_health_care_provider_number: "UHPID0003",
    abha_health_id: "AHID0003",
    health_care_provider_role_code: 1,
    health_care_provider_role_freetext: null,
    health_care_provider_type: 2221,
    registration_council_code: "MCI",
    registration_number: "123XYZ",
    creation_date: "2023-12-14T15:44:33.694819+05:30",
    display_name: "Dr. Vikram Singh",
    specialization: "Periodontics & Preventive Care",
    experience: "18+ Years",
    image: drVikramImage,
  },
];
