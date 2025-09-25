import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DoctorCard from "./DoctorCard";

interface Doctor {
  employee_id: string;
  display_name?: string;
  specialization?: string;
  experience?: string;
  image?: string;
}

interface Step2DateTimeSelectionProps {
  selectedDate: string;
  selectedTime: string;
  selectedDoctor: Doctor | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step2DateTimeSelection = ({
  selectedDate,
  selectedTime,
  selectedDoctor,
  onDateSelect,
  onTimeSelect,
  onNext,
  onPrevious,
}: Step2DateTimeSelectionProps) => {
  const transformDoctorForCard = (doctor: Doctor) => {
    const doctorName = doctor.display_name || `Doctor ${doctor.employee_id}`;

    // Generate consistent testimonial, availability, and working hours
    const generateHash = (str: string) => {
      return str.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
    };

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
    ];

    const availabilityDates = [
      "10th February",
      "11th February",
      "12th February",
    ];
    const workingHours = ["9 am - 7 pm", "10 am - 7 pm", "10:30 am - 8 pm"];

    const hash = Math.abs(generateHash(doctor.employee_id));

    return {
      id: doctor.employee_id,
      name: doctorName,
      specialization: doctor.specialization || "General Dentist",
      experience: doctor.experience,
      image: doctor.image,
      testimonial: testimonials[hash % testimonials.length],
      availableFrom: availabilityDates[hash % availabilityDates.length],
      workingHours: workingHours[hash % workingHours.length],
    };
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        // Skip Sundays
        dates.push({
          value: date.toISOString().split("T")[0],
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          date: date.getDate(),
          month: date.toLocaleDateString("en-US", { month: "short" }),
        });
      }
    }
    return dates;
  };

  const timeSlots = [
    "10:30",
    "11:30",
    "12:30",
    "13:30",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  return (
    <div className="space-y-6">
      {/* Selected Doctor Card - Full Card from Step 1 */}
      {selectedDoctor && (
        <div className="max-w-md">
          <DoctorCard
            {...transformDoctorForCard(selectedDoctor)}
            isSelected={false}
            showChooseButton={false}
            className="pointer-events-none shadow-lg border-0"
          />
        </div>
      )}

      {/* Date and Time Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Choose date and time
        </h3>

        <Card>
          <CardContent className="p-6">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
              <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>

            {/* Date Headers and Time Slots */}
            <div className="grid grid-cols-4 gap-4">
              {generateDates().map((dateInfo, dateIndex) => (
                <div key={dateInfo.value} className="space-y-3">
                  {/* Date Header */}
                  <div className="text-center pb-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">
                      {dateInfo.day}
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {dateInfo.date} {dateInfo.month}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    {timeSlots.map((time) => {
                      const isSelected =
                        selectedDate === dateInfo.value &&
                        selectedTime === time;
                      const isUnavailable =
                        (dateIndex + timeSlots.indexOf(time)) % 3 === 0; // Mock availability
                      const isHighlighted = dateIndex === 3 && time === "12:30"; // Orange highlight

                      return (
                        <Button
                          key={`${dateInfo.value}-${time}`}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!isUnavailable) {
                              onDateSelect(dateInfo.value);
                              onTimeSelect(time);
                            }
                          }}
                          disabled={isUnavailable}
                          className={`w-full text-sm transition-colors ${
                            isSelected
                              ? "bg-primary text-white border-primary hover:bg-primary/90"
                              : isHighlighted && !isSelected
                              ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                              : isUnavailable
                              ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed hover:bg-gray-200"
                              : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step2DateTimeSelection;
