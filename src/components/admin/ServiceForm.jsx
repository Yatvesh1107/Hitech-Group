import { useState } from "react"
import { LoaderCircle, Save, X } from "lucide-react"
import { useCompany } from "../../context/companyContext"
import { validateServiceForm, trimServiceValues } from "../../utils/serviceValidation"
import FormSection from "./FormSection"
import InputField from "./InputField"
import TextArea from "./TextArea"
import SelectField from "./SelectField"

const emptyValues = {
  division: "",
  serviceName: "",
  serviceCode: "",
  description: "",
  unit: "",
  defaultRate: "",
  gstPercentage: 18,
  status: true,
}

const UNITS = ["Sq.M", "Nos", "Job", "Kg", "Hour", "Visit", "Lot"]

export default function ServiceForm({ initialValues, onSubmit, onCancel, submitLabel = "Save Service" }) {
  const { activeCompany } = useCompany()
  const [values, setValues] = useState({
    ...emptyValues,
    ...initialValues,
    division: initialValues?.division || activeCompany,
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: name === "serviceCode" ? value.toUpperCase() : type === "number" ? value : value,
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

    const nextErrors = validateServiceForm(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    const payload = {
      ...trimServiceValues(values),
      defaultRate: Number(values.defaultRate),
      gstPercentage: Number(values.gstPercentage),
    }

    try {
      await onSubmit(payload)
    } catch (err) {
      setServerError(err.message || "Failed to create service. Please try again.")
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

      <FormSection title="Service Details" description="Describe the service being offered by the active company.">
        <InputField
          id="serviceCode"
          name="serviceCode"
          label="Service Code"
          required
          value={values.serviceCode}
          onChange={handleChange}
          error={errors.serviceCode}
          placeholder="e.g. INS-001"
          className="sm:col-span-2"
        />
        <InputField
          id="serviceName"
          name="serviceName"
          label="Service Name"
          required
          value={values.serviceName}
          onChange={handleChange}
          error={errors.serviceName}
          placeholder="e.g. Hot Insulation - Piping"
          className="sm:col-span-2"
        />
        <TextArea
          id="description"
          name="description"
          label="Description"
          required
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Describe the scope of this service"
          className="sm:col-span-2"
        />
      </FormSection>

      <FormSection title="Pricing & Status" description="Set the default billing rate and current availability.">
        <SelectField
          id="unit"
          name="unit"
          label="Unit"
          required
          value={values.unit}
          onChange={handleChange}
          error={errors.unit}
        >
          <option value="">Select Unit</option>
          {UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </SelectField>
        <InputField
          id="defaultRate"
          name="defaultRate"
          type="number"
          label="Default Rate"
          required
          min="0"
          step="any"
          value={values.defaultRate}
          onChange={handleChange}
          error={errors.defaultRate}
          placeholder="e.g. 450"
        />
        <InputField
          id="gstPercentage"
          name="gstPercentage"
          type="number"
          label="GST Percentage"
          required
          min="0"
          max="100"
          step="any"
          value={values.gstPercentage}
          onChange={handleChange}
          error={errors.gstPercentage}
          placeholder="e.g. 18"
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
