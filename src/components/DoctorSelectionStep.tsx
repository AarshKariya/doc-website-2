import { Button } from "@/components/ui/button";
import DoctorSelection from "./DoctorSelection";
import { Doctor } from "@/types/api";

interface DoctorSelectionStepProps {
  doctors: Doctor[];
  selectedDoctorId: string;
  onDoctorSelect: (doctorId: string) => void;
  onNext: () => void;
  isLoading: boolean;
}

const DoctorSelectionStep = ({
  doctors,
  selectedDoctorId,
  onDoctorSelect,
  onNext,
  isLoading,
}: DoctorSelectionStepProps) => {
  return (
    <div className="space-y-6">
      <DoctorSelection
        doctors={doctors}
        selectedDoctorId={selectedDoctorId}
        onDoctorSelect={onDoctorSelect}
        isLoading={isLoading}
        title="Choose a doctor"
      />

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

export default DoctorSelectionStep;
