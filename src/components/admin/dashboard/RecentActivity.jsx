import { Link } from "react-router-dom"
import { UsersRound, FileText, Receipt, Wallet, ShieldCheck, ArrowUpRight, Clock3 } from "lucide-react"

const TYPE_META = {
  customer: { Icon: UsersRound, tile: "bg-[#0B2D5C]/10 text-[#0B2D5C]" },
  quotation: { Icon: FileText, tile: "bg-[#F4B400]/15 text-[#D9A000]" },
  invoice: { Icon: Receipt, tile: "bg-emerald-50 text-emerald-600" },
  payment: { Icon: Wallet, tile: "bg-blue-50 text-blue-600" },
  technicalReport: { Icon: ShieldCheck, tile: "bg-purple-50 text-purple-600" },
}

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
  Draft: "bg-gray-100 text-gray-600 border-gray-200",
  Sent: "bg-blue-50 text-blue-700 border-blue-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Expired: "bg-orange-50 text-orange-700 border-orange-200",
  Cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  Unpaid: "bg-red-50 text-red-700 border-red-200",
  "Partially Paid": "bg-orange-50 text-orange-700 border-orange-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

const fallbackStyle = "bg-gray-100 text-gray-600 border-gray-200"

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export default function RecentActivity({ items = [] }) {
  return (
    <section className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
      <h2 className="text-[15px] font-bold text-[#0F172A]">Recent Activity</h2>
      <p className="mt-0.5 text-xs text-[#94A3B8]">Latest customers, quotations, invoices, payments and reports</p>

      {items.length === 0 ? (
        <div className="mt-5 flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 bg-[#F4B400]/10 rounded-2xl flex items-center justify-center">
            <Clock3 size={22} className="text-[#F4B400]" />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#0F172A]">No recent activity yet</p>
          <p className="mt-1 text-xs text-[#94A3B8]">Records will appear here as you add customers, quotations, invoices and reports.</p>
        </div>
      ) : (
        <div className="mt-5 divide-y divide-gray-50">
          {items.map((item) => {
            const meta = TYPE_META[item.type] || TYPE_META.customer
            const statusClass = STATUS_STYLES[item.status] || fallbackStyle
            return (
              <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 py-3.5">
                <span className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${meta.tile}`}>
                  <meta.Icon size={18} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">{item.title}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{item.typeLabel}</p>
                </div>

                <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold shrink-0 ${statusClass}`}>
                  {item.status}
                </span>

                <span className="hidden md:block text-xs text-[#94A3B8] shrink-0 w-[86px] text-right">
                  {formatDate(item.date)}
                </span>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] border border-gray-200 text-sm font-semibold text-[#0B2D5C] hover:bg-[#0B2D5C]/5 hover:border-[#0B2D5C]/20 transition-colors shrink-0"
                >
                  View
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}