import { Building2, CalendarRange, User, Tag, Clock4, Info } from "lucide-react"

const formatDateTime = (value) => {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  const datePart = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  const timePart = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  return `${datePart}, ${timePart}`
}

export default function SystemInfo({ system }) {
  const rows = [
    { label: "Company Name", value: system?.companyName || "—", Icon: Building2 },
    { label: "Financial Year", value: system?.financialYear || "—", Icon: CalendarRange },
    { label: "Logged-in User", value: system?.user?.name || "—", Icon: User },
    { label: "Application Version", value: system?.appVersion ? `v${system.appVersion}` : "—", Icon: Tag },
    { label: "Last Login", value: formatDateTime(system?.lastLogin), Icon: Clock4 },
  ]

  return (
    <section className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
      <h2 className="text-[15px] font-bold text-[#0F172A]">System Information</h2>
      <p className="mt-0.5 text-xs text-[#94A3B8]">Your workspace details</p>

      <div className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-1">
        {rows.map(({ label, value, Icon }) => (
          <div key={label} className="flex items-center gap-3 py-3 border-b border-gray-50">
            <span className="w-9 h-9 rounded-[10px] bg-[#0B2D5C]/5 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-[#0B2D5C]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[#94A3B8]">{label}</p>
              <p className="text-sm font-semibold text-[#0F172A] truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-[14px] px-4 py-3">
        <Info size={15} className="text-[#F4B400] shrink-0 mt-0.5" />
        <p className="text-xs text-[#64748B] leading-relaxed">
          All figures reflect live data from customers, quotations, invoices, payments and technical reports.
        </p>
      </div>
    </section>
  )
}