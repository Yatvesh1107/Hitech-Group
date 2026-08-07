import { useState } from "react"
import { LoaderCircle, X } from "lucide-react"
import InputField from "./InputField"
import SelectField from "./SelectField"

const PAYMENT_METHODS = ["Cash", "Cheque", "Bank Transfer", "UPI", "NEFT", "RTGS", "Other"]

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function toDatetimeInputValue(value) {
  const date = value ? new Date(value) : new Date()
  if (Number.isNaN(date.getTime())) return ""

  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

export default function PaymentFormModal({
  open,
  title = "Record Payment",
  busy = false,
  error = "",
  payment = null,
  maxAmount = null,
  onClose,
  onConfirm,
}) {
  const [paymentDate, setPaymentDate] = useState(() =>
    payment ? toDatetimeInputValue(payment.paymentDate) : toDatetimeInputValue()
  )
  const [amount, setAmount] = useState(() => (payment ? String(payment.amount) : ""))
  const [paymentMethod, setPaymentMethod] = useState(payment?.paymentMethod || "Cash")
  const [referenceNumber, setReferenceNumber] = useState(payment?.referenceNumber || "")
  const [remarks, setRemarks] = useState(payment?.remarks || "")
  const [fieldErrors, setFieldErrors] = useState({})

  if (!open) return null

  const handleSubmit = () => {
    const errors = {}
    const numericAmount = Number(amount)

    if (!amount) {
      errors.amount = "Amount received is required"
    } else if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      errors.amount = "Amount must be greater than zero"
    } else if (maxAmount !== null && numericAmount > maxAmount) {
      errors.amount = `Cannot receive more than the outstanding amount of ${formatINR(maxAmount)}`
    }

    if (!paymentDate) {
      errors.paymentDate = "Payment date is required"
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    onConfirm({
      paymentDate,
      amount: numericAmount,
      paymentMethod,
      referenceNumber: referenceNumber.trim(),
      remarks: remarks.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-5">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={busy ? undefined : onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[520px] bg-white rounded-[22px] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
          {payment
            ? "Update the payment details below."
            : maxAmount !== null
              ? `Outstanding amount is ${formatINR(maxAmount)}. Enter the amount received against this invoice.`
              : "Enter the amount received against this invoice."}
        </p>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-4 py-3">
            {error}
          </div>
        )}

        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          <InputField
            id="paymentDate"
            label="Payment Date & Time"
            type="datetime-local"
            required
            value={paymentDate}
            onChange={(event) => setPaymentDate(event.target.value)}
            error={fieldErrors.paymentDate}
          />
          <InputField
            id="amount"
            label="Amount Received"
            type="number"
            min="0"
            step="any"
            required
            placeholder="0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            error={fieldErrors.amount}
          />
          <SelectField
            id="paymentMethod"
            label="Payment Method"
            required
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="sm:col-span-2"
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </SelectField>
          <InputField
            id="referenceNumber"
            label="Reference Number"
            placeholder="e.g. UTR / Cheque No."
            value={referenceNumber}
            onChange={(event) => setReferenceNumber(event.target.value)}
            className="sm:col-span-2"
          />
          <div className="sm:col-span-2">
            <label htmlFor="remarks" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
              Remarks
            </label>
            <textarea
              id="remarks"
              rows={3}
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              placeholder="Optional notes about this payment"
              className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={busy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] bg-[#0B2D5C] text-sm font-semibold text-white hover:bg-[#0B2D5C]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy && <LoaderCircle size={16} className="animate-spin" />}
            {payment ? "Save Changes" : "Record Payment"}
          </button>
        </div>
      </div>
    </div>
  )
}
