import { useState } from "react"
import { ArrowLeft, LoaderCircle, Save, X, CheckCircle2, Info } from "lucide-react"
import FormSection from "./FormSection"
import InputField from "./InputField"
import SelectField from "./SelectField"
import TextArea from "./TextArea"
import CustomerSelector from "./CustomerSelector"
import QuotationSelector from "./QuotationSelector"
import UltrasonicForm from "./UltrasonicForm"
import VSRForm from "./VSRForm"

const REPORT_TYPE_OPTIONS = [
  { value: "Ultrasonic", label: "Ultrasonic Testing" },
  { value: "VSR", label: "Vibratory Stress Relieving (VSR)" },
  { value: "DPT", label: "DPT (Future)", future: true },
  { value: "MPT", label: "MPT (Future)", future: true },
  { value: "Thickness", label: "Thickness Testing (Future)", future: true },
  { value: "Dynamic Balancing", label: "Dynamic Balancing (Future)", future: true },
]

const FORM_CONFIG = {
  Ultrasonic: {
    component: UltrasonicForm,
    rowsKey: "observations",
    rowsLabel: "observation",
  },
  VSR: {
    component: VSRForm,
    rowsKey: "parameters",
    rowsLabel: "parameter",
  },
}

const REPORT_TYPE_DIVISION = {
  Ultrasonic: "Experts in Ultrasonics",
  VSR: "Precision Tech Engineering",
}

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function toDateInputValueOrEmpty(value) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return toDateInputValue(date)
}

function rowsFromReportData(reportType, reportData) {
  if (reportType === "Ultrasonic") {
    const observations = Array.isArray(reportData?.observations) ? reportData.observations : []
    return observations.map((row, index) => ({
      key: `obs-${row._id || index}`,
      location: row.location || "",
      observation: row.observation || "",
      result: row.result || "",
      remarks: row.remarks || "",
    }))
  }

  const parameters = Array.isArray(reportData?.parameters) ? reportData.parameters : []
  return parameters.map((row, index) => ({
    key: `param-${row._id || index}`,
    parameter: row.parameter || "",
    minimum: row.minimum == null ? "" : row.minimum,
    maximum: row.maximum == null ? "" : row.maximum,
    average: row.average == null ? "" : row.average,
  }))
}

function initialFormData(reportType, reportData) {
  const base = getInitialFormData(reportType)
  if (!reportData) return base

  const rowsKey = FORM_CONFIG[reportType]?.rowsKey
  return {
    ...base,
    ...reportData,
    ...(rowsKey ? { [rowsKey]: rowsFromReportData(reportType, reportData) } : {}),
  }
}

function newObservationRow() {
  return { key: `obs-${Date.now()}`, location: "", observation: "", result: "", remarks: "" }
}

function newParameterRow() {
  return { key: `param-${Date.now()}`, parameter: "", minimum: "", maximum: "", average: "" }
}

function toNumberOrEmpty(value) {
  if (value === "" || value == null) return ""
  const num = Number(value)
  return Number.isNaN(num) ? "" : num
}

function isEmptyRow(row) {
  return Object.values(row).every((value) => value === "" || value == null)
}

function normalizeRows(reportType, rows) {
  if (reportType === "Ultrasonic") {
    return rows.map((row) => ({
      location: String(row.location || "").trim(),
      observation: String(row.observation || "").trim(),
      result: String(row.result || "").trim(),
      remarks: String(row.remarks || "").trim(),
    }))
  }

  return rows.map((row) => ({
    parameter: String(row.parameter || "").trim(),
    minimum: toNumberOrEmpty(row.minimum),
    maximum: toNumberOrEmpty(row.maximum),
    average: toNumberOrEmpty(row.average),
  }))
}

function getInitialFormData(reportType) {
  if (reportType === "Ultrasonic") {
    return {
      jobLocation: "",
      equipmentName: "",
      equipmentUsed: "",
      probeType: "",
      frequency: "",
      couplant: "",
      standardSpecification: "",
      scanningMethod: "",
      observations: [newObservationRow()],
      overallResult: "",
      recommendations: "",
    }
  }

  if (reportType === "VSR") {
    return {
      machineName: "",
      startTime: "",
      endTime: "",
      duration: "",
      operator: "",
      parameters: [newParameterRow()],
    }
  }

  return {}
}

export default function TechnicalReportForm({
  token,
  mode = "create",
  initialValues,
  onSubmit,
  onCancel,
  onBack,
}) {
  const today = new Date()

  const [reportType, setReportType] = useState(() => initialValues?.reportType || "")
  const [selectedCustomer, setSelectedCustomer] = useState(() => initialValues?.customer || null)
  const [selectedQuotation, setSelectedQuotation] = useState(() => initialValues?.quotation || null)
  const [reportDate, setReportDate] = useState(() =>
    initialValues ? toDateInputValueOrEmpty(initialValues.reportDate) : toDateInputValue(today)
  )
  const [formData, setFormData] = useState(() =>
    initialValues
      ? initialFormData(initialValues.reportType, initialValues.reportData)
      : {}
  )
  const [remarks, setRemarks] = useState(() => initialValues?.remarks || "")
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const readOnly = mode === "edit" && ["Approved", "Cancelled"].includes(initialValues?.status)

  const readOnlyMessage =
    initialValues?.status === "Approved"
      ? "This report has been approved and can no longer be edited."
      : "This report has been cancelled and can no longer be edited."

  const config = FORM_CONFIG[reportType]
  const FormComponent = config?.component
  const effectiveDivision =
    selectedQuotation?.division ||
    (mode === "edit" && initialValues?.division) ||
    REPORT_TYPE_DIVISION[reportType] ||
    ""

  const handleReportTypeChange = (e) => {
    const type = e.target.value
    setReportType(type)
    setFormData(getInitialFormData(type))
    setSelectedQuotation(null)
    setErrors((prev) => ({ ...prev, reportType: undefined, reportData: undefined }))
  }

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer)
    setSelectedQuotation(null)
    setErrors((prev) => ({ ...prev, customer: undefined }))
  }

  const handleQuotationSelect = (quotation) => {
    setSelectedQuotation(quotation)
  }

  const handleSubmit = async (status) => {
    if (submitting || readOnly) return

    const nextErrors = {}

    if (!reportType) nextErrors.reportType = "Please select a report type."
    if (!selectedCustomer) nextErrors.customer = "Please select a customer."

    if (reportType && !FORM_CONFIG[reportType]) {
      nextErrors.reportType = "This report type is not available yet."
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const rows = Array.isArray(formData[config.rowsKey]) ? formData[config.rowsKey] : []
    const normalizedRows = normalizeRows(reportType, rows).filter((row) => !isEmptyRow(row))

    if (normalizedRows.length === 0) {
      setErrors((prev) => ({
        ...prev,
        reportData: `Please add at least one ${config.rowsLabel} row.`,
      }))
      return
    }

    const payload = {
      reportType,
      customer: selectedCustomer._id,
      division: effectiveDivision,
      quotation: selectedQuotation?._id,
      reportDate,
      status,
      remarks: remarks.trim(),
      reportData: { ...formData, [config.rowsKey]: normalizedRows },
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    try {
      await onSubmit(payload)
    } catch (err) {
      setServerError(
        err.message ||
          (mode === "edit"
            ? "Failed to update the technical report. Please try again."
            : "Failed to create the technical report. Please try again.")
      )
      setSubmitting(false)
    }
  }

  const buttonBase =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"

  const inputDisabled = submitting || readOnly

  return (
    <form noValidate className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
      {readOnly && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-[12px] px-5 py-4">
          <Info size={18} className="shrink-0 mt-0.5" />
          <span>{readOnlyMessage}</span>
        </div>
      )}

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-5 py-4">
          {serverError}
        </div>
      )}

      <FormSection
        title="1. Report Type"
        description={
          mode === "edit"
            ? "The report type cannot be changed after creation."
            : "Select the type of report to create."
        }
      >
        <SelectField
          id="reportType"
          name="reportType"
          label="Report Type"
          required
          value={reportType}
          onChange={handleReportTypeChange}
          error={errors.reportType}
          disabled={inputDisabled || mode === "edit"}
        >
          <option value="">Select Report Type</option>
          {REPORT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} disabled={option.future}>
              {option.label}
            </option>
          ))}
        </SelectField>

        {effectiveDivision && (
          <div className="sm:col-span-2">
            <div className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-[12px] px-4 py-3">
              <Info size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#0F172A]">
                  Division: <span className="font-semibold">{effectiveDivision}</span>
                </p>
                <p className="mt-0.5 text-xs text-[#94A3B8]">
                  {selectedQuotation
                    ? "Taken from the linked quotation."
                    : mode === "edit"
                      ? "Stored on the report."
                      : "Assigned automatically based on the report type."}
                </p>
              </div>
            </div>
          </div>
        )}
      </FormSection>

      <FormSection
        title="2. Customer Information"
        description="The customer this report is being prepared for."
      >
        <div className="sm:col-span-2">
          <CustomerSelector
            token={token}
            value={selectedCustomer?._id}
            selectedCustomer={selectedCustomer}
            onSelect={handleCustomerSelect}
            error={errors.customer}
            disabled={inputDisabled}
          />
        </div>
      </FormSection>

      <FormSection
        title="3. Related Quotation (Optional)"
        description="Link this report to one of the selected customer's quotations."
      >
        <div className="sm:col-span-2">
          <QuotationSelector
            token={token}
            customerId={selectedCustomer?._id}
            value={selectedQuotation?._id}
            selectedQuotation={selectedQuotation}
            onSelect={handleQuotationSelect}
            disabled={inputDisabled}
          />
        </div>
      </FormSection>

      {config && FormComponent && (
        <FormSection
          title="4. Report Details"
          description="Fill in the inspection details and measured data for this report."
        >
          <div className="sm:col-span-2">
            <InputField
              id="reportDate"
              name="reportDate"
              label="Report Date"
              type="date"
              required
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              disabled={inputDisabled}
            />
          </div>

          <FormComponent values={formData} onChange={setFormData} disabled={inputDisabled} />

          {errors.reportData && (
            <div className="sm:col-span-2 text-sm text-red-600">{errors.reportData}</div>
          )}

          <div className="sm:col-span-2">
            <TextArea
              id="remarks"
              name="remarks"
              label="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Any additional notes about this report (optional)"
              disabled={inputDisabled}
            />
          </div>
        </FormSection>
      )}

      {readOnly ? (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onBack}
            className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
          >
            <ArrowLeft size={16} />
            Back to Report
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
          >
            <X size={16} />
            Cancel
          </button>

          {mode === "create" ? (
            <>
              <button
                type="button"
                onClick={() => handleSubmit("Draft")}
                disabled={submitting}
                className={`${buttonBase} bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90`}
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="text-[#F4B400]" />
                    Save Draft
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("Completed")}
                disabled={submitting}
                className={`${buttonBase} bg-[#F4B400] text-[#081F3F] hover:bg-[#F4B400]/90`}
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Mark Completed
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSubmit(initialValues?.status || "Draft")}
                disabled={submitting}
                className={`${buttonBase} bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90`}
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="text-[#F4B400]" />
                    Save Changes
                  </>
                )}
              </button>
              {initialValues?.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => handleSubmit("Completed")}
                  disabled={submitting}
                  className={`${buttonBase} bg-[#F4B400] text-[#081F3F] hover:bg-[#F4B400]/90`}
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      Mark Completed
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </form>
  )
}
