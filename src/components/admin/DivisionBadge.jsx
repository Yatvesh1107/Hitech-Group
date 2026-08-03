const divisionStyles = {
  "Industrial Insulation": "bg-[#0B2D5C]/5 text-[#0B2D5C] border-[#0B2D5C]/15",
  "Experts in Ultrasonics": "bg-[#F4B400]/10 text-[#B8860B] border-[#F4B400]/40",
  "Precision Tech Engineering": "bg-purple-50 text-purple-700 border-purple-200",
}

export default function DivisionBadge({ division }) {
  const styles = divisionStyles[division] || "bg-gray-50 text-gray-600 border-gray-200"

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${styles}`}>
      {division}
    </span>
  )
}
