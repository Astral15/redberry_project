const BASE_URL = "https://api.redclass.redberryinternship.ge/api";

export function getToken() {
  return localStorage.getItem("redbery_token");
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("redbery_token", token);
  } else {
    localStorage.removeItem("redbery_token");
  }
}

function buildHeaders(customHeaders = {}, isJson = true) {
  const headers = { ...customHeaders };

  if (isJson) {
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
  }

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function request(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    isJson = true,
  } = options;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(headers, isJson),
    body: body ? (isJson ? JSON.stringify(body) : body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw {
      status: response.status,
      data,
      message: data?.message || "Request failed",
    };
  }

  return data;
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body, options = {}) =>
    request(path, { method: "POST", body, ...options }),
  put: (path, body, options = {}) =>
    request(path, { method: "PUT", body, ...options }),
  patch: (path, body, options = {}) =>
    request(path, { method: "PATCH", body, ...options }),
  delete: (path) => request(path, { method: "DELETE" }),
};