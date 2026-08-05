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

function ContentCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<ClipboardList size={16} />} title={title} />
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

export default function UltrasonicDpThicknessView({ report }) {
  const data = report?.reportData || {}
  const parts = Array.isArray(data.parts) ? data.parts : []
  const sections = Array.isArray(data.sections) ? data.sections : []

  const testingDetails = [
    ["Equipment Used", data.equipmentUsed],
    ["Place & Date of Testing", data.placeAndDateOfTesting],
    ["Probe / Frequency", data.probeFrequency],
    ["Medium Of Couplant", data.mediumOfCouplant],
    ["Standard Specification", data.standardSpecification],
    ["Procedure & Technique", data.procedureAndTechnique],
    ["Scanning Method", data.scanningMethod],
    ["Engineer Name", data.engineerName],
  ]

  return (
    <div className="space-y-6">
      <ContentCard title="Report Information">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <InfoItem label="Kind Attention" value={data.kindAttention} />
        </dl>
      </ContentCard>

      <ContentCard title="Part Information">
        {parts.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No parts recorded.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="px-4 py-3 font-semibold">Sr No</th>
                  <th className="px-4 py-3 font-semibold">Part Name</th>
                  <th className="px-4 py-3 font-semibold">Material Specification</th>
                  <th className="px-4 py-3 font-semibold">Drawing Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {parts.map((row, index) => (
                  <tr key={row.key || index}>
                    <td className="px-4 py-3 text-sm text-[#334155]">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.partName || "—"}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.materialSpecification || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.drawingNumber || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ContentCard>

      <ContentCard title="Testing Details">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          {testingDetails.map(([label, value]) => (
            <InfoItem key={label} label={label} value={value} />
          ))}
        </dl>
        {data.standardNotes && (
          <div className="mt-5 border-t border-gray-100 pt-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Standard Notes
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words whitespace-pre-line">
              {data.standardNotes}
            </dd>
          </div>
        )}
      </ContentCard>

      {sections.length === 0 ? (
        <ContentCard title="Inspection Sections">
          <p className="text-sm text-[#94A3B8]">No inspection sections recorded.</p>
        </ContentCard>
      ) : (
        sections.map((section, sectionIndex) => {
          const rows = Array.isArray(section.rows) ? section.rows : []

          return (
            <ContentCard key={section.key || sectionIndex} title={section.title || `Section ${sectionIndex + 1}`}>
              {rows.length === 0 ? (
                <p className="text-sm text-[#94A3B8]">No rows recorded for this section.</p>
              ) : (
                <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
                  <table className="w-full min-w-[520px] text-left">
                    <thead>
                      <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                        <th className="px-4 py-3 font-semibold">Sr No</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {rows.map((row, index) => (
                        <tr key={row.key || index}>
                          <td className="px-4 py-3 text-sm text-[#334155]">{index + 1}</td>
                          <td className="px-4 py-3 text-sm text-[#334155]">{row.description || "—"}</td>
                          <td className="px-4 py-3 text-sm text-[#334155]">{row.remark || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ContentCard>
          )
        })
      )}

      <ContentCard title="Final Notes">
        <p className="text-sm font-medium text-[#334155] break-words whitespace-pre-line">
          {data.finalNotes || "—"}
        </p>
      </ContentCard>

      <ContentCard title="Prepared By / Authorized By">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <InfoItem label="Prepared By" value={data.preparedBy} />
          <InfoItem label="Authorized By" value={data.authorizedBy} />
        </dl>
      </ContentCard>

      {report?.remarks && (
        <ContentCard title="Remarks">
          <p className="text-sm font-medium text-[#334155] break-words whitespace-pre-line">
            {report.remarks}
          </p>
        </ContentCard>
      )}
    </div>
  )
}
