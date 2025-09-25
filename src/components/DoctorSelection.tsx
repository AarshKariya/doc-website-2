import React from "react";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import DoctorCard from "./DoctorCard";

interface Doctor {
  primary_key: string;
  employee_id: string;
  display_name?: string;
  specialization?: string;
  medical_specialty_type_code?: string;
  experience?: string;
  image?: string;
  contact_number?: string;
  languages_known?: string;
}

interface DoctorSelectionProps {
  doctors: Doctor[];
  selectedDoctorId?: string;
  onDoctorSelect: (doctorId: string) => void;
  isLoading?: boolean;
  title?: string;
  className?: string;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({
  doctors,
  selectedDoctorId,
  onDoctorSelect,
  isLoading = false,
  title = "Select Doctor",
  className = "",
}) => {
  // Transform API doctor data to DoctorCard props
  const transformDoctor = (doctor: Doctor) => {
    const doctorName = doctor.display_name || `Doctor ${doctor.employee_id}`;
    const specialization =
      doctor.specialization ||
      (doctor.medical_specialty_type_code
        ? doctor.medical_specialty_type_code
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())
        : "General Dentist");

    return {
      id: doctor.employee_id,
      name: doctorName,
      specialization: specialization,
      experience: doctor.experience,
      image: doctor.image,
      testimonial: generateMockTestimonial(doctorName, doctor.employee_id),
      availableFrom: generateAvailabilityDate(doctor.employee_id),
      workingHours: generateWorkingHours(doctor.employee_id),
    };
  };

  const generateMockTestimonial = (doctorName: string, doctorId: string) => {
    const testimonials = [
      `Great experience with ${
        doctorName.split(" ")[1]
      }! Very professional and caring approach to dental treatment.`,
      `${
        doctorName.split(" ")[1]
      } was excellent. The procedure was painless and the results exceeded my expectations.`,
      `Highly recommend ${
        doctorName.split(" ")[1]
      }. Very knowledgeable and made me feel comfortable throughout the visit.`,
      `Best dental appointment I have had in years. ${
        doctorName.split(" ")[1]
      } is truly skilled and patient-focused.`,
      `${
        doctorName.split(" ")[1]
      } is very professional and knowledgeable. I am glad I found this practice.`,
    ];
    // Use doctorId to generate a consistent index
    const hash = doctorId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % testimonials.length;
    return testimonials[index];
  };

  const generateAvailabilityDate = (doctorId: string) => {
    const dates = [
      "10th February",
      "11th February",
      "12th February",
      "13th February",
    ];
    // Use doctorId to generate a consistent index
    const hash = doctorId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % dates.length;
    return dates[index];
  };

  const generateWorkingHours = (doctorId: string) => {
    const hours = [
      "9 am - 7 pm",
      "10 am - 7 pm",
      "10:30 am - 8 pm",
      "8:30 am - 6 pm",
    ];
    // Use doctorId to generate a consistent index (with different offset to avoid same values)
    const hash = (doctorId + "hours").split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % hours.length;
    return hours[index];
  };

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {title} (Loading from API...)
        </Label>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="flex items-center gap-2 text-lg font-semibold">
        <User className="w-5 h-5" />
        {title}
      </Label>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => {
          const transformedDoctor = transformDoctor(doctor);
          return (
            <DoctorCard
              key={transformedDoctor.id}
              {...transformedDoctor}
              isSelected={selectedDoctorId === transformedDoctor.id}
              onSelect={onDoctorSelect}
              className="hover:shadow-md transition-shadow"
            />
          );
        })}
      </div>

      {doctors.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No doctors available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorSelection;
