import { useState } from "react"
import { ArrowLeft, ArrowRight, LoaderCircle, X } from "lucide-react"

const STATUS_CONFIG = {
  Sent: {
    title: "Mark as Sent?",
    message:
      "This quotation will be marked as Sent. You can later approve, reject, expire or cancel it.",
    label: "Mark as Sent",
    buttonClass: "bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90",
  },
  Approved: {
    title: "Approve Quotation?",
    message:
      "Once approved, this quotation becomes read-only and can later be converted into an invoice.",
    label: "Approve",
    buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  Rejected: {
    title: "Reject Quotation?",
    message: "This quotation will be marked as Rejected and can no longer be edited.",
    label: "Reject",
    buttonClass: "bg-red-500 text-white hover:bg-red-600",
  },
  Expired: {
    title: "Mark as Expired?",
    message: "This quotation will be marked as Expired.",
    label: "Mark as Expired",
    buttonClass: "bg-orange-500 text-white hover:bg-orange-600",
  },
  Cancelled: {
    title: "Cancel Quotation?",
    message: "This quotation will be cancelled and become read-only.",
    label: "Cancel Quotation",
    buttonClass: "bg-gray-700 text-white hover:bg-gray-800",
  },
}

const STATUS_DESCRIPTIONS = {
  Sent: "Send the quotation to the customer.",
  Approved: "Approve the quotation after customer acceptance.",
  Rejected: "Reject the quotation.",
  Expired: "Mark the quotation as expired.",
  Cancelled: "Cancel the quotation.",
}

export default function StatusChangeModal({
  open,
  allowedStatuses = [],
  busy = false,
  error = "",
  onClose,
  onConfirm,
}) {
  const [selected, setSelected] = useState(
    allowedStatuses.length === 1 ? allowedStatuses[0] : null
  )

  if (!open) return null

  const config = selected ? STATUS_CONFIG[selected] : null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-5">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={busy ? undefined : onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[420px] bg-white rounded-[22px] shadow-2xl p-6 md:p-8">
        {config ? (
          <>
            <button
              type="button"
              onClick={() => setSelected(null)}
              disabled={busy}
              className="absolute top-4 left-4 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
              aria-label="Back to status list"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#0F172A]">{config.title}</h2>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">{config.message}</p>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-4 py-3">
                {error}
              </div>
            )}

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
                onClick={() => onConfirm(selected)}
                disabled={busy}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${config.buttonClass}`}
              >
                {busy && <LoaderCircle size={16} className="animate-spin" />}
                {config.label}
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#0F172A]">Change Status</h2>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              Choose the new status for this quotation.
            </p>

            <div className="mt-6 space-y-3">
              {allowedStatuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelected(status)}
                  className="w-full flex items-center justify-between gap-3 border border-gray-200 rounded-[14px] px-5 py-4 text-left hover:border-[#F4B400] hover:bg-[#F8FAFC] transition-colors"
                >
                  <span>
                    <span className="block text-sm font-bold text-[#0F172A]">{status}</span>
                    <span className="mt-0.5 block text-xs text-[#64748B]">
                      {STATUS_DESCRIPTIONS[status]}
                    </span>
                  </span>
                  <ArrowRight size={16} className="text-[#94A3B8] shrink-0" />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center h-11 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
