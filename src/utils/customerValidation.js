export const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export function validateCustomerForm(values) {
  const errors = {}

  if (!values.companyName?.trim()) {
    errors.companyName = "Company name is required"
  }

  if (!values.contactPerson?.trim()) {
    errors.contactPerson = "Contact person is required"
  }

  if (!values.mobile?.trim()) {
    errors.mobile = "Mobile number is required"
  }

  if (values.email?.trim() && !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Please provide a valid email address"
  }

  return errors
}

export function trimCustomerValues(values) {
  const trimmed = {}

  for (const key of Object.keys(values)) {
    const value = values[key]
    trimmed[key] = typeof value === "string" ? value.trim() : value
  }

  return trimmed
}
