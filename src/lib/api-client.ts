// Mock API Client for simulating real API calls
import {
  Doctor,
  AppointmentSchedule,
  PatientRegistrationRequest,
  AppointmentBookingRequest,
  ApiResponse,
} from "@/types/api";

// Configuration
const API_CONFIG = {
  baseUrl: "http://localhost:3001/api", // Mock base URL
  token: "mock-bearer-token-12345",
  facilityId: "b95ad81e452d44049712cadab7a769e1",
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const MOCK_DOCTORS: Doctor[] = [
  {
    primary_key: "6932daebfe5b43538f5cda02b5b374fd",
    facility_id: API_CONFIG.facilityId,
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
  },
  {
    primary_key: "7842daebfe5b43538f5cda02b5b374fe",
    facility_id: API_CONFIG.facilityId,
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
  },
  {
    primary_key: "8952daebfe5b43538f5cda02b5b374ff",
    facility_id: API_CONFIG.facilityId,
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
  },
];

// Mock API Client Class
export class ApiClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.token = API_CONFIG.token;
  }

  // Simulate Bearer token validation
  private validateToken(token?: string): void {
    const expectedToken = `Bearer ${this.token}`;
    if (!token || token !== expectedToken) {
      throw new Error("Unauthorized: Invalid or missing Bearer token");
    }
  }

  // 1. Get doctors by facility ID
  async getDoctors(
    facilityId: string,
    authToken: string
  ): Promise<ApiResponse<Doctor[]>> {
    console.log(
      `🔍 API Call: GET /providers/search/?facility_id=${facilityId}`
    );
    console.log(`🔐 Auth: ${authToken}`);

    await delay(500); // Simulate network delay

    this.validateToken(authToken);

    if (!facilityId) {
      throw new Error("Bad Request: facility_id is required");
    }

    if (facilityId !== API_CONFIG.facilityId) {
      throw new Error("Not Found: Facility not found");
    }

    console.log(`✅ Returning ${MOCK_DOCTORS.length} doctors`);

    return {
      data: MOCK_DOCTORS,
      status: 200,
      message: "Doctors retrieved successfully",
    };
  }

  // 2. Get appointment slots for doctor
  async getAppointmentSlots(
    resourceId: string,
    date: string,
    authToken: string
  ): Promise<ApiResponse<AppointmentSchedule[]>> {
    console.log(
      `🔍 API Call: GET /resource-schedules/resources/${resourceId}/date/${date}`
    );
    console.log(`🔐 Auth: ${authToken}`);

    await delay(600); // Simulate network delay

    this.validateToken(authToken);

    if (!resourceId || !date) {
      throw new Error("Bad Request: resourceId and date are required");
    }

    // Check if doctor exists
    const doctorExists = MOCK_DOCTORS.some(
      (doc) => doc.primary_key === resourceId
    );
    if (!doctorExists) {
      throw new Error("Not Found: Doctor not found");
    }

    // Generate mock schedule for the week
    const mockSchedule: AppointmentSchedule[] = [
      {
        day_of_the_week: "Mon",
        is_working: true,
        sessions: [
          {
            start_time: "10:00:00",
            end_time: "13:00:00",
            duration_mins: 30,
            status: true,
          },
          {
            start_time: "15:00:00",
            end_time: "19:00:00",
            duration_mins: 30,
            status: true,
          },
        ],
      },
      {
        day_of_the_week: "Tue",
        is_working: true,
        sessions: [
          {
            start_time: "09:00:00",
            end_time: "12:00:00",
            duration_mins: 30,
            status: true,
          },
          {
            start_time: "14:00:00",
            end_time: "18:00:00",
            duration_mins: 30,
            status: true,
          },
        ],
      },
      {
        day_of_the_week: "Wed",
        is_working: true,
        sessions: [
          {
            start_time: "10:00:00",
            end_time: "13:00:00",
            duration_mins: 30,
            status: true,
          },
          {
            start_time: "15:00:00",
            end_time: "19:00:00",
            duration_mins: 30,
            status: true,
          },
        ],
      },
      {
        day_of_the_week: "Thu",
        is_working: true,
        sessions: [
          {
            start_time: "09:00:00",
            end_time: "12:00:00",
            duration_mins: 30,
            status: true,
          },
          {
            start_time: "14:00:00",
            end_time: "18:00:00",
            duration_mins: 30,
            status: true,
          },
        ],
      },
      {
        day_of_the_week: "Fri",
        is_working: true,
        sessions: [
          {
            start_time: "11:00:00",
            end_time: "18:00:00",
            duration_mins: 30,
            status: true,
          },
        ],
      },
      {
        day_of_the_week: "Sat",
        is_working: true,
        sessions: [
          {
            start_time: "09:00:00",
            end_time: "14:00:00",
            duration_mins: 30,
            status: true,
          },
        ],
      },
      {
        day_of_the_week: "Sun",
        is_working: false,
        sessions: [],
      },
    ];

    console.log(`✅ Returning schedule for ${resourceId}`);

    return {
      data: mockSchedule,
      status: 200,
      message: "Appointment slots retrieved successfully",
    };
  }

  // 3. Register patient
  async registerPatient(
    patientData: PatientRegistrationRequest,
    authToken: string
  ): Promise<ApiResponse<{ patient_id: string }>> {
    console.log(`🔍 API Call: POST /patients/`);
    console.log(`🔐 Auth: ${authToken}`);
    console.log(`📝 Data:`, patientData);

    await delay(800); // Simulate network delay

    this.validateToken(authToken);

    // Basic validation
    if (
      !patientData.patient_name ||
      !patientData.patient_mobile ||
      !patientData.facility_id
    ) {
      throw new Error(
        "Bad Request: patient_name, patient_mobile, and facility_id are required"
      );
    }

    if (patientData.facility_id !== API_CONFIG.facilityId) {
      throw new Error("Bad Request: Invalid facility_id");
    }

    // Generate mock patient ID
    const patientId = `patient_${Date.now()}`;

    console.log(`✅ Patient registered with ID: ${patientId}`);

    return {
      data: { patient_id: patientId },
      status: 201,
      message: "Patient registered successfully",
    };
  }

  // 4. Book appointment
  async bookAppointment(
    appointmentData: AppointmentBookingRequest,
    authToken: string
  ): Promise<ApiResponse<{ appointment_id: string }>> {
    console.log(`🔍 API Call: POST /appointments/`);
    console.log(`🔐 Auth: ${authToken}`);
    console.log(`📝 Data:`, appointmentData);

    await delay(700); // Simulate network delay

    this.validateToken(authToken);

    // Basic validation
    if (
      !appointmentData.facility_id ||
      !appointmentData.employee_id ||
      !appointmentData.date ||
      !appointmentData.start_time
    ) {
      throw new Error(
        "Bad Request: facility_id, employee_id, date, and start_time are required"
      );
    }

    if (appointmentData.facility_id !== API_CONFIG.facilityId) {
      throw new Error("Bad Request: Invalid facility_id");
    }

    // Check if doctor exists
    const doctorExists = MOCK_DOCTORS.some(
      (doc) => doc.employee_id === appointmentData.employee_id
    );
    if (!doctorExists) {
      throw new Error("Not Found: Doctor not found");
    }

    // Generate mock appointment ID
    const appointmentId = `appointment_${Date.now()}`;

    console.log(`✅ Appointment booked with ID: ${appointmentId}`);

    return {
      data: { appointment_id: appointmentId },
      status: 201,
      message: "Appointment booked successfully",
    };
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export configuration for use in components
export const API_CONFIG_EXPORT = API_CONFIG;
