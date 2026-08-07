import { API_BASE } from "../config/env"

async function request(path, token, options = {}) {
  const { headers = {}, ...rest } = options

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: { Authorization: `Bearer ${token}`, ...headers },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || data.error || "Something went wrong. Please try again.")
  }

  return data
}

export async function getDashboardData({ token, division = "" }) {
  const query = division ? `?division=${encodeURIComponent(division)}` : ""
  const data = await request(`/dashboard${query}`, token)
  return data.data
}
