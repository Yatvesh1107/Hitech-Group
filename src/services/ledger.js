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

export async function getCustomerLedger({
  token,
  customerId,
  division = "",
  dateFrom = "",
  dateTo = "",
  type = "",
  search = "",
}) {
  const params = new URLSearchParams()
  if (division) params.set("division", division)
  if (dateFrom) params.set("dateFrom", dateFrom)
  if (dateTo) params.set("dateTo", dateTo)
  if (type) params.set("type", type)
  if (search) params.set("search", search)

  const data = await request(`/customers/${customerId}/ledger?${params.toString()}`, token)

  return data.data
}

export async function getLedgerPdf({ token, customerId, division = "", download = false }) {
  const params = new URLSearchParams()
  if (division) params.set("division", division)
  if (download) params.set("download", "1")

  const response = await fetch(`${API_BASE}/customers/${customerId}/ledger/pdf?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || data.error || "Failed to generate the ledger PDF. Please try again.")
  }

  return response.blob()
}