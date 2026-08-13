import { Eye, Pencil, Power, RotateCcw, Trash2, LoaderCircle } from "lucide-react"
import StatusBadge from "./StatusBadge"

const actionButtonClass =
  "p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#0B2D5C]/5 transition-colors"

export default function CustomerTable({ customers, onView, onEdit, onDeactivate, onRestore, busyId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-6 py-4 font-semibold">Company Name</th>
            <th className="px-6 py-4 font-semibold">Contact Person</th>
            <th className="px-6 py-4 font-semibold">Mobile</th>
            <th className="px-6 py-4 font-semibold">Email</th>
            <th className="px-6 py-4 font-semibold">City</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0B2D5C]/5 rounded-[10px] flex items-center justify-center text-[#0B2D5C] font-bold text-sm shrink-0">
                    {customer.companyName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-[#0F172A]">{customer.companyName}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">{customer.contactPerson || "—"}</td>
              <td className="px-6 py-4 text-sm text-[#334155]">{customer.mobile || "—"}</td>
              <td className="px-6 py-4 text-sm text-[#334155]">{customer.email || "—"}</td>
              <td className="px-6 py-4 text-sm text-[#334155]">{customer.city || "—"}</td>
              <td className="px-6 py-4">
                <StatusBadge active={customer.isActive} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="View"
                    title="View"
                    onClick={() => onView?.(customer)}
                    className={actionButtonClass}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit"
                    onClick={() => onEdit?.(customer)}
                    className={actionButtonClass}
                  >
                    <Pencil size={16} />
                  </button>
                  {customer.isActive ? (
                    <button
                      type="button"
                      aria-label="Deactivate"
                      title="Deactivate"
                      onClick={() => onDeactivate?.(customer)}
                      disabled={busyId === customer._id}
                      className={`${actionButtonClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {busyId === customer._id ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <Power size={16} />
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label="Restore"
                      title="Restore"
                      onClick={() => onRestore?.(customer)}
                      disabled={busyId === customer._id}
                      className={`${actionButtonClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {busyId === customer._id ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <RotateCcw size={16} />
                      )}
                    </button>
                  )}
                  {/* <button
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                    className="p-2 rounded-[10px] text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
