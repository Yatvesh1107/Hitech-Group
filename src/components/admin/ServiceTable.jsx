import { Eye, Pencil, Power, RotateCcw, LoaderCircle } from "lucide-react"
import StatusBadge from "./StatusBadge"
import DivisionBadge from "./DivisionBadge"

const actionButtonClass =
  "p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#0B2D5C]/5 transition-colors"

function formatRate(value) {
  if (value === null || value === undefined || value === "") return "—"

  const num = Number(value)
  if (Number.isNaN(num)) return "—"

  return num.toLocaleString("en-IN")
}

export default function ServiceTable({ services, onView, onEdit, onDeactivate, onRestore, busyId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-6 py-4 font-semibold">Service Name</th>
            <th className="px-6 py-4 font-semibold">Division</th>
            {/* <th className="px-6 py-4 font-semibold">Unit</th> */}
            {/* <th className="px-6 py-4 font-semibold">Default Rate</th> */}
            <th className="px-6 py-4 font-semibold">GST %</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {services.map((service) => (
            <tr key={service._id} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#0F172A]">{service.serviceName}</span>
                  {service.serviceCode && (
                    <span className="mt-0.5 text-xs font-medium text-[#94A3B8]">{service.serviceCode}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <DivisionBadge division={service.division} />
              </td>
              {/* <td className="px-6 py-4 text-sm text-[#334155]">{service.unit || "—"}</td> */}
              {/* <td className="px-6 py-4 text-sm font-semibold text-[#334155]">
                {service.defaultRate !== null && service.defaultRate !== undefined
                  ? `₹${formatRate(service.defaultRate)}`
                  : "—"}
              </td> */}
              <td className="px-6 py-4 text-sm text-[#334155]">
                {service.gstPercentage !== null && service.gstPercentage !== undefined
                  ? `${service.gstPercentage}%`
                  : "—"}
              </td>
              <td className="px-6 py-4">
                <StatusBadge active={service.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="View"
                    title="View"
                    onClick={() => onView?.(service)}
                    className={actionButtonClass}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit"
                    onClick={() => onEdit?.(service)}
                    className={actionButtonClass}
                  >
                    <Pencil size={16} />
                  </button>
                  {service.status ? (
                    <button
                      type="button"
                      aria-label="Deactivate"
                      title="Deactivate"
                      onClick={() => onDeactivate?.(service)}
                      disabled={busyId === service._id}
                      className={`${actionButtonClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {busyId === service._id ? (
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
                      onClick={() => onRestore?.(service)}
                      disabled={busyId === service._id}
                      className={`${actionButtonClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {busyId === service._id ? (
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
