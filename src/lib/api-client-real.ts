import {
  Doctor,
  AppointmentSchedule,
  PatientRegistrationRequest,
  AppointmentBookingRequest,
} from "@/types/api";

const API_CONFIG = {
  baseUrl: "",
  token: "mock-bearer-token-12345",
  facilityId: "b95ad81e452d44049712cadab7a769e1",
};

export class RealApiClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.token = API_CONFIG.token;
  }

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

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP ${response.status}: ${errorData.error || response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  }

  // 1. Get doctors by facility ID
  async getDoctors(facilityId: string): Promise<Doctor[]> {
    return this.request<Doctor[]>(
      `/providers/search/?facility_id=${facilityId}`
    );
  }

  // 2. Get appointment slots for doctor
  async getAppointmentSlots(
    resourceId: string,
    date: string
  ): Promise<AppointmentSchedule[]> {
    return this.request<AppointmentSchedule[]>(
      `/resource-schedules/resources/${resourceId}/date/${date}`
    );
  }

  // 3. Register patient
  async registerPatient(
    patientData: PatientRegistrationRequest
  ): Promise<{ patient_id: string }> {
    return this.request<{ patient_id: string }>("/patients/", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  }

  // 4. Book appointment
  async bookAppointment(
    appointmentData: AppointmentBookingRequest
  ): Promise<{ appointment_id: string }> {
    return this.request<{ appointment_id: string }>("/appointments/", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }
}

export const realApiClient = new RealApiClient();

export const API_CONFIG_EXPORT = API_CONFIG;
