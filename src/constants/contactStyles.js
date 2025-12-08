/**
 * Styled components and style constants for Contact page
 * Separates styling concerns from component logic
 */

export const styles = {
  inputBase: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#f9fafb",
  },

  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#374151",
    display: "block",
    marginBottom: "4px",
  },

  error: {
    color: "#dc2626",
    fontSize: "0.78rem",
    marginTop: "4px",
  },

  requiredAsterisk: {
    color: "#dc2626",
  },

  successMessage: {
    marginBottom: "12px",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: "#ecfdf3",
    border: "1px solid #22c55e",
    fontSize: "0.85rem",
    color: "#166534",
  },

  submitButton: {
    width: "100%",
    padding: "11px",
    backgroundColor: "#111827",
    color: "white",
    borderRadius: "999px",
    border: "none",
    fontSize: "0.98rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(15,23,42,0.35)",
  },

  container: {
    marginTop: "90px",
    minHeight: "calc(100vh - 90px)",
    backgroundColor: "#f3f4f6",
    padding: "24px 16px 40px",
  },

  contentWrapper: {
    maxWidth: "1120px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "24px",
  },

  headerTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#111827",
    marginBottom: "6px",
  },

  headerDescription: {
    fontSize: "0.95rem",
    color: "#4b5563",
    maxWidth: "620px",
  },

  layoutWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },

  leftPanel: {
    flex: "1 1 260px",
    minWidth: "260px",
    maxWidth: "360px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "18px 16px",
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
    border: "1px solid #e5e7eb",
  },

  rightPanel: {
    flex: "1 1 380px",
    minWidth: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px 18px 24px",
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
    border: "1px solid #e5e7eb",
  },

  panelTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "12px",
  },

  formFieldGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
    gap: "14px",
    marginBottom: "12px",
  },

  formFieldWrapper: {
    marginBottom: "12px",
  },

  messageFieldWrapper: {
    marginBottom: "16px",
  },

  textarea: {
    minHeight: "90px",
    resize: "vertical",
  },

  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontSize: "0.9rem",
    color: "#4b5563",
    marginBottom: "14px",
  },

  divider: {
    border: 0,
    borderTop: "1px solid #e5e7eb",
    margin: "10px 0 14px",
  },

  formHeaderWrapper: {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },

  formHeaderTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#111827",
  },

  formHeaderCaption: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },

  submitCaption: {
    marginTop: "8px",
    fontSize: "0.8rem",
    color: "#6b7280",
    textAlign: "center",
  },
};
