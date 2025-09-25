import { http, HttpResponse } from "msw";
import {
  Doctor,
  AppointmentSchedule,
  PatientRegistrationRequest,
  AppointmentBookingRequest,
} from "@/types/api";

const FACILITY_ID = "b95ad81e452d44049712cadab7a769e1";

const MOCK_DOCTORS: Doctor[] = [
  {
    primary_key: "6932daebfe5b43538f5cda02b5b374fd",
    facility_id: FACILITY_ID,
    employee_id: "E314864344",
    member_username: "Dr. Anurag Aggarwal",
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
    facility_id: FACILITY_ID,
    employee_id: "E314864345",
    member_username: "Dr. Kavya Reddy",
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
    facility_id: FACILITY_ID,
    employee_id: "E314864346",
    member_username: "Dr. Vikram Singh",
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const validateAuth = (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  return true;
};

export const handlers = [
  // 1. GET /providers/search/?facility_id=:facilityid
  http.get("/providers/search/", async ({ request }) => {
    await delay(500);

    if (!validateAuth(request)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const facilityId = url.searchParams.get("facility_id");

    if (!facilityId) {
      return HttpResponse.json(
        { error: "facility_id is required" },
        { status: 400 }
      );
    }

    if (facilityId !== FACILITY_ID) {
      return HttpResponse.json(
        { error: "Facility not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(MOCK_DOCTORS);
  }),

  // 2. GET /resource-schedules/resources/:resourceId/date/:date
  http.get(
    "/resource-schedules/resources/:resourceId/date/:date",
    async ({ request, params }) => {
      await delay(600);

      if (!validateAuth(request)) {
        return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { resourceId, date } = params;

      if (!resourceId || !date) {
        return HttpResponse.json(
          { error: "resourceId and date are required" },
          { status: 400 }
        );
      }

      const doctorExists = MOCK_DOCTORS.some(
        (doc) => doc.primary_key === resourceId
      );
      if (!doctorExists) {
        return HttpResponse.json(
          { error: "Doctor not found" },
          { status: 404 }
        );
      }

      const mockSchedule: AppointmentSchedule[] = [
        {
          day_of_the_week: "Mon",
          is_working: true,
          sessions: [
            {
              start_time: "10:30:00",
              end_time: "12:30:00",
              duration_mins: 30,
              status: true,
            },
            {
              start_time: "15:00:00",
              end_time: "16:30:00",
              duration_mins: 30,
              status: false,
            },
          ],
        },
        {
          day_of_the_week: "Tue",
          is_working: true,
          sessions: [
            {
              start_time: "11:00:00",
              end_time: "12:30:00",
              duration_mins: 30,
              status: true,
            },
            {
              start_time: "14:30:00",
              end_time: "16:00:00",
              duration_mins: 30,
              status: false,
            },
          ],
        },
        {
          day_of_the_week: "Wed",
          is_working: true,
          sessions: [
            {
              start_time: "10:30:00",
              end_time: "12:00:00",
              duration_mins: 30,
              status: true,
            },
            {
              start_time: "15:30:00",
              end_time: "17:00:00",
              duration_mins: 30,
              status: false,
            },
          ],
        },
        {
          day_of_the_week: "Thu",
          is_working: true,
          sessions: [
            {
              start_time: "11:30:00",
              end_time: "13:00:00",
              duration_mins: 30,
              status: true,
            },
            {
              start_time: "14:00:00",
              end_time: "15:30:00",
              duration_mins: 30,
              status: false,
            },
          ],
        },
        {
          day_of_the_week: "Fri",
          is_working: true,
          sessions: [
            {
              start_time: "10:00:00",
              end_time: "11:30:00",
              duration_mins: 30,
              status: true,
            },
            {
              start_time: "12:00:00",
              end_time: "13:30:00",
              duration_mins: 30,
              status: false,
            },
          ],
        },
        {
          day_of_the_week: "Sat",
          is_working: true,
          sessions: [
            {
              start_time: "09:30:00",
              end_time: "11:00:00",
              duration_mins: 30,
              status: true,
            },
            {
              start_time: "11:30:00",
              end_time: "13:00:00",
              duration_mins: 30,
              status: false,
            },
          ],
        },
        {
          day_of_the_week: "Sun",
          is_working: false,
          sessions: [],
        },
      ];

      return HttpResponse.json(mockSchedule);
    }
  ),

  // 3. POST /patients/
  http.post("/patients/", async ({ request }) => {
    await delay(800);

    if (!validateAuth(request)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const patientData = (await request.json()) as PatientRegistrationRequest;

      if (
        !patientData.patient_name ||
        !patientData.patient_mobile ||
        !patientData.facility_id
      ) {
        return HttpResponse.json(
          {
            error: "patient_name, patient_mobile, and facility_id are required",
          },
          { status: 400 }
        );
      }

      if (patientData.facility_id !== FACILITY_ID) {
        return HttpResponse.json(
          { error: "Invalid facility_id" },
          { status: 400 }
        );
      }

      const patientId = `patient_${Date.now()}`;

      return HttpResponse.json({ patient_id: patientId }, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
  }),

  // 4. POST /appointments/
  http.post("/appointments/", async ({ request }) => {
    await delay(700);

    if (!validateAuth(request)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const appointmentData =
        (await request.json()) as AppointmentBookingRequest;

      if (
        !appointmentData.facility_id ||
        !appointmentData.employee_id ||
        !appointmentData.date ||
        !appointmentData.start_time
      ) {
        return HttpResponse.json(
          {
            error:
              "facility_id, employee_id, date, and start_time are required",
          },
          { status: 400 }
        );
      }

      if (appointmentData.facility_id !== FACILITY_ID) {
        return HttpResponse.json(
          { error: "Invalid facility_id" },
          { status: 400 }
        );
      }

      const doctorExists = MOCK_DOCTORS.some(
        (doc) => doc.employee_id === appointmentData.employee_id
      );
      if (!doctorExists) {
        return HttpResponse.json(
          { error: "Doctor not found" },
          { status: 404 }
        );
      }

      const appointmentId = `appointment_${Date.now()}`;

      return HttpResponse.json(
        { appointment_id: appointmentId },
        { status: 201 }
      );
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
  }),
];
