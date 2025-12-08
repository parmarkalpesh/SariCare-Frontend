/**
 * Contact Info Sidebar Component
 * Separates contact information display from form logic
 */

import React from "react";
import { styles } from "../constants/contactStyles";

export default function ContactInfoPanel() {
  return (
    <div style={styles.leftPanel}>
      <h2 style={styles.panelTitle}>Get in touch</h2>

      <div style={styles.contactInfo}>
        <div>
          <div style={{ fontWeight: 600 }}>Call / WhatsApp</div>
          <div>+91-98765 43210</div>
          <div style={{ fontSize: "0.82rem", color: "#6b7280" }}>
            9:00 AM – 8:00 PM (All days)
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600 }}>Email</div>
          <div>support@saricare.in</div>
        </div>

        <div>
          <div style={{ fontWeight: 600 }}>Service area</div>
          <div>Jamnagar city & nearby areas</div>
        </div>

        <div>
          <div style={{ fontWeight: 600 }}>Pickup timings</div>
          <div>Morning: 9:00 AM – 1:00 PM</div>
          <div>Evening: 3:00 PM – 7:00 PM</div>
        </div>
      </div>

      <hr style={styles.divider} />

      <div style={{ fontSize: "0.85rem", color: "#4b5563" }}>
        <div style={{ fontWeight: 600, marginBottom: "6px" }}>
          Store address
        </div>
        <div>Near XYZ Circle,</div>
        <div>Jamnagar, Gujarat – 361001</div>
        <div style={{ marginTop: "8px", fontSize: "0.8rem" }}>
          Visits by appointment only – please call or message before visiting.
        </div>
      </div>
    </div>
  );
}
