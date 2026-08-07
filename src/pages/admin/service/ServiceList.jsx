import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, ChevronLeft, ChevronRight, Wrench } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useCompany } from "../../../context/companyContext"
import { useToast } from "../../../context/toastContext"
import { getServices, deactivateService, restoreService } from "../../../services/services"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SearchBar from "../../../components/admin/SearchBar"
import ServiceTable from "../../../components/admin/ServiceTable"
import LoadingSkeleton from "../../../components/admin/LoadingSkeleton"
import EmptyState from "../../../components/admin/EmptyState"
import ErrorState from "../../../components/admin/ErrorState"
import ConfirmModal from "../../../components/admin/ConfirmModal"

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

const selectClass =
  "h-11 pl-3.5 pr-9 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all appearance-none cursor-pointer"

export default function ServiceList() {
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)
  const [services, setServices] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [deactivating, setDeactivating] = useState(null)
  const [deactivateBusy, setDeactivateBusy] = useState(false)
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    let cancelled = false

    async function loadServices() {
      setLoading(true)
      setError("")

      try {
        const data = await getServices({ token, page, limit: PAGE_SIZE, search, division: activeCompany, status })
        if (cancelled) return
        setServices(data.services)
        setPagination(data.pagination)
      } catch (err) {
        if (cancelled) return
        setServices([])
        setError(err.message || "Failed to load services. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadServices()

    return () => {
      cancelled = true
    }
  }, [token, page, search, activeCompany, status, refreshKey])

  const handleRetry = () => {
    setPage(1)
    setRefreshKey((key) => key + 1)
  }

  const handleView = (service) => {
    navigate(`/admin/services/${service._id}`)
  }

  const handleEdit = (service) => {
    navigate(`/admin/services/${service._id}/edit`)
  }

  const handleDeactivateClick = (service) => {
    setDeactivating(service)
  }

  const handleDeactivateConfirm = async () => {
    if (!deactivating || deactivateBusy) return

    setDeactivateBusy(true)

    try {
      await deactivateService({ token, id: deactivating._id })
      showToast("Service deactivated successfully.")
      setDeactivating(null)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to deactivate service.", "error")
    } finally {
      setDeactivateBusy(false)
    }
  }

  const handleRestore = async (service) => {
    if (busyId) return

    setBusyId(service._id)

    try {
      await restoreService({ token, id: service._id })
      showToast("Service restored successfully.")
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to restore service.", "error")
    } finally {
      setBusyId(null)
    }
  }

  const handleStatusChange = (value) => {
    setStatus(value)
    setPage(1)
  }

  const addServiceButton = (
    <button
      type="button"
      onClick={() => navigate("/admin/services/new")}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
    >
      <Plus size={18} className="text-[#F4B400]" />
      Add Service
    </button>
  )

  const canGoPrevious = page > 1
  const canGoNext = page < pagination.totalPages

  return (
    <AdminLayout>
      <PageHeader
        title="Service Management"
        subtitle="Manage all business services offered by HITECH GROUP."
        action={addServiceButton}
      />

      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by service name..."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative">
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={selectClass}
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : services.length === 0 ? (
          <EmptyState
            title="No Services Found"
            description="Start by adding your first service."
            icon={<Wrench size={30} className="text-[#F4B400]" />}
            action={addServiceButton}
          />
        ) : (
          <>
            <ServiceTable
              services={services}
              onView={handleView}
              onEdit={handleEdit}
              onDeactivate={handleDeactivateClick}
              onRestore={handleRestore}
              busyId={busyId}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-[#64748B]">
                Showing <span className="font-semibold text-[#0F172A]">{services.length}</span> of{" "}
                <span className="font-semibold text-[#0F172A]">{pagination.total}</span> services
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
        open={Boolean(deactivating)}
        title="Deactivate Service?"
        message="Inactive services will not appear while creating new quotations."
        confirmLabel="Deactivate"
        busy={deactivateBusy}
        onConfirm={handleDeactivateConfirm}
        onCancel={() => {
          if (!deactivateBusy) setDeactivating(null)
        }}
      />
    </AdminLayout>
  )
}
