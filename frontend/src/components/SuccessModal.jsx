import React, { useState } from "react";

export default function SuccessModal({ open, complaint, onClose, onTrack, onViewMyComplaints }) {
  const [copied, setCopied] = useState(false);

  if (!open || !complaint) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(complaint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(3, 7, 18, 0.88)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1100,
      padding: 16
    }}>
      <div className="modal-animate" style={{
        width: 620,
        maxWidth: "100%",
        background: "#0d1527",
        borderRadius: 16,
        border: "1px solid rgba(16, 185, 129, 0.3)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(16, 185, 129, 0.2)",
        overflow: "hidden",
        color: "#f1f5f9"
      }}>
        {/* Success Header Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.3))",
          padding: "24px 20px",
          textAlign: "center",
          borderBottom: "1px solid rgba(16, 185, 129, 0.2)"
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            margin: "0 auto 12px",
            boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)"
          }}>
            ✓
          </div>
          <h3 style={{ margin: "0 0 6px", fontSize: 20, color: "#ffffff" }}>
            Complaint Successfully Registered!
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>
            Your complaint has been validated, assigned an official FIR acknowledgment reference, and routed to the cyber investigation wing.
          </p>
        </div>

        {/* Details Card */}
        <div style={{ padding: "20px 24px" }}>
          {/* Tracking ID Box */}
          <div style={{
            background: "rgba(107, 92, 255, 0.08)",
            border: "1px solid rgba(107, 92, 255, 0.25)",
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16
          }}>
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                Unique Tracking Reference
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.02em" }}>
                {complaint.id}
              </div>
            </div>

            <button
              type="button"
              onClick={copyToClipboard}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                background: copied ? "#10b981" : "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                border: "none",
                fontSize: 12,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              {copied ? "✓ Copied!" : "📋 Copy ID"}
            </button>
          </div>

          {/* Key Parameters Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            background: "rgba(255, 255, 255, 0.02)",
            padding: 14,
            borderRadius: 10,
            border: "1px solid rgba(255, 255, 255, 0.05)",
            fontSize: 13,
            marginBottom: 18
          }}>
            <div>
              <span style={{ color: "#64748b" }}>FIR / Acknowledgment No:</span>
              <div style={{ fontWeight: 600, color: "#f8fafc" }}>{complaint.ackNumber}</div>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Category:</span>
              <div style={{ fontWeight: 600, color: "#a5b4fc" }}>{complaint.categoryTitle}</div>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Assigned Division:</span>
              <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{complaint.department}</div>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Investigating Officer:</span>
              <div style={{ fontWeight: 600, color: "#34d399" }}>{complaint.assignedOfficer}</div>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Priority Status:</span>
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 10,
                fontSize: 11,
                fontWeight: 700,
                background: complaint.priority === "Critical" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                color: complaint.priority === "Critical" ? "#f87171" : "#fbbf24",
                marginTop: 2
              }}>
                {complaint.priority} Priority
              </span>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>SMS / Email Alert:</span>
              <div style={{ color: "#38bdf8", fontWeight: 500 }}>Dispatched ✓</div>
            </div>
          </div>

          <div style={{
            fontSize: 12,
            color: "#94a3b8",
            background: "rgba(255, 255, 255, 0.02)",
            padding: "10px 14px",
            borderRadius: 8,
            marginBottom: 20
          }}>
            💡 <strong>Next Step:</strong> Our cyber cell has initiated preliminary verification. You will receive real-time SMS updates. You can track this case anytime using your Tracking ID.
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onTrack) onTrack(complaint.id);
              }}
              className="btn-primary"
              style={{ flex: "1 1 180px" }}
            >
              🔍 Track Status Now
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onViewMyComplaints) onViewMyComplaints();
              }}
              className="btn-secondary"
              style={{ flex: "1 1 150px" }}
            >
              📁 View in My Complaints
            </button>

            <button
              type="button"
              onClick={handlePrint}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#cbd5e1",
                fontSize: 13,
                fontWeight: 500
              }}
            >
              🖨️ Print Slip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
