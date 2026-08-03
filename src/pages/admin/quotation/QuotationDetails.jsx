import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronRight,
  Copy,
  FileDown,
  FileText,
  LoaderCircle,
  Pencil,
  Printer,
  Receipt,
  Building2,
  Calculator,
  Trash2,
} from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import {
  getQuotation,
  updateQuotationStatus,
  duplicateQuotation,
  deleteQuotation,
  getQuotationPdf,
} from "../../../services/quotations"
import { convertQuotationToInvoice } from "../../../services/invoices"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SectionHeader from "../../../components/admin/SectionHeader"
import QuotationStatusBadge from "../../../components/admin/QuotationStatusBadge"
import QuotationInfoCard from "../../../components/admin/QuotationInfoCard"
import CustomerInfoCard from "../../../components/admin/CustomerInfoCard"
import ItemsTable from "../../../components/admin/ItemsTable"
import SummaryCard from "../../../components/admin/SummaryCard"
import TermsCard from "../../../components/admin/TermsCard"
import NotesCard from "../../../components/admin/NotesCard"
import TimelineCard from "../../../components/admin/TimelineCard"
import StatusChangeModal from "../../../components/admin/StatusChangeModal"
import ConfirmModal from "../../../components/admin/ConfirmModal"
import ErrorState from "../../../components/admin/ErrorState"

const EDITABLE_STATUSES = ["Draft", "Sent"]

const STATUS_ACTIONS = {
  Draft: { next: ["Sent"], changeLabel: "Mark as Sent" },
  Sent: { next: ["Approved", "Rejected", "Expired", "Cancelled"], changeLabel: "Change Status" },
}

const STATUS_TOAST = {
  Sent: "Quotation marked as Sent.",
  Approved: "Quotation approved.",
  Rejected: "Quotation rejected.",
  Expired: "Quotation expired.",
  Cancelled: "Quotation cancelled.",
}

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
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="h-9 bg-gray-200 rounded w-72" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded-full w-32" />
            <div className="h-6 bg-gray-200 rounded-full w-28" />
            <div className="h-6 bg-gray-200 rounded-full w-28" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-11 bg-gray-200 rounded-[12px] w-36" />
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

      <div className="mt-6 bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-[10px]" />
          <div className="h-4 bg-gray-200 rounded w-36" />
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="h-3 bg-gray-200 rounded w-28" />
              <div className="h-3.5 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function QuotationDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [quotation, setQuotation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const [statusModal, setStatusModal] = useState(false)
  const [statusBusy, setStatusBusy] = useState(false)
  const [statusError, setStatusError] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteBusy, setDeleteBusy] = useState(false)
  const [actionBusy, setActionBusy] = useState(false)
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pdfMenuOpen, setPdfMenuOpen] = useState(false)
  const [convertConfirm, setConvertConfirm] = useState(false)
  const [convertBusy, setConvertBusy] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadQuotation() {
      setLoading(true)
      setError("")

      try {
        const data = await getQuotation({ token, id })
        if (cancelled) return
        setQuotation(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load quotation. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadQuotation()

    return () => {
      cancelled = true
    }
  }, [token, id, refreshKey])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleStatusConfirm = async (targetStatus) => {
    setStatusBusy(true)
    setStatusError("")

    try {
      await updateQuotationStatus({ token, id, status: targetStatus })
      setStatusModal(false)
      showToast(STATUS_TOAST[targetStatus] || `Quotation marked as ${targetStatus}.`)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      setStatusError(err.message || "Failed to update status. Please try again.")
    } finally {
      setStatusBusy(false)
    }
  }

  const handleDuplicate = async () => {
    setActionBusy(true)

    try {
      const duplicated = await duplicateQuotation({ token, id })
      showToast("Quotation duplicated successfully.")
      navigate(`/admin/quotations/${duplicated._id}`)
    } catch (err) {
      setActionBusy(false)
      showToast(err.message || "Failed to duplicate quotation.", "error")
    }
  }

  const handleDelete = async () => {
    setDeleteBusy(true)

    try {
      await deleteQuotation({ token, id })
      showToast("Quotation deleted successfully.")
      navigate("/admin/quotations")
    } catch (err) {
      setDeleteBusy(false)
      setDeleteConfirm(false)
      showToast(err.message || "Failed to delete quotation.", "error")
    }
  }

  const handlePdfAction = async (action) => {
    setPdfBusy(true)
    setPdfMenuOpen(false)

    try {
      const blob = await getQuotationPdf({ token, id })

      if (action === "download") {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${quotation.quotationNumber}.pdf`
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
        return
      }

      const url = URL.createObjectURL(blob)

      if (action === "print") {
        const win = window.open(url, "_blank")
        if (win) win.onload = () => win.print()
        return
      }

      window.open(url, "_blank")
    } catch (err) {
      showToast(err.message || "Failed to generate the PDF. Please try again.", "error")
    } finally {
      setPdfBusy(false)
    }
  }

  const handleConvertToInvoice = async () => {
    setConvertBusy(true)

    try {
      const invoice = await convertQuotationToInvoice({ token, id })
      showToast("Invoice created successfully.")
      navigate(`/admin/invoices/${invoice._id}`)
    } catch (err) {
      setConvertBusy(false)
      setConvertConfirm(false)
      showToast(err.message || "Failed to convert the quotation to an invoice.", "error")
    }
  }

  const breadcrumb = (
    <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
      <Link to="/admin/dashboard" className="hover:text-[#0B2D5C] transition-colors">
        Dashboard
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <Link to="/admin/quotations" className="hover:text-[#0B2D5C] transition-colors">
        Quotations
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Quotation Details</span>
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

  if (error || !quotation) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <PageHeader
            title="Quotation Details"
            subtitle="View the full details of this quotation."
          />
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </AdminLayout>
    )
  }

  const editable = EDITABLE_STATUSES.includes(quotation.status)
  const statusAction = STATUS_ACTIONS[quotation.status]
  const canDuplicate = ["Rejected", "Expired"].includes(quotation.status)
  const canDelete = quotation.status === "Draft"
  const canPdf = true
  const canInvoice = quotation.status === "Approved"
  const hasInvoice = Boolean(quotation.invoiceId)

  const buttonBase =
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[12px] text-sm font-semibold transition-colors"

  const pdfMenuBase =
    "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"

  const actions = (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => navigate("/admin/quotations")}
        className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
      >
        <ArrowLeft size={16} />
        Back to Quotations
      </button>

      {editable && (
        <button
          type="button"
          onClick={() => navigate(`/admin/quotations/${quotation._id}/edit`)}
          className={`${buttonBase} bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90`}
        >
          <Pencil size={16} className="text-[#F4B400]" />
          Edit Quotation
        </button>
      )}

      {statusAction && (
        <button
          type="button"
          onClick={() => setStatusModal(true)}
          className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
        >
          <ArrowLeftRight size={16} />
          {statusAction.changeLabel}
        </button>
      )}

      {canDuplicate && (
        <button
          type="button"
          onClick={handleDuplicate}
          disabled={actionBusy}
          className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {actionBusy ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Copy size={16} />
          )}
          Duplicate
        </button>
      )}

      {canDelete && (
        <button
          type="button"
          onClick={() => setDeleteConfirm(true)}
          className={`${buttonBase} border border-red-200 bg-white text-red-600 hover:bg-red-50`}
        >
          <Trash2 size={16} />
          Delete
        </button>
      )}

      {canPdf && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setPdfMenuOpen((open) => !open)}
            disabled={pdfBusy}
            className={`${buttonBase} bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {pdfBusy ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <FileDown size={16} className="text-[#F4B400]" />
            )}
            {pdfBusy ? "Generating…" : "PDF"}
          </button>

          {pdfMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setPdfMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-20 w-52 bg-white border border-gray-100 rounded-[14px] shadow-lg py-1.5">
                <button
                  type="button"
                  className={pdfMenuBase}
                  onClick={() => handlePdfAction("generate")}
                >
                  <FileText size={16} className="text-[#0B2D5C]" />
                  Generate PDF
                </button>
                <button
                  type="button"
                  className={pdfMenuBase}
                  onClick={() => handlePdfAction("download")}
                >
                  <FileDown size={16} className="text-[#0B2D5C]" />
                  Download PDF
                </button>
                <button
                  type="button"
                  className={pdfMenuBase}
                  onClick={() => handlePdfAction("print")}
                >
                  <Printer size={16} className="text-[#0B2D5C]" />
                  Print
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {hasInvoice && (
        <button
          type="button"
          onClick={() => navigate(`/admin/invoices/${quotation.invoiceId}`)}
          className={`${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`}
        >
          <Receipt size={16} />
          View Invoice
        </button>
      )}

      {canInvoice && !hasInvoice && (
        <button
          type="button"
          onClick={() => setConvertConfirm(true)}
          className={`${buttonBase} bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90`}
        >
          <Receipt size={16} className="text-[#F4B400]" />
          Convert to Invoice
        </button>
      )}

      {!canInvoice && !hasInvoice && (
        <button
          type="button"
          disabled
          title='Only quotations with status "Approved" can be converted to an invoice'
          className={`${buttonBase} border border-gray-200 bg-gray-50 text-[#94A3B8] cursor-not-allowed`}
        >
          <Receipt size={16} />
          Convert to Invoice
        </button>
      )}
    </div>
  )

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title={quotation.quotationNumber}
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <QuotationStatusBadge status={quotation.status} />
              <span className="text-sm text-[#64748B]">
                Quotation Date:{" "}
                <span className="font-semibold text-[#0F172A]">
                  {formatDate(quotation.quotationDate)}
                </span>
              </span>
              <span className="text-sm text-[#64748B]">
                Valid Till:{" "}
                <span className="font-semibold text-[#0F172A]">
                  {formatDate(quotation.validTill)}
                </span>
              </span>
            </span>
          }
          action={actions}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerInfoCard customer={quotation.customer} />

        <QuotationInfoCard
          icon={<Building2 size={16} />}
          title="Business Information"
          rows={[
            { label: "Division", value: quotation.division },
            { label: "Service", value: quotation.service?.serviceName || "—" },
            { label: "Created By", value: quotation.createdBy?.name || quotation.createdBy?.email || "—" },
            { label: "Created Date", value: formatDate(quotation.createdAt) },
            { label: "Last Updated", value: formatDate(quotation.updatedAt) },
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ItemsTable items={quotation.items} />
        </div>

        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden h-fit">
          <SectionHeader icon={<Calculator size={16} />} title="Summary" />
          <div className="p-5">
            <SummaryCard
              readOnly
              subtotal={quotation.subtotal}
              discount={quotation.discount}
              gstPercentage={quotation.gstPercentage}
              gstAmount={quotation.gstAmount}
              grandTotal={quotation.grandTotal}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TermsCard text={quotation.termsAndConditions} />
        <NotesCard text={quotation.notes} />
      </div>

      <div className="mt-6">
        <TimelineCard activities={quotation.activities} />
      </div>

      {statusModal && (
        <StatusChangeModal
          open
          allowedStatuses={statusAction?.next || []}
          busy={statusBusy}
          error={statusError}
          onClose={() => {
            setStatusModal(false)
            setStatusError("")
          }}
          onConfirm={handleStatusConfirm}
        />
      )}

      <ConfirmModal
        open={deleteConfirm}
        title="Delete Quotation?"
        message="Are you sure you want to delete this quotation? This action cannot be undone."
        confirmLabel="Delete"
        busy={deleteBusy}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />

      <ConfirmModal
        open={convertConfirm}
        title="Convert this quotation into an Invoice?"
        message="A new invoice will be created using the quotation details."
        confirmLabel="Convert"
        variant="primary"
        busy={convertBusy}
        onConfirm={handleConvertToInvoice}
        onCancel={() => setConvertConfirm(false)}
      />
    </AdminLayout>
  )
}
