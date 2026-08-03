import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Wrench, IndianRupee, FileText, Info, ChevronRight, Pencil } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { getService } from "../../../services/services"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import StatusBadge from "../../../components/admin/StatusBadge"
import DivisionBadge from "../../../components/admin/DivisionBadge"
import ServiceInfoCard from "../../../components/admin/ServiceInfoCard"
import ErrorState from "../../../components/admin/ErrorState"

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function formatRate(value) {
  if (value === null || value === undefined || value === "") return "—"

  const num = Number(value)
  if (Number.isNaN(num)) return "—"

  return `₹${num.toLocaleString("en-IN")}`
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
          <div className="mt-3 flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded-full w-32" />
            <div className="h-6 bg-gray-200 rounded-full w-20" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-40" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, cardIndex) => (
          <div
            key={cardIndex}
            className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
              <div className="h-4 bg-gray-200 rounded w-36" />
            </div>
            <div className="divide-y divide-gray-50">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="h-3 bg-gray-200 rounded w-20" />
                  <div className="mt-2 h-3.5 bg-gray-200 rounded w-44" />
                </div>
              ))}
            </div>
          </div>
        ))}
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
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="mt-2 h-3.5 bg-gray-200 rounded w-44" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServiceDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadService() {
      setLoading(true)
      setError("")

      try {
        const data = await getService({ token, id })
        if (cancelled) return
        setService(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load service. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadService()

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
      <Link to="/admin/services" className="hover:text-[#0B2D5C] transition-colors">
        Services
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Service Details</span>
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
          <PageHeader title="Service Details" subtitle="View the full details of this service." />
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
        onClick={() => navigate("/admin/services")}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Services
      </button>
      <button
        type="button"
        onClick={() => navigate(`/admin/services/${service._id}/edit`)}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
      >
        <Pencil size={16} className="text-[#F4B400]" />
        Edit Service
      </button>
    </div>
  )

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title="Service Details"
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-[#0F172A]">{service.serviceName || "—"}</span>
              <DivisionBadge division={service.division} />
              <StatusBadge active={service.status} />
            </span>
          }
          action={actions}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceInfoCard
          icon={<Wrench size={16} />}
          title="Basic Information"
          rows={[
            { label: "Service Name", value: service.serviceName },
            { label: "Service Code", value: service.serviceCode },
            { label: "Division", value: service.division },
          ]}
        />

        <ServiceInfoCard
          icon={<IndianRupee size={16} />}
          title="Pricing Information"
          rows={[
            { label: "Default Rate", value: formatRate(service.defaultRate) },
            { label: "Unit", value: service.unit },
            { label: "GST Percentage", value: `${service.gstPercentage}%` },
          ]}
        />

        <ServiceInfoCard icon={<FileText size={16} />} title="Description">
          <div className="px-6 py-4">
            <p className="text-sm font-medium text-[#334155] leading-relaxed whitespace-pre-line">
              {service.description || "No description available."}
            </p>
          </div>
        </ServiceInfoCard>

        <ServiceInfoCard
          icon={<Info size={16} />}
          title="System Information"
          rows={[
            { label: "Status", value: service.status ? "Active" : "Inactive" },
            { label: "Created Date", value: formatDate(service.createdAt) },
            { label: "Last Updated", value: formatDate(service.updatedAt) },
          ]}
        />
      </div>
    </AdminLayout>
  )
}
