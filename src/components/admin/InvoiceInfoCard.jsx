import { Building2 } from "lucide-react"
import SectionHeader from "./SectionHeader"

function InfoRow({ label, value }) {
  const isEmpty = value === null || value === undefined || value === ""

  return (
    <div className="px-6 py-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">{isEmpty ? "—" : value}</dd>
    </div>
  )
}

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export default function InvoiceInfoCard({ invoice }) {
  const source = invoice?.quotationId?._id ? "Quotation" : "Manual"

  const rows = [
    { label: "Invoice Number", value: invoice?.invoiceNumber },
    { label: "Invoice Source", value: source },
    { label: "Division", value: invoice?.division },
    ...(invoice?.quotationId?._id
      ? [{ label: "Related Quotation Number", value: invoice?.quotationId?.quotationNumber }]
      : []),
    { label: "Created By", value: invoice?.createdBy?.name || invoice?.createdBy?.email },
    { label: "Created Date", value: formatDate(invoice?.createdAt) },
    { label: "Last Updated", value: formatDate(invoice?.updatedAt) },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<Building2 size={16} />} title="Invoice Information" />
      <dl className="divide-y divide-gray-50">
        {rows.map((row) => (
          <InfoRow key={row.label} label={row.label} value={row.value} />
        ))}
      </dl>
    </div>
  )
}
