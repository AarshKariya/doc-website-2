// Test file to verify API integration
import { apiClient, API_CONFIG_EXPORT } from "./api-client";

export const testAllAPIs = async () => {
  console.log("🧪 Testing All APIs...");

  const authToken = `Bearer ${API_CONFIG_EXPORT.token}`;
  const facilityId = API_CONFIG_EXPORT.facilityId;

  try {
    // Test 1: Get Doctors
    console.log("\n1️⃣ Testing getDoctors API...");
    const doctorsResponse = await apiClient.getDoctors(facilityId, authToken);
    console.log("Doctors Response:", doctorsResponse);

    if (doctorsResponse.data.length > 0) {
      const firstDoctor = doctorsResponse.data[0];

      // Test 2: Get Appointment Slots
      console.log("\n2️⃣ Testing getAppointmentSlots API...");
      const slotsResponse = await apiClient.getAppointmentSlots(
        firstDoctor.primary_key,
        "2024-01-05",
        authToken
      );
      console.log("Slots Response:", slotsResponse);

      // Test 3: Register Patient
      console.log("\n3️⃣ Testing registerPatient API...");
      const patientData = {
        person_id: "87656e8b288046deb559c4e1379cfacd",
        patient_dob: "1984-01-01",
        patient_name: "Test User",
        patient_gender: "Male",
        patient_address_type: "H",
        address: "1st Main Road",
        location: "Indiranagar",
        city: "Bengaluru",
        pin: "560038",
        patient_landline: "0801122334455",
        patient_mobile: "9876543210",
        patient_email_url: "TestUser@example.com",
        contact_person_name: "Test User Contact",
        contact_type: "S",
        contact_relationship: "Wife",
        contact_person_landline: "08066778899",
        contact_person_email_url: "TestUserContact@example.com",
        facility_id: facilityId,
      };

      const patientResponse = await apiClient.registerPatient(
        patientData,
        authToken
      );
      console.log("Patient Registration Response:", patientResponse);

      // Test 4: Book Appointment
      console.log("\n4️⃣ Testing bookAppointment API...");
      const appointmentData = {
        facility_id: facilityId,
        employee_id: firstDoctor.employee_id,
        date: "2024-01-08",
        start_time: "16:00",
      };

      const appointmentResponse = await apiClient.bookAppointment(
        appointmentData,
        authToken
      );
      console.log("Appointment Booking Response:", appointmentResponse);

      console.log("\n🎉 All API tests completed successfully!");
      return true;
    }
  } catch (error) {
    console.error("❌ API test failed:", error);
    return false;
  }
};

// Auto-run tests in development
if (import.meta.env.DEV) {
  setTimeout(() => {
    testAllAPIs();
  }, 1000);
}
