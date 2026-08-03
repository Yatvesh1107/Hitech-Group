import { Wallet } from "lucide-react"
import SectionHeader from "./SectionHeader"
import InvoiceStatusBadge from "./InvoiceStatusBadge"

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function InfoItem({ label, value, valueClassName = "text-[#334155]" }) {
  const isEmpty = value === null || value === undefined || value === ""

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
      <dd className={`mt-1.5 text-sm font-medium break-words ${isEmpty ? "text-[#334155]" : valueClassName}`}>
        {isEmpty ? "—" : value}
      </dd>
    </div>
  )
}

export default function PaymentCard({ invoice }) {
  const grandTotal = Number(invoice?.grandTotal) || 0
  const paidAmount = Number(invoice?.paidAmount) || 0
  const outstandingAmount = Number(invoice?.outstandingAmount) || 0
  const isPaid = outstandingAmount <= 0

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<Wallet size={16} />} title="Payment Information" />
      <div className="px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Payment Status
          </span>
          <InvoiceStatusBadge status={invoice?.paymentStatus} />
        </div>

        <dl className="mt-5 grid sm:grid-cols-2 gap-5">
          <InfoItem label="Invoice Amount" value={formatINR(grandTotal)} />
          <InfoItem label="Due Date" value={formatDate(invoice?.dueDate)} />
          <InfoItem label="Paid Amount" value={formatINR(paidAmount)} valueClassName="text-emerald-600" />
          <InfoItem
            label="Outstanding Amount"
            value={formatINR(outstandingAmount)}
            valueClassName={isPaid ? "text-emerald-600" : "text-red-600"}
          />
        </dl>
      </div>
    </div>
  )
}
