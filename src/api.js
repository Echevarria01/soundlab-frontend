const API_URL =
  process.env.REACT_APP_API_URL || "https://soundlab-store.up.railway.app";

const baseUrl = API_URL.replace(/\/+$/, "");

export async function apiFetch(endpoint, options = {}) {
  const url = `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const isJSON = !(options.body instanceof FormData);
  const token = localStorage.getItem("token");

  const headers = {
    ...(isJSON ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  console.log("URL llamada:", url);
  console.log("Headers enviados:", headers);

  let res;
  try {
    res = await fetch(url, { ...options, headers });
  } catch (err) {
    console.error("Error de conexión:", err);
    throw new Error("❌ No se pudo conectar con el servidor");
  }

  let data;
  const text = await res.text();

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // Evita error 'Unexpected token <' si backend devuelve HTML (p.ej., 404 página)
    data = { error: text };
  }

  if (!res.ok) {
    // Puedes manejar 401 específicamente si quieres logout automático
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    throw data.error ? new Error(data.error) : new Error(`API error ${res.status}`);
  }

  return data;
}








