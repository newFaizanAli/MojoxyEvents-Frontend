import { Booking } from "../types";
import { toastError } from "./toast_utils";

export const validatePassword = (
  password: string,
): {
  valid: boolean;
  message?: string;
} => {
  if (!password) {
    return { valid: false, message: "Password is required." };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!/(?=.*[0-9])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one numeric value.",
    };
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { valid: true };
};

export const handleApiError = (
  error: string | Error | any,
  fallbackMsg = "Something went wrong",
) => {
  let msg = fallbackMsg;

  try {
    if (
      error &&
      typeof error === "object" &&
      error.response &&
      typeof error.response === "object"
    ) {
      const data = error.response.data;

      if (typeof data === "string") {
        msg = data;
      } else if (data && typeof data === "object" && "message" in data) {
        msg = data.message;
      }
    } else if (error?.message) {
      msg = error.message;
    } else if (typeof error === "string") {
      msg = error;
    }
  } catch (error) {
    console.error("Unexpected error shape:", error);
  }

  toastError(msg);
};

export const getInitials = (name: string) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else {
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  }
};

export const artistParseOrAppend = (
  formData: FormData,
  key: string,
  value: any,
) => {
  if (!value) return;
  if (
    key === "genres" ||
    key === "event_types" ||
    key === "languages" ||
    key === "perform_locations" ||
    key === "achievements" ||
    key === "gallery"
  ) {
    formData.append(key, JSON.stringify(value));
  } else if (key === "user" || key === "category") {
    if (typeof value === "object" && "_id" in value)
      formData.append(key, value._id);
    else if (typeof value === "string") formData.append(key, value);
  } else if (value instanceof File) {
    formData.append(key, value);
  } else {
    formData.append(key, String(value));
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getStatusColor = (status: Booking["status"]) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    cancel: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status] || colors.pending;
};
