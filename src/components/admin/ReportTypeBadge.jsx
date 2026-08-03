const REPORT_TYPE_STYLES = {
  Ultrasonic: "bg-blue-50 border-blue-200 text-blue-700",
  VSR: "bg-indigo-50 border-indigo-200 text-indigo-700",
  DPT: "bg-pink-50 border-pink-200 text-pink-700",
  MPT: "bg-cyan-50 border-cyan-200 text-cyan-700",
  Thickness: "bg-orange-50 border-orange-200 text-orange-700",
  "Dynamic Balancing": "bg-purple-50 border-purple-200 text-purple-700",
}

const REPORT_TYPE_LABELS = {
  Ultrasonic: "Ultrasonic Testing",
  VSR: "VSR",
  DPT: "DPT",
  MPT: "MPT",
  Thickness: "Thickness Testing",
  "Dynamic Balancing": "Dynamic Balancing",
}

export default function ReportTypeBadge({ reportType }) {
  const styles = REPORT_TYPE_STYLES[reportType] || "bg-gray-50 border-gray-200 text-gray-600"

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${styles}`}>
      {REPORT_TYPE_LABELS[reportType] || reportType || "Unknown"}
    </span>
  )
}
