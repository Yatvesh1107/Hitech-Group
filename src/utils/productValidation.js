export function validateProductForm(values) {
  const errors = {}

  if (!values.serviceName?.trim()) {
    errors.serviceName = "Product/Service name is required"
  }

  if (!values.division?.trim()) {
    errors.division = "Division is required"
  }

  if (values.defaultRate !== "" && values.defaultRate != null) {
    const rate = Number(values.defaultRate)
    if (Number.isNaN(rate) || rate < 0) {
      errors.defaultRate = "Rate must be a non-negative number"
    }
  }

  if (values.gstPercentage !== "" && values.gstPercentage != null) {
    const gst = Number(values.gstPercentage)
    if (Number.isNaN(gst) || gst < 0 || gst > 100) {
      errors.gstPercentage = "GST percentage must be between 0 and 100"
    }
  }

  return errors
}

export function trimProductValues(values) {
  const trimmed = {}

  for (const key of Object.keys(values)) {
    const value = values[key]
    trimmed[key] = typeof value === "string" ? value.trim() : value
  }

  return trimmed
}