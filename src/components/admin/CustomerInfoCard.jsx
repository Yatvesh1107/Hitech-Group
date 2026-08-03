import SectionHeader from "./SectionHeader"

function InfoRow({ label, value }) {
  const displayValue = value === null || value === undefined || value === "" ? "—" : value

  return (
    <div className="px-6 py-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">{displayValue}</dd>
    </div>
  )
}

export default function CustomerInfoCard({ icon, title, rows = [], children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={icon} title={title} />
      {children ? (
        children
      ) : (
        <dl className="divide-y divide-gray-50">
          {rows.map((row) => (
            <InfoRow key={row.label} label={row.label} value={row.value} />
          ))}
        </dl>
      )}
    </div>
  )
}
