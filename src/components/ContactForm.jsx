/**
 * Contact Form Component
 * Handles form rendering and user interactions
 */

import React from "react";
import { styles } from "../constants/contactStyles";

export default function ContactForm({
  formData,
  errors,
  submitted,
  onSubmit,
  onChange,
}) {
  return (
    <div style={styles.rightPanel}>
      <div style={styles.formHeaderWrapper}>
        <h2 style={styles.formHeaderTitle}>Send us a message</h2>
        <span style={styles.formHeaderCaption}>
          We usually respond within a few hours.
        </span>
      </div>

      {submitted && (
        <div style={styles.successMessage}>
          Thank you for contacting SariCare. We&apos;ve received your message
          and will get back to you soon.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        {/* Name + phone row */}
        <div style={styles.formFieldGrid}>
          <div>
            <label style={styles.label}>
              Full Name <span style={styles.requiredAsterisk}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              style={styles.inputBase}
              placeholder="e.g. Kalpesh Parmar"
            />
            {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
          </div>

          <div>
            <label style={styles.label}>
              Phone Number <span style={styles.requiredAsterisk}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              style={styles.inputBase}
              placeholder="10-digit mobile"
            />
            {errors.phone && <p style={styles.error}>{errors.phone}</p>}
          </div>
        </div>

        {/* Email field */}
        <div style={styles.formFieldWrapper}>
          <label style={styles.label}>Email (optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            style={styles.inputBase}
            placeholder="you@example.com"
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        {/* Subject field */}
        <div style={styles.formFieldWrapper}>
          <label style={styles.label}>
            Subject <span style={styles.requiredAsterisk}>*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={onChange}
            style={styles.inputBase}
            placeholder="e.g. Pickup enquiry, pricing, feedback"
          />
          {errors.subject && <p style={styles.error}>{errors.subject}</p>}
        </div>

        {/* Message field */}
        <div style={styles.messageFieldWrapper}>
          <label style={styles.label}>
            Message <span style={styles.requiredAsterisk}>*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            style={{ ...styles.inputBase, ...styles.textarea }}
            placeholder="Share your query or details. For pickup issues, mention your name, area and approximate booking date."
          />
          {errors.message && <p style={styles.error}>{errors.message}</p>}
        </div>

        {/* Submit button */}
        <button type="submit" style={styles.submitButton}>
          Send Message
        </button>

        <p style={styles.submitCaption}>
          Prefer talking? Call or WhatsApp us directly for urgent queries.
        </p>
      </form>
    </div>
  );
}
