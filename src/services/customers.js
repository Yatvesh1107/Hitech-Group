const API_BASE = "/api"

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

export async function getCustomers({ token, page = 1, limit = 10, search = "" }) {
  const params = new URLSearchParams({ page, limit })
  if (search) params.set("search", search)

  const data = await request(`/customers?${params.toString()}`, token)

  return data.data
}

export async function createCustomer({ token, payload }) {
  const data = await request("/customers", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function getCustomer({ token, id }) {
  const data = await request(`/customers/${id}`, token)

  return data.data
}

export async function updateCustomer({ token, id, payload }) {
  const data = await request(`/customers/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function deactivateCustomer({ token, id }) {
  const data = await request(`/customers/${id}`, token, {
    method: "DELETE",
  })

  return data.data
}

export async function restoreCustomer({ token, id }) {
  const data = await request(`/customers/${id}/restore`, token, {
    method: "PATCH",
  })

  return data.data
}
