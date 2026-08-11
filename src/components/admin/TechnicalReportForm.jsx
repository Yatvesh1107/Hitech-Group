import { useState } from "react"
import { ArrowLeft, LoaderCircle, Save, X, CheckCircle2, Info } from "lucide-react"
import { useCompany } from "../../context/companyContext"
import { getCompanyReportTypes } from "../../constants/companies"
import FormSection from "./FormSection"
import InputField from "./InputField"
import SelectField from "./SelectField"
import TextArea from "./TextArea"
import CustomerSelector from "./CustomerSelector"
import QuotationSelector from "./QuotationSelector"
import UltrasonicDpThicknessForm from "./UltrasonicDpThicknessForm"
import VSRForm from "./VSRForm"

const ACTIVE_REPORT_TYPE = "Ultrasonic / D.P. / Thickness Test"

const REPORT_TYPE_OPTIONS = [
  {
    value: ACTIVE_REPORT_TYPE,
    label: "Ultrasonic / D.P. / Thickness Test",
  },
  {
    value: "VSR",
    label: "Vibratory Stress Relieving",
  },
]

const REPORT_TYPE_DIVISION = {
  [ACTIVE_REPORT_TYPE]: "Altron Testing & Allieds",
  VSR: "Precision Tech Engineering",
}

const FORM_CONFIG = {
  VSR: {
    component: VSRForm,
  },
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

function newPartRow() {
  return { key: `part-${Date.now()}`, partName: "", materialSpecification: "", drawingNumber: "" }
}

function normalizeParts(rows) {
  return (Array.isArray(rows) ? rows : [])
    .filter(
      (row) =>
        String(row.partName || "").trim() ||
        String(row.materialSpecification || "").trim() ||
        String(row.drawingNumber || "").trim()
    )
    .map((row) => ({
      partName: String(row.partName || "").trim(),
      materialSpecification: String(row.materialSpecification || "").trim(),
      drawingNumber: String(row.drawingNumber || "").trim(),
    }))
}

function normalizeSections(sections) {
  return (Array.isArray(sections) ? sections : [])
    .filter(
      (section) =>
        String(section.title || "").trim() ||
        (Array.isArray(section.rows) &&
          section.rows.some(
            (row) => String(row.description || "").trim() || String(row.remark || "").trim()
          ))
    )
    .map((section) => ({
      title: String(section.title || "").trim(),
      rows: (Array.isArray(section.rows) ? section.rows : [])
        .filter(
          (row) => String(row.description || "").trim() || String(row.remark || "").trim()
        )
        .map((row) => ({
          description: String(row.description || "").trim(),
          remark: String(row.remark || "").trim(),
        })),
    }))
}

function initialUltrasonicData(reportData) {
  const data = reportData || {}

  return {
    kindAttention: data.kindAttention || "",
    parts:
      Array.isArray(data.parts) && data.parts.length > 0
        ? data.parts.map((row, index) => ({
            key: `part-${index}`,
            partName: row.partName || "",
            materialSpecification: row.materialSpecification || "",
            drawingNumber: row.drawingNumber || "",
          }))
        : [newPartRow()],
    equipmentUsed: data.equipmentUsed || "",
    placeAndDateOfTesting: data.placeAndDateOfTesting || "",
    probeFrequency: data.probeFrequency || "",
    mediumOfCouplant: data.mediumOfCouplant || "",
    standardSpecification: data.standardSpecification || "",
    procedureAndTechnique: data.procedureAndTechnique || "",
    scanningMethod: data.scanningMethod || "",
    standardNotes: data.standardNotes || "",
    engineerName: data.engineerName || "",
    sections:
      Array.isArray(data.sections) && data.sections.length > 0
        ? data.sections.map((section, sectionIndex) => ({
            key: `section-${sectionIndex}`,
            title: section.title || "",
            rows: Array.isArray(section.rows)
              ? section.rows.map((row, rowIndex) => ({
                  key: `row-${sectionIndex}-${rowIndex}`,
                  description: row.description || "",
                  remark: row.remark || "",
                }))
              : [],
          }))
        : [],
    finalNotes: data.finalNotes || "",
    preparedBy: data.preparedBy || "",
    authorizedBy: data.authorizedBy || "",
  }
}

function initialVsrData(reportData) {
  const data = reportData || {}

  // Legacy VSR records store machine/operator/parameter data without shafts.
  // Migrate them into the new structured shape best-effort so a legacy draft
  // can be opened, reviewed and saved in the new format.
  if (!Array.isArray(data.shafts)) {
    const processParameters = {
      ...(data.processParameters || {}),
      vibratoryMachineId: data.processParameters?.vibratoryMachineId || data.machineName || "",
    }

    const hasLegacyContent =
      data.machineName ||
      data.operator ||
      data.startTime ||
      data.endTime ||
      data.duration ||
      (Array.isArray(data.parameters) && data.parameters.length > 0)

    const shafts = []

    if (hasLegacyContent) {
      const shaft = {
        key: "shaft-legacy-0",
        shaftName: data.machineName || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        duration: data.duration ?? "",
        frequencyMin: "",
        frequencyMax: "",
        frequencyAvg: "",
        amplitudeMin: "",
        amplitudeMax: "",
        amplitudeAvg: "",
        beforeAfterGraph: "",
        frequencyReadings: [],
      }

      for (const row of Array.isArray(data.parameters) ? data.parameters : []) {
        const name = String(row?.parameter || "").toLowerCase()
        if (name.includes("freq")) {
          shaft.frequencyMin = row.minimum ?? shaft.frequencyMin
          shaft.frequencyMax = row.maximum ?? shaft.frequencyMax
          shaft.frequencyAvg = row.average ?? shaft.frequencyAvg
        } else if (name.includes("amp")) {
          shaft.amplitudeMin = row.minimum ?? shaft.amplitudeMin
          shaft.amplitudeMax = row.maximum ?? shaft.amplitudeMax
          shaft.amplitudeAvg = row.average ?? shaft.amplitudeAvg
        }
      }

      shafts.push(shaft)
    }

    return {
      customerJobDetails: { ...(data.customerJobDetails || {}) },
      preInspection: { ...(data.preInspection || {}) },
      processParameters,
      monitoringControl: { ...(data.monitoringControl || {}) },
      postInspection: { ...(data.postInspection || {}) },
      operatorRemarks: data.operatorRemarks || data.operator || "",
      conclusion: { ...(data.conclusion || {}) },
      signOff: { ...(data.signOff || {}) },
      shafts,
    }
  }

  return {
    ...data,
    customerJobDetails: { ...(data.customerJobDetails || {}) },
    preInspection: { ...(data.preInspection || {}) },
    processParameters: { ...(data.processParameters || {}) },
    monitoringControl: { ...(data.monitoringControl || {}) },
    postInspection: { ...(data.postInspection || {}) },
    conclusion: { ...(data.conclusion || {}) },
    signOff: { ...(data.signOff || {}) },
    shafts: data.shafts.map((shaft, index) => ({
      ...shaft,
      key: shaft.key || `shaft-${index}`,
      frequencyReadings: (Array.isArray(shaft.frequencyReadings) ? shaft.frequencyReadings : []).map(
        (reading, readingIndex) => ({
          ...reading,
          key: reading.key || `reading-${index}-${readingIndex}`,
        })
      ),
    })),
  }
}

function initialFormData(reportType, reportData) {
  if (reportType === ACTIVE_REPORT_TYPE) {
    return initialUltrasonicData(reportData)
  }

  if (reportType === "VSR") {
    return initialVsrData(reportData)
  }

  return {}
}

function computeVsrDuration(startTime, endTime) {
  if (!startTime || !endTime) return ""
  const start = new Date(startTime)
  const end = new Date(endTime)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return ""

  const diffMs = Math.max(0, end.getTime() - start.getTime())
  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")
}

function vsrTrimValue(value) {
  return String(value ?? "").trim()
}

function buildVsrReportData(formData) {
  const groupFieldKeys = {
    customerJobDetails: [
      "customerName",
      "purchaseOrderNo",
      "componentDescription",
      "materialSpecification",
      "quantity",
      "weightPerUnit",
      "overallDimensions",
    ],
    preInspection: ["visualInspection", "surfaceCondition"],
    processParameters: [
      "vibratoryMachineId",
      "fixtureType",
      "frequencyRange",
      "amplitudeRange",
      "duration",
      "modeOfExcitation",
      "sensor",
    ],
    monitoringControl: [
      "dynamicResponseMonitoring",
      "resonanceAchieved",
      "frequencyShiftObserved",
      "graphRecorded",
    ],
    postInspection: ["visualInspection", "methodUsed", "dimensionalCheck", "finalComments"],
    conclusion: ["conclusion", "result"],
    signOff: ["name", "designation", "signature"],
  }

  const buildGroup = (group, source = formData) => {
    const raw = source[group] || {}
    const result = {}
    for (const key of groupFieldKeys[group]) {
      result[key] = vsrTrimValue(raw[key])
    }
    return result
  }

  const shafts = (Array.isArray(formData.shafts) ? formData.shafts : [])
    .map((shaft) => {
      const frequencyReadings = (Array.isArray(shaft.frequencyReadings) ? shaft.frequencyReadings : [])
        .map((reading) => ({
          time: vsrTrimValue(reading?.time),
          frequency: reading?.frequency === "" || reading?.frequency == null ? "" : Number(reading.frequency),
        }))
        .filter((reading) => reading.time || reading.frequency !== "")

      const startTime = vsrTrimValue(shaft.startTime)
      const endTime = vsrTrimValue(shaft.endTime)

      return {
        shaftName: vsrTrimValue(shaft.shaftName),
        startTime,
        endTime,
        duration: computeVsrDuration(startTime, endTime) || vsrTrimValue(shaft.duration),
        frequencyMin: vsrTrimValue(shaft.frequencyMin),
        frequencyMax: vsrTrimValue(shaft.frequencyMax),
        frequencyAvg: vsrTrimValue(shaft.frequencyAvg),
        amplitudeMin: vsrTrimValue(shaft.amplitudeMin),
        amplitudeMax: vsrTrimValue(shaft.amplitudeMax),
        amplitudeAvg: vsrTrimValue(shaft.amplitudeAvg),
        beforeAfterGraph: vsrTrimValue(shaft.beforeAfterGraph),
        frequencyReadings,
      }
    })
    .filter((shaft) => {
      return (
        shaft.shaftName ||
        shaft.startTime ||
        shaft.endTime ||
        shaft.amplitudeMin ||
        shaft.amplitudeMax ||
        shaft.amplitudeAvg ||
        shaft.beforeAfterGraph ||
        shaft.frequencyReadings.length > 0
      )
    })

  return {
    customerJobDetails: buildGroup("customerJobDetails"),
    preInspection: buildGroup("preInspection"),
    processParameters: buildGroup("processParameters"),
    monitoringControl: buildGroup("monitoringControl"),
    postInspection: buildGroup("postInspection"),
    operatorRemarks: vsrTrimValue(formData.operatorRemarks),
    conclusion: buildGroup("conclusion"),
    signOff: buildGroup("signOff"),
    shafts,
  }
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
  const { activeCompany } = useCompany()

  const companyReportTypes = getCompanyReportTypes(activeCompany)

  const [reportType, setReportType] = useState(() => {
    if (initialValues?.reportType) return initialValues.reportType
    if (companyReportTypes.length === 1) return companyReportTypes[0]
    return ""
  })
  const [selectedCustomer, setSelectedCustomer] = useState(() => initialValues?.customer || null)
  const [selectedQuotation, setSelectedQuotation] = useState(() => initialValues?.quotation || null)
  const [reportDate, setReportDate] = useState(() =>
    initialValues ? toDateInputValueOrEmpty(initialValues.reportDate) : toDateInputValue(today)
  )
  const [formData, setFormData] = useState(() =>
    initialValues ? initialFormData(initialValues.reportType, initialValues.reportData) : {}
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

  const isActiveType = reportType === ACTIVE_REPORT_TYPE
  const config = FORM_CONFIG[reportType]
  const FormComponent = config?.component

  const availableReportTypes = companyReportTypes.length > 0 ? companyReportTypes : null

  const effectiveDivision =
    selectedQuotation?.division ||
    (mode === "edit" && initialValues?.division) ||
    REPORT_TYPE_DIVISION[reportType] ||
    ""

  const reportTypeOptions = REPORT_TYPE_OPTIONS.filter((option) => {
    if (mode === "edit" && initialValues?.reportType === option.value) return true
    if (availableReportTypes && !availableReportTypes.includes(option.value)) return false
    return true
  })

  const handleReportTypeChange = (e) => {
    const type = e.target.value
    setReportType(type)
    setFormData(initialFormData(type, {}))
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

  const updateFormField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, parts: undefined, sections: undefined }))
  }

  const buildPayload = (status) => {
    if (isActiveType) {
      const data = {
        kindAttention: String(formData.kindAttention || "").trim(),
        parts: normalizeParts(formData.parts),
        equipmentUsed: String(formData.equipmentUsed || "").trim(),
        placeAndDateOfTesting: String(formData.placeAndDateOfTesting || "").trim(),
        probeFrequency: String(formData.probeFrequency || "").trim(),
        mediumOfCouplant: String(formData.mediumOfCouplant || "").trim(),
        standardSpecification: String(formData.standardSpecification || "").trim(),
        procedureAndTechnique: String(formData.procedureAndTechnique || "").trim(),
        scanningMethod: String(formData.scanningMethod || "").trim(),
        standardNotes: String(formData.standardNotes || "").trim(),
        engineerName: String(formData.engineerName || "").trim(),
        sections: normalizeSections(formData.sections),
        finalNotes: String(formData.finalNotes || "").trim(),
        preparedBy: String(formData.preparedBy || "").trim(),
        authorizedBy: String(formData.authorizedBy || "").trim(),
      }

      return {
        reportType,
        customer: selectedCustomer._id,
        division: effectiveDivision,
        quotation: selectedQuotation?._id,
        reportDate,
        status,
        remarks: initialValues?.remarks || "",
        reportData: data,
      }
    }

    if (reportType === "VSR") {
      return {
        reportType,
        customer: selectedCustomer._id,
        division: effectiveDivision,
        quotation: selectedQuotation?._id,
        reportDate,
        status,
        remarks: remarks.trim(),
        reportData: buildVsrReportData(formData),
      }
    }

    return {
      reportType,
      customer: selectedCustomer._id,
      division: effectiveDivision,
      quotation: selectedQuotation?._id,
      reportDate,
      status,
      remarks: remarks.trim(),
      reportData: formData,
    }
  }

  const handleSubmit = async (status) => {
    if (submitting || readOnly) return

    const nextErrors = {}

    if (!reportType) nextErrors.reportType = "Please select a report type."
    if (!selectedCustomer) nextErrors.customer = "Please select a customer."
    if (reportType && reportType !== ACTIVE_REPORT_TYPE && !FORM_CONFIG[reportType]) {
      nextErrors.reportType = "This report type is not available yet."
    }

    if (isActiveType) {
      if (normalizeParts(formData.parts).length === 0) {
        nextErrors.parts = "Please add at least one part."
      }
      if (normalizeSections(formData.sections).length === 0) {
        nextErrors.sections = "Please add at least one inspection section."
      }
    } else if (reportType === "VSR") {
      const shafts = Array.isArray(formData.shafts) ? formData.shafts : []
      const nonEmptyShafts = shafts.filter((shaft) => {
        return (
          String(shaft.shaftName || "").trim() ||
          String(shaft.startTime || "").trim() ||
          String(shaft.endTime || "").trim() ||
          String(shaft.amplitudeMin || "").trim() ||
          String(shaft.amplitudeMax || "").trim() ||
          String(shaft.amplitudeAvg || "").trim() ||
          String(shaft.beforeAfterGraph || "").trim() ||
          (Array.isArray(shaft.frequencyReadings) &&
            shaft.frequencyReadings.some(
              (reading) => String(reading.time || "").trim() || reading.frequency !== ""
            ))
        )
      })

      if (nonEmptyShafts.length === 0) {
        nextErrors.reportData = "Please add at least one shaft."
      } else if (nonEmptyShafts.some((shaft) => !String(shaft.shaftName || "").trim())) {
        nextErrors.reportData = "Every shaft requires a shaft name."
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    try {
      await onSubmit(buildPayload(status))
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
          {reportTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
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
        title="2. Report Information"
        description="Report number, date and the customer this report is being prepared for."
      >
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            Report Number
          </label>
          <input
            type="text"
            value={initialValues?.reportNumber || "Auto-generated on save"}
            readOnly
            disabled
            tabIndex={-1}
            className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-gray-50 text-sm text-[#94A3B8] cursor-not-allowed"
          />
        </div>
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
        {isActiveType && (
          <div className="sm:col-span-2">
            <InputField
              id="kindAttention"
              name="kindAttention"
              label="Kind Attention"
              value={formData.kindAttention || ""}
              onChange={updateFormField("kindAttention")}
              placeholder="Person or department the report is addressed to"
              disabled={inputDisabled}
            />
          </div>
        )}
      </FormSection>

      <FormSection
        title="3. Related Quotation (Optional)"
        description="Link this report to one of the selected customer's quotations."
      >
        <div className="sm:col-span-2">
          <QuotationSelector
            token={token}
            division={effectiveDivision}
            customerId={selectedCustomer?._id}
            value={selectedQuotation?._id}
            selectedQuotation={selectedQuotation}
            onSelect={handleQuotationSelect}
            disabled={inputDisabled}
          />
        </div>
      </FormSection>

      {isActiveType ? (
        <UltrasonicDpThicknessForm
          values={formData}
          onChange={setFormData}
          disabled={inputDisabled}
          errors={errors}
        />
      ) : (
        config &&
        FormComponent && (
          <>
            <FormComponent
              values={formData}
              onChange={setFormData}
              disabled={inputDisabled}
              token={token}
            />

            {errors.reportData && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-5 py-4">
                {errors.reportData}
              </div>
            )}

            <FormSection title="Report Remarks" description="Any additional notes for this report.">
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
          </>
        )
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
