/**
 * Custom hook for managing contact form state
 * Separates state management logic from presentation
 */

import { useState } from "react";
import { validateContactForm } from "../utils/contactValidation";

const INITIAL_FORM_STATE = {
  fullName: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export const useContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // send data to backend here later
      console.log("Contact form:", formData);
      setSubmitted(true);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  return {
    formData,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
