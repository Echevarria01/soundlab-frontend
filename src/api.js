const API_URL =
  process.env.REACT_APP_API_URL || "https://soundlab-store.up.railway.app";

const baseUrl = API_URL.replace(/\/+$/, "");

export async function apiFetch(endpoint, options = {}, tokenParam) {
  const url = `${baseUrl}/${endpoint.replace(/^\/+/, "")}`;
  const isJSON = !(options.body instanceof FormData);

  // Usar token explícito si se pasa, sino leer de localStorage
  const token = tokenParam || localStorage.getItem("access_token");

  const headers = {
    ...(isJSON ? { "Content-Type": "application/json" } : {}),
    ...(token && !options.skipAuth ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  if (res.status === 204) return null;

  return res.json();
}






