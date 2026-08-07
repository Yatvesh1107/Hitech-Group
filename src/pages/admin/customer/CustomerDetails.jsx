import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  StickyNote,
  ChevronRight,
  Pencil,
  FileText,
  Receipt,
  Wallet,
  BookOpen,
  UserRound,
} from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useCompany } from "../../../context/companyContext"
import { companyUsesTechnicalReports } from "../../../constants/companies"
import { getCustomer } from "../../../services/customers"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import StatusBadge from "../../../components/admin/StatusBadge"
import CustomerInfoCard from "../../../components/admin/CustomerInfoCard"
import ErrorState from "../../../components/admin/ErrorState"
import LedgerTab from "../../../components/admin/LedgerTab"
import CustomerInvoicesTab from "../../../components/admin/CustomerInvoicesTab"
import CustomerPaymentsTab from "../../../components/admin/CustomerPaymentsTab"
import CustomerTechnicalReportsTab from "../../../components/admin/CustomerTechnicalReportsTab"

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <div className="h-9 bg-gray-200 rounded w-72" />
          <div className="mt-3 h-4 bg-gray-200 rounded w-48" />
        </div>
        <div className="flex gap-3">
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-40" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="mt-2 h-3.5 bg-gray-200 rounded w-44" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="mt-2 h-3.5 bg-gray-200 rounded w-44" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="mt-2 h-3.5 bg-gray-200 rounded w-44" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="px-6 py-5">
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="mt-2 h-3.5 bg-gray-200 rounded w-56" />
          </div>
        </div>
      </div>
    </div>
  )
}

const TAB_ICONS = {
  profile: UserRound,
  invoices: Receipt,
  payments: Wallet,
  ledger: BookOpen,
  reports: FileText,
}

export default function CustomerDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeTab, setActiveTab] = useState("profile")
  const usesTechnicalReports = companyUsesTechnicalReports(activeCompany)

  useEffect(() => {
    let cancelled = false

    async function loadCustomer() {
      setLoading(true)
      setError("")

      try {
        const data = await getCustomer({ token, id })
        if (cancelled) return
        setCustomer(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load customer. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCustomer()

    return () => {
      cancelled = true
    }
  }, [token, id, refreshKey])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const breadcrumb = (
    <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
      <Link to="/admin/dashboard" className="hover:text-[#0B2D5C] transition-colors">
        Dashboard
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <Link to="/admin/customers" className="hover:text-[#0B2D5C] transition-colors">
        Customers
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Customer Details</span>
    </nav>
  )

  if (loading) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <DetailsSkeleton />
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <PageHeader
            title="Customer Details"
            subtitle="View the full details of this customer."
          />
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </AdminLayout>
    )
  }

  const actions = (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => navigate("/admin/customers")}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Customers
      </button>
      <button
        type="button"
        onClick={() => navigate(`/admin/customers/${customer._id}/edit`)}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
      >
        <Pencil size={16} className="text-[#F4B400]" />
        Edit Customer
      </button>
    </div>
  )

  const tabs = [
    { key: "profile", label: "Profile" },
    { key: "invoices", label: "Invoices" },
    { key: "payments", label: "Payments" },
    { key: "ledger", label: "Ledger" },
    ...(usesTechnicalReports ? [{ key: "reports", label: "Technical Reports" }] : []),
  ]

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title="Customer Details"
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-[#0F172A]">{customer.companyName || "—"}</span>
              <StatusBadge active={customer.isActive} />
            </span>
          }
          action={actions}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-100 pb-px">
        {tabs.map((tab) => {
          const Icon = TAB_ICONS[tab.key]
          const isActive = activeTab === tab.key

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 h-11 rounded-t-[12px] text-sm font-semibold border border-b-0 -mb-px transition-colors ${
                isActive
                  ? "bg-white border-gray-100 text-[#0B2D5C]"
                  : "bg-transparent border-transparent text-[#94A3B8] hover:text-[#0B2D5C]"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === "profile" && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomerInfoCard
            icon={<Building2 size={16} />}
            title="Basic Information"
            rows={[
              { label: "Company Name", value: customer.companyName },
              { label: "Contact Person", value: customer.contactPerson },
              { label: "Email", value: customer.email },
              { label: "Mobile", value: customer.mobile },
            ]}
          />

          <CustomerInfoCard
            icon={<Briefcase size={16} />}
            title="Business Information"
            rows={[
              { label: "GST Number", value: customer.gstNumber },
              {
                label: "Status",
                value: customer.isActive ? "Active" : "Inactive",
              },
              { label: "Created Date", value: formatDate(customer.createdAt) },
              { label: "Last Updated", value: formatDate(customer.updatedAt) },
            ]}
          />

          <CustomerInfoCard
            icon={<MapPin size={16} />}
            title="Address"
            rows={[
              { label: "Address", value: customer.address },
              { label: "City", value: customer.city },
              { label: "State", value: customer.state },
              { label: "Pincode", value: customer.pincode },
            ]}
          />

          <CustomerInfoCard icon={<StickyNote size={16} />} title="Notes">
            <div className="px-6 py-4">
              <p className="text-sm font-medium text-[#334155] leading-relaxed whitespace-pre-line">
                {customer.notes || "No notes available."}
              </p>
            </div>
          </CustomerInfoCard>
        </div>
      )}

      {activeTab === "invoices" && <CustomerInvoicesTab token={token} customerId={customer._id} />}

      {activeTab === "payments" && <CustomerPaymentsTab token={token} customerId={customer._id} />}

      {activeTab === "ledger" && <LedgerTab token={token} customerId={customer._id} />}

      {activeTab === "reports" && usesTechnicalReports && (
        <CustomerTechnicalReportsTab token={token} customerId={customer._id} />
      )}
    </AdminLayout>
  )
}
