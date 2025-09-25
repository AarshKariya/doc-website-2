import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Fill in",
    subtitle: "General Info",
  },
  {
    id: 2,
    title: "Choose",
    subtitle: "Date and Time",
  },
  {
    id: 3,
    title: "Fill in",
    subtitle: "Personal Details",
  },
];

const StepIndicator = ({ currentStep, className }: StepIndicatorProps) => {
  return (
    <div className={cn("w-full max-w-4xl mx-auto mb-8", className)}>
      <div className="flex items-center justify-between relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center relative">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold border-2 bg-white transition-all duration-200",
                  {
                    "border-orange-500 text-orange-500": isActive,
                    "border-green-500 bg-green-500 text-white": isCompleted,
                    "border-gray-300 text-gray-400": isUpcoming,
                  }
                )}
              >
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : step.id}
              </div>

              <div className="mt-3 text-center">
                <div
                  className={cn("text-sm font-medium", {
                    "text-orange-500": isActive,
                    "text-green-600": isCompleted,
                    "text-gray-400": isUpcoming,
                  })}
                >
                  {step.title}
                </div>
                <div
                  className={cn("text-sm", {
                    "text-orange-500": isActive,
                    "text-green-600": isCompleted,
                    "text-gray-400": isUpcoming,
                  })}
                >
                  {step.subtitle}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-6 left-full w-full h-0.5 transition-colors duration-200",
                    {
                      "bg-green-500": isCompleted,
                      "bg-orange-500": isActive && index === 0,
                      "bg-gray-200": isUpcoming || (isActive && index > 0),
                    }
                  )}
                  style={{
                    width: "calc(100vw / 3 - 3rem)",
                    transform: "translateX(1.5rem)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
