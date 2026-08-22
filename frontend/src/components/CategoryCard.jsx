import React from "react";

export default function CategoryCard({ category, onRegister }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "shield-alert":
        return "🛡️";
      case "credit-card":
        return "💳";
      case "share-2":
        return "🌐";
      case "landmark":
        return "🏛️";
      case "alert-triangle":
        return "⚠️";
      case "message-square":
        return "💬";
      case "heart-handshake":
        return "🤝";
      case "cpu":
        return "💻";
      default:
        return "🔒";
    }
  };

  return (
    <article
      style={{
        background: "linear-gradient(180deg, #0d1629 0%, #09101f 100%)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        borderRadius: "14px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s, box-shadow 0.2s",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(107, 92, 255, 0.4)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(107, 92, 255, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div>
        {/* Card Banner / Media Header */}
        <div style={{
          height: 84,
          borderRadius: 10,
          background: category.gradient,
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.35)"
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22
          }}>
            {getIcon(category.icon)}
          </div>

          <span style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: 6,
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}>
            {category.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 style={{ margin: "0 0 8px 0", fontSize: 16, color: "#ffffff", fontWeight: 700 }}>
          {category.title}
        </h3>
        <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.45, minHeight: 56 }}>
          {category.desc}
        </p>

        {/* Quick Subtypes Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {(category.subtypes || []).slice(0, 2).map((sub, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                padding: "2px 6px",
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.04)",
                color: "#cbd5e1",
                border: "1px solid rgba(255, 255, 255, 0.04)"
              }}
            >
              {sub}
            </span>
          ))}
          {(category.subtypes || []).length > 2 && (
            <span style={{ fontSize: 11, color: "#64748b", padding: "2px 4px" }}>
              +{category.subtypes.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <button
          type="button"
          onClick={() => onRegister(category.id)}
          className="btn-primary"
          style={{ width: "100%", padding: "9px 12px", fontSize: 13 }}
        >
          Register a Complaint →
        </button>
      </div>
    </article>
  );
}