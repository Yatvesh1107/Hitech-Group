import { Eye, Pencil, Download, Trash2, LoaderCircle } from "lucide-react"
import InvoiceStatusBadge from "./InvoiceStatusBadge"
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

export default function InvoiceTable({
  invoices,
  onView,
  onEdit,
  onDownloadPdf,
  onDelete,
  pdfBusyId,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-6 py-4 font-semibold">Invoice No.</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Division</th>
            <th className="px-6 py-4 font-semibold">Invoice Date</th>
            <th className="px-6 py-4 font-semibold">Due Date</th>
            <th className="px-6 py-4 font-semibold">Grand Total</th>
            <th className="px-6 py-4 font-semibold">Payment Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {invoices.map((invoice) => (
            <tr key={invoice._id} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4">
                <span className="font-semibold text-[#0B2D5C] text-sm">{invoice.invoiceNumber}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-[#0F172A] text-sm">
                    {invoice.customer?.companyName || "—"}
                  </span>
                  {invoice.customer?.contactPerson && (
                    <span className="mt-0.5 text-xs font-medium text-[#94A3B8]">
                      {invoice.customer.contactPerson}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <DivisionBadge division={invoice.division} />
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {formatDate(invoice.invoiceDate)}
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {formatDate(invoice.dueDate)}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-[#334155]">
                {formatMoney(invoice.grandTotal)}
              </td>
              <td className="px-6 py-4">
                <InvoiceStatusBadge status={invoice.paymentStatus} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="View"
                    title="View"
                    onClick={() => onView?.(invoice)}
                    className={actionButtonClass}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit"
                    onClick={() => onEdit?.(invoice)}
                    className={actionButtonClass}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Download PDF"
                    title="Download PDF"
                    onClick={() => onDownloadPdf?.(invoice)}
                    disabled={pdfBusyId === invoice._id}
                    className={`${actionButtonClass} disabled:opacity-50 disabled:cursor-wait`}
                  >
                    {pdfBusyId === invoice._id ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                    onClick={() => onDelete?.(invoice)}
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
