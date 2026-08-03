const statusStyles = {
  Draft: {
    badge: "bg-gray-100 border-gray-200 text-gray-600",
    dot: "bg-gray-400",
  },
  Completed: {
    badge: "bg-blue-50 border-blue-200 text-blue-700",
    dot: "bg-blue-500",
  },
  Approved: {
    badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
    dot: "bg-emerald-500",
  },
  Cancelled: {
    badge: "bg-red-50 border-red-200 text-red-700",
    dot: "bg-red-500",
  },
}

const fallback = statusStyles.Draft

export default function TechnicalReportStatusBadge({ status }) {
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
