import { useState } from "react"
import { LoaderCircle, Save, X, ArrowLeft, Info, AlertTriangle } from "lucide-react"
import { validateInvoiceForm } from "../../utils/invoiceValidation"
import FormSection from "./FormSection"
import InputField from "./InputField"
import SelectField from "./SelectField"
import CustomerSelector from "./CustomerSelector"
import ServiceSelector from "./ServiceSelector"
import QuotationItemsTable from "./QuotationItemsTable"
import SummaryCard from "./SummaryCard"
import TermsSection from "./TermsSection"
import NotesSection from "./NotesSection"
import InvoiceStatusBadge from "./InvoiceStatusBadge"

const DIVISIONS = ["Industrial Insulation", "Experts in Ultrasonics", "Precision Tech Engineering"]

const DEFAULT_TERMS = [
  "1. Payment Terms: 50% advance along with confirmed order, balance before dispatch or as mutually agreed.",
  "2. Delivery: Delivery schedule will be intimated after receipt of confirmed order.",
  "3. Taxes: GST and other statutory levies will be charged as applicable at the time of billing.",
  "4. Rates: Rates quoted are exclusive of freight, loading/unloading and transit insurance unless otherwise stated.",
  "5. Jurisdiction: Subject to the jurisdiction of local courts.",
].join("\n")

const FULLY_PAID_MESSAGE = "This invoice has been fully paid and can no longer be edited."

const PARTIALLY_PAID_MESSAGE =
  "This invoice is partially paid. Only the due date, terms and conditions and internal notes can be edited."

function toDateInputValueOrEmpty(value) {
  if (!value) return ""

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
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

export default function InvoiceForm({
  token,
  mode = "edit",
  initialValues,
  readOnly = false,
  readOnlyMessage = FULLY_PAID_MESSAGE,
  onSubmit,
  onCancel,
  onBack,
}) {
  const [values, setValues] = useState(() => ({
    customer: initialValues.customer?._id || initialValues.customer || "",
    division: initialValues.division || "",
    service: initialValues.service?._id || initialValues.service || "",
    invoiceDate: toDateInputValueOrEmpty(initialValues.invoiceDate),
    dueDate: toDateInputValueOrEmpty(initialValues.dueDate),
    discount: String(initialValues.discount ?? 0),
    gstPercentage:
      initialValues.gstPercentage != null ? String(initialValues.gstPercentage) : "",
    termsAndConditions: initialValues.termsAndConditions || (mode === "create" ? DEFAULT_TERMS : ""),
    notes: initialValues.notes || "",
  }))

  const selectedCustomer = initialValues?.customer?._id ? initialValues.customer : null

  const [items, setItems] = useState(() =>
    Array.isArray(initialValues.items) && initialValues.items.length > 0
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

  const paymentStatus = initialValues.paymentStatus
  const isPaid = paymentStatus === "Paid"
  const isPartiallyPaid = paymentStatus === "Partially Paid"
  const formReadOnly = readOnly || isPaid
  const financialsLocked = isPartiallyPaid || formReadOnly

  const handleFieldChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleAddRow = () => {
    setItems((prev) => [...prev, newItemRow()])
    setErrors((prev) => ({ ...prev, items: undefined }))
  }

  const handleRemoveRow = (index) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const buildPayload = () => ({
    customer: values.customer,
    division: values.division,
    service: values.service,
    invoiceDate: values.invoiceDate,
    dueDate: values.dueDate,
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

  const handleSubmit = async () => {
    if (submitting || formReadOnly) return

    const nextErrors = validateInvoiceForm(values, items)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    try {
      await onSubmit(buildPayload())
    } catch (err) {
      setServerError(err.message || "Failed to save invoice. Please try again.")
      setSubmitting(false)
    }
  }

  const buttonBase =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"

  return (
    <form noValidate className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
      {formReadOnly && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-[12px] px-5 py-4">
          <Info size={18} className="shrink-0 mt-0.5" />
          <span>{readOnlyMessage}</span>
        </div>
      )}

      {isPartiallyPaid && !formReadOnly && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-[12px] px-5 py-4">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <span>{PARTIALLY_PAID_MESSAGE}</span>
        </div>
      )}

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-5 py-4">
          {serverError}
        </div>
      )}

      <FormSection
        title="1. Invoice Information"
        description="Invoice reference, dates and payment status."
      >
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            Invoice Number
          </label>
          <input
            type="text"
            value={initialValues.invoiceNumber || "Auto-generated on save"}
            readOnly
            disabled
            tabIndex={-1}
            className="w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-gray-50 text-sm text-[#94A3B8] cursor-not-allowed"
          />
        </div>
        <InputField
          id="invoiceDate"
          name="invoiceDate"
          label="Invoice Date"
          type="date"
          value={values.invoiceDate}
          onChange={handleFieldChange}
          error={errors.invoiceDate}
          disabled={formReadOnly || financialsLocked}
        />
        <InputField
          id="dueDate"
          name="dueDate"
          label="Due Date"
          type="date"
          value={values.dueDate}
          onChange={handleFieldChange}
          error={errors.dueDate}
          disabled={formReadOnly}
        />
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            Payment Status
          </label>
          <div className="flex items-center h-[48px]">
            <InvoiceStatusBadge status={paymentStatus} />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="2. Customer Information"
        description="The customer this invoice belongs to."
      >
        <div className="sm:col-span-2">
          <CustomerSelector
            token={token}
            value={values.customer}
            selectedCustomer={selectedCustomer}
            onSelect={() => {}}
            error={errors.customer}
            disabled
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
        title="3. Business Information"
        description="Division and service for this invoice."
      >
        <SelectField
          id="division"
          name="division"
          label="Division"
          required
          value={values.division}
          onChange={handleFieldChange}
          error={errors.division}
          disabled
        >
          <option value="">Select Division</option>
          {DIVISIONS.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </SelectField>
        <ServiceSelector
          token={token}
          division={values.division}
          value={values.service}
          onSelect={() => {}}
          error={errors.service}
          disabled
        />
      </FormSection>

      <FormSection
        title="4. Invoice Items"
        description="Line items with automatic amount calculation (Amount = Qty × Rate)."
      >
        <div className="sm:col-span-2">
          <QuotationItemsTable
            items={items}
            onChange={setItems}
            errors={errors.itemErrors || []}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
            disabled={financialsLocked}
          />
          {errors.items && <p className="mt-3 text-xs text-red-600">{errors.items}</p>}
        </div>
      </FormSection>

      <FormSection
        title="5. Summary"
        description="Totals are calculated automatically and also validated by the backend."
      >
        {financialsLocked ? (
          <SummaryCard
            readOnly
            subtotal={initialValues.subtotal}
            discount={initialValues.discount}
            gstPercentage={initialValues.gstPercentage}
            gstAmount={initialValues.gstAmount}
            grandTotal={initialValues.grandTotal}
          />
        ) : (
          <SummaryCard
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
            subtotal={initialValues.subtotal}
            gstAmount={initialValues.gstAmount}
            grandTotal={initialValues.grandTotal}
          />
        )}
      </FormSection>

      <FormSection
        title="6. Terms & Conditions"
        description="Default company terms are pre-filled. Edit before saving if needed."
      >
        <TermsSection
          value={values.termsAndConditions}
          onChange={(value) => setValues((prev) => ({ ...prev, termsAndConditions: value }))}
          className="sm:col-span-2"
          disabled={formReadOnly}
        />
      </FormSection>

      <FormSection
        title="7. Internal Notes"
        description="Visible only inside admin. Will not appear in the invoice PDF."
      >
        <NotesSection
          value={values.notes}
          onChange={(value) => setValues((prev) => ({ ...prev, notes: value }))}
          className="sm:col-span-2"
          disabled={formReadOnly}
        />
      </FormSection>

      {formReadOnly ? (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onBack}
            className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
          >
            <ArrowLeft size={16} />
            Back to Invoice
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

          <button
            type="button"
            onClick={handleSubmit}
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
        </div>
      )}
    </form>
  )
}
