import { AppointmentSchedule } from "@/types/api";

export interface AppointmentState {
  form: {
    selectedDoctor: string;
    selectedDate: string;
    selectedTime: string;
    patientName: string;
    patientPhone: string;
    patientEmail: string;
  };
  ui: {
    currentStep: number;
    isSubmitted: boolean;
    isSubmitting: boolean;
  };
  api: {
    slots: AppointmentSchedule[];
  };
}

export type AppointmentAction =
  | { type: "SET_SELECTED_DOCTOR"; payload: string }
  | { type: "SET_SELECTED_DATE"; payload: string }
  | { type: "SET_SELECTED_TIME"; payload: string }
  | { type: "SET_PATIENT_NAME"; payload: string }
  | { type: "SET_PATIENT_PHONE"; payload: string }
  | { type: "SET_PATIENT_EMAIL"; payload: string }
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "SET_IS_SUBMITTED"; payload: boolean }
  | { type: "SET_IS_SUBMITTING"; payload: boolean }
  | { type: "SET_API_SLOTS"; payload: AppointmentSchedule[] }
  | { type: "RESET_FORM" }
  | { type: "SUBMIT_SUCCESS" };

export const initialState: AppointmentState = {
  form: {
    selectedDoctor: "",
    selectedDate: "",
    selectedTime: "",
    patientName: "",
    patientPhone: "+91 ",
    patientEmail: "",
  },
  ui: {
    currentStep: 1,
    isSubmitted: false,
    isSubmitting: false,
  },
  api: {
    slots: [],
  },
};

export const appointmentReducer = (
  state: AppointmentState,
  action: AppointmentAction
): AppointmentState => {
  switch (action.type) {
    case "SET_SELECTED_DOCTOR":
      return {
        ...state,
        form: { ...state.form, selectedDoctor: action.payload },
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        form: { ...state.form, selectedDate: action.payload },
      };
    case "SET_SELECTED_TIME":
      return {
        ...state,
        form: { ...state.form, selectedTime: action.payload },
      };
    case "SET_PATIENT_NAME":
      return { ...state, form: { ...state.form, patientName: action.payload } };
    case "SET_PATIENT_PHONE":
      return {
        ...state,
        form: { ...state.form, patientPhone: action.payload },
      };
    case "SET_PATIENT_EMAIL":
      return {
        ...state,
        form: { ...state.form, patientEmail: action.payload },
      };
    case "SET_CURRENT_STEP":
      return { ...state, ui: { ...state.ui, currentStep: action.payload } };
    case "NEXT_STEP":
      return {
        ...state,
        ui: { ...state.ui, currentStep: Math.min(state.ui.currentStep + 1, 3) },
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        ui: { ...state.ui, currentStep: Math.max(state.ui.currentStep - 1, 1) },
      };
    case "SET_IS_SUBMITTED":
      return { ...state, ui: { ...state.ui, isSubmitted: action.payload } };
    case "SET_IS_SUBMITTING":
      return { ...state, ui: { ...state.ui, isSubmitting: action.payload } };
    case "SET_API_SLOTS":
      return { ...state, api: { ...state.api, slots: action.payload } };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        ui: { ...state.ui, isSubmitted: true, isSubmitting: false },
      };
    case "RESET_FORM":
      return { ...initialState, api: state.api };
    default:
      return state;
  }
};
