import { Link } from "react-router-dom"
import { FileText, Receipt, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react"

const ITEMS = [
  {
    key: "draftQuotations",
    label: "Draft Quotations",
    description: "Quotations awaiting finalisation",
    to: "/admin/quotations",
    Icon: FileText,
    tone: "bg-[#F4B400]/15 text-[#D9A000]",
  },
  {
    key: "pendingQuotations",
    label: "Pending Quotations",
    description: "Sent, awaiting customer approval",
    to: "/admin/quotations",
    Icon: FileText,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    key: "pendingPayments",
    label: "Pending Payments",
    description: "Invoices with an outstanding amount",
    to: "/admin/invoices",
    Icon: Receipt,
    tone: "bg-orange-50 text-orange-600",
  },
  {
    key: "draftTechnicalReports",
    label: "Draft Technical Reports",
    description: "Reports yet to be completed",
    to: "/admin/technical-reports",
    Icon: ShieldCheck,
    tone: "bg-purple-50 text-purple-600",
  },
]

export default function PendingWork({ pending }) {
  const totalPending = Object.values(pending || {}).reduce((sum, value) => sum + Number(value || 0), 0)

  return (
    <section className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
      <h2 className="text-[15px] font-bold text-[#0F172A]">Pending Work</h2>
      <p className="mt-0.5 text-xs text-[#94A3B8]">Items that need your attention</p>

      {totalPending === 0 ? (
        <div className="mt-5 flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={22} className="text-emerald-600" />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#0F172A]">All caught up</p>
          <p className="mt-1 text-xs text-[#94A3B8]">No pending quotations, payments or draft reports.</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {ITEMS.map(({ key, label, description, to, Icon, tone }) => {
            const count = Number(pending?.[key] || 0)
            return (
              <Link
                key={key}
                to={to}
                className="group flex items-center gap-3 border border-gray-100 rounded-[16px] p-4 hover:border-[#F4B400]/60 hover:bg-[#F8FAFC] transition-all"
              >
                <span className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${tone}`}>
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0F172A]">{label}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5 truncate">{description}</p>
                </div>
                {count > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-full bg-[#0B2D5C] text-white text-xs font-bold">
                    {count.toLocaleString("en-IN")}
                  </span>
                )}
                <ChevronRight size={16} className="text-[#94A3B8] group-hover:text-[#0B2D5C] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}