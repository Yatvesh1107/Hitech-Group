import { UsersRound } from "lucide-react"
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

export default function CustomerInfoCard({ customer }) {
  const address = [customer?.address, customer?.city, customer?.state, customer?.pincode]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<UsersRound size={16} />} title="Customer Information" />
      <div className="px-6 py-5">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <InfoItem label="Company Name" value={customer?.companyName} />
          <InfoItem label="Contact Person" value={customer?.contactPerson} />
          <InfoItem label="Email" value={customer?.email} />
          <InfoItem label="Mobile" value={customer?.mobile} />
          <InfoItem label="GST Number" value={customer?.gstNumber} />
          <InfoItem label="Address" value={address} />
        </dl>
      </div>
    </div>
  )
}
