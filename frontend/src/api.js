// src/api.js
// Uses Vite env var VITE_API_URL (set in .env.local or .env)
const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || res.statusText);
  }
  return res.json().catch(() => ({}));
}

export async function getComplaints() {
  try {
    const res = await fetch(`${API_BASE}/complaints`);
    return await handleResponse(res);
  } catch (err) {
    throw err;
  }
}

export async function createComplaint(payload) {
  const res = await fetch(`${API_BASE}/complaints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}