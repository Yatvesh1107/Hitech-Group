import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Plus, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useCompany } from "../../../context/companyContext"
import { useToast } from "../../../context/toastContext"
import { getCompanyReportTypes, companyUsesTechnicalReports } from "../../../constants/companies"
import { getTechnicalReports, deleteTechnicalReport, getTechnicalReportPdf } from "../../../services/technicalReports"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SearchBar from "../../../components/admin/SearchBar"
import FilterBar from "../../../components/admin/FilterBar"
import TechnicalReportStatisticsCards from "../../../components/admin/TechnicalReportStatisticsCards"
import TechnicalReportTable from "../../../components/admin/TechnicalReportTable"
import LoadingSkeleton from "../../../components/admin/LoadingSkeleton"
import EmptyState from "../../../components/admin/EmptyState"
import ErrorState from "../../../components/admin/ErrorState"
import ConfirmModal from "../../../components/admin/ConfirmModal"

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

const TECHNICAL_REPORT_STATUSES = ["Draft", "Completed", "Approved", "Cancelled"]

const REPORT_TYPE_OPTIONS = [
  { value: "Ultrasonic / D.P. / Thickness Test", label: "Ultrasonic / D.P. / Thickness Test" },
  { value: "VSR", label: "VSR" },
]

export default function TechnicalReportList() {
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const companyReportTypes = getCompanyReportTypes(activeCompany)
  const usesTechnicalReports = companyUsesTechnicalReports(activeCompany)
  const reportTypeOptions = REPORT_TYPE_OPTIONS.filter((option) =>
    companyReportTypes.includes(option.value)
  )

  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [reportType, setReportType] = useState("")
  const [status, setStatus] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [technicalReports, setTechnicalReports] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [counts, setCounts] = useState({ total: 0, draft: 0, completed: 0, approved: 0 })
  const [countsLoading, setCountsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteBusy, setDeleteBusy] = useState(false)
  const [pdfBusyId, setPdfBusyId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    if (reportType && !companyReportTypes.includes(reportType)) {
      setReportType("")
      setPage(1)
    }
  }, [activeCompany, reportType, companyReportTypes])

  useEffect(() => {
    let cancelled = false

    async function loadTechnicalReports() {
      setLoading(true)
      setError("")

      try {
        const data = await getTechnicalReports({
          token,
          page,
          limit: PAGE_SIZE,
          search,
          reportType,
          division: activeCompany,
          status,
          dateFrom,
          dateTo,
        })
        if (cancelled) return
        setTechnicalReports(data.technicalReports)
        setPagination(data.pagination)
      } catch (err) {
        if (cancelled) return
        setTechnicalReports([])
        setError(err.message || "Failed to load technical reports. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTechnicalReports()

    return () => {
      cancelled = true
    }
  }, [token, page, search, reportType, status, activeCompany, dateFrom, dateTo, refreshKey])

  useEffect(() => {
    let cancelled = false

    async function loadCounts() {
      setCountsLoading(true)

      try {
        const [total, draft, completed, approved] = await Promise.all([
          getTechnicalReports({ token, limit: 1, division: activeCompany }),
          getTechnicalReports({ token, limit: 1, status: "Draft", division: activeCompany }),
          getTechnicalReports({ token, limit: 1, status: "Completed", division: activeCompany }),
          getTechnicalReports({ token, limit: 1, status: "Approved", division: activeCompany }),
        ])
        if (cancelled) return
        setCounts({
          total: total.pagination.total,
          draft: draft.pagination.total,
          completed: completed.pagination.total,
          approved: approved.pagination.total,
        })
      } catch {
        if (cancelled) return
        setCounts({ total: 0, draft: 0, completed: 0, approved: 0 })
      } finally {
        if (!cancelled) setCountsLoading(false)
      }
    }

    loadCounts()

    return () => {
      cancelled = true
    }
  }, [token, activeCompany])

  const handleRetry = () => {
    setPage(1)
    setRefreshKey((key) => key + 1)
  }

  const handleDelete = (report) => {
    setDeleteTarget(report)
  }

  const handleDownloadPdf = async (report) => {
    if (!report) return

    setPdfBusyId(report._id)

    try {
      const blob = await getTechnicalReportPdf({ token, id: report._id, download: true })

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${report.reportNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      showToast(err.message || "Failed to generate the PDF. Please try again.", "error")
    } finally {
      setPdfBusyId(null)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    setDeleteBusy(true)

    try {
      await deleteTechnicalReport({ token, id: deleteTarget._id })
      showToast(`Technical report ${deleteTarget.reportNumber} deleted.`)
      setDeleteTarget(null)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to delete technical report. Please try again.", "error")
    } finally {
      setDeleteBusy(false)
    }
  }

  const createButton = usesTechnicalReports ? (
    <Link
      to="/admin/technical-reports/new"
      className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
    >
      <Plus size={18} className="text-[#F4B400]" />
      Create Technical Report
    </Link>
  ) : null

  const canGoPrevious = page > 1
  const canGoNext = page < pagination.totalPages

  return (
    <AdminLayout>
      <PageHeader
        title="Technical Reports"
        subtitle="Manage all engineering and inspection reports from one place."
        action={createButton}
      />

      <TechnicalReportStatisticsCards counts={counts} loading={countsLoading} />

      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center gap-4">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by report number or customer..."
          />

          <FilterBar
            status={status}
            onStatusChange={(value) => {
              setStatus(value)
              setPage(1)
            }}
            reportType={reportType}
            onReportTypeChange={(value) => {
              setReportType(value)
              setPage(1)
            }}
            reportTypeOptions={REPORT_TYPE_OPTIONS}
            reportTypePlaceholder="All Report Types"
            statusOptions={TECHNICAL_REPORT_STATUSES}
            statusPlaceholder="All Status"
            dateFrom={dateFrom}
            onDateFromChange={(value) => {
              setDateFrom(value)
              setPage(1)
            }}
            dateTo={dateTo}
            onDateToChange={(value) => {
              setDateTo(value)
              setPage(1)
            }}
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : technicalReports.length === 0 ? (
          <EmptyState
            title="No Technical Reports Found"
            description="No reports match your criteria yet. Reports will appear here once they are created."
            icon={<FileText size={30} className="text-[#F4B400]" />}
            action={createButton}
          />
        ) : (
          <>
            <TechnicalReportTable
              technicalReports={technicalReports}
              onView={(report) => navigate(`/admin/technical-reports/${report._id}`)}
              onEdit={(report) => navigate(`/admin/technical-reports/${report._id}/edit`)}
              onPdf={handleDownloadPdf}
              pdfBusyId={pdfBusyId}
              onDelete={handleDelete}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-[#64748B]">
                Showing <span className="font-semibold text-[#0F172A]">{technicalReports.length}</span> of{" "}
                <span className="font-semibold text-[#0F172A]">{pagination.total}</span> technical reports
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={!canGoPrevious}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-[12px] border border-gray-200 text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <span className="text-sm text-[#64748B]">
                  Page {pagination.page} of {pagination.totalPages || 1}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-[12px] border border-gray-200 text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Technical Report?"
        message={`Are you sure you want to delete technical report ${deleteTarget?.reportNumber}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        busy={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  )
}
