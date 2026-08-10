import { useState, useEffect } from "react"
import { LoaderCircle, Save, Send, X, ArrowLeft, Info } from "lucide-react"
import { validateQuotationForm } from "../../utils/quotationValidation"
import { getCompanySettings } from "../../services/settings"
import { useCompany } from "../../context/companyContext"
import FormSection from "./FormSection"
import InputField from "./InputField"
import CustomerSelector from "./CustomerSelector"
import QuotationItemsTable from "./QuotationItemsTable"
import SummaryCard from "./SummaryCard"
import TermsSection from "./TermsSection"
import NotesSection from "./NotesSection"

const CREATE_STATUSES = ["Draft", "Sent"]

const DEFAULT_TERMS = [
  "1. Validity: This quotation is valid for 30 days from the date of quotation.",
  "2. Payment Terms: 50% advance along with confirmed order, balance before dispatch or as mutually agreed.",
  "3. Delivery: Delivery schedule will be intimated after receipt of confirmed order.",
  "4. Taxes: GST and other statutory levies will be charged as applicable at the time of billing.",
  "5. Rates: Rates quoted are exclusive of freight, loading/unloading and transit insurance unless otherwise stated.",
  "6. Acceptance: This quotation shall be deemed accepted only upon receipt of a written purchase order.",
  "7. Jurisdiction: Subject to the jurisdiction of local courts.",
].join("\n")

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

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function newItemRow() {
  return { key: `item-${Date.now()}`, description: "", quantity: "1", unit: "", rate: "" }
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A] break-words">{value || "—"}</p>
    </div>
  )
}

export default function QuotationForm({
  token,
  mode = "create",
  initialValues,
  readOnly = false,
  readOnlyMessage = "This quotation has been approved and can no longer be edited.",
  onSubmit,
  onCancel,
  onBack,
}) {
  const today = new Date()
  const { activeCompany } = useCompany()

  const [values, setValues] = useState(() => {
    if (initialValues) {
      return {
        customer: initialValues.customer?._id || initialValues.customer || "",
        division: initialValues.division || "",
        quotationDate: toDateInputValueOrEmpty(initialValues.quotationDate),
        validTill: toDateInputValueOrEmpty(initialValues.validTill),
        status: initialValues.status || "Draft",
        discount: String(initialValues.discount ?? 0),
        gstPercentage:
          initialValues.gstPercentage != null ? String(initialValues.gstPercentage) : "",
        termsAndConditions: initialValues.termsAndConditions || "",
        notes: initialValues.notes || "",
      }
    }

    return {
      customer: "",
      division: activeCompany,
      quotationDate: toDateInputValue(today),
      validTill: toDateInputValue(addDays(today, 30)),
      status: "Draft",
      discount: "0",
      gstPercentage: "",
      termsAndConditions: DEFAULT_TERMS,
      notes: "",
    }
  })

  const [selectedCustomer, setSelectedCustomer] = useState(
    initialValues?.customer?._id ? initialValues.customer : null
  )

  const [items, setItems] = useState(() =>
    initialValues && Array.isArray(initialValues.items) && initialValues.items.length > 0
      ? initialValues.items.map((item, index) => ({
          key: item._id || `item-${index}-${Date.now()}`,
          description: item.description || "",
          quantity: String(item.quantity ?? 1),
          unit: item.unit || "",
          rate: item.rate != null ? String(item.rate) : "",
        }))
      : [newItemRow()]
  )

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [termsDirty, setTermsDirty] = useState(() => mode === "edit")

  useEffect(() => {
    if (mode !== "create") return
    if (!values.division || termsDirty) return

    let cancelled = false

    getCompanySettings({ token, division: values.division })
      .then((settings) => {
        if (cancelled) return
        const defaultTerms = settings?.defaultTerms?.quotation?.trim()
        if (defaultTerms) {
          setValues((prev) => ({ ...prev, termsAndConditions: defaultTerms }))
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [mode, token, values.division, termsDirty])

  const handleFieldChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => {
      const next = { ...prev, [name]: undefined }
      return next
    })
  }

  const handleCustomerSelect = (customer) => {
    setValues((prev) => ({ ...prev, customer: customer._id }))
    setSelectedCustomer(customer)
    setErrors((prev) => ({ ...prev, customer: undefined }))
  }

  const handleAddRow = () => {
    setItems((prev) => [...prev, newItemRow()])
    setErrors((prev) => ({ ...prev, items: undefined }))
  }

  const handleRemoveRow = (index) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const buildPayload = (status) => ({
    customer: values.customer,
    division: values.division,
    quotationDate: values.quotationDate,
    validTill: values.validTill,
    status,
    discount: Number(values.discount) || 0,
    gstPercentage: Number(values.gstPercentage) || 0,
    termsAndConditions: values.termsAndConditions.trim(),
    notes: values.notes.trim(),
    items: items.map((item) => ({
      description: item.description.trim(),
      quantity: Number(item.quantity),
      unit: item.unit.trim(),
      rate: Number(item.rate),
    })),
  })

  const handleSubmit = async (status) => {
    if (submitting) return

    const nextErrors = validateQuotationForm(values, items)

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
      setServerError(err.message || "Failed to save quotation. Please try again.")
      setSubmitting(false)
    }
  }

  const statusOptions = mode === "create" ? CREATE_STATUSES : [values.status]

  const statusLocked = mode === "edit"

  const buttonBase =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"

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
        title="1. Quotation Information"
        description="Quotation reference, dates and status."
      >
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            Quotation Number
          </label>
          <input
            type="text"
            value={initialValues?.quotationNumber || "Auto-generated on save"}
            readOnly
            disabled
            tabIndex={-1}
            className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-gray-50 text-sm text-[#94A3B8] cursor-not-allowed"
          />
          {!initialValues && (
            <p className="mt-1.5 text-xs text-[#94A3B8]">
              System will generate e.g. QT-20260803-0001
            </p>
          )}
        </div>
        <InputField
          id="quotationDate"
          name="quotationDate"
          label="Quotation Date"
          type="date"
          value={values.quotationDate}
          onChange={handleFieldChange}
          error={errors.quotationDate}
          disabled={readOnly}
        />
        <InputField
          id="validTill"
          name="validTill"
          label="Valid Till"
          type="date"
          value={values.validTill}
          onChange={handleFieldChange}
          error={errors.validTill}
          disabled={readOnly}
        />
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Status</label>
          <select
            name="status"
            value={values.status}
            onChange={handleFieldChange}
            disabled={readOnly || statusLocked}
            className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 text-sm text-[#0F172A] bg-[#F8FAFC] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {mode === "edit" && !readOnly && (
            <p className="mt-1.5 text-xs text-[#94A3B8]">
              Status is managed from the quotation details page.
            </p>
          )}
        </div>
      </FormSection>

      <FormSection
        title="2. Customer Information"
        description="Select a customer to auto-load their billing details."
      >
        <div className="sm:col-span-2">
          <CustomerSelector
            token={token}
            value={values.customer}
            selectedCustomer={selectedCustomer}
            onSelect={handleCustomerSelect}
            error={errors.customer}
            disabled={readOnly}
          />
        </div>

        {selectedCustomer ? (
          <div className="sm:col-span-2">
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-[16px] p-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <InfoItem label="Company Name" value={selectedCustomer.companyName} />
                <InfoItem label="Contact Person" value={selectedCustomer.contactPerson} />
                <InfoItem label="Mobile" value={selectedCustomer.mobile} />
                <InfoItem label="Email" value={selectedCustomer.email} />
                <InfoItem label="GST Number" value={selectedCustomer.gstNumber} />
                <InfoItem
                  label="Address"
                  value={[
                    selectedCustomer.address,
                    selectedCustomer.city,
                    selectedCustomer.state,
                    selectedCustomer.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="sm:col-span-2 text-sm text-[#94A3B8] bg-[#F8FAFC] border border-dashed border-gray-200 rounded-[16px] px-5 py-6 text-center">
            Select a customer to view billing details here.
          </div>
        )}
      </FormSection>

      <FormSection
        title="3. Quotation Items"
        description="Line items with automatic amount calculation (Amount = Qty × Rate)."
      >
        <div className="sm:col-span-2">
          <QuotationItemsTable
            items={items}
            onChange={setItems}
            errors={errors.itemErrors || []}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
            disabled={readOnly}
            token={token}
          />
          {errors.items && <p className="mt-3 text-xs text-red-600">{errors.items}</p>}
        </div>
      </FormSection>

      <FormSection
        title="4. Summary"
        description="Totals are calculated automatically and also validated by the backend."
      >
        <SummaryCard
          readOnly={readOnly}
          items={items}
          discount={values.discount}
          onDiscountChange={(value) => {
            setValues((prev) => ({ ...prev, discount: value }))
            setErrors((prev) => ({ ...prev, discount: undefined }))
          }}
          gstPercentage={values.gstPercentage}
          onGstChange={(value) => {
            setValues((prev) => ({ ...prev, gstPercentage: value }))
            setErrors((prev) => ({ ...prev, gstPercentage: undefined }))
          }}
          errors={errors}
          subtotal={initialValues?.subtotal}
          gstAmount={initialValues?.gstAmount}
          grandTotal={initialValues?.grandTotal}
        />
      </FormSection>

      <FormSection
        title="5. Terms & Conditions"
        description="Default company terms are pre-filled. Edit before saving if needed."
      >
        <TermsSection
          value={values.termsAndConditions}
          onChange={(value) => {
            setTermsDirty(true)
            setValues((prev) => ({ ...prev, termsAndConditions: value }))
          }}
          className="sm:col-span-2"
          disabled={readOnly}
        />
      </FormSection>

      <FormSection
        title="6. Internal Notes"
        description="Visible only inside admin. Will not appear in the quotation PDF."
      >
        <NotesSection
          value={values.notes}
          onChange={(value) => setValues((prev) => ({ ...prev, notes: value }))}
          className="sm:col-span-2"
          disabled={readOnly}
        />
      </FormSection>

      {readOnly ? (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onBack}
            className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
          >
            <ArrowLeft size={16} />
            Back to Quotation
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={onBack}
              disabled={submitting}
              className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
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
                onClick={() => handleSubmit("Sent")}
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
                    <Send size={16} />
                    Save & Mark as Sent
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit(values.status)}
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
          )}
        </div>
      )}
    </form>
  )
}
