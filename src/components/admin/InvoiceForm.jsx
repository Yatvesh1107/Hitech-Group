import { useState } from "react"
import { LoaderCircle, Save, X, ArrowLeft, Info, AlertTriangle } from "lucide-react"
import { validateInvoiceForm } from "../../utils/invoiceValidation"
import { createCustomer } from "../../services/customers"
import { useCompany } from "../../context/companyContext"
import FormSection from "./FormSection"
import InputField from "./InputField"
import SelectField from "./SelectField"
import CustomerSelector from "./CustomerSelector"
import QuotationItemsTable from "./QuotationItemsTable"
import SummaryCard from "./SummaryCard"
import TermsSection from "./TermsSection"
import NotesSection from "./NotesSection"
import InvoiceStatusBadge from "./InvoiceStatusBadge"

const PAYMENT_METHODS = ["Cash", "Cheque", "Bank Transfer", "UPI", "NEFT", "RTGS", "Other"]

const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100

function computeTotals(items, discount, gstPercentage) {
  const subtotal = round2(
    items.reduce((sum, item) => {
      const qty = Number(item.quantity)
      const rate = Number(item.rate)
      if (!Number.isFinite(qty) || !Number.isFinite(rate)) return sum
      return sum + qty * rate
    }, 0)
  )
  const discountValue = Number(discount) || 0
  const gst = Number(gstPercentage) || 0
  const taxableValue = subtotal - discountValue
  const gstAmount = round2((taxableValue * gst) / 100)
  return { subtotal, gstAmount, grandTotal: round2(taxableValue + gstAmount) }
}

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

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

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function toDatetimeInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
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
  const today = new Date()
  const { activeCompany } = useCompany()

  const isWalkInEdit =
    mode === "edit" && !initialValues?.customer?._id && Boolean(initialValues?.walkInCustomer)

  const [values, setValues] = useState(() => ({
    customer: initialValues?.customer?._id || initialValues?.customer || "",
    division: initialValues?.division || activeCompany,
    invoiceDate: toDateInputValueOrEmpty(initialValues?.invoiceDate) || toDateInputValue(today),
    dueDate: toDateInputValueOrEmpty(initialValues?.dueDate) || toDateInputValue(addDays(today, 30)),
    discount: String(initialValues?.discount ?? 0),
    gstPercentage:
      initialValues?.gstPercentage != null ? String(initialValues.gstPercentage) : "",
    termsAndConditions:
      initialValues?.termsAndConditions || (mode === "create" ? DEFAULT_TERMS : ""),
    notes: initialValues?.notes || "",
  }))

  const [selectedCustomer, setSelectedCustomer] = useState(() =>
    initialValues?.customer?._id ? initialValues.customer : null
  )

  const [customerType, setCustomerType] = useState(() => (isWalkInEdit ? "walkin" : "existing"))

  const [walkIn, setWalkIn] = useState(() => ({
    companyName: initialValues?.walkInCustomer?.companyName || "",
    contactPerson: initialValues?.walkInCustomer?.contactPerson || "",
    mobile: initialValues?.walkInCustomer?.mobile || "",
    gstNumber: initialValues?.walkInCustomer?.gstNumber || "",
    address: initialValues?.walkInCustomer?.address || "",
  }))

  const [saveAsCustomer, setSaveAsCustomer] = useState(true)

  const [advancePayment, setAdvancePayment] = useState(() => ({
    amount: "",
    paymentDate: toDatetimeInputValue(today),
    paymentMethod: "Cash",
  }))

  const [items, setItems] = useState(() =>
    Array.isArray(initialValues?.items) && initialValues.items.length > 0
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

  const paymentStatus = initialValues?.paymentStatus
  const isPaid = paymentStatus === "Paid"
  const isPartiallyPaid = paymentStatus === "Partially Paid"
  const formReadOnly = readOnly || isPaid
  const financialsLocked = isPartiallyPaid || formReadOnly

  const handleFieldChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleCustomerSelect = (customer) => {
    setValues((prev) => ({ ...prev, customer: customer._id }))
    setSelectedCustomer(customer)
    setErrors((prev) => ({ ...prev, customer: undefined }))
  }

  const handleWalkInChange = (field, value) => {
    setWalkIn((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [`walkIn${field[0].toUpperCase()}${field.slice(1)}`]: undefined }))
  }

  const handleAddRow = () => {
    setItems((prev) => [...prev, newItemRow()])
    setErrors((prev) => ({ ...prev, items: undefined }))
  }

  const handleRemoveRow = (index) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const buildPayload = () => {
    const payload = {
      division: values.division,
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
    }

    if (mode === "create" && customerType === "walkin") {
      payload.walkInCustomer = {
        companyName: walkIn.companyName.trim(),
        contactPerson: walkIn.contactPerson.trim(),
        mobile: walkIn.mobile.trim(),
        gstNumber: walkIn.gstNumber.trim(),
        address: walkIn.address.trim(),
      }
    } else if (isWalkInEdit && initialValues?.walkInCustomer) {
      payload.walkInCustomer = initialValues.walkInCustomer
    } else if (selectedCustomer) {
      payload.customer = selectedCustomer._id
    } else if (typeof values.customer === "string" && values.customer) {
      payload.customer = values.customer
    }

    return payload
  }

  const handleSubmit = async () => {
    if (submitting || formReadOnly) return

    const nextErrors = validateInvoiceForm(values, items)

    if (mode === "create") {
      if (customerType === "existing") {
        if (!selectedCustomer) {
          nextErrors.customer = "Customer is required"
        }
      } else {
        if (!walkIn.companyName.trim()) {
          nextErrors.walkInCompanyName = "Company name is required"
        }
        if (!walkIn.contactPerson.trim()) {
          nextErrors.walkInContactPerson = "Contact person is required"
        }
        if (!walkIn.mobile.trim()) {
          nextErrors.walkInMobile = "Mobile number is required"
        }
      }

      if (advancePayment.amount.trim() !== "") {
        const paid = Number(advancePayment.amount)
        const totals = computeTotals(items, values.discount, values.gstPercentage)
        if (!Number.isFinite(paid) || paid <= 0) {
          nextErrors.advanceAmount = "Amount paid must be greater than zero"
        } else if (paid > totals.grandTotal) {
          nextErrors.advanceAmount = `Cannot receive more than the invoice total of ${formatINR(totals.grandTotal)}`
        }
      }
    } else if (!selectedCustomer && !values.customer && !initialValues?.walkInCustomer) {
      nextErrors.customer = "Customer is required"
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setServerError("")
    setSubmitting(true)

    try {
      const payload = buildPayload()

      if (mode === "create" && customerType === "walkin" && saveAsCustomer) {
        const created = await createCustomer({
          token,
          payload: {
            companyName: walkIn.companyName.trim(),
            contactPerson: walkIn.contactPerson.trim(),
            mobile: walkIn.mobile.trim(),
            gstNumber: walkIn.gstNumber.trim() || undefined,
            address: walkIn.address.trim() || undefined,
          },
        })
        delete payload.walkInCustomer
        payload.customer = created._id
      }

      const advancePaymentPayload =
        mode === "create" && advancePayment.amount.trim() !== "" && Number(advancePayment.amount) > 0
          ? {
              amount: Number(advancePayment.amount),
              paymentDate: advancePayment.paymentDate,
              paymentMethod: advancePayment.paymentMethod,
            }
          : null

      await onSubmit(payload, advancePaymentPayload)
    } catch (err) {
      setServerError(err.message || "Failed to save invoice. Please try again.")
      setSubmitting(false)
    }
  }

  const buttonBase =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"

  const customerModeEditable = mode === "create" && !formReadOnly

  const displayCustomer =
    selectedCustomer ||
    (customerType === "walkin" && isWalkInEdit
      ? {
          companyName: walkIn.companyName,
          contactPerson: walkIn.contactPerson,
          mobile: walkIn.mobile,
          gstNumber: walkIn.gstNumber,
          address: walkIn.address,
        }
      : null)

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
            value={initialValues?.invoiceNumber || "Auto-generated on save"}
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
        description={
          mode === "create"
            ? "Choose an existing customer or add a walk-in customer."
            : "The customer this invoice belongs to."
        }
      >
        {customerModeEditable && (
          <div className="sm:col-span-2">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setCustomerType("existing")
                  setErrors((prev) => ({ ...prev, customer: undefined }))
                }}
                className={`h-10 px-4 rounded-[12px] text-sm font-semibold transition-colors ${
                  customerType === "existing"
                    ? "bg-[#0B2D5C] text-white"
                    : "bg-white border border-gray-200 text-[#0F172A] hover:bg-gray-50"
                }`}
              >
                Existing Customer
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerType("walkin")
                  setErrors((prev) => ({
                    ...prev,
                    walkInCompanyName: undefined,
                    walkInContactPerson: undefined,
                    walkInMobile: undefined,
                  }))
                }}
                className={`h-10 px-4 rounded-[12px] text-sm font-semibold transition-colors ${
                  customerType === "walkin"
                    ? "bg-[#0B2D5C] text-white"
                    : "bg-white border border-gray-200 text-[#0F172A] hover:bg-gray-50"
                }`}
              >
                Walk-in Customer
              </button>
            </div>
          </div>
        )}

        {customerType === "walkin" ? (
          <>
            <div className="sm:col-span-2">
              <InputField
                id="walkInCompanyName"
                name="walkInCompanyName"
                label="Company Name"
                required
                value={walkIn.companyName}
                onChange={(e) => handleWalkInChange("companyName", e.target.value)}
                error={errors.walkInCompanyName}
                disabled={formReadOnly || mode !== "create"}
              />
            </div>
            <InputField
              id="walkInContactPerson"
              name="walkInContactPerson"
              label="Contact Person"
              required
              value={walkIn.contactPerson}
              onChange={(e) => handleWalkInChange("contactPerson", e.target.value)}
              error={errors.walkInContactPerson}
              disabled={formReadOnly || mode !== "create"}
            />
            <InputField
              id="walkInMobile"
              name="walkInMobile"
              label="Mobile Number"
              required
              value={walkIn.mobile}
              onChange={(e) => handleWalkInChange("mobile", e.target.value)}
              error={errors.walkInMobile}
              disabled={formReadOnly || mode !== "create"}
            />
            <InputField
              id="walkInGstNumber"
              name="walkInGstNumber"
              label="GST Number (Optional)"
              value={walkIn.gstNumber}
              onChange={(e) => handleWalkInChange("gstNumber", e.target.value)}
              disabled={formReadOnly || mode !== "create"}
            />
            <InputField
              id="walkInAddress"
              name="walkInAddress"
              label="Address (Optional)"
              value={walkIn.address}
              onChange={(e) => handleWalkInChange("address", e.target.value)}
              disabled={formReadOnly || mode !== "create"}
            />

            {mode === "create" && (
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={saveAsCustomer}
                    onChange={(e) => setSaveAsCustomer(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#0B2D5C] focus:ring-[#F4B400]/40"
                  />
                  <span className="text-sm font-medium text-[#0F172A]">
                    Save as Customer
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    Creates a customer record for this walk-in customer before saving the invoice.
                  </span>
                </label>
              </div>
            )}
          </>
        ) : (
          <div className="sm:col-span-2">
            <CustomerSelector
              token={token}
              value={values.customer}
              selectedCustomer={selectedCustomer}
              onSelect={customerModeEditable ? handleCustomerSelect : () => {}}
              error={errors.customer}
              disabled={!customerModeEditable}
            />
          </div>
        )}

        {displayCustomer ? (
          <div className="sm:col-span-2">
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-[16px] p-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <InfoItem label="Company Name" value={displayCustomer.companyName} />
                <InfoItem label="Contact Person" value={displayCustomer.contactPerson} />
                <InfoItem label="Mobile" value={displayCustomer.mobile} />
                <InfoItem label="Email" value={displayCustomer.email} />
                <InfoItem label="GST Number" value={displayCustomer.gstNumber} />
                <InfoItem label="Address" value={displayCustomer.address} />
              </div>
            </div>
          </div>
        ) : (
          customerType === "existing" && (
            <div className="sm:col-span-2 text-sm text-[#94A3B8] bg-[#F8FAFC] border border-dashed border-gray-200 rounded-[16px] px-5 py-6 text-center">
              Select a customer to view billing details here.
            </div>
          )
        )}
      </FormSection>

      <FormSection
        title="3. Invoice Items"
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
            token={token}
          />
          {errors.items && <p className="mt-3 text-xs text-red-600">{errors.items}</p>}
        </div>
      </FormSection>

      <FormSection
        title="4. Summary"
        description="Totals are calculated automatically and also validated by the backend."
      >
        {financialsLocked ? (
          <SummaryCard
            readOnly
            subtotal={initialValues?.subtotal}
            discount={initialValues?.discount}
            gstPercentage={initialValues?.gstPercentage}
            gstAmount={initialValues?.gstAmount}
            grandTotal={initialValues?.grandTotal}
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
            subtotal={initialValues?.subtotal}
            gstAmount={initialValues?.gstAmount}
            grandTotal={initialValues?.grandTotal}
          />
        )}
      </FormSection>

      {mode === "create" && (
        <FormSection
          title="5. Advance Payment"
          description="Optionally record an advance or partial payment received at the time of billing."
        >
          <InputField
            id="advanceAmount"
            label="Amount Paid (Optional)"
            type="number"
            min="0"
            step="any"
            placeholder="0.00"
            value={advancePayment.amount}
            onChange={(e) => {
              setAdvancePayment((prev) => ({ ...prev, amount: e.target.value }))
              setErrors((prev) => ({ ...prev, advanceAmount: undefined }))
            }}
            error={errors.advanceAmount}
          />
          <InputField
            id="advancePaymentDate"
            label="Payment Date & Time"
            type="datetime-local"
            value={advancePayment.paymentDate}
            onChange={(e) =>
              setAdvancePayment((prev) => ({ ...prev, paymentDate: e.target.value }))
            }
          />
          <SelectField
            id="advancePaymentMethod"
            label="Payment Method"
            value={advancePayment.paymentMethod}
            onChange={(e) =>
              setAdvancePayment((prev) => ({ ...prev, paymentMethod: e.target.value }))
            }
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </SelectField>
          {advancePayment.amount.trim() !== "" && Number(advancePayment.amount) > 0 && (
            <div className="sm:col-span-2 text-sm text-[#64748B] bg-[#F8FAFC] border border-gray-100 rounded-[12px] px-4 py-3">
              Invoice total is{" "}
              <span className="font-semibold text-[#0F172A]">
                {formatINR(computeTotals(items, values.discount, values.gstPercentage).grandTotal)}
              </span>
              . Outstanding after this payment will be{" "}
              <span className="font-semibold text-[#0B2D5C]">
                {formatINR(
                  Math.max(
                    computeTotals(items, values.discount, values.gstPercentage).grandTotal -
                      Number(advancePayment.amount),
                    0
                  )
                )}
              </span>
              .
            </div>
          )}
        </FormSection>
      )}

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
                {mode === "create" ? "Create Invoice" : "Save Changes"}
              </>
            )}
          </button>
        </div>
      )}
    </form>
  )
}
