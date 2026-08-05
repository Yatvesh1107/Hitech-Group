const REPORT_TYPE_STYLES = {
  "Ultrasonic / D.P. / Thickness Test": "bg-blue-50 border-blue-200 text-blue-700",
  VSR: "bg-indigo-50 border-indigo-200 text-indigo-700",
}

const REPORT_TYPE_LABELS = {
  "Ultrasonic / D.P. / Thickness Test": "Ultrasonic / D.P. / Thickness Test",
  VSR: "VSR",
}

export default function ReportTypeBadge({ reportType }) {
  const styles = REPORT_TYPE_STYLES[reportType] || "bg-gray-50 border-gray-200 text-gray-600"

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${styles}`}>
      {REPORT_TYPE_LABELS[reportType] || reportType || "Unknown"}
    </span>
  )
}
