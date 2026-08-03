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

export async function getInvoices({
  token,
  page = 1,
  limit = 10,
  search = "",
  customer = "",
  paymentStatus = "",
  division = "",
  dateFrom = "",
  dateTo = "",
}) {
  const params = new URLSearchParams({ page, limit })
  if (search) params.set("search", search)
  if (customer) params.set("customer", customer)
  if (paymentStatus) params.set("paymentStatus", paymentStatus)
  if (division) params.set("division", division)
  if (dateFrom) params.set("dateFrom", dateFrom)
  if (dateTo) params.set("dateTo", dateTo)

  const data = await request(`/invoices?${params.toString()}`, token)

  return data.data
}

export async function getInvoice({ token, id }) {
  const data = await request(`/invoices/${id}`, token)

  return data.data
}

export async function updateInvoice({ token, id, payload }) {
  const data = await request(`/invoices/${id}`, token, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.data
}

export async function deleteInvoice({ token, id }) {
  const data = await request(`/invoices/${id}`, token, {
    method: "DELETE",
  })

  return data.data
}

export async function convertQuotationToInvoice({ token, id }) {
  const data = await request(`/quotations/${id}/convert-to-invoice`, token, {
    method: "POST",
  })

  return data.data
}

export async function getInvoicePdf({ token, id, download = false }) {
  const query = download ? "?download=1" : ""
  const response = await fetch(`${API_BASE}/invoices/${id}/pdf${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || data.error || "Failed to generate the PDF. Please try again.")
  }

  return response.blob()
}
