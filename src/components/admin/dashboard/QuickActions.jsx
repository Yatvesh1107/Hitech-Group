import { Link } from "react-router-dom"
import { UsersRound, FileText, Receipt, Wallet, ShieldCheck } from "lucide-react"
import { useCompany } from "../../../context/companyContext"
import { companyUsesTechnicalReports } from "../../../constants/companies"

const ACTIONS = [
  {
    label: "New Customer",
    description: "Register a customer",
    to: "/admin/customers/new",
    Icon: UsersRound,
    tone: "bg-[#0B2D5C]/10 text-[#0B2D5C]",
  },
  {
    label: "New Quotation",
    description: "Create a quotation",
    to: "/admin/quotations/new",
    Icon: FileText,
    tone: "bg-[#F4B400]/15 text-[#D9A000]",
  },
  {
    label: "Create Invoice",
    description: "Generate an invoice",
    to: "/admin/invoices/new",
    Icon: Receipt,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Record Payment",
    description: "Log a payment received",
    to: "/admin/invoices",
    Icon: Wallet,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    label: "Create Technical Report",
    description: "Start an inspection report",
    to: "/admin/technical-reports/new",
    Icon: ShieldCheck,
    tone: "bg-purple-50 text-purple-600",
  },
]

export default function QuickActions() {
  const { activeCompany } = useCompany()

  const actions = ACTIONS.filter((action) => {
    if (action.to === "/admin/technical-reports/new") {
      return companyUsesTechnicalReports(activeCompany)
    }
    return true
  })

  return (
    <section className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
      <h2 className="text-[15px] font-bold text-[#0F172A]">Quick Actions</h2>
      <p className="mt-0.5 text-xs text-[#94A3B8]">Jump straight into your most used tasks</p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map(({ label, description, to, Icon, tone }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-3 border border-gray-100 rounded-[16px] p-4 hover:border-[#F4B400]/60 hover:bg-[#F8FAFC] hover:shadow-sm transition-all"
          >
            <span className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${tone}`}>
              <Icon size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-[#0F172A]">{label}</span>
              <span className="block text-xs text-[#94A3B8] mt-0.5">{description}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}