import React, { useState, useEffect } from "react";
import { CATEGORIES, INITIAL_COMPLAINTS } from "./data/categories";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import CategoryCard from "./components/CategoryCard";
import ComplaintModal from "./components/ComplaintModal";
import SuccessModal from "./components/SuccessModal";
import MyComplaints from "./components/MyComplaints";
import TrackComplaint from "./components/TrackComplaint";
import HelpSupport from "./components/HelpSupport";
import AboutRouteIQ from "./components/AboutRouteIQ";

const LOCAL_KEY = "routeiq_complaints_v2";

function loadComplaintsFromStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn("Failed to load local complaints:", err);
  }
  return INITIAL_COMPLAINTS;
}

function saveComplaintsToStorage(list) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Failed to save local complaints:", err);
  }
}

export default function App() {
  const [view, setView] = useState("dashboard"); // "dashboard" | "my" | "track" | "help" | "about"
  const [complaints, setComplaints] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectCategory, setPreselectCategory] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [newlyRegisteredComplaint, setNewlyRegisteredComplaint] = useState(null);
  const [activeTrackingId, setActiveTrackingId] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "1930 Portal Auto-Sync Active", desc: "Inter-bank Rapid Financial Lien protocol operational.", time: "Just now" },
    { id: 2, title: "Security Advisory", desc: "Beware of malicious APK electricity bill extortion SMS.", time: "2 hrs ago" },
    { id: 3, title: "Case Update: RQ-2026-89412", desc: "Assigned to Inspector Rajesh Sharma, Cyber Cell.", time: "1 day ago" }
  ]);

  useEffect(() => {
    const data = loadComplaintsFromStorage();
    setComplaints(data);
  }, []);

  const handleOpenRegister = (catId = null) => {
    setPreselectCategory(catId);
    setModalOpen(true);
  };

  const handleFormSubmit = (newComplaint) => {
    setComplaints(prev => {
      const updated = [newComplaint, ...prev];
      saveComplaintsToStorage(updated);
      return updated;
    });

    // Add alert notification
    setNotifications(prev => [
      {
        id: Date.now(),
        title: `New Case Registered: ${newComplaint.id}`,
        desc: `Routed to ${newComplaint.department}`,
        time: "Just now"
      },
      ...prev
    ]);

    setNewlyRegisteredComplaint(newComplaint);
    setModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleAddComplaintUpdate = (complaintId, updateObj) => {
    setComplaints(prev => {
      const next = prev.map(c => {
        if (c.id === complaintId) {
          return {
            ...c,
            updates: [...(c.updates || []), updateObj]
          };
        }
        return c;
      });
      saveComplaintsToStorage(next);
      return next;
    });
  };

  const handleTrackComplaint = (id) => {
    setActiveTrackingId(id);
    setView("track");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#070b14", color: "#f1f5f9" }}>
      {/* Sidebar */}
      <Sidebar
        active={view}
        onChange={(v) => setView(v)}
        onNew={() => handleOpenRegister(null)}
        complaintsCount={complaints.length}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "24px 32px", overflowY: "auto", minWidth: 0 }}>
        {/* Topbar */}
        <Topbar
          onGoHome={() => setView("dashboard")}
          onViewChange={(v) => setView(v)}
          activeView={view}
          notifications={notifications}
        />

        {/* DASHBOARD VIEW */}
        {view === "dashboard" && (
          <div className="fade-in">
            {/* Hero Section */}
            <Hero
              onRegister={() => handleOpenRegister(null)}
              onTrack={() => setView("track")}
            />

            {/* Live Cyber Advisory Alert Banner */}
            <div style={{
              marginTop: 18,
              background: "linear-gradient(90deg, rgba(245, 158, 11, 0.12) 0%, rgba(107, 92, 255, 0.08) 100%)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              borderRadius: 12,
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>📢</span>
                <div>
                  <strong style={{ color: "#fbbf24", fontSize: 13 }}>CYBER ADVISORY: </strong>
                  <span style={{ color: "#e2e8f0", fontSize: 13 }}>
                    Surge in fake electricity bill APKs and investment task scams. Never install APK files from unknown SMS.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setView("help")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#38bdf8",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Read Safety Guide →
              </button>
            </div>

            {/* Category Cards Section */}
            <section aria-labelledby="select-heading" style={{ marginTop: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
                <div>
                  <h3 id="select-heading" style={{ margin: "0 0 4px", fontSize: 18, color: "#ffffff" }}>
                    Select Category of Complaint
                  </h3>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>
                    Choose the specialized category below to open tailored crime parameters & instant routing forms.
                  </p>
                </div>

                <div style={{ fontSize: 12, color: "#64748b" }}>
                  8 Specialized Wings Available
                </div>
              </div>

              {/* Grid of 8 Categories */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 18
              }}>
                {CATEGORIES.map(category => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onRegister={(id) => handleOpenRegister(id)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* MY COMPLAINTS VIEW */}
        {view === "my" && (
          <MyComplaints
            complaints={complaints}
            onNew={() => handleOpenRegister(null)}
            onTrack={handleTrackComplaint}
            onAddUpdate={handleAddComplaintUpdate}
          />
        )}

        {/* TRACK COMPLAINT VIEW */}
        {view === "track" && (
          <TrackComplaint
            complaints={complaints}
            initialTrackingId={activeTrackingId}
            onGoHome={() => setView("dashboard")}
            onNew={() => handleOpenRegister(null)}
          />
        )}

        {/* HELP & SUPPORT VIEW */}
        {view === "help" && (
          <HelpSupport
            onNew={() => handleOpenRegister(null)}
          />
        )}

        {/* ABOUT ROUTEIQ VIEW */}
        {view === "about" && (
          <AboutRouteIQ
            onNew={() => handleOpenRegister(null)}
          />
        )}

        {/* Footer */}
        <footer style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          color: "#64748b",
          fontSize: 12
        }}>
          <div>
            © {new Date().getFullYear()} <strong>RouteIQ</strong> — Unified Cyber Crime Intelligence & Classification Portal.
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ cursor: "pointer", color: "#94a3b8" }} onClick={() => setView("help")}>Emergency 1930</span>
            <span style={{ cursor: "pointer", color: "#94a3b8" }} onClick={() => setView("about")}>Privacy & Security</span>
            <span style={{ cursor: "pointer", color: "#94a3b8" }} onClick={() => setView("dashboard")}>Portal Home</span>
          </div>
        </footer>
      </main>

      {/* DYNAMIC REGISTRATION MODAL */}
      <ComplaintModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        prefillCategory={preselectCategory}
      />

      {/* SUCCESS CONFIRMATION MODAL */}
      <SuccessModal
        open={successModalOpen}
        complaint={newlyRegisteredComplaint}
        onClose={() => setSuccessModalOpen(false)}
        onTrack={handleTrackComplaint}
        onViewMyComplaints={() => setView("my")}
      />
    </div>
  );
}