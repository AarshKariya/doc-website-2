import { useEffect, useMemo, useReducer, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { realApiClient, API_CONFIG_EXPORT } from "@/lib/api-client-real";
import { appointmentReducer, initialState } from "@/state/appointment";
import { DOCTORS as STATIC_DOCTORS, UIDoctor } from "@/data/doctors";
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from "@/components/StepIndicator";
import Step1DoctorSelection from "@/components/Step1DoctorSelection";
import Step2DateTimeSelection from "@/components/Step2DateTimeSelection";
import Step3PersonalDetails from "@/components/Step3PersonalDetails";

const AppointmentBooking = () => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    form: {
      selectedDoctor,
      selectedDate,
      selectedTime,
      patientName,
      patientPhone,
      patientEmail,
    },
    ui: { currentStep, isSubmitted, isSubmitting },
    api: { slots: apiSlots },
  } = state;

  const doctors: UIDoctor[] = useMemo(() => STATIC_DOCTORS, []);
  const selectedDoctorData = useMemo(
    () => doctors.find((d) => d.employee_id === selectedDoctor) || null,
    [doctors, selectedDoctor]
  );

  // Auto scroll top on step change
  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentStep]);

  useEffect(() => {
    const loadSlots = async () => {
      if (selectedDoctor && selectedDate) {
        try {
          console.log("📅 Loading appointment slots from API...");

          if (selectedDoctorData && selectedDoctorData.primary_key) {
            const response = await realApiClient.getAppointmentSlots(
              selectedDoctorData.primary_key,
              selectedDate
            );
            dispatch({ type: "SET_API_SLOTS", payload: response });
            console.log("✅ Slots loaded:", response);
          } else {
            console.log("📅 Using mock slots for fallback doctor");
            dispatch({ type: "SET_API_SLOTS", payload: [] });
          }
        } catch (error) {
          console.error("❌ Failed to load slots:", error);
          dispatch({ type: "SET_API_SLOTS", payload: [] });
        }
      }
    };

    loadSlots();
  }, [selectedDoctor, selectedDate, selectedDoctorData]);

  const handleNextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handlePreviousStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const handleSubmit = async () => {
    if (
      selectedDoctor &&
      selectedDate &&
      selectedTime &&
      patientName &&
      patientPhone
    ) {
      dispatch({ type: "SET_IS_SUBMITTING", payload: true });
      try {
        console.log("🚀 Starting appointment booking process...");
        const patientData = {
          person_id: `person_${Date.now()}`,
          patient_dob: "1990-01-01",
          patient_name: patientName,
          patient_gender: "Male",
          patient_address_type: "H",
          address: "1st Main Road",
          location: "Default Location",
          city: "Mumbai",
          pin: "400001",
          patient_landline: "02212345678",
          patient_mobile: patientPhone.replace(/\D/g, "").slice(-10),
          patient_email_url: patientEmail || "default@example.com",
          contact_person_name: patientName,
          contact_type: "S",
          contact_relationship: "Self",
          contact_person_landline: "02212345678",
          contact_person_email_url: patientEmail || "default@example.com",
          facility_id: API_CONFIG_EXPORT.facilityId,
        };

        const appointmentData = {
          facility_id: API_CONFIG_EXPORT.facilityId,
          employee_id: selectedDoctor,
          date: selectedDate,
          start_time: convertTo24Hour(selectedTime),
        };

        await realApiClient.registerPatient(patientData);
        const appointmentResponse = await realApiClient.bookAppointment(
          appointmentData
        );
        console.log("✅ Appointment booked:", appointmentResponse);

        dispatch({ type: "SUBMIT_SUCCESS" });

        setTimeout(() => {
          const appointmentSection = document.getElementById("appointment");
          if (appointmentSection) {
            appointmentSection.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);

        setTimeout(() => {
          dispatch({ type: "RESET_FORM" });
        }, 8000);
      } catch (error) {
        console.error("❌ Appointment booking failed:", error);
        alert("Appointment booking failed. Please try again.");
      } finally {
        dispatch({ type: "SET_IS_SUBMITTING", payload: false });
      }
    }
  };

  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(" ");
    let [hours] = time.split(":");
    const [, minutes] = time.split(":");
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = (parseInt(hours, 10) + 12).toString();
    return `${hours}:${minutes}`;
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto shadow-medical animate-zoom-in">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-medical-success mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-4">
            Appointment Confirmed!
          </h3>
          <p className="text-muted-foreground mb-4">
            Thank you, {patientName}! Your appointment request has been
            submitted.
          </p>
          <div className="bg-accent p-4 rounded-lg mb-4">
            <p className="text-sm text-accent-foreground">
              <strong>Doctor:</strong> {selectedDoctorData?.display_name}
              <br />
              <strong>Date:</strong>{" "}
              {new Date(selectedDate).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              <br />
              <strong>Time:</strong> {selectedTime}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            You will receive a call back or message within the next 12-24 hours
            for appointment confirmation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card ref={containerRef} className="max-w-6xl mx-auto shadow-medical">
      <CardContent className="p-6">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && (
          <Step1DoctorSelection
            doctors={doctors}
            selectedDoctorId={selectedDoctor}
            onDoctorSelect={(doctorId) =>
              dispatch({ type: "SET_SELECTED_DOCTOR", payload: doctorId })
            }
            onNext={handleNextStep}
            isLoading={false}
          />
        )}

        {currentStep === 2 && (
          <Step2DateTimeSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedDoctor={selectedDoctorData}
            onDateSelect={(date) =>
              dispatch({ type: "SET_SELECTED_DATE", payload: date })
            }
            onTimeSelect={(time) =>
              dispatch({ type: "SET_SELECTED_TIME", payload: time })
            }
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        )}

        {currentStep === 3 && (
          <Step3PersonalDetails
            patientName={patientName}
            patientPhone={patientPhone}
            patientEmail={patientEmail}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedDoctor={selectedDoctorData}
            onNameChange={(name) =>
              dispatch({ type: "SET_PATIENT_NAME", payload: name })
            }
            onPhoneChange={(phone) =>
              dispatch({ type: "SET_PATIENT_PHONE", payload: phone })
            }
            onEmailChange={(email) =>
              dispatch({ type: "SET_PATIENT_EMAIL", payload: email })
            }
            onSubmit={handleSubmit}
            onPrevious={handlePreviousStep}
            isSubmitting={isSubmitting}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;
