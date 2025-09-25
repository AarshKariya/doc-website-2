import React from "react";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import DoctorCard from "./DoctorCard";
import { Doctor } from "@/types/api";

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
  const transformDoctor = (doctor: Doctor) => {
    const doctorName = doctor.member_username || `Doctor ${doctor.employee_id}`;
    const specialization = doctor.medical_specialty_type_code
      ? doctor.medical_specialty_type_code
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : "General Dentist";

    const getDoctorImage = (employeeId: string) => {
      switch (employeeId) {
        case "E314864344":
          return "/src/assets/dr-anurag-aggarwal.jpg";
        case "E314864345":
          return "/src/assets/dr-kavya-reddy.jpg";
        case "E314864346":
          return "/src/assets/dr-vikram-singh-new.jpg";
        default:
          return "/src/assets/doctor-1.jpg";
      }
    };

    return {
      id: doctor.employee_id,
      name: doctorName,
      specialization: specialization,
      experience: "5+ Years",
      image: getDoctorImage(doctor.employee_id),
      testimonial: generateMockTestimonial(),
      availableFrom: generateAvailabilityDate(),
      workingHours: generateWorkingHours(),
    };
  };

  const generateMockTestimonial = () => {
    return "Excellent dental care! Very professional and made me feel comfortable throughout the visit.";
  };

  const generateAvailabilityDate = () => {
    return "Available Now";
  };

  const generateWorkingHours = () => {
    return "9 am - 6 pm";
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
