import { useEffect, useState } from "react"
import { UsersRound, FileText, Receipt, Wallet, Hourglass, ShieldCheck, LayoutDashboard, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { useCompany } from "../../context/companyContext"
import { companyUsesTechnicalReports } from "../../constants/companies"
import AdminLayout from "../../components/admin/AdminLayout"
import ErrorState from "../../components/admin/ErrorState"
import DashboardCard from "../../components/admin/dashboard/DashboardCard"
import RevenueCard from "../../components/admin/dashboard/RevenueCard"
import QuickActions from "../../components/admin/dashboard/QuickActions"
import RecentActivity from "../../components/admin/dashboard/RecentActivity"
import PendingWork from "../../components/admin/dashboard/PendingWork"
import SystemInfo from "../../components/admin/dashboard/SystemInfo"
import { getDashboardData } from "../../services/dashboard"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

const todayLabel = () =>
  new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

const OVERVIEW_CARDS = [
  { key: "customers", label: "Total Customers", description: "Registered customer companies", tone: "navy", icon: UsersRound, link: "/admin/customers", show: true },
  { key: "quotations", label: "Total Quotations", description: "All quotations created", tone: "gold", icon: FileText, link: "/admin/quotations", show: true },
  { key: "invoices", label: "Total Invoices", description: "All invoices issued", tone: "emerald", icon: Receipt, link: "/admin/invoices", show: true },
  { key: "payments", label: "Payments Received", description: "Payments recorded against invoices", tone: "blue", icon: Wallet, link: "/admin/invoices", show: true },
  { key: "pendingPayments", label: "Pending Payments", description: "Invoices with an outstanding balance", tone: "orange", icon: Hourglass, link: "/admin/invoices", show: true },
  { key: "technicalReports", label: "Technical Reports", description: "Inspection reports created", tone: "purple", icon: ShieldCheck, link: "/admin/technical-reports", show: "reports" },
]

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="mt-3 h-7 bg-gray-200 rounded w-64" />
        <div className="mt-2 h-4 bg-gray-200 rounded w-48" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="w-full">
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-28" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-[14px]" />
            </div>
            <div className="mt-3 h-3 bg-gray-200 rounded w-40" />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-40" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-[12px]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="h-7 w-16 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-32" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded-[16px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { token, user } = useAuth()
  const { activeCompany, activeCompanyName } = useCompany()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      setLoading(true)
      setError("")
      try {
        const result = await getDashboardData({ token, division: activeCompany })
        if (cancelled) return
        setData(result)
      } catch (err) {
        if (cancelled) return
        setData(null)
        setError(err.message || "Failed to load the dashboard. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      cancelled = true
    }
  }, [token, activeCompany, refreshKey])

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors">
          <ArrowLeft size={14} /> Back to Website
        </Link>
        <span>/</span>
        <span className="inline-flex items-center gap-1.5 text-[#0B2D5C] font-semibold">
          <LayoutDashboard size={14} /> Dashboard
        </span>
      </div>

      <div className="mt-6 space-y-6">
        <div className="bg-white border border-gray-100 rounded-[22px] p-6 md:p-7 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#F4B400]">{getGreeting()}</p>
            <h1 className="mt-1 text-2xl md:text-[30px] font-extrabold text-[#0B2D5C] leading-[1.1]">
              {user?.name || "Admin"}
            </h1>
            <p className="mt-1.5 text-sm text-[#64748B]">{todayLabel()}</p>
          </div>
          <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 rounded-[14px] px-4 py-3 md:px-5 self-start md:self-center">
            <span className="w-9 h-9 rounded-[10px] bg-[#0B2D5C]/10 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} className="text-[#0B2D5C]" />
            </span>
            <div>
              <p className="text-xs text-[#94A3B8]">Company</p>
              <p className="text-sm font-semibold text-[#0F172A]">{activeCompanyName || "—"}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <DashboardSkeleton />
        ) : error ? (
          <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm">
            <ErrorState message={error} onRetry={() => setRefreshKey((key) => key + 1)} />
          </div>
        ) : (
          <>
            <section>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {OVERVIEW_CARDS.filter((card) => card.show === true || (card.show === "reports" && companyUsesTechnicalReports(activeCompany))).map(({ key, label, description, tone, icon, link }) => (
                  <DashboardCard
                    key={key}
                    icon={icon}
                    label={label}
                    count={data?.overview?.[key]}
                    description={description}
                    tone={tone}
                    link={link}
                  />
                ))}
              </div>
            </section>

            <RevenueCard revenue={data?.revenue} />

            <QuickActions />

            <div className="grid lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <RecentActivity items={data?.recentActivity || []} />
              </div>
              <PendingWork pending={data?.pending} />
            </div>

            <SystemInfo system={data?.system} />
          </>
        )}
      </div>
    </AdminLayout>
  )
}