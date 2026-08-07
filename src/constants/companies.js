export const COMPANIES = [
  { id: "Industrial Insulation", name: "Industrial Insulation" },
  { id: "Experts in Ultrasonics", name: "Experts in Ultrasonics" },
  { id: "Precision Tech Engineering", name: "Precision Tech Engineering" },
]

export const DEFAULT_COMPANY = COMPANIES[0].id

export const STORAGE_KEY = "hitech_active_company"

export function isCompanyId(value) {
  return COMPANIES.some((company) => company.id === value)
}

// Technical reports always belong to a fixed company based on their report type.
export const REPORT_TYPE_COMPANY = {
  "Ultrasonic / D.P. / Thickness Test": "Experts in Ultrasonics",
  VSR: "Precision Tech Engineering",
}

// Report types available per company. Companies not listed here do not use technical reports.
export const COMPANY_REPORT_TYPES = {
  "Experts in Ultrasonics": ["Ultrasonic / D.P. / Thickness Test"],
  "Precision Tech Engineering": ["VSR"],
}

export function getCompanyReportTypes(company) {
  return COMPANY_REPORT_TYPES[company] || []
}

export function companyUsesTechnicalReports(company) {
  return getCompanyReportTypes(company).length > 0
}
