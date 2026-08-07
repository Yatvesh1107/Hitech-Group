import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useCompany } from "../../../context/companyContext"
import { useToast } from "../../../context/toastContext"
import { getCustomers, deactivateCustomer, restoreCustomer } from "../../../services/customers"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SearchBar from "../../../components/admin/SearchBar"
import CustomerTable from "../../../components/admin/CustomerTable"
import LoadingSkeleton from "../../../components/admin/LoadingSkeleton"
import EmptyState from "../../../components/admin/EmptyState"
import ErrorState from "../../../components/admin/ErrorState"
import ConfirmModal from "../../../components/admin/ConfirmModal"

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

export default function Customers() {
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [customers, setCustomers] = useState([])
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

    async function loadCustomers() {
      setLoading(true)
      setError("")

      try {
        const data = await getCustomers({ token, page, limit: PAGE_SIZE, search, division: activeCompany })
        if (cancelled) return
        setCustomers(data.customers)
        setPagination(data.pagination)
      } catch (err) {
        if (cancelled) return
        setCustomers([])
        setError(err.message || "Failed to load customers. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCustomers()

    return () => {
      cancelled = true
    }
  }, [token, page, search, activeCompany, refreshKey])

  const handleRetry = () => {
    setPage(1)
    setRefreshKey((key) => key + 1)
  }

  const handleEdit = (customer) => {
    navigate(`/admin/customers/${customer._id}/edit`)
  }

  const handleView = (customer) => {
    navigate(`/admin/customers/${customer._id}`)
  }

  const handleDeactivateClick = (customer) => {
    setDeactivating(customer)
  }

  const handleDeactivateConfirm = async () => {
    if (!deactivating || deactivateBusy) return

    setDeactivateBusy(true)

    try {
      await deactivateCustomer({ token, id: deactivating._id })
      showToast("Customer deactivated successfully.")
      setDeactivating(null)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to deactivate customer.", "error")
    } finally {
      setDeactivateBusy(false)
    }
  }

  const handleRestore = async (customer) => {
    if (busyId) return

    setBusyId(customer._id)

    try {
      await restoreCustomer({ token, id: customer._id })
      showToast("Customer restored successfully.")
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to restore customer.", "error")
    } finally {
      setBusyId(null)
    }
  }

  const canGoPrevious = page > 1
  const canGoNext = page < pagination.totalPages

  const addCustomerButton = (
    <button
      type="button"
      onClick={() => navigate("/admin/customers/new")}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
    >
      <Plus size={18} className="text-[#F4B400]" />
      Add Customer
    </button>
  )

  return (
    <AdminLayout>
      <PageHeader
        title="Customer Management"
        subtitle="Manage all customers and companies from one place."
        action={addCustomerButton}
      />

      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : customers.length === 0 ? (
          <EmptyState
            title="No Customers Found"
            description="Start by adding your first customer."
            action={addCustomerButton}
          />
        ) : (
          <>
            <CustomerTable
              customers={customers}
              onView={handleView}
              onEdit={handleEdit}
              onDeactivate={handleDeactivateClick}
              onRestore={handleRestore}
              busyId={busyId}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-[#64748B]">
                Showing <span className="font-semibold text-[#0F172A]">{customers.length}</span> of{" "}
                <span className="font-semibold text-[#0F172A]">{pagination.total}</span> customers
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
        title="Deactivate Customer?"
        message="This customer will become inactive and cannot be selected in new quotations until restored."
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
