import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Receipt } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getInvoices, deleteInvoice, getInvoicePdf } from "../../../services/invoices"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SearchBar from "../../../components/admin/SearchBar"
import FilterBar from "../../../components/admin/FilterBar"
import InvoiceStatisticsCards from "../../../components/admin/InvoiceStatisticsCards"
import InvoiceTable from "../../../components/admin/InvoiceTable"
import LoadingSkeleton from "../../../components/admin/LoadingSkeleton"
import EmptyState from "../../../components/admin/EmptyState"
import ErrorState from "../../../components/admin/ErrorState"
import ConfirmModal from "../../../components/admin/ConfirmModal"

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

const PAYMENT_STATUSES = ["Unpaid", "Partially Paid", "Paid"]

export default function InvoiceList() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [division, setDivision] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [invoices, setInvoices] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [counts, setCounts] = useState({ total: 0, unpaid: 0, partiallyPaid: 0, paid: 0 })
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
    let cancelled = false

    async function loadInvoices() {
      setLoading(true)
      setError("")

      try {
        const data = await getInvoices({
          token,
          page,
          limit: PAGE_SIZE,
          search,
          paymentStatus,
          division,
          dateFrom,
          dateTo,
        })
        if (cancelled) return
        setInvoices(data.invoices)
        setPagination(data.pagination)
      } catch (err) {
        if (cancelled) return
        setInvoices([])
        setError(err.message || "Failed to load invoices. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadInvoices()

    return () => {
      cancelled = true
    }
  }, [token, page, search, paymentStatus, division, dateFrom, dateTo, refreshKey])

  useEffect(() => {
    let cancelled = false

    async function loadCounts() {
      setCountsLoading(true)

      try {
        const [total, unpaid, partiallyPaid, paid] = await Promise.all([
          getInvoices({ token, limit: 1 }),
          getInvoices({ token, limit: 1, paymentStatus: "Unpaid" }),
          getInvoices({ token, limit: 1, paymentStatus: "Partially Paid" }),
          getInvoices({ token, limit: 1, paymentStatus: "Paid" }),
        ])
        if (cancelled) return
        setCounts({
          total: total.pagination.total,
          unpaid: unpaid.pagination.total,
          partiallyPaid: partiallyPaid.pagination.total,
          paid: paid.pagination.total,
        })
      } catch {
        if (cancelled) return
        setCounts({ total: 0, unpaid: 0, partiallyPaid: 0, paid: 0 })
      } finally {
        if (!cancelled) setCountsLoading(false)
      }
    }

    loadCounts()

    return () => {
      cancelled = true
    }
  }, [token])

  const handleRetry = () => {
    setPage(1)
    setRefreshKey((key) => key + 1)
  }

  const handleView = (invoice) => {
    navigate(`/admin/invoices/${invoice._id}`)
  }

  const handleEdit = (invoice) => {
    navigate(`/admin/invoices/${invoice._id}/edit`)
  }

  const handleDownloadPdf = async (invoice) => {
    if (!invoice) return

    setPdfBusyId(invoice._id)

    try {
      const blob = await getInvoicePdf({ token, id: invoice._id, download: true })

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${invoice.invoiceNumber}.pdf`
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

  const handleDelete = (invoice) => {
    setDeleteTarget(invoice)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    setDeleteBusy(true)

    try {
      await deleteInvoice({ token, id: deleteTarget._id })
      showToast(`Invoice ${deleteTarget.invoiceNumber} deleted.`)
      setDeleteTarget(null)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to delete invoice. Please try again.")
    } finally {
      setDeleteBusy(false)
    }
  }

  const canGoPrevious = page > 1
  const canGoNext = page < pagination.totalPages

  return (
    <AdminLayout>
      <PageHeader
        title="Invoice Management"
        subtitle="Manage all customer invoices from one place."
      />

      <InvoiceStatisticsCards counts={counts} loading={countsLoading} />

      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center gap-4">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by customer or invoice number..."
          />

          <FilterBar
            status={paymentStatus}
            onStatusChange={(value) => {
              setPaymentStatus(value)
              setPage(1)
            }}
            division={division}
            onDivisionChange={(value) => {
              setDivision(value)
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
            statusOptions={PAYMENT_STATUSES}
            statusPlaceholder="All Payment Status"
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRetry} />
        ) : invoices.length === 0 ? (
          <EmptyState
            title="No Invoices Found"
            description="Invoices are created by converting an approved quotation."
            icon={<Receipt size={30} className="text-[#F4B400]" />}
          />
        ) : (
          <>
            <InvoiceTable
              invoices={invoices}
              onView={handleView}
              onEdit={handleEdit}
              onDownloadPdf={handleDownloadPdf}
              onDelete={handleDelete}
              pdfBusyId={pdfBusyId}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-[#64748B]">
                Showing <span className="font-semibold text-[#0F172A]">{invoices.length}</span> of{" "}
                <span className="font-semibold text-[#0F172A]">{pagination.total}</span> invoices
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
        title="Delete Invoice"
        message={`Are you sure you want to delete invoice ${deleteTarget?.invoiceNumber}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        busy={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  )
}
