import { useState } from "react"
import { LoaderCircle, Save, X } from "lucide-react"
import { validateCustomerForm, trimCustomerValues } from "../../utils/customerValidation"
import FormSection from "./FormSection"
import InputField from "./InputField"
import TextArea from "./TextArea"

const emptyValues = {
  companyName: "",
  contactPerson: "",
  mobile: "",
  email: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
  isActive: true,
}

export default function CustomerForm({ initialValues, onSubmit, onCancel, submitLabel = "Save Customer" }) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "gstNumber" ? value.toUpperCase() : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleStatusChange = (e) => {
    setValues((prev) => ({ ...prev, isActive: e.target.value === "true" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const nextErrors = validateCustomerForm(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    try {
      await onSubmit(trimCustomerValues(values))
    } catch (err) {
      setServerError(err.message || "Failed to create customer. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-5 py-4">
          {serverError}
        </div>
      )}

      <FormSection title="Company Information" description="Basic details about the company.">
        <InputField
          id="companyName"
          name="companyName"
          label="Company Name"
          required
          value={values.companyName}
          onChange={handleChange}
          error={errors.companyName}
          placeholder="e.g. Renuka Sugars Ltd"
        />
        <InputField
          id="contactPerson"
          name="contactPerson"
          label="Contact Person"
          required
          value={values.contactPerson}
          onChange={handleChange}
          error={errors.contactPerson}
          placeholder="Full name of the contact"
        />
        <InputField
          id="mobile"
          name="mobile"
          label="Mobile Number"
          required
          value={values.mobile}
          onChange={handleChange}
          error={errors.mobile}
          placeholder="e.g. 9876543210"
          inputMode="tel"
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="name@company.com"
          autoComplete="email"
        />
        <InputField
          id="gstNumber"
          name="gstNumber"
          label="GST Number"
          value={values.gstNumber}
          onChange={handleChange}
          placeholder="e.g. 27AAACA1234F1Z5"
          className="sm:col-span-2"
        />
      </FormSection>

      <FormSection title="Address" description="Registered or billing address.">
        <TextArea
          id="address"
          name="address"
          label="Address"
          value={values.address}
          onChange={handleChange}
          placeholder="Street, area, landmark"
          className="sm:col-span-2"
        />
        <InputField
          id="city"
          name="city"
          label="City"
          value={values.city}
          onChange={handleChange}
          placeholder="e.g. Pune"
        />
        <InputField
          id="state"
          name="state"
          label="State"
          value={values.state}
          onChange={handleChange}
          placeholder="e.g. Maharashtra"
        />
        <InputField
          id="pincode"
          name="pincode"
          label="Pincode"
          value={values.pincode}
          onChange={handleChange}
          placeholder="e.g. 411057"
          inputMode="numeric"
        />
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            Status
          </label>
          <select
            id="status"
            name="isActive"
            value={String(values.isActive)}
            onChange={handleStatusChange}
            className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 text-sm text-[#0F172A] bg-[#F8FAFC] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </FormSection>

      <FormSection title="Additional Notes" description="Anything else worth remembering about this customer.">
        <TextArea
          id="notes"
          name="notes"
          label="Notes"
          value={values.notes}
          onChange={handleChange}
          placeholder="Preferences, requirements, remarks"
          className="sm:col-span-2"
        />
      </FormSection>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="text-[#F4B400]" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
