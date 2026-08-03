const statusStyles = {
  Unpaid: {
    badge: "bg-red-50 border-red-200 text-red-700",
    dot: "bg-red-500",
  },
  "Partially Paid": {
    badge: "bg-orange-50 border-orange-200 text-orange-600",
    dot: "bg-orange-500",
  },
  Paid: {
    badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
    dot: "bg-emerald-500",
  },
}

const fallback = statusStyles.Unpaid

export default function InvoiceStatusBadge({ status }) {
  const styles = statusStyles[status] || fallback

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${styles.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {status || "Unknown"}
    </span>
  )
}
