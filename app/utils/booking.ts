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

  // Format number as you type
  if (truncated.length > 6) {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(
      3,
      6
    )}-${truncated.slice(6)}`;
  } else if (truncated.length === 6) {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-`; // Add hyphen at exactly 6 digits
  } else if (truncated.length > 3) {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
  } else if (truncated.length === 3) {
    return `(${truncated}) `;
  } else if (truncated.length > 0) {
    return `(${truncated}`;
  }

  return "";
};

export const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name validation
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  if (!firstName || firstName.length < 2 || /[^a-zA-Z\s-]/.test(firstName)) {
    errors.firstName =
      "Please enter a valid first name (letters, spaces, and hyphens only)";
  }

  if (!lastName || lastName.length < 2 || /[^a-zA-Z\s-]/.test(lastName)) {
    errors.lastName =
      "Please enter a valid last name (letters, spaces, and hyphens only)";
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
