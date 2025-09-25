import { Button } from "@/components/ui/button";
import DoctorSelection from "@/components/DoctorSelection";
import { UIDoctor } from "@/data/doctors";

interface Step1DoctorSelectionProps {
  doctors: UIDoctor[];
  selectedDoctorId: string;
  onDoctorSelect: (doctorId: string) => void;
  onNext: () => void;
  isLoading: boolean;
}

const Step1DoctorSelection = ({
  doctors,
  selectedDoctorId,
  onDoctorSelect,
  onNext,
  isLoading,
}: Step1DoctorSelectionProps) => {
  return (
    <div className="space-y-6">
      {/* Doctor Selection */}
      <DoctorSelection
        doctors={doctors}
        selectedDoctorId={selectedDoctorId}
        onDoctorSelect={onDoctorSelect}
        isLoading={isLoading}
        title="Choose a doctor"
      />

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedDoctorId}
          className="px-8 py-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1DoctorSelection;
