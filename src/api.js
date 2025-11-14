// api.js
const API_URL =
  process.env.REACT_APP_API_URL || "https://soundlab-store.up.railway.app/api";

const baseUrl = API_URL.replace(/\/+$/, "");

export async function apiFetch(endpoint, options = {}) {
  const url = `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const isJSON = !(options.body instanceof FormData);

  // 👉 TOKEN CORRECTO
  const token = localStorage.getItem("access");

  const headers = {
    ...(isJSON ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json();
}







