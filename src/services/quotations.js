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

export async function getQuotations({
  token,
  page = 1,
  limit = 10,
  search = "",
  customer = "",
  division = "",
  status = "",
  dateFrom = "",
  dateTo = "",
}) {
  const params = new URLSearchParams({ page, limit })
  if (search) params.set("search", search)
  if (customer) params.set("customer", customer)
  if (division) params.set("division", division)
  if (status) params.set("status", status)
  if (dateFrom) params.set("dateFrom", dateFrom)
  if (dateTo) params.set("dateTo", dateTo)

  const data = await request(`/quotations?${params.toString()}`, token)

  return data.data
}

export async function createQuotation({ token, payload }) {
  const data = await request("/quotations", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function getQuotation({ token, id }) {
  const data = await request(`/quotations/${id}`, token)

  return data.data
}

export async function updateQuotation({ token, id, payload }) {
  const data = await request(`/quotations/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function updateQuotationStatus({ token, id, status }) {
  const data = await request(`/quotations/${id}/status`, token, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })

  return data.data
}

export async function duplicateQuotation({ token, id }) {
  const data = await request(`/quotations/${id}/duplicate`, token, {
    method: "POST",
  })

  return data.data
}

export async function deleteQuotation({ token, id }) {
  const data = await request(`/quotations/${id}`, token, {
    method: "DELETE",
  })

  return data.data
}

export async function getQuotationPdf({ token, id, download = false }) {
  const query = download ? "?download=1" : ""
  const response = await fetch(`${API_BASE}/quotations/${id}/pdf${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || data.error || "Failed to generate the PDF. Please try again.")
  }

  return response.blob()
}
