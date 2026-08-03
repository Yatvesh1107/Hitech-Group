import { FileText, Send, BadgeCheck, XCircle } from "lucide-react"

const cards = [
  {
    key: "draft",
    label: "Draft",
    icon: FileText,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    accentText: "text-gray-900",
    bar: "bg-gray-300",
  },
  {
    key: "sent",
    label: "Sent",
    icon: Send,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    accentText: "text-blue-700",
    bar: "bg-blue-500",
  },
  {
    key: "approved",
    label: "Approved",
    icon: BadgeCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accentText: "text-emerald-700",
    bar: "bg-emerald-500",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    accentText: "text-red-700",
    bar: "bg-red-500",
  },
]

export default function StatisticsCards({ counts = {}, loading = false }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
      {cards.map((card) => {
        const Icon = card.icon
        const count = counts[card.key] ?? 0

        return (
          <div
            key={card.key}
            className="bg-white border border-gray-100 rounded-[22px] shadow-sm p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
            >
              <Icon size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                {card.label}
              </p>
              {loading ? (
                <div className="mt-2">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                <p className={`text-[28px] font-extrabold leading-tight ${card.accentText}`}>
                  {count.toLocaleString("en-IN")}
                </p>
              )}
            </div>
            <div className={`w-1 self-stretch rounded-full ${card.bar}`} />
          </div>
        )
      })}
    </div>
  )
}
