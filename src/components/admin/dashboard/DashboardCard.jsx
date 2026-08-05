import { Link } from "react-router-dom"

const TONES = {
  navy: { tile: "bg-[#0B2D5C]/10", icon: "text-[#0B2D5C]" },
  gold: { tile: "bg-[#F4B400]/15", icon: "text-[#D9A000]" },
  emerald: { tile: "bg-emerald-50", icon: "text-emerald-600" },
  blue: { tile: "bg-blue-50", icon: "text-blue-600" },
  purple: { tile: "bg-purple-50", icon: "text-purple-600" },
  orange: { tile: "bg-orange-50", icon: "text-orange-600" },
}

export default function DashboardCard({ icon, label, count, description, tone = "navy", link }) {
  const palette = TONES[tone] || TONES.navy
  const Icon = icon

  const body = (
    <div className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl font-extrabold text-[#0F172A]">
            {Number(count || 0).toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0F172A]">{label}</p>
        </div>
        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${palette.tile}`}>
          <Icon size={22} className={palette.icon} />
        </div>
      </div>
      {description && (
        <p className="mt-3 text-xs text-[#94A3B8] leading-relaxed">{description}</p>
      )}
    </div>
  )

  if (link) {
    return (
      <Link to={link} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B400]/50 rounded-[22px]">
        {body}
      </Link>
    )
  }

  return body
}