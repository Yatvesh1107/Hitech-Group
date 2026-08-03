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

export async function getInvoicePayments({ token, id }) {
  const data = await request(`/invoices/${id}/payments`, token)

  return data.data
}

export async function createPayment({ token, id, payload }) {
  const data = await request(`/invoices/${id}/payments`, token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function updatePayment({ token, id, payload }) {
  const data = await request(`/payments/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function deletePayment({ token, id }) {
  const data = await request(`/payments/${id}`, token, {
    method: "DELETE",
  })

  return data.data
}
