import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { realApiClient, API_CONFIG_EXPORT } from "@/lib/api-client-real";
import { appointmentReducer, initialState } from "@/state/appointment";
import { Doctor } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from "@/components/StepIndicator";
import DoctorSelectionStep from "@/components/DoctorSelectionStep";
import DateTimeSelection from "@/components/DateTimeSelection";
import PersonalDetails from "@/components/PersonalDetails";

const AppointmentBooking = () => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);
  const containerRef = useRef<HTMLDivElement>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);

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

  const selectedDoctorData = useMemo(
    () => doctors.find((d) => d.employee_id === selectedDoctor) || null,
    [doctors, selectedDoctor]
  );

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await realApiClient.getDoctors(
          API_CONFIG_EXPORT.facilityId
        );

        setDoctors(response);
      } catch (error) {
        setDoctors([]);
      } finally {
        setIsLoadingDoctors(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    const loadSlots = async () => {
      if (selectedDoctor) {
        try {
          if (selectedDoctorData && selectedDoctorData.primary_key) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDate = tomorrow.toISOString().split("T")[0];

            const response = await realApiClient.getAppointmentSlots(
              selectedDoctorData.primary_key,
              tomorrowDate
            );
            dispatch({ type: "SET_API_SLOTS", payload: response });
          } else {
            dispatch({ type: "SET_API_SLOTS", payload: [] });
          }
        } catch (error) {
          dispatch({ type: "SET_API_SLOTS", payload: [] });
        }
      }
    };

    loadSlots();
  }, [selectedDoctor, selectedDoctorData]);

  const scrollToAppointmentTop = () => {
    const appointmentSection = document.getElementById("appointment");
    if (appointmentSection) {
      const navHeight = 64;
      const elementPosition = appointmentSection.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNextStep = () => {
    dispatch({ type: "NEXT_STEP" });
    setTimeout(() => {
      scrollToAppointmentTop();
    }, 100);
  };

  const handlePreviousStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
    setTimeout(() => {
      scrollToAppointmentTop();
    }, 100);
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

        dispatch({ type: "SUBMIT_SUCCESS" });

        setTimeout(() => {
          const appointmentSection = document.getElementById("appointment");
          if (appointmentSection) {
            const navHeight = 64;
            const elementPosition = appointmentSection.offsetTop - navHeight;
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
          }
        }, 100);

        setTimeout(() => {
          dispatch({ type: "RESET_FORM" });
        }, 8000);
      } catch (error) {
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
              <strong>Doctor:</strong>{" "}
              {selectedDoctorData?.member_username ||
                `Doctor ${selectedDoctorData?.employee_id}`}
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
          <DoctorSelectionStep
            doctors={doctors}
            selectedDoctorId={selectedDoctor}
            onDoctorSelect={(doctorId) =>
              dispatch({ type: "SET_SELECTED_DOCTOR", payload: doctorId })
            }
            onNext={handleNextStep}
            isLoading={isLoadingDoctors}
          />
        )}

        {currentStep === 2 && (
          <DateTimeSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedDoctor={selectedDoctorData}
            apiSlots={apiSlots}
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
          <PersonalDetails
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
