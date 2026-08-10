import { useState } from "react"
import { Plus, Trash2, LoaderCircle, Save, X } from "lucide-react"
import { PRODUCT_DIVISIONS } from "../../constants/productDivisions"
import { useCompany } from "../../context/companyContext"
import { createService } from "../../services/services"
import FormSection from "./FormSection"
import InputField from "./InputField"
import SelectField from "./SelectField"

const inputClass =
  "w-full h-11 px-3 rounded-[10px] border text-sm text-[#0F172A] bg-[#F8FAFC] outline-none transition-all focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 placeholder:text-[#A0AEC0]"

function newRow() {
  return { key: `product-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: "", unit: "", rate: "" }
}

function isBlankRow(row) {
  return !row.name?.trim() && !row.unit?.trim() && (row.rate === "" || row.rate == null)
}

function validateRow(row) {
  const errors = {}

  if (isBlankRow(row)) return null

  if (!row.name?.trim()) {
    errors.name = "Name is required"
  }

  if (row.rate !== "" && row.rate != null) {
    const rate = Number(row.rate)
    if (Number.isNaN(rate) || rate < 0) {
      errors.rate = "Must be a non-negative number"
    }
  }

  return errors
}

export default function QuickAddProducts({ token, onSubmitted, onCancel, submitLabel = "Save All Products" }) {
  const { activeCompany } = useCompany()
  const [division, setDivision] = useState(activeCompany || PRODUCT_DIVISIONS[0])
  const [defaultUnit, setDefaultUnit] = useState("")
  const [gst, setGst] = useState("18")
  const [rows, setRows] = useState([newRow()])
  const [rowErrors, setRowErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const updateRow = (index, field, value) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
    if (rowErrors[rows[index]?.key]) {
      setRowErrors((prev) => ({ ...prev, [rows[index].key]: undefined }))
    }
  }

  const addRow = () => {
    setRows((prev) => [...prev, newRow()])
  }

  const removeRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (submitting) return

    const nextErrors = {}
    const validRows = []

    for (const row of rows) {
      const rowError = validateRow(row)
      if (rowError && Object.keys(rowError).length > 0) {
        nextErrors[row.key] = rowError
      } else if (!isBlankRow(row)) {
        validRows.push(row)
      }
    }

    let divisionError = ""
    if (!division) {
      divisionError = "Division is required"
    }
    const gstNumber = gst === "" || gst == null ? 0 : Number(gst)
    if (Number.isNaN(gstNumber) || gstNumber < 0 || gstNumber > 100) {
      setServerError("GST percentage must be between 0 and 100.")
      return
    }

    if (divisionError) {
      setServerError(divisionError)
      return
    }

    if (Object.keys(nextErrors).length > 0) {
      setRowErrors(nextErrors)
      return
    }

    if (validRows.length === 0) {
      setServerError("Add at least one product/service to save.")
      return
    }

    setRowErrors({})
    setServerError("")
    setSubmitting(true)

    const created = []
    const failed = []

    for (const row of validRows) {
      const payload = {
        serviceName: row.name.trim(),
        division,
        unit: (row.unit?.trim() || defaultUnit?.trim() || "").trim(),
        defaultRate: row.rate === "" || row.rate == null ? 0 : Number(row.rate),
        gstPercentage: gstNumber,
        description: "",
        status: true,
      }

      try {
        await createService({ token, payload })
        created.push(row.name.trim())
      } catch (err) {
        failed.push({
          name: row.name.trim(),
          message: err.message || "Could not be added",
        })
      }
    }

    setSubmitting(false)

    if (failed.length > 0) {
      if (onSubmitted) {
        onSubmitted({
          created,
          failed,
          partial: created.length > 0 && failed.length > 0,
        })
      }
      return
    }

    if (onSubmitted) {
      onSubmitted({ created, failed, partial: false })
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-5 py-4">
          {serverError}
        </div>
      )}

      <FormSection
        title="Defaults for All Products"
        description="Set these once — they apply to every product you add below."
      >
        <SelectField
          id="division"
          label="Division"
          required
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option value="">Select division…</option>
          {PRODUCT_DIVISIONS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </SelectField>
        <InputField
          id="defaultUnit"
          label="Default Unit"
          value={defaultUnit}
          onChange={(e) => setDefaultUnit(e.target.value)}
          placeholder="e.g. Sq.M (optional)"
        />
        <InputField
          id="gst"
          label="GST Percentage"
          type="number"
          min="0"
          max="100"
          step="any"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          placeholder="18"
        />
      </FormSection>

      <FormSection
        title="Add Products"
        description="Type the name and rate for each product/service. You can leave blank rows — they are ignored."
      >
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3 border border-b-0 border-gray-100 rounded-t-[14px] px-4 py-3 bg-[#F8FAFC]">
            <div className="flex-1 text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">
              Product / Service Name
            </div>
            <div className="w-36 text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">
              Rate (₹)
            </div>
            <div className="w-28 text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">
              Unit (optional)
            </div>
            <div className="w-10" />
          </div>

          <div className="border border-gray-100 rounded-b-[14px] divide-y divide-gray-100">
            {rows.map((row, index) => {
              const rowError = rowErrors[row.key] || {}
              return (
                <div key={row.key} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateRow(index, "name", e.target.value)}
                      placeholder="e.g. LPG Cladding Works"
                      className={`${inputClass} ${rowError.name ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200"}`}
                    />
                    {rowError.name && <p className="mt-1 text-xs text-red-600">{rowError.name}</p>}
                  </div>
                  <div className="w-36">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={row.rate}
                      onChange={(e) => updateRow(index, "rate", e.target.value)}
                      placeholder="0.00"
                      className={`${inputClass} ${rowError.rate ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200"}`}
                    />
                    {rowError.rate && <p className="mt-1 text-xs text-red-600">{rowError.rate}</p>}
                  </div>
                  <div className="w-28">
                    <input
                      type="text"
                      value={row.unit}
                      onChange={(e) => updateRow(index, "unit", e.target.value)}
                      placeholder={`${defaultUnit || "Any"}`}
                      className={`${inputClass} border-gray-200`}
                    />
                  </div>
                  <div className="w-10 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      disabled={submitting}
                      aria-label="Remove product"
                      title="Remove product"
                      className="p-2 rounded-[10px] text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={addRow}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B2D5C] hover:text-[#F4B400] transition-colors"
          >
            <Plus size={16} />
            Add Another Row
          </button>
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
          type="button"
          onClick={handleSubmit}
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
    </div>
  )
}