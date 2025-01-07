export const rooms = [
  { id: "standard-queen", name: "Standard Queen Room", price: "80" },
  { id: "king-room", name: "King Room", price: "90" },
  { id: "double-queen", name: "Double Queen Room", price: "99" },
  { id: "family-room", name: "Family Room", price: "90" },
];

export type ValidationErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  specialRequests?: string;
};

export const formatPhoneNumber = (value: string) => {
  // Strip all non-digits
  const numbers = value.replace(/\D/g, "");

  // Take only first 10 digits
  const truncated = numbers.slice(0, 10);

  // Add spaces after 3rd and 6th digits
  if (truncated.length > 6) {
    return `${truncated.slice(0, 3)} ${truncated.slice(3, 6)} ${truncated.slice(
      6
    )}`;
  } else if (truncated.length > 3) {
    return `${truncated.slice(0, 3)} ${truncated.slice(3)}`;
  }

  return truncated;
};

const validateName = (name: string, fieldName = "Name") => {
  // Trim the input to handle whitespace
  const trimmedName = name?.trim();

  // Basic presence check
  if (!trimmedName) {
    return `${fieldName} is required`;
  }

  // Length check (adjust min/max as needed)
  if (trimmedName.length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }

  if (trimmedName.length > 50) {
    return `${fieldName} cannot be longer than 50 characters`;
  }

  // Check for invalid characters (anything not a letter, space, or hyphen)
  if (/[^a-zA-Z\s-]/.test(trimmedName)) {
    return `${fieldName} can only contain letters, spaces, and hyphens`;
  }

  // Check that it contains at least one letter
  if (!/[a-zA-Z]/.test(trimmedName)) {
    return `${fieldName} must contain at least one letter`;
  }

  // Check for invalid patterns
  if (/^[-\s]|[-\s]$/.test(trimmedName)) {
    return `${fieldName} cannot start or end with a hyphen or space`;
  }

  // Check for consecutive hyphens or spaces
  if (/[-]{2,}/.test(trimmedName) || /\s{2,}/.test(trimmedName)) {
    return `${fieldName} cannot contain consecutive hyphens or spaces`;
  }

  // All validations passed
  return null;
};

export const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name validation
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const firstNameError = validateName(firstName, "First name");
  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  const lastNameError = validateName(lastName, "Last name");
  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  // Email validation
  const email = formData.get("email") as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation
  const phone = formData.get("phone") as string;
  const cleanedPhone = phone.replace(/\D/g, "");
  if (!phone || cleanedPhone.length !== 10) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  // Date validation
  const checkIn = new Date(formData.get("checkIn") as string);
  const checkOut = new Date(formData.get("checkOut") as string);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today) {
    errors.checkIn = "Check-in date cannot be in the past";
  }

  if (checkOut <= checkIn) {
    errors.checkOut = "Check-out date must be after check-in date";
  }

  // Special requests validation (prevent URLs/links)
  const specialRequests = formData.get("specialRequests") as string;
  if (specialRequests) {
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
    if (urlRegex.test(specialRequests)) {
      errors.specialRequests = "Links are not allowed in special requests";
    }
    if (specialRequests.length > 500) {
      errors.specialRequests = "Special requests must be under 500 characters";
    }
  }

  return errors;
};
