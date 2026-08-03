import { LoaderCircle, X } from "lucide-react"

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, busy = false }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-5">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={busy ? undefined : onCancel}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[420px] bg-white rounded-[22px] shadow-2xl p-6 md:p-8">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        <p className="mt-2 text-sm text-[#64748B] leading-relaxed">{message}</p>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[12px] bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy && <LoaderCircle size={16} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
