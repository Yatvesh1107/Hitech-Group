import { Pencil, Power, RotateCcw, LoaderCircle } from "lucide-react"
import DivisionBadge from "./DivisionBadge"
import StatusBadge from "./StatusBadge"

const actionButtonClass =
  "p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#0B2D5C]/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"

const formatRate = (value) => {
  const number = Number(value)
  if (!Number.isFinite(number)) return "—"
  return `₹${number.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function ProductTable({ products, onEdit, onDeactivate, onRestore, busyId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-6 py-4 font-semibold">Product / Service</th>
            <th className="px-6 py-4 font-semibold">Division</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Unit</th>
            <th className="px-6 py-4 font-semibold">Default Rate</th>
            <th className="px-6 py-4 font-semibold">GST %</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0B2D5C]/5 rounded-[10px] flex items-center justify-center text-[#0B2D5C] font-bold text-sm shrink-0">
                    {product.serviceName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F172A]">{product.serviceName}</div>
                    {product.serviceCode && (
                      <div className="text-xs text-[#94A3B8]">{product.serviceCode}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <DivisionBadge division={product.division} />
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                <div className="max-w-[240px] truncate">{product.description || "—"}</div>
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">{product.unit || "—"}</td>
              <td className="px-6 py-4 text-sm font-semibold text-[#0F172A]">
                {formatRate(product.defaultRate)}
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {product.gstPercentage != null ? `${product.gstPercentage}%` : "—"}
              </td>
              <td className="px-6 py-4">
                <StatusBadge active={product.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit"
                    onClick={() => onEdit?.(product)}
                    className={actionButtonClass}
                  >
                    <Pencil size={16} />
                  </button>
                  {product.status ? (
                    <button
                      type="button"
                      aria-label="Deactivate"
                      title="Deactivate"
                      onClick={() => onDeactivate?.(product)}
                      disabled={busyId === product._id}
                      className={actionButtonClass}
                    >
                      {busyId === product._id ? (
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
                      onClick={() => onRestore?.(product)}
                      disabled={busyId === product._id}
                      className={actionButtonClass}
                    >
                      {busyId === product._id ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <RotateCcw size={16} />
                      )}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}