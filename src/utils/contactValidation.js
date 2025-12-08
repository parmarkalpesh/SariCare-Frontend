/**
 * Validation rules and logic for contact form
 * This utility separates validation concerns from component logic
 */

const VALIDATION_RULES = {
  fullName: {
    required: true,
    message: "Full name is required",
  },
  phone: {
    required: true,
    pattern: /^\d{10}$/,
    requiredMessage: "Phone number is required",
    patternMessage: "Phone must be 10 digits",
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Enter a valid email address",
  },
  subject: {
    required: true,
    message: "Subject is required",
  },
  message: {
    required: true,
    minLength: 10,
    requiredMessage: "Please enter your message",
    minLengthMessage: "Message should be at least 10 characters",
  },
};

/**
 * Validate a single field
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (fieldName, value) => {
  const rule = VALIDATION_RULES[fieldName];
  if (!rule) return null;

  const trimmedValue = value.trim();

  // Check required
  if (rule.required && !trimmedValue) {
    return rule.message || rule.requiredMessage;
  }

  // Don't validate pattern if field is optional and empty
  if (!rule.required && !trimmedValue) {
    return null;
  }

  // Check pattern
  if (rule.pattern && !rule.pattern.test(trimmedValue)) {
    return rule.patternMessage;
  }

  // Check min length
  if (rule.minLength && trimmedValue.length < rule.minLength) {
    return rule.minLengthMessage;
  }

  return null;
};

/**
 * Validate entire form data
 * @param {Object} formData - Object containing form field values
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateContactForm = (formData) => {
  const newErrors = {};

  Object.keys(VALIDATION_RULES).forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      newErrors[fieldName] = error;
    }
  });

  return newErrors;
};
