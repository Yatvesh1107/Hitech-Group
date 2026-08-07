import { useState, useEffect } from "react"
import { LoaderCircle, Save, X, Info } from "lucide-react"
import { useAuth } from "../../context/authContext"
import { useCompany } from "../../context/companyContext"
import { getCompanySettings } from "../../services/settings"
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
  gstPercentage: 18,
  status: true,
}

const GST_OPTIONS = [5, 12, 18, 28]

export default function ServiceForm({ initialValues, onSubmit, onCancel, submitLabel = "Save Service" }) {
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const [values, setValues] = useState({
    ...emptyValues,
    ...initialValues,
    division: initialValues?.division || activeCompany,
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialValues?.gstPercentage != null) return

    let cancelled = false

    async function loadDefaultGst() {
      try {
        const settings = await getCompanySettings({ token, division: activeCompany })
        const defaultGst = Number(settings?.documentDefaults?.defaultGst)
        if (!cancelled && defaultGst > 0) {
          setValues((prev) => ({ ...prev, gstPercentage: defaultGst }))
        }
      } catch {
        // keep the default 18 when company settings cannot be loaded
      }
    }

    loadDefaultGst()

    return () => {
      cancelled = true
    }
  }, [token, activeCompany, initialValues?.gstPercentage])

  const handleChange = (e) => {
    const { name, type } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? e.target.value : e.target.value,
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
      gstPercentage: Number(values.gstPercentage),
    }

    delete payload.defaultRate
    delete payload.unit

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
        <div className="sm:col-span-2 flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-[12px] px-4 py-3">
          <Info size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
          <p className="text-sm text-[#0F172A]">
            A service code is generated automatically from the service name after saving.
          </p>
        </div>
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

      <FormSection title="Pricing & Status" description="GST is applied from the active company's default rate.">
        <SelectField
          id="gstPercentage"
          name="gstPercentage"
          label="GST Percentage"
          required
          value={values.gstPercentage}
          onChange={handleChange}
          error={errors.gstPercentage}
        >
          <option value="">Select GST</option>
          {GST_OPTIONS.map((gst) => (
            <option key={gst} value={gst}>
              {gst}%
            </option>
          ))}
        </SelectField>
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
