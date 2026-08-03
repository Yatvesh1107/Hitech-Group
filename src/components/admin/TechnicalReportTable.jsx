import { Eye, Pencil, FileDown, LoaderCircle, Trash2 } from "lucide-react"
import ReportTypeBadge from "./ReportTypeBadge"
import TechnicalReportStatusBadge from "./TechnicalReportStatusBadge"
import DivisionBadge from "./DivisionBadge"

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

export default function TechnicalReportTable({
  technicalReports,
  onView,
  onEdit,
  onPdf,
  onDelete,
  pdfBusyId,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-6 py-4 font-semibold">Report No.</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Report Type</th>
            <th className="px-6 py-4 font-semibold">Division</th>
            <th className="px-6 py-4 font-semibold">Report Date</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {technicalReports.map((report) => (
            <tr key={report._id} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4">
                <span className="font-semibold text-[#0B2D5C] text-sm">{report.reportNumber}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-[#0F172A] text-sm">
                    {report.customer?.companyName || "—"}
                  </span>
                  {report.customer?.contactPerson && (
                    <span className="mt-0.5 text-xs font-medium text-[#94A3B8]">
                      {report.customer.contactPerson}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <ReportTypeBadge reportType={report.reportType} />
              </td>
              <td className="px-6 py-4">
                <DivisionBadge division={report.division} />
              </td>
              <td className="px-6 py-4 text-sm text-[#334155]">
                {formatDate(report.reportDate)}
              </td>
              <td className="px-6 py-4">
                <TechnicalReportStatusBadge status={report.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="View"
                    title="View report details"
                    onClick={() => onView?.(report)}
                    className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit report"
                    onClick={() => onEdit?.(report)}
                    className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Generate PDF"
                    title="Generate PDF"
                    onClick={() => onPdf?.(report)}
                    disabled={pdfBusyId === report._id}
                    className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {pdfBusyId === report._id ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <FileDown size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    title="Delete"
                    onClick={() => onDelete?.(report)}
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
