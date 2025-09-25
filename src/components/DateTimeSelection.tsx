import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DoctorCard from "./DoctorCard";
import { AppointmentSchedule, Doctor } from "@/types/api";

interface DateTimeSelectionProps {
  selectedDate: string;
  selectedTime: string;
  selectedDoctor: Doctor | null;
  apiSlots: AppointmentSchedule[];
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  selectedDoctor,
  apiSlots,
  onDateSelect,
  onTimeSelect,
  onNext,
  onPrevious,
}: DateTimeSelectionProps) => {
  const transformDoctorForCard = (doctor: Doctor) => {
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
      testimonial:
        "Excellent dental care! Very professional and made me feel comfortable throughout the visit.",
      availableFrom: "Available Now",
      workingHours: "9 am - 6 pm",
    };
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
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

  const getTimeSlotsForDay = (dayOfWeek: string) => {
    const scheduleForDay = apiSlots.find(
      (s) => s.day_of_the_week === dayOfWeek
    );
    if (!scheduleForDay || !scheduleForDay.is_working) {
      return [];
    }

    const timeSlots: { time: string; available: boolean }[] = [];
    scheduleForDay.sessions.forEach((session) => {
      const startTime = session.start_time;
      const endTime = session.end_time;
      const duration = session.duration_mins;
      const isAvailable = session.status;

      const [startHour, startMin] = startTime.split(":").map(Number);
      const [endHour, endMin] = endTime.split(":").map(Number);

      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      for (
        let minutes = startMinutes;
        minutes < endMinutes;
        minutes += duration
      ) {
        const hour = Math.floor(minutes / 60);
        const min = minutes % 60;
        const timeString = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        timeSlots.push({ time: timeString, available: isAvailable });
      }
    });

    return timeSlots;
  };

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Choose date and time
        </h3>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
              <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>

            <div className="flex justify-between gap-1">
              {generateDates().map((dateInfo) => {
                const scheduleForDay = apiSlots.find(
                  (s) => s.day_of_the_week === dateInfo.day
                );
                const isDayWorking =
                  !!scheduleForDay && scheduleForDay.is_working;
                return (
                  <div key={dateInfo.value} className="flex-1 space-y-3">
                    <div className="text-center pb-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        {dateInfo.day}
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        {dateInfo.date} {dateInfo.month}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {getTimeSlotsForDay(dateInfo.day).map((slot) => {
                        const isSelected =
                          selectedDate === dateInfo.value &&
                          selectedTime === slot.time;
                        const isUnavailable = !isDayWorking || !slot.available;

                        return (
                          <Button
                            key={`${dateInfo.value}-${slot.time}`}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!isUnavailable) {
                                onDateSelect(dateInfo.value);
                                onTimeSelect(slot.time);
                              }
                            }}
                            disabled={isUnavailable}
                            className={`w-full text-sm transition-colors ${
                              isSelected
                                ? "bg-primary text-white border-primary hover:bg-primary/90"
                                : isUnavailable
                                ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed hover:bg-gray-200"
                                : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {slot.time}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

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

export default DateTimeSelection;
