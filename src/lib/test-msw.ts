// Test MSW integration
import { realApiClient, API_CONFIG_EXPORT } from "./api-client-real";

export const testMSWIntegration = async () => {
  console.log("🧪 Testing MSW Integration with Real HTTP Requests...");
  console.log("📡 These will be actual fetch() calls intercepted by MSW");

  try {
    // Test 1: Get Doctors
    console.log("\n1️⃣ Testing GET /providers/search/ ...");
    const doctors = await realApiClient.getDoctors(
      API_CONFIG_EXPORT.facilityId
    );
    console.log(`✅ SUCCESS: Received ${doctors.length} doctors`);

    if (doctors.length > 0) {
      const firstDoctor = doctors[0];

      // Test 2: Get Appointment Slots
      console.log(
        "\n2️⃣ Testing GET /resource-schedules/resources/:id/date/:date ..."
      );
      const slots = await realApiClient.getAppointmentSlots(
        firstDoctor.primary_key,
        "2024-01-05"
      );
      console.log(`✅ SUCCESS: Received ${slots.length} schedule entries`);

      // Test 3: Register Patient
      console.log("\n3️⃣ Testing POST /patients/ ...");
      const patientData = {
        person_id: "87656e8b288046deb559c4e1379cfacd",
        patient_dob: "1984-01-01",
        patient_name: "MSW Test User",
        patient_gender: "Male",
        patient_address_type: "H",
        address: "1st Main Road",
        location: "Indiranagar",
        city: "Bengaluru",
        pin: "560038",
        patient_landline: "0801122334455",
        patient_mobile: "9876543210",
        patient_email_url: "mswtest@example.com",
        contact_person_name: "MSW Test Contact",
        contact_type: "S",
        contact_relationship: "Self",
        contact_person_landline: "08066778899",
        contact_person_email_url: "mswcontact@example.com",
        facility_id: API_CONFIG_EXPORT.facilityId,
      };

      const patientResponse = await realApiClient.registerPatient(patientData);
      console.log(
        `✅ SUCCESS: Patient registered with ID: ${patientResponse.patient_id}`
      );

      // Test 4: Book Appointment
      console.log("\n4️⃣ Testing POST /appointments/ ...");
      const appointmentData = {
        facility_id: API_CONFIG_EXPORT.facilityId,
        employee_id: firstDoctor.employee_id,
        date: "2024-01-08",
        start_time: "16:00",
      };

      const appointmentResponse = await realApiClient.bookAppointment(
        appointmentData
      );
      console.log(
        `✅ SUCCESS: Appointment booked with ID: ${appointmentResponse.appointment_id}`
      );

      console.log("\n🎉 All MSW tests completed successfully!");
      console.log(
        "🔍 Check the Network tab in DevTools to see the intercepted HTTP requests"
      );
      return true;
    }
  } catch (error) {
    console.error("❌ MSW test failed:", error);
    return false;
  }
};

// Auto-run tests in development after MSW is ready
if (import.meta.env.DEV) {
  // Wait a bit for MSW to initialize
  setTimeout(() => {
    testMSWIntegration();
  }, 2000);
}
