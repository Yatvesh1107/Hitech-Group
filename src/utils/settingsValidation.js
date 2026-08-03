const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_REGEX = /^[a-z][a-z0-9+.-]*:\/\/[^\s]+$/i
const PINCODE_REGEX = /^\d{5,6}$/
const GST_REGEX = /^[0-9A-Z]{15}$/
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/
const UPI_REGEX = /^[\w.-]+@[\w]+$/

export function validateCompanySettings(values) {
  const errors = {}

  if (!values.company?.name?.trim()) {
    errors.companyName = "Company Name is required"
  }

  if (!values.contact?.phone?.trim()) {
    errors.phone = "Phone is required"
  }

  if (!values.contact?.email?.trim()) {
    errors.email = "Email is required"
  } else if (!EMAIL_REGEX.test(values.contact.email.trim())) {
    errors.email = "Please enter a valid email address"
  }

  if (!values.tax?.gstNumber?.trim()) {
    errors.gstNumber = "GST is required"
  } else if (!GST_REGEX.test(values.tax.gstNumber.trim().toUpperCase())) {
    errors.gstNumber = "GST Number must be 15 alphanumeric characters"
  }

  const website = values.contact?.website?.trim()
  if (website && !URL_REGEX.test(website)) {
    errors.website = "Please enter a valid URL"
  }

  const pincode = values.address?.pincode?.trim()
  if (pincode && !PINCODE_REGEX.test(pincode)) {
    errors.pincode = "Pincode must be 5 or 6 digits"
  }

  const pan = values.tax?.panNumber?.trim()
  if (pan && !PAN_REGEX.test(pan.toUpperCase())) {
    errors.panNumber = "PAN must follow the format AAAAA9999A"
  }

  const ifsc = values.bank?.ifscCode?.trim()
  if (ifsc && !IFSC_REGEX.test(ifsc.toUpperCase())) {
    errors.ifscCode = "IFSC must follow the format AAAA0AAAAAA"
  }

  const upiId = values.bank?.upiId?.trim()
  if (upiId && !UPI_REGEX.test(upiId)) {
    errors.upiId = "UPI ID must follow the format name@bank"
  }

  return errors
}

export function trimCompanySettings(values) {
  const trim = (value) => (typeof value === "string" ? value.trim() : value)

  return {
    company: {
      name: trim(values.company?.name),
      tagline: trim(values.company?.tagline),
      description: trim(values.company?.description),
    },
    branding: {
      logo: trim(values.branding?.logo),
      seal: trim(values.branding?.seal),
      signature: trim(values.branding?.signature),
    },
    contact: {
      phone: trim(values.contact?.phone),
      alternatePhone: trim(values.contact?.alternatePhone),
      email: trim(values.contact?.email),
      website: trim(values.contact?.website),
    },
    address: {
      addressLine1: trim(values.address?.addressLine1),
      addressLine2: trim(values.address?.addressLine2),
      city: trim(values.address?.city),
      state: trim(values.address?.state),
      country: trim(values.address?.country),
      pincode: trim(values.address?.pincode),
    },
    tax: {
      gstNumber: trim(values.tax?.gstNumber)?.toUpperCase(),
      panNumber: trim(values.tax?.panNumber)?.toUpperCase(),
    },
    bank: {
      bankName: trim(values.bank?.bankName),
      accountName: trim(values.bank?.accountName),
      accountNumber: trim(values.bank?.accountNumber),
      ifscCode: trim(values.bank?.ifscCode)?.toUpperCase(),
      branch: trim(values.bank?.branch),
      upiId: trim(values.bank?.upiId),
    },
    documentDefaults: {
      quotationPrefix: trim(values.documentDefaults?.quotationPrefix),
      invoicePrefix: trim(values.documentDefaults?.invoicePrefix),
      technicalReportPrefix: trim(values.documentDefaults?.technicalReportPrefix),
      defaultCurrency: trim(values.documentDefaults?.defaultCurrency),
      defaultGst: Number(values.documentDefaults?.defaultGst) || 0,
      financialYearFormat: trim(values.documentDefaults?.financialYearFormat),
    },
    defaultTerms: {
      quotation: trim(values.defaultTerms?.quotation),
      invoice: trim(values.defaultTerms?.invoice),
      technicalReport: trim(values.defaultTerms?.technicalReport),
    },
  }
}
