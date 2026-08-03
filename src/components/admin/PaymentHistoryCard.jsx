import { History, Pencil, Trash2, LoaderCircle } from "lucide-react"
import SectionHeader from "./SectionHeader"

const actionButtonClass =
  "p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#0B2D5C]/5 transition-colors"

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export default function PaymentHistoryCard({ payments = [], loading = false, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<History size={16} />} title="Payment History" />

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-[#94A3B8]">
          <LoaderCircle size={16} className="animate-spin" />
          Loading payments…
        </div>
      ) : payments.length === 0 ? (
        <p className="px-6 py-12 text-sm text-[#94A3B8]">No payments recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-y border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Reference No.</th>
                <th className="px-6 py-4 font-semibold">Received By</th>
                <th className="px-6 py-4 font-semibold">Remarks</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((payment) => {
                const receivedBy =
                  payment.receivedBy?.name || payment.receivedBy?.email || "—"

                return (
                  <tr key={payment._id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 text-sm text-[#334155]">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      {formatINR(payment.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#0B2D5C]/5 text-[#0B2D5C] text-xs font-semibold">
                        {payment.paymentMethod || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#334155]">
                      {payment.referenceNumber || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#334155]">{receivedBy}</td>
                    <td className="px-6 py-4 text-sm text-[#64748B]">{payment.remarks || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          aria-label="Edit payment"
                          title="Edit"
                          onClick={() => onEdit?.(payment)}
                          className={actionButtonClass}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete payment"
                          title="Delete"
                          onClick={() => onDelete?.(payment)}
                          className="p-2 rounded-[10px] text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
