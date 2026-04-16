const isLocalHost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || (isLocalHost ? "http://localhost:5000" : "");

export const apiRequest = async (
  path,
  { method = "GET", body, token, headers } = {},
) => {
  const requestHeaders = new Headers(headers || {});
  const hasBody = body !== undefined;

  if (hasBody && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers: requestHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return data;
};
