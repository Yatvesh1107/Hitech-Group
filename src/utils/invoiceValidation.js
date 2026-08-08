export function validateInvoiceForm(values, items) {
  const errors = {}

  if (!values.division) {
    errors.division = "Division is required"
  }

  if (values.invoiceDate && Number.isNaN(new Date(values.invoiceDate).getTime())) {
    errors.invoiceDate = "Please provide a valid invoice date"
  }

  if (values.dueDate && Number.isNaN(new Date(values.dueDate).getTime())) {
    errors.dueDate = "Please provide a valid due date"
  }

  if (values.discount !== "" && values.discount !== null && values.discount !== undefined) {
    const discount = Number(values.discount)
    if (Number.isNaN(discount) || discount < 0) {
      errors.discount = "Discount must be 0 or more"
    }
  }

  if (values.gstPercentage !== "" && values.gstPercentage !== null && values.gstPercentage !== undefined) {
    const gst = Number(values.gstPercentage)
    if (Number.isNaN(gst) || gst < 0 || gst > 100) {
      errors.gstPercentage = "GST percentage must be between 0 and 100"
    }
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.items = "At least one invoice item is required"
  } else {
    const itemErrors = items.map((item) => {
      const rowErrors = {}

      if (!item.description?.trim()) {
        rowErrors.description = "Description is required"
      }

      if (item.quantity === "" || item.quantity === null || item.quantity === undefined) {
        rowErrors.quantity = "Quantity must be greater than 0"
      } else {
        const quantity = Number(item.quantity)
        if (Number.isNaN(quantity) || quantity <= 0) {
          rowErrors.quantity = "Quantity must be greater than 0"
        }
      }

      if (item.rate === "" || item.rate === null || item.rate === undefined) {
        rowErrors.rate = "Rate must be 0 or more"
      } else {
        const rate = Number(item.rate)
        if (Number.isNaN(rate) || rate < 0) {
          rowErrors.rate = "Rate must be 0 or more"
        }
      }

      return rowErrors
    })

    const hasItemErrors = itemErrors.some((row) => Object.keys(row).length > 0)
    if (hasItemErrors) {
      errors.itemErrors = itemErrors
    }
  }

  return errors
}
