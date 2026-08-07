export const SERVICE_CODE_REGEX = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/

export function validateServiceForm(values) {
  const errors = {}

  if (!values.division) {
    errors.division = "Division is required"
  }

  if (!values.serviceName?.trim()) {
    errors.serviceName = "Service name is required"
  }

  if (!values.description?.trim()) {
    errors.description = "Description is required"
  }

  if (values.gstPercentage === "" || values.gstPercentage === null || values.gstPercentage === undefined) {
    errors.gstPercentage = "GST percentage is required"
  } else {
    const gst = Number(values.gstPercentage)
    if (Number.isNaN(gst) || gst < 0 || gst > 100) {
      errors.gstPercentage = "GST percentage must be between 0 and 100"
    }
  }

  return errors
}

export function trimServiceValues(values) {
  const trimmed = {}

  for (const key of Object.keys(values)) {
    const value = values[key]
    trimmed[key] = typeof value === "string" ? value.trim() : value
  }

  return trimmed
}
