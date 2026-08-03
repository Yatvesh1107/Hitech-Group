import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getTechnicalReport, updateTechnicalReport } from "../../../services/technicalReports"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import ReportTypeBadge from "../../../components/admin/ReportTypeBadge"
import TechnicalReportStatusBadge from "../../../components/admin/TechnicalReportStatusBadge"
import TechnicalReportForm from "../../../components/admin/TechnicalReportForm"
import ErrorState from "../../../components/admin/ErrorState"

function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="h-9 bg-gray-200 rounded w-64" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded-full w-28" />
            <div className="h-6 bg-gray-200 rounded-full w-32" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-36" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {Array.from({ length: 3 }).map((_, cardIndex) => (
          <div
            key={cardIndex}
            className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
              <div className="h-4 bg-gray-200 rounded w-36" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5 px-6 py-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="h-3 bg-gray-200 rounded w-20" />
                  <div className="mt-2 h-3.5 bg-gray-200 rounded w-40" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function EditTechnicalReport() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadReport() {
      setLoading(true)
      setError("")

      try {
        const data = await getTechnicalReport({ token, id })
        if (cancelled) return
        setReport(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load the technical report. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadReport()

    return () => {
      cancelled = true
    }
  }, [token, id, refreshKey])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleSubmit = async (payload) => {
    await updateTechnicalReport({ token, id, payload })
    showToast(
      payload.status === "Completed"
        ? "Technical report updated and marked as completed."
        : "Technical report updated successfully."
    )
    navigate(`/admin/technical-reports/${id}`)
  }

  const breadcrumb = (
    <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
      <Link to="/admin/dashboard" className="hover:text-[#0B2D5C] transition-colors">
        Dashboard
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <Link to="/admin/technical-reports" className="hover:text-[#0B2D5C] transition-colors">
        Technical Reports
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <Link
        to={`/admin/technical-reports/${id}`}
        className="hover:text-[#0B2D5C] transition-colors"
      >
        Technical Report Details
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Edit Technical Report</span>
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

  if (error || !report) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <PageHeader
            title="Edit Technical Report"
            subtitle="Edit the details of this technical report."
          />
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title={`Edit ${report.reportNumber}`}
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <ReportTypeBadge reportType={report.reportType} />
              <TechnicalReportStatusBadge status={report.status} />
            </span>
          }
        />
      </div>

      <TechnicalReportForm
        token={token}
        mode="edit"
        initialValues={report}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/technical-reports/${id}`)}
        onBack={() => navigate(`/admin/technical-reports/${id}`)}
      />
    </AdminLayout>
  )
}
