import { UsersRound } from "lucide-react"
import SectionHeader from "./SectionHeader"

function InfoItem({ label, value }) {
  const isEmpty = value === null || value === undefined || value === ""

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">
        {isEmpty ? "—" : value}
      </dd>
    </div>
  )
}

export default function CustomerInfoCard({ customer, rows, icon, title, children }) {
  const address = [customer?.address, customer?.city, customer?.state, customer?.pincode]
    .filter(Boolean)
    .join(", ")

  const defaultRows = [
    { label: "Company Name", value: customer?.companyName },
    { label: "Contact Person", value: customer?.contactPerson },
    { label: "Email", value: customer?.email },
    { label: "Mobile", value: customer?.mobile },
    { label: "GST Number", value: customer?.gstNumber },
    { label: "Address", value: address },
  ]

  const displayRows = Array.isArray(rows) && rows.length > 0 ? rows : defaultRows

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={icon || <UsersRound size={16} />} title={title || "Customer Information"} />
      {children ? (
        children
      ) : (
        <div className="px-6 py-5">
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {displayRows.map((row) => (
              <InfoItem key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}