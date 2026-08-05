import { Wallet, TrendingUp, TrendingDown } from "lucide-react"

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const ITEMS = [
  { key: "totalRevenue", label: "Total Revenue", description: "Total value of all invoices", tone: "text-[#0B2D5C]", bg: "bg-[#0B2D5C]/10", Icon: TrendingUp },
  { key: "paidAmount", label: "Paid Amount", description: "Payments received against invoices", tone: "text-emerald-600", bg: "bg-emerald-50", Icon: Wallet },
  { key: "outstandingAmount", label: "Outstanding Amount", description: "Yet to be collected from customers", tone: "text-orange-600", bg: "bg-orange-50", Icon: TrendingDown },
]

export default function RevenueCard({ revenue }) {
  return (
    <section className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
      <h2 className="text-[15px] font-bold text-[#0F172A]">Revenue Summary</h2>
      <p className="mt-0.5 text-xs text-[#94A3B8]">From existing invoices and payments</p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ITEMS.map(({ key, label, description, tone, bg, Icon }) => (
          <div key={key} className="rounded-[16px] bg-[#F8FAFC] p-4">
            <div className="flex items-center gap-2">
              <span className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${bg}`}>
                <Icon size={16} className={tone} />
              </span>
              <p className="text-xs font-semibold text-[#334155]">{label}</p>
            </div>
            <p className={`mt-3 text-xl font-extrabold ${tone}`}>{formatINR(revenue?.[key])}</p>
            <p className="mt-1 text-xs text-[#94A3B8]">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}