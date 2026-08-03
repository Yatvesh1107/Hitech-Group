import { History } from "lucide-react"
import SectionHeader from "./SectionHeader"
import QuotationStatusBadge from "./QuotationStatusBadge"
import InvoiceStatusBadge from "./InvoiceStatusBadge"
import TechnicalReportStatusBadge from "./TechnicalReportStatusBadge"

const DOT_STYLES = {
  Created: "bg-[#0B2D5C]",
  Updated: "bg-gray-400",
  StatusChanged: "bg-[#F4B400]",
  Converted: "bg-emerald-500",
  Payment: "bg-teal-500",
}

const VARIANTS = {
  quotation: {
    StatusBadge: QuotationStatusBadge,
    labels: {
      Created: "Quotation Created",
      Updated: "Quotation Updated",
      StatusChanged: "Status Changed",
      Converted: "Quotation Converted to Invoice",
    },
    body: (activity) => {
      if (activity.type === "Created") {
        return `Quotation created with status ${activity.newStatus || ""}`.trim()
      }
      if (activity.type === "Converted") {
        return "An invoice was created from this quotation"
      }
      if (activity.type === "StatusChanged") {
        return "Quotation status changed"
      }
      return "Quotation details updated"
    },
  },
  invoice: {
    StatusBadge: InvoiceStatusBadge,
    labels: {
      Created: "Invoice Created",
      Updated: "Invoice Updated",
      StatusChanged: "Payment Status Changed",
      Converted: "Converted from Quotation",
      Payment: "Payment Received",
    },
    body: (activity) => {
      if (activity.type === "Created") {
        return `Invoice created with payment status ${activity.newStatus || ""}`.trim()
      }
      if (activity.type === "Converted") {
        return activity.quotationNumber
          ? `Source quotation ${activity.quotationNumber}`
          : "This invoice was created from a quotation"
      }
      if (activity.type === "StatusChanged") {
        return "Invoice payment status changed"
      }
      if (activity.type === "Payment") {
        const parts = []
        if (activity.paymentMethod) parts.push(activity.paymentMethod)
        if (activity.amount) parts.push(formatINR(activity.amount))
        const summary = parts.join(" · ")
        const reference = activity.referenceNumber ? ` (${activity.referenceNumber})` : ""
        return `${summary} received${reference}`
      }
      return "Invoice details updated"
    },
  },
  report: {
    StatusBadge: TechnicalReportStatusBadge,
    labels: {
      Created: "Report Created",
      Updated: "Report Updated",
      StatusChanged: "Current Status",
    },
    body: (activity) => {
      if (activity.type === "Created") {
        return `Report created with status ${activity.newStatus || ""}`.trim()
      }
      return "Report details updated"
    },
  },
}

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function formatDateTime(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return `${datePart} · ${timePart}`
}

function ActivityMeta({ activity }) {
  const actor = activity.user?.name || activity.user?.email || "—"

  return (
    <p className="mt-1.5 text-xs text-[#94A3B8]">
      {actor} · {formatDateTime(activity.createdAt)}
    </p>
  )
}

export default function TimelineCard({ activities = [], type = "quotation" }) {
  const { StatusBadge, labels, body } = VARIANTS[type] || VARIANTS.quotation
  const sorted = [...activities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<History size={16} />} title="Activity Timeline" />

      <div className="p-6">
        {sorted.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No activity recorded yet.</p>
        ) : (
          <ol className="relative">
            {sorted.map((activity, index) => {
              const label = labels[activity.type] || labels.Updated
              const dot = DOT_STYLES[activity.type] || DOT_STYLES.Updated
              const isLast = index === sorted.length - 1

              return (
                <li key={activity._id} className="relative pl-8 pb-6 last:pb-0">
                  {!isLast && (
                    <span
                      className="absolute left-[7px] top-5 bottom-0 w-px bg-gray-100"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-white shadow ${dot}`}
                    aria-hidden="true"
                  />

                  <p className="text-sm font-bold text-[#0F172A]">{label}</p>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    {activity.type === "StatusChanged" ? (
                      activity.previousStatus ? (
                        <>
                          <StatusBadge status={activity.previousStatus} />
                          <span className="text-sm text-[#94A3B8]">→</span>
                          <StatusBadge status={activity.newStatus} />
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-[#64748B]">Current status:</span>
                          <StatusBadge status={activity.newStatus} />
                        </>
                      )
                    ) : (
                      <p className="text-sm text-[#64748B]">{body(activity)}</p>
                    )}
                  </div>

                  <ActivityMeta activity={activity} />
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </div>
  )
}
