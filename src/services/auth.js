const API_BASE = "/api"

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.")
  }

  return data
}

export async function loginRequest(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function meRequest(token) {
  return request("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
}
