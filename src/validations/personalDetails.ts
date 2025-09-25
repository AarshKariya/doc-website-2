import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;

const nameRegex = /^[a-zA-Z\s]{2,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getEndOfToday = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

const getMaxAllowedDob = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 5);

  date.setHours(23, 59, 59, 999);
  return date;
};

export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(nameRegex, "First name should only contain alphabets")
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(nameRegex, "Last name should only contain alphabets")
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be less than 50 characters"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((dateString) => {
      const date = new Date(dateString);

      date.setHours(23, 59, 59, 999);
      const maxAllowedDob = getMaxAllowedDob();
      const endOfToday = getEndOfToday();

      return date <= maxAllowedDob && date <= endOfToday;
    }, "Patient must be at least 5 years old and cannot be born in the future"),

  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((phone) => {
      const cleanPhone = phone.replace(/^\+91\s*/, "");
      return phoneRegex.test(cleanPhone);
    }, "Phone number must be exactly 10 digits")
    .refine((phone) => {
      const cleanPhone = phone.replace(/^\+91\s*/, "");
      return cleanPhone.length === 10;
    }, "Phone number must be exactly 10 digits"),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

export const validateField = (
  fieldName: keyof PersonalDetailsFormData,
  value: string
): { isValid: boolean; error?: string } => {
  try {
    const fieldSchema = personalDetailsSchema.shape[fieldName];
    fieldSchema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid input" };
  }
};

export const validateForm = (data: Partial<PersonalDetailsFormData>) => {
  try {
    personalDetailsSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: "Invalid form data" } };
  }
};
