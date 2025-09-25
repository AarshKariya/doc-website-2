// Real API client that makes actual HTTP requests (intercepted by MSW)
import {
  Doctor,
  AppointmentSchedule,
  PatientRegistrationRequest,
  AppointmentBookingRequest,
} from "@/types/api";

// Configuration
const API_CONFIG = {
  baseUrl: "", // Empty string means same origin (MSW will intercept)
  token: "mock-bearer-token-12345",
  facilityId: "b95ad81e452d44049712cadab7a769e1",
};

// Real API Client Class that makes actual HTTP requests
export class RealApiClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.token = API_CONFIG.token;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...options.headers,
      },
    };

    console.log(
      `🔗 Making real HTTP request: ${options.method || "GET"} ${url}`
    );
    console.log(`🔐 Authorization: Bearer ${this.token}`);

    if (config.body) {
      console.log("📤 Request body:", JSON.parse(config.body as string));
    }

    try {
      const response = await fetch(url, config);

      console.log(
        `📡 Response status: ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `HTTP ${response.status}: ${errorData.error || response.statusText}`
        );
      }

      const data = await response.json();
      console.log("📥 Response data:", data);

      return data;
    } catch (error) {
      console.error("❌ Request failed:", error);
      throw error;
    }
  }

  // 1. Get doctors by facility ID
  async getDoctors(facilityId: string): Promise<Doctor[]> {
    console.log("\n🏥 API Call: Get Doctors");
    return this.request<Doctor[]>(
      `/providers/search/?facility_id=${facilityId}`
    );
  }

  // 2. Get appointment slots for doctor
  async getAppointmentSlots(
    resourceId: string,
    date: string
  ): Promise<AppointmentSchedule[]> {
    console.log("\n📅 API Call: Get Appointment Slots");
    return this.request<AppointmentSchedule[]>(
      `/resource-schedules/resources/${resourceId}/date/${date}`
    );
  }

  // 3. Register patient
  async registerPatient(
    patientData: PatientRegistrationRequest
  ): Promise<{ patient_id: string }> {
    console.log("\n👤 API Call: Register Patient");
    return this.request<{ patient_id: string }>("/patients/", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  }

  // 4. Book appointment
  async bookAppointment(
    appointmentData: AppointmentBookingRequest
  ): Promise<{ appointment_id: string }> {
    console.log("\n📝 API Call: Book Appointment");
    return this.request<{ appointment_id: string }>("/appointments/", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }
}

// Export singleton instance
export const realApiClient = new RealApiClient();

// Export configuration for use in components
export const API_CONFIG_EXPORT = API_CONFIG;
