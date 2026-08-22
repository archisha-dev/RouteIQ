import React, { useState, useEffect } from "react";
import { CATEGORIES, STATES_AND_UT } from "../data/categories";

export default function ComplaintModal({ open, onClose, onSubmit, prefillCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("women");
  const [step, setStep] = useState(1); // 1: Category Specifics, 2: Basic Info & Complainant, 3: Evidence & Review
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [errors, setErrors] = useState({});

  // Basic Info Form State
  const [basicForm, setBasicForm] = useState({
    title: "",
    description: "",
    name: "",
    contact: "",
    email: "",
    incidentDate: new Date().toISOString().split("T")[0],
    incidentTime: "12:00",
    state: "Delhi (NCT)",
    city: "New Delhi",
    policeStation: "Central Cyber Cell",
    termsAccepted: false
  });

  // Dynamic Specific Fields State
  const [specificFields, setSpecificFields] = useState({});

  useEffect(() => {
    if (open) {
      if (prefillCategory && CATEGORIES.some(c => c.id === prefillCategory)) {
        setSelectedCategory(prefillCategory);
      }
      setStep(1);
      setErrors({});
    }
  }, [open, prefillCategory]);

  if (!open) return null;

  const currentCategoryData = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSpecificFields({});
    setErrors({});
  };

  const handleBasicChange = (field, value) => {
    setBasicForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSpecificChange = (fieldKey, value) => {
    setSpecificFields(prev => ({ ...prev, [fieldKey]: value }));
    if (errors[fieldKey]) {
      setErrors(prev => ({ ...prev, [fieldKey]: null }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      type: f.type || "document"
    }));
    setEvidenceFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    const errs = {};
    currentCategoryData.fields.forEach(f => {
      if (f.required && !specificFields[f.key]) {
        errs[f.key] = `${f.label} is required`;
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!basicForm.title.trim()) errs.title = "Crime Title / Subject is required";
    if (!basicForm.description.trim() || basicForm.description.trim().length < 15) {
      errs.description = "Please describe the incident (minimum 15 characters)";
    }
    if (!isAnonymous) {
      if (!basicForm.name.trim()) errs.name = "Full Name is required (or choose Anonymous)";
      if (!basicForm.contact.trim() || basicForm.contact.trim().length < 8) {
        errs.contact = "Valid Contact Phone Number is required";
      }
    }
    if (!basicForm.state) errs.state = "State is required";
    if (!basicForm.city.trim()) errs.city = "City / District is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!basicForm.termsAccepted) {
      setErrors(prev => ({ ...prev, terms: "Please verify and accept the declaration to submit" }));
      return;
    }

    const stateCode = (basicForm.state.substring(0, 2) || "IN").toUpperCase();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const complaintId = `RQ-2026-${randomSuffix}`;
    const ackNumber = `ACK-${stateCode}-${Math.floor(20000 + Math.random() * 80000)}`;

    const officersList = [
      "Insp. R. K. Sharma (Badge #4092)",
      "SI Priya Mehta (Badge #7112)",
      "DSP Arvind Rao (Badge #1054)",
      "Insp. Sneha Patel (Badge #8831)"
    ];
    const assignedOfficer = officersList[Math.floor(Math.random() * officersList.length)];

    let priority = "Medium";
    if (selectedCategory === "child" || selectedCategory === "women") {
      priority = "High";
    } else if (selectedCategory === "financial" && Number(specificFields.amountLost || 0) > 100000) {
      priority = "Critical";
    }

    const completeComplaint = {
      id: complaintId,
      ackNumber: ackNumber,
      category: selectedCategory,
      categoryTitle: currentCategoryData.title,
      title: basicForm.title,
      description: basicForm.description,
      name: isAnonymous ? "Anonymous Complainant" : basicForm.name,
      contact: isAnonymous ? "Confidential" : basicForm.contact,
      email: isAnonymous ? "Confidential" : (basicForm.email || "Not Provided"),
      state: basicForm.state,
      city: basicForm.city,
      policeStation: basicForm.policeStation || "Cyber Crime Cell",
      incidentDate: basicForm.incidentDate,
      incidentTime: basicForm.incidentTime,
      isAnonymous: isAnonymous,
      status: "Registered",
      priority: priority,
      department: currentCategoryData.department,
      assignedOfficer: assignedOfficer,
      createdAt: new Date().toISOString(),
      specificData: specificFields,
      evidenceFiles: evidenceFiles,
      updates: [
        {
          timestamp: new Date().toISOString(),
          title: "Complaint Registered & Verified",
          detail: `Complaint successfully registered in RouteIQ Cyber Intelligence network with Tracking ID ${complaintId}.`
        },
        {
          timestamp: new Date(Date.now() + 1000).toISOString(),
          title: `Routed to ${currentCategoryData.department}`,
          detail: `Case forwarded to ${assignedOfficer} for initial verification and legal review.`
        }
      ]
    };

    onSubmit(completeComplaint);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(3, 7, 18, 0.85)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "16px"
    }}>
      <div className="modal-animate" style={{
        width: 860,
        maxWidth: "100%",
        maxHeight: "92vh",
        background: "#0a1120",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(107, 92, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Modal Header */}
        <div style={{
          padding: "18px 24px",
          background: "linear-gradient(90deg, #0d172e, #0c1c36)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: currentCategoryData.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}>
              🛡️
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>Register Cyber Crime Complaint</h3>
                <span style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 12,
                  background: "rgba(107, 92, 255, 0.2)",
                  color: "#a5b4fc",
                  fontWeight: 600,
                  border: "1px solid rgba(107, 92, 255, 0.3)"
                }}>
                  {currentCategoryData.badge}
                </span>
              </div>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>
                RouteIQ AI Intelligently routes your case directly to: <strong style={{ color: "#38bdf8" }}>{currentCategoryData.department}</strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#94a3b8",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14
            }}
          >
            ✕
          </button>
        </div>

        {/* Category Switcher & Multi-step Indicator */}
        <div style={{
          padding: "14px 24px",
          background: "#080e1c",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{
                  width: "auto",
                  padding: "6px 12px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: "#0e182e",
                  border: "1px solid rgba(107, 92, 255, 0.4)",
                  color: "#ffffff",
                  borderRadius: 8
                }}
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Stepper tabs */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { s: 1, title: "1. Category Details" },
                { s: 2, title: "2. Incident & Complainant" },
                { s: 3, title: "3. Evidence & Review" }
              ].map(item => (
                <button
                  key={item.s}
                  type="button"
                  onClick={() => {
                    if (item.s === 1) setStep(1);
                    if (item.s === 2 && validateStep1()) setStep(2);
                    if (item.s === 3 && validateStep1() && validateStep2()) setStep(3);
                  }}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    border: "none",
                    background: step === item.s ? "linear-gradient(90deg, #6b5cff, #3ec1ff)" : (step > item.s ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)"),
                    color: step === item.s ? "#ffffff" : (step > item.s ? "#34d399" : "#94a3b8")
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body Form */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          
          {/* STEP 1: CATEGORY SPECIFIC TAILORED FIELDS */}
          {step === 1 && (
            <div className="fade-in">
              <div style={{
                padding: "12px 16px",
                background: "rgba(107, 92, 255, 0.08)",
                border: "1px solid rgba(107, 92, 255, 0.2)",
                borderRadius: 10,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 12
              }}>
                <span style={{ fontSize: 22 }}>📋</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#e0e7ff", fontSize: 14 }}>
                    Specific Details for: {currentCategoryData.title}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>
                    Please fill the specialized parameters below to help the cyber forensic wing take rapid action.
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {currentCategoryData.fields.map(field => {
                  const isFullWidth = field.type === "radio" || field.key === "description" || field.key === "profileUrl" || field.key === "suspectHandles" || field.key === "evidenceLocation";
                  
                  return (
                    <div
                      key={field.key}
                      style={{
                        gridColumn: isFullWidth ? "span 2" : "span 1",
                        background: "rgba(255, 255, 255, 0.02)",
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid rgba(255, 255, 255, 0.04)"
                      }}
                    >
                      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>
                          {field.label} {field.required && <span style={{ color: "#f87171" }}>*</span>}
                        </span>
                      </label>

                      {/* Select Dropdown */}
                      {field.type === "select" && (
                        <select
                          value={specificFields[field.key] || ""}
                          onChange={(e) => handleSpecificChange(field.key, e.target.value)}
                        >
                          <option value="">-- Select {field.label} --</option>
                          {field.optionsKey === "subtypes"
                            ? currentCategoryData.subtypes.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))
                            : (field.options || []).map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))
                          }
                        </select>
                      )}

                      {/* Text Input */}
                      {field.type === "text" && (
                        <input
                          type="text"
                          placeholder={field.placeholder || `Enter ${field.label}`}
                          value={specificFields[field.key] || ""}
                          onChange={(e) => handleSpecificChange(field.key, e.target.value)}
                        />
                      )}

                      {/* Number Input */}
                      {field.type === "number" && (
                        <input
                          type="number"
                          placeholder={field.placeholder || "0"}
                          value={specificFields[field.key] || ""}
                          onChange={(e) => handleSpecificChange(field.key, e.target.value)}
                        />
                      )}

                      {/* Datetime Input */}
                      {field.type === "datetime-local" && (
                        <input
                          type="datetime-local"
                          value={specificFields[field.key] || ""}
                          onChange={(e) => handleSpecificChange(field.key, e.target.value)}
                        />
                      )}

                      {/* Radio Options */}
                      {field.type === "radio" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
                          {(field.options || []).map(opt => (
                            <label
                              key={opt}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 13,
                                color: "#cbd5e1",
                                cursor: "pointer",
                                padding: "6px 10px",
                                borderRadius: 6,
                                background: specificFields[field.key] === opt ? "rgba(107, 92, 255, 0.15)" : "transparent",
                                border: specificFields[field.key] === opt ? "1px solid rgba(107, 92, 255, 0.4)" : "1px solid transparent"
                              }}
                            >
                              <input
                                type="radio"
                                name={field.key}
                                checked={specificFields[field.key] === opt}
                                onChange={() => handleSpecificChange(field.key, opt)}
                                style={{ width: "auto", margin: 0 }}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}

                      {errors[field.key] && (
                        <div className="form-error">{errors[field.key]}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: BASIC INCIDENT & COMPLAINANT INFORMATION */}
          {step === 2 && (
            <div className="fade-in">
              {/* Anonymous Toggle Banner */}
              <div style={{
                padding: "12px 16px",
                background: isAnonymous ? "rgba(245, 158, 11, 0.1)" : "rgba(62, 193, 255, 0.08)",
                border: `1px solid ${isAnonymous ? "rgba(245, 158, 11, 0.3)" : "rgba(62, 193, 255, 0.2)"}`,
                borderRadius: 10,
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{isAnonymous ? "🕵️" : "👤"}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#f8fafc" }}>
                      {isAnonymous ? "Confidential / Anonymous Mode Active" : "Complainant Identity"}
                    </div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>
                      {isAnonymous ? "Your identity will remain encrypted and hidden from public registers." : "Fill your contact details to receive instant SMS & Email FIR updates."}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    background: isAnonymous ? "#f59e0b" : "rgba(255, 255, 255, 0.1)",
                    color: isAnonymous ? "#000000" : "#ffffff",
                    border: "none"
                  }}
                >
                  {isAnonymous ? "Switch to Identified" : "File Anonymously"}
                </button>
              </div>

              {/* Complainant Details (If not anonymous) */}
              {!isAnonymous && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                  marginBottom: 16,
                  padding: 14,
                  borderRadius: 10,
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.04)"
                }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Full Name <span style={{ color: "#f87171" }}>*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={basicForm.name}
                      onChange={(e) => handleBasicChange("name", e.target.value)}
                    />
                    {errors.name && <div className="form-error">{errors.name}</div>}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Mobile Number <span style={{ color: "#f87171" }}>*</span></label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={basicForm.contact}
                      onChange={(e) => handleBasicChange("contact", e.target.value)}
                    />
                    {errors.contact && <div className="form-error">{errors.contact}</div>}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={basicForm.email}
                      onChange={(e) => handleBasicChange("email", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Crime Location & Jurisdiction */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginBottom: 16,
                padding: 14,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.04)"
              }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>State / Union Territory <span style={{ color: "#f87171" }}>*</span></label>
                  <select
                    value={basicForm.state}
                    onChange={(e) => handleBasicChange("state", e.target.value)}
                  >
                    {STATES_AND_UT.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <div className="form-error">{errors.state}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label>City / District <span style={{ color: "#f87171" }}>*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai / South Delhi"
                    value={basicForm.city}
                    onChange={(e) => handleBasicChange("city", e.target.value)}
                  />
                  {errors.city && <div className="form-error">{errors.city}</div>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label>Nearest Cyber Police Station</label>
                  <input
                    type="text"
                    placeholder="e.g. Cyber Crime Police Station"
                    value={basicForm.policeStation}
                    onChange={(e) => handleBasicChange("policeStation", e.target.value)}
                  />
                </div>
              </div>

              {/* Incident Date & Time */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16
              }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Date of Incident</label>
                  <input
                    type="date"
                    value={basicForm.incidentDate}
                    onChange={(e) => handleBasicChange("incidentDate", e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label>Approximate Time</label>
                  <input
                    type="time"
                    value={basicForm.incidentTime}
                    onChange={(e) => handleBasicChange("incidentTime", e.target.value)}
                  />
                </div>
              </div>

              {/* Crime Title & Detailed Narrative */}
              <div className="form-group">
                <label>Crime Subject / Title <span style={{ color: "#f87171" }}>*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Fraudulent withdrawal of ₹50,000 via fake lottery APK link"
                  value={basicForm.title}
                  onChange={(e) => handleBasicChange("title", e.target.value)}
                />
                {errors.title && <div className="form-error">{errors.title}</div>}
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>Detailed Incident Narrative / Description <span style={{ color: "#f87171" }}>*</span></label>
                <textarea
                  rows={4}
                  placeholder="Provide a comprehensive step-by-step chronological account of what happened, how contact was initiated, suspect actions, and financial/mental impact..."
                  value={basicForm.description}
                  onChange={(e) => handleBasicChange("description", e.target.value)}
                />
                {errors.description && <div className="form-error">{errors.description}</div>}
              </div>
            </div>
          )}

          {/* STEP 3: EVIDENCE ATTACHMENTS & FINAL REVIEW */}
          {step === 3 && (
            <div className="fade-in">
              {/* Evidence Upload Area */}
              <div style={{
                border: "2px dashed rgba(107, 92, 255, 0.3)",
                borderRadius: 12,
                padding: "24px 16px",
                textAlign: "center",
                background: "rgba(107, 92, 255, 0.03)",
                marginBottom: 20
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#e0e7ff" }}>
                  Upload Screenshots, Bank Statements, Chat Logs & Evidence
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, marginBottom: 12 }}>
                  Supports PNG, JPG, PDF, TXT, MP4, MP3 (Max 25MB per file)
                </div>
                <label style={{
                  display: "inline-block",
                  padding: "8px 18px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}>
                  Browse & Add Files
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* Uploaded Files List */}
              {evidenceFiles.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8 }}>
                    Attached Evidence ({evidenceFiles.length})
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {evidenceFiles.map((file, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          borderRadius: 8,
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: 13
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                          <span>📄</span>
                          <span style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: 180 }}>
                            {file.name}
                          </span>
                          <span style={{ fontSize: 11, color: "#64748b" }}>({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", fontSize: 14 }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complaint Summary Card */}
              <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20
              }}>
                <h4 style={{ margin: "0 0 10px", fontSize: 14, color: "#38bdf8" }}>Complaint Verification Summary</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                  <div><strong style={{ color: "#94a3b8" }}>Category:</strong> {currentCategoryData.title}</div>
                  <div><strong style={{ color: "#94a3b8" }}>Assigned Cell:</strong> {currentCategoryData.department}</div>
                  <div><strong style={{ color: "#94a3b8" }}>Complainant:</strong> {isAnonymous ? "Anonymous (Confidential)" : basicForm.name}</div>
                  <div><strong style={{ color: "#94a3b8" }}>Contact:</strong> {isAnonymous ? "Confidential" : basicForm.contact}</div>
                  <div><strong style={{ color: "#94a3b8" }}>Location:</strong> {basicForm.city}, {basicForm.state}</div>
                  <div><strong style={{ color: "#94a3b8" }}>Subject:</strong> {basicForm.title}</div>
                </div>

                {/* Specific details snapshot */}
                {Object.keys(specificFields).length > 0 && (
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>Category-Specific Parameters:</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 12 }}>
                      {Object.entries(specificFields).map(([k, v]) => (
                        <div key={k} style={{ color: "#cbd5e1" }}>
                          <span style={{ color: "#64748b" }}>{k}:</span> {String(v)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legal Declaration */}
              <div style={{
                padding: 14,
                borderRadius: 10,
                background: "rgba(107, 92, 255, 0.05)",
                border: "1px solid rgba(107, 92, 255, 0.2)"
              }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", margin: 0 }}>
                  <input
                    type="checkbox"
                    checked={basicForm.termsAccepted}
                    onChange={(e) => {
                      setBasicForm(prev => ({ ...prev, termsAccepted: e.target.checked }));
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: null }));
                    }}
                    style={{ width: 18, height: 18, marginTop: 2 }}
                  />
                  <span style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.4 }}>
                    I solemnly declare that the facts mentioned above are true and accurate to the best of my knowledge. I understand that submitting false or mischievous complaints is punishable under cyber and penal laws.
                  </span>
                </label>
                {errors.terms && <div className="form-error" style={{ marginTop: 6 }}>{errors.terms}</div>}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: "16px 24px",
          background: "#080e1c",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                ← Back
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
              >
                Continue to Step {step + 1} →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="btn-primary"
                style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}
              >
                ✓ Submit & Generate FIR Reference
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}