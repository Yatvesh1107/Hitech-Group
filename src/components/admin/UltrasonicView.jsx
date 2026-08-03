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

export default function UltrasonicView({ report }) {
  const data = report?.reportData || {}
  const observations = Array.isArray(data.observations) ? data.observations : []

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<ClipboardList size={16} />} title="Ultrasonic Report Content" />

      <div className="px-6 py-5">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <InfoItem label="Equipment Name" value={data.equipmentName} />
          <InfoItem label="Equipment Used" value={data.equipmentUsed} />
          <InfoItem label="Probe Type" value={data.probeType} />
          <InfoItem label="Frequency" value={data.frequency} />
          <InfoItem label="Couplant" value={data.couplant} />
          <InfoItem label="Standard Specification" value={data.standardSpecification} />
          <InfoItem label="Scanning Method" value={data.scanningMethod} />
          <InfoItem label="Overall Result" value={data.overallResult} />
          <InfoItem label="Recommendations" value={data.recommendations} />
        </dl>
      </div>

      <div className="px-6 pb-5">
        <h3 className="text-sm font-bold text-[#0F172A] mb-3">Observations</h3>
        {observations.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No observations recorded.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Observation</th>
                  <th className="px-4 py-3 font-semibold">Result</th>
                  <th className="px-4 py-3 font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {observations.map((row, index) => (
                  <tr key={row.key || index}>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.location || "—"}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.observation || "—"}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.result || "—"}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.remarks || "—"}</td>
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
