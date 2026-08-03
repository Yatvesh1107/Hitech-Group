import { Eye, Pencil, Copy, ArrowLeftRight, Trash2 } from "lucide-react"
import QuotationStatusBadge from "./QuotationStatusBadge"
import DivisionBadge from "./DivisionBadge"

const actionButtonClass =
  "p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#0B2D5C]/5 transition-colors"

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

function formatMoney(value) {
  if (value === null || value === undefined || value === "") return "—"

  const num = Number(value)
  if (Number.isNaN(num)) return "—"

  return `₹${num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function QuotationTable({
  quotations,
  onView,
  onEdit,
  onDuplicate,
  onChangeStatus,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-6 py-4 font-semibold">Quotation No.</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Division</th>
            <th className="px-6 py-4 font-semibold">Service</th>
            <th className="px-6 py-4 font-semibold">Quotation Date</th>
            <th className="px-6 py-4 font-semibold">Valid Till</th>
            <th className="px-6 py-4 font-semibold">Grand Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {quotations.map((quotation) => (
            <tr key={quotation._id} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4">
                <span className="font-semibold text-[#0B2D5C] text-sm">{quotation.quotationNumber}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-[#0F172A] text-sm">
                    {quotation.customer?.companyName || "—"}
                  </span>
                  {quotation.customer?.contactPerson && (
                    <span className="mt-0.5 text-xs font-medium text-[#94A3B8]">
                      {quotation.customer.contactPerson}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <DivisionBadge division={quotation.division} />
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {quotation.service?.serviceName || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {formatDate(quotation.quotationDate)}
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {formatDate(quotation.validTill)}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-[#334155]">
                {formatMoney(quotation.grandTotal)}
              </td>
              <td className="px-6 py-4">
                <QuotationStatusBadge status={quotation.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="View"
                    title="View"
                    onClick={() => onView?.(quotation)}
                    className={actionButtonClass}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit"
                    onClick={() => onEdit?.(quotation)}
                    className={actionButtonClass}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Duplicate"
                    title="Duplicate"
                    onClick={() => onDuplicate?.(quotation)}
                    className={actionButtonClass}
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Change Status"
                    title="Change Status"
                    onClick={() => onChangeStatus?.(quotation)}
                    className={actionButtonClass}
                  >
                    <ArrowLeftRight size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                    onClick={() => onDelete?.(quotation)}
                    className="p-2 rounded-[10px] text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
