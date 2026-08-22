import React, { useState } from "react";

export default function HelpSupport({ onNew }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What should I do immediately if I lost money in a cyber financial fraud?",
      a: "1. Call 1930 immediately (National Cyber Financial Fraud Helpline). The first 2-3 hours are the golden window where banks can freeze fraudulent beneficiary accounts.\n2. Note down transaction IDs / UTR numbers.\n3. Take screenshots of fraudulent messages, UPI IDs, and account numbers.\n4. Register a formal complaint here on RouteIQ to initiate rapid police lien and inter-bank coordination."
    },
    {
      q: "Can I register a complaint anonymously without disclosing my identity?",
      a: "Yes! RouteIQ supports Confidential / Anonymous filing. When selected, your personal details are encrypted and withheld from public portals. However, providing valid contact info is recommended if you wish to receive legal FIR updates and tracking SMS."
    },
    {
      q: "How does RouteIQ AI route my complaint to the correct cyber cell?",
      a: "RouteIQ's intelligent classifier analyzes the crime category, suspect identifiers, transaction vectors, and jurisdiction. It automatically assigns the case to specialized divisions (e.g. Cyber Financial Cell, Women & Child Protection Taskforce, Forensics Unit) and generates an official tracking reference."
    },
    {
      q: "What digital evidence should I preserve before filing?",
      a: "Never delete chat logs, call recordings, SMS, or emails. Take full screenshots showing timestamps, usernames, profile URLs, phone numbers, and bank account statements. You can upload these in the evidence attachment step of the registration form."
    },
    {
      q: "How long does it take for an investigating officer to review my case?",
      a: "Cases flagged as Critical Priority (Child safety, active extortion, large financial frauds) are reviewed within 1 to 4 hours. General cyber offenses are processed within 24 hours with automatic SMS tracking dispatched."
    }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Top Banner */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, margin: "0 0 8px", color: "#ffffff" }}>
          Help & Cyber Crime Victim Support
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
          Guidance, emergency protocols, and essential steps to protect your digital identity and finances.
        </p>
      </div>

      {/* Emergency Helpline Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(185, 28, 28, 0.25))",
        border: "1px solid rgba(239, 68, 68, 0.35)",
        borderRadius: 16,
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 24
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>🚨</span>
            <h3 style={{ margin: 0, fontSize: 18, color: "#fca5a5" }}>
              National Cyber Financial Fraud Helpline — 1930
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#fecaca", maxWidth: 600 }}>
            Dial <strong>1930 (Toll-Free)</strong> immediately to freeze cyber fraud transactions in real-time across Indian banking channels and payment wallets.
          </p>
        </div>

        <button
          type="button"
          onClick={onNew}
          className="btn-primary"
          style={{ background: "linear-gradient(90deg, #ef4444, #dc2626)", padding: "10px 20px" }}
        >
          File Emergency Report
        </button>
      </div>

      {/* Do's and Don'ts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {/* DO's */}
        <div style={{
          background: "linear-gradient(180deg, #0d1e1e 0%, #081414 100%)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          borderRadius: 14,
          padding: "20px"
        }}>
          <h4 style={{ margin: "0 0 14px", fontSize: 15, color: "#34d399", display: "flex", alignItems: "center", gap: 8 }}>
            <span>✅</span> Essential Do's for Victims
          </h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, display: "grid", gap: 8 }}>
            <li>Immediately take full-screen screenshots of fraudulent transactions, chats, and profiles.</li>
            <li>Note down date, time, UTR numbers, and scammer UPI IDs.</li>
            <li>Inform your bank nodal desk immediately to block compromised cards/netbanking.</li>
            <li>Enable Two-Factor Authentication (2FA) with an authenticator app on all accounts.</li>
          </ul>
        </div>

        {/* DON'Ts */}
        <div style={{
          background: "linear-gradient(180deg, #1f1118 0%, #15090f 100%)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          borderRadius: 14,
          padding: "20px"
        }}>
          <h4 style={{ margin: "0 0 14px", fontSize: 15, color: "#f87171", display: "flex", alignItems: "center", gap: 8 }}>
            <span>❌</span> Crucial Don'ts
          </h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, display: "grid", gap: 8 }}>
            <li>Do not delete messages, WhatsApp chats, or emails even if abusive.</li>
            <li>Do not install remote desktop apps (AnyDesk, TeamViewer) at caller's request.</li>
            <li>Do not share OTP, PIN, or CVV with anyone posing as customer support.</li>
            <li>Do not transfer money to "recovery agents" claiming to recover lost funds.</li>
          </ul>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div style={{
        background: "linear-gradient(180deg, #0d1629 0%, #09101f 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 16,
        padding: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 17, color: "#ffffff" }}>
          Frequently Asked Questions (FAQ)
        </h3>

        <div style={{ display: "grid", gap: 10 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: 10,
                  overflow: "hidden"
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 18px",
                    background: "transparent",
                    border: "none",
                    color: "#f8fafc",
                    fontSize: 14,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: "#6b5cff", fontSize: 16, marginLeft: 12 }}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: "0 18px 16px",
                    color: "#94a3b8",
                    fontSize: 13,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                    paddingTop: 12
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
