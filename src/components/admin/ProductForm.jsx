import { useState } from "react"
import { LoaderCircle, Save, X } from "lucide-react"
import { validateProductForm, trimProductValues } from "../../utils/productValidation"
import { PRODUCT_DIVISIONS } from "../../constants/productDivisions"
import FormSection from "./FormSection"
import InputField from "./InputField"
import TextArea from "./TextArea"
import SelectField from "./SelectField"

const emptyValues = {
  serviceName: "",
  division: "",
  description: "",
  unit: "",
  defaultRate: "",
  gstPercentage: "18",
  status: true,
}

export default function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save Product/Service",
}) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleStatusChange = (e) => {
    setValues((prev) => ({ ...prev, status: e.target.value === "true" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const nextErrors = validateProductForm(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    try {
      await onSubmit(trimProductValues(values))
    } catch (err) {
      setServerError(err.message || "Failed to save product/service. Please try again.")
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

      <FormSection
        title="Product / Service Details"
        description="Save this once and then pick it from a dropdown in quotations and invoices to autofill the description, unit and rate."
      >
        <InputField
          id="serviceName"
          name="serviceName"
          label="Product / Service Name"
          required
          value={values.serviceName}
          onChange={handleChange}
          error={errors.serviceName}
          placeholder="e.g. LPG Cladding Works"
        />
        <SelectField
          id="division"
          name="division"
          label="Division"
          required
          value={values.division}
          onChange={handleChange}
          error={errors.division}
        >
          <option value="">Select division…</option>
          {PRODUCT_DIVISIONS.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </SelectField>
        <TextArea
          id="description"
          name="description"
          label="Description"
          value={values.description}
          onChange={handleChange}
          placeholder="Optional details shown when this item is added to a quotation or invoice"
          className="sm:col-span-2"
        />
        <InputField
          id="unit"
          name="unit"
          label="Unit"
          value={values.unit}
          onChange={handleChange}
          placeholder="e.g. Sq.M, Nos, KG"
        />
        <InputField
          id="defaultRate"
          name="defaultRate"
          type="number"
          min="0"
          step="any"
          label="Default Rate (₹)"
          value={values.defaultRate}
          onChange={handleChange}
          error={errors.defaultRate}
          placeholder="0.00"
        />
        <InputField
          id="gstPercentage"
          name="gstPercentage"
          type="number"
          min="0"
          max="100"
          step="any"
          label="GST Percentage"
          value={values.gstPercentage}
          onChange={handleChange}
          error={errors.gstPercentage}
          placeholder="18"
        />
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={String(values.status)}
            onChange={handleStatusChange}
            className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 text-sm text-[#0F172A] bg-[#F8FAFC] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
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