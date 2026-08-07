import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useCompany } from "../../../context/companyContext"
import { useToast } from "../../../context/toastContext"
import { getQuotations, duplicateQuotation, updateQuotationStatus } from "../../../services/quotations"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SearchBar from "../../../components/admin/SearchBar"
import FilterBar from "../../../components/admin/FilterBar"
import StatisticsCards from "../../../components/admin/StatisticsCards"
import QuotationTable from "../../../components/admin/QuotationTable"
import StatusChangeModal from "../../../components/admin/StatusChangeModal"
import LoadingSkeleton from "../../../components/admin/LoadingSkeleton"
import EmptyState from "../../../components/admin/EmptyState"
import ErrorState from "../../../components/admin/ErrorState"

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

const STATUS_COUNTS = ["Draft", "Sent", "Approved", "Rejected"]

const NEXT_STATUSES = {
  Draft: ["Sent"],
  Sent: ["Approved", "Rejected", "Expired", "Cancelled"],
}

const STATUS_TOAST = {
  Sent: "Quotation marked as Sent.",
  Approved: "Quotation approved.",
  Rejected: "Quotation rejected.",
  Expired: "Quotation expired.",
  Cancelled: "Quotation cancelled.",
}

export default function QuotationList() {
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [quotations, setQuotations] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [counts, setCounts] = useState({ draft: 0, sent: 0, approved: 0, rejected: 0 })
  const [countsLoading, setCountsLoading] = useState(true)
  const [statusTarget, setStatusTarget] = useState(null)
  const [statusBusy, setStatusBusy] = useState(false)
  const [statusError, setStatusError] = useState("")
  const [duplicateBusyId, setDuplicateBusyId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    let cancelled = false

    async function loadQuotations() {
      setLoading(true)
      setError("")

      try {
        const data = await getQuotations({
          token,
          page,
          limit: PAGE_SIZE,
          search,
          status,
          division: activeCompany,
          dateFrom,
          dateTo,
        })
        if (cancelled) return
        setQuotations(data.quotations)
        setPagination(data.pagination)
      } catch (err) {
        if (cancelled) return
        setQuotations([])
        setError(err.message || "Failed to load quotations. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadQuotations()

    return () => {
      cancelled = true
    }
  }, [token, page, search, status, activeCompany, dateFrom, dateTo, refreshKey])

  useEffect(() => {
    let cancelled = false

    async function loadCounts() {
      setCountsLoading(true)

      try {
        const results = await Promise.all(
          STATUS_COUNTS.map((name) =>
            getQuotations({ token, limit: 1, status: name, division: activeCompany })
          )
        )
        if (cancelled) return
        setCounts({
          draft: results[0].pagination.total,
          sent: results[1].pagination.total,
          approved: results[2].pagination.total,
          rejected: results[3].pagination.total,
        })
      } catch {
        if (cancelled) return
        setCounts({ draft: 0, sent: 0, approved: 0, rejected: 0 })
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

  const handleView = (quotation) => {
    navigate(`/admin/quotations/${quotation._id}`)
  }

  const handleEdit = (quotation) => {
    navigate(`/admin/quotations/${quotation._id}/edit`)
  }

  const handleDuplicate = async (quotation) => {
    if (!quotation) return

    if (!["Rejected", "Expired"].includes(quotation.status)) {
      showToast(
        `Only Rejected or Expired quotations can be duplicated. This quotation is ${quotation.status}.`,
        "error"
      )
      return
    }

    setDuplicateBusyId(quotation._id)

    try {
      const duplicated = await duplicateQuotation({ token, id: quotation._id })
      showToast("Quotation duplicated successfully.")
      navigate(`/admin/quotations/${duplicated._id}`)
    } catch (err) {
      setDuplicateBusyId(null)
      showToast(err.message || "Failed to duplicate quotation. Please try again.", "error")
    }
  }

  const handleChangeStatus = (quotation) => {
    if (!quotation) return

    const allowed = NEXT_STATUSES[quotation.status] || []

    if (allowed.length === 0) {
      showToast(
        `Quotations in "${quotation.status}" status cannot be moved to another status.`,
        "error"
      )
      return
    }

    setStatusTarget(quotation)
  }

  const handleStatusConfirm = async (targetStatus) => {
    if (!statusTarget) return

    setStatusBusy(true)
    setStatusError("")

    try {
      await updateQuotationStatus({ token, id: statusTarget._id, status: targetStatus })
      showToast(STATUS_TOAST[targetStatus] || `Quotation marked as ${targetStatus}.`)
      setStatusTarget(null)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      setStatusError(err.message || "Failed to update status. Please try again.")
    } finally {
      setStatusBusy(false)
    }
  }

  const createButton = (
    <button
      type="button"
      onClick={() => navigate("/admin/quotations/new")}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
    >
      <Plus size={18} className="text-[#F4B400]" />
      Create Quotation
    </button>
  )

  const canGoPrevious = page > 1
  const canGoNext = page < pagination.totalPages

  return (
    <AdminLayout>
      <PageHeader
        title="Quotation Management"
        subtitle="Manage all customer quotations from one place."
        action={createButton}
      />

      <StatisticsCards counts={counts} loading={countsLoading} />

      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center gap-4">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by customer or quotation number..."
          />

          <FilterBar
            status={status}
            onStatusChange={(value) => {
              setStatus(value)
              setPage(1)
            }}
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
        ) : quotations.length === 0 ? (
          <EmptyState
            title="No Quotations Found"
            description="Start by creating your first quotation."
            icon={<FileText size={30} className="text-[#F4B400]" />}
            action={createButton}
          />
        ) : (
          <>
            <QuotationTable
              quotations={quotations}
              onView={handleView}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onChangeStatus={handleChangeStatus}
              duplicateBusyId={duplicateBusyId}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-[#64748B]">
                Showing <span className="font-semibold text-[#0F172A]">{quotations.length}</span> of{" "}
                <span className="font-semibold text-[#0F172A]">{pagination.total}</span> quotations
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

      {statusTarget && (
        <StatusChangeModal
          open
          allowedStatuses={NEXT_STATUSES[statusTarget.status] || []}
          busy={statusBusy}
          error={statusError}
          onClose={() => {
            setStatusTarget(null)
            setStatusError("")
          }}
          onConfirm={handleStatusConfirm}
        />
      )}
    </AdminLayout>
  )
}
