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

export async function getServices({
  token,
  page = 1,
  limit = 10,
  search = "",
  division = "",
  status = "",
}) {
  const params = new URLSearchParams({ page, limit })
  if (search) params.set("search", search)
  if (division) params.set("division", division)
  if (status) params.set("status", status)

  const data = await request(`/services?${params.toString()}`, token)

  return data.data
}

export async function createService({ token, payload }) {
  const data = await request("/services", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function getService({ token, id }) {
  const data = await request(`/services/${id}`, token)

  return data.data
}

export async function updateService({ token, id, payload }) {
  const data = await request(`/services/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function deactivateService({ token, id }) {
  const data = await request(`/services/${id}`, token, {
    method: "DELETE",
  })

  return data.data
}

export async function restoreService({ token, id }) {
  const data = await request(`/services/${id}/restore`, token, {
    method: "PATCH",
  })

  return data.data
}