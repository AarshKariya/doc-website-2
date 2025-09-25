import { Calendar, Phone, Mail, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Doctor } from "@/types/api";

interface PersonalDetailsProps {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  selectedDate: string;
  selectedTime: string;
  selectedDoctor: Doctor | null;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting?: boolean;
}

const PersonalDetails = ({
  patientName,
  patientPhone,
  patientEmail,
  selectedDate,
  selectedTime,
  selectedDoctor,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onSubmit,
  onPrevious,
  isSubmitting = false,
}: PersonalDetailsProps) => {
  const nameParts = patientName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const handleFirstNameChange = (first: string) => {
    onNameChange(`${first} ${lastName}`.trim());
  };

  const handleLastNameChange = (last: string) => {
    onNameChange(`${firstName} ${last}`.trim());
  };

  interface DisplayDateInfo {
    day: string;
    date: string;
  }

  const formatDate = (dateString: string): DisplayDateInfo | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: date.toLocaleDateString("en-US", { day: "numeric", month: "long" }),
    };
  };

  const transformDoctorData = (doctor: Doctor) => {
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
      name: doctorName,
      specialization: specialization,
      experience: "5+ Years",
      image: getDoctorImage(doctor.employee_id),
      testimonial:
        "Excellent dental care! Very professional and made me feel comfortable throughout the visit.",
      availableFrom: "Available Now",
      workingHours: "9 am - 6 pm",
    };
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+91 ")) {
      onPhoneChange("+91 " + value.replace(/^\+91\s*/, ""));
    } else {
      onPhoneChange(value);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
    ));
  };

  const dateInfo = formatDate(selectedDate);
  const doctorData = selectedDoctor
    ? transformDoctorData(selectedDoctor)
    : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col justify-between min-h-full">
          <div className="space-y-8 flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-900">
                Your name:
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium text-gray-900">
                Date of birth:
              </Label>
              <div className="relative">
                <Input type="date" placeholder="MM/DD/YYYY" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-900">
                  Email address:
                </Label>
                <Input
                  type="email"
                  placeholder="youremail@"
                  value={patientEmail}
                  onChange={(e) => onEmailChange(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-900">
                  Phone number:
                </Label>
                <Input
                  type="tel"
                  placeholder="+91 38 (0__) _______"
                  value={patientPhone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-blue-600 mb-1">
                  {dateInfo?.day}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {dateInfo?.date}
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {selectedTime}
                </div>
              </div>
            </CardContent>
          </Card>

          {doctorData && (
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex-shrink-0">
                    {doctorData.image ? (
                      <img
                        src={doctorData.image}
                        alt={doctorData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {doctorData.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      {doctorData.specialization}
                    </p>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars()}
                    </div>
                    <p className="text-xs text-gray-600 italic mb-2 line-clamp-2">
                      {doctorData.testimonial}
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <span className="text-gray-500">Available from:</span>{" "}
                        <span className="font-medium text-blue-600">
                          {doctorData.availableFrom}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">Working hours:</span>{" "}
                        <span className="font-medium">
                          {doctorData.workingHours}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!firstName || !lastName || !patientPhone || isSubmitting}
          className="px-8 bg-primary hover:bg-primary-dark"
        >
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
