import { ClipboardList } from "lucide-react"
import SectionHeader from "./SectionHeader"

function InfoItem({ label, value }) {
  const isEmpty = value === null || value === undefined || value === ""

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">{isEmpty ? "—" : value}</dd>
    </div>
  )
}

function formatDateTime(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timePart = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

  return `${datePart} · ${timePart}`
}

function formatDuration(value) {
  if (value === null || value === undefined || value === "") return "—"
  return `${value} hrs`
}

export default function VSRView({ report }) {
  const data = report?.reportData || {}
  const parameters = Array.isArray(data.parameters) ? data.parameters : []

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<ClipboardList size={16} />} title="VSR Report Content" />

      <div className="px-6 py-5">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <InfoItem label="Machine Name" value={data.machineName} />
          <InfoItem label="Operator" value={data.operator} />
          <InfoItem label="Start Time" value={formatDateTime(data.startTime)} />
          <InfoItem label="End Time" value={formatDateTime(data.endTime)} />
          <InfoItem label="Duration" value={formatDuration(data.duration)} />
        </dl>
      </div>

      <div className="px-6 pb-5">
        <h3 className="text-sm font-bold text-[#0F172A] mb-3">Parameters</h3>
        {parameters.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No parameters recorded.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="px-4 py-3 font-semibold">Parameter</th>
                  <th className="px-4 py-3 font-semibold">Minimum</th>
                  <th className="px-4 py-3 font-semibold">Maximum</th>
                  <th className="px-4 py-3 font-semibold">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {parameters.map((row, index) => (
                  <tr key={row.key || index}>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.parameter || "—"}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.minimum === "" || row.minimum == null ? "—" : row.minimum}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.maximum === "" || row.maximum == null ? "—" : row.maximum}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.average === "" || row.average == null ? "—" : row.average}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="px-6 py-5 border-t border-gray-100">
        <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Remarks</dt>
        <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">
          {report?.remarks || "—"}
        </dd>
      </div>
    </div>
  )
}
