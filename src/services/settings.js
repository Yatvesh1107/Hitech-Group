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

export async function getCompanySettings({ token, division }) {
  const data = await request(`/settings/company/${encodeURIComponent(division)}`, token)

  return data.data
}

export async function getCompanies({ token }) {
  const data = await request("/settings/companies", token)

  return data.data
}

export async function updateCompanySettings({ token, division, payload }) {
  const data = await request(`/settings/company/${encodeURIComponent(division)}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function uploadCompanyImage({ token, file }) {
  const formData = new FormData()
  formData.append("file", file)

  const data = await request("/upload/company-image", token, {
    method: "POST",
    body: formData,
  })

  return data.data
}
