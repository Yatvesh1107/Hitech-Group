import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Banknote,
  Calculator,
  ChevronRight,
  FileDown,
  FileText,
  LoaderCircle,
  Pencil,
  Printer,
} from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getInvoice, getInvoicePdf } from "../../../services/invoices"
import {
  getInvoicePayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../../../services/payments"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import SectionHeader from "../../../components/admin/SectionHeader"
import InvoiceStatusBadge from "../../../components/admin/InvoiceStatusBadge"
import CustomerInfoCard from "../../../components/admin/CustomerInfoCard"
import InvoiceInfoCard from "../../../components/admin/InvoiceInfoCard"
import InvoiceItemsTable from "../../../components/admin/InvoiceItemsTable"
import SummaryCard from "../../../components/admin/SummaryCard"
import TermsCard from "../../../components/admin/TermsCard"
import NotesCard from "../../../components/admin/NotesCard"
import PaymentCard from "../../../components/admin/PaymentCard"
import PaymentHistoryCard from "../../../components/admin/PaymentHistoryCard"
import PaymentFormModal from "../../../components/admin/PaymentFormModal"
import TimelineCard from "../../../components/admin/TimelineCard"
import ConfirmModal from "../../../components/admin/ConfirmModal"
import ErrorState from "../../../components/admin/ErrorState"

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
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
  )
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
            <div className="h-6 bg-gray-200 rounded-full w-24" />
            <div className="h-6 bg-gray-200 rounded-full w-32" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonCard />
        </div>
        <SkeletonCard />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

export default function InvoiceDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [invoice, setInvoice] = useState(null)
  const [payments, setPayments] = useState([])
  const [paymentsLoading, setPaymentsLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pdfMenuOpen, setPdfMenuOpen] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState(null)
  const [paymentBusy, setPaymentBusy] = useState(false)
  const [paymentError, setPaymentError] = useState("")
  const [deletePaymentTarget, setDeletePaymentTarget] = useState(null)
  const [deletePaymentBusy, setDeletePaymentBusy] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadInvoice() {
      setLoading(true)
      setError("")
      setPaymentsLoading(true)

      try {
        const [data, paymentData] = await Promise.all([
          getInvoice({ token, id }),
          getInvoicePayments({ token, id }),
        ])
        if (cancelled) return
        setInvoice(data)
        setPayments(paymentData)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load the invoice. Please try again.")
      } finally {
        if (!cancelled) {
          setLoading(false)
          setPaymentsLoading(false)
        }
      }
    }

    loadInvoice()

    return () => {
      cancelled = true
    }
  }, [token, id, refreshKey])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handlePdfAction = async (action) => {
    setPdfBusy(true)
    setPdfMenuOpen(false)

    try {
      const blob = await getInvoicePdf({ token, id })

      if (action === "download") {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${invoice.invoiceNumber}.pdf`
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

  const outstanding = Number(invoice?.outstandingAmount) || 0
  const isFullyPaid = outstanding <= 0

  const handleRecordPayment = () => {
    setEditingPayment(null)
    setPaymentError("")
    setPaymentModalOpen(true)
  }

  const handleEditPayment = (payment) => {
    setEditingPayment(payment)
    setPaymentError("")
    setPaymentModalOpen(true)
  }

  const handlePaymentSubmit = async (payload) => {
    setPaymentBusy(true)
    setPaymentError("")

    try {
      if (editingPayment) {
        await updatePayment({ token, id: editingPayment._id, payload })
        showToast("Payment updated successfully.")
      } else {
        await createPayment({ token, id, payload })
        showToast("Payment recorded successfully.")
      }
      setPaymentModalOpen(false)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      setPaymentError(err.message || "Failed to save the payment. Please try again.")
    } finally {
      setPaymentBusy(false)
    }
  }

  const confirmDeletePayment = async () => {
    if (!deletePaymentTarget) return

    setDeletePaymentBusy(true)

    try {
      await deletePayment({ token, id: deletePaymentTarget._id })
      showToast("Payment deleted successfully.")
      setDeletePaymentTarget(null)
      setRefreshKey((key) => key + 1)
    } catch (err) {
      showToast(err.message || "Failed to delete the payment. Please try again.", "error")
    } finally {
      setDeletePaymentBusy(false)
    }
  }

  const paymentMaxAmount = editingPayment
    ? outstanding + Number(editingPayment.amount || 0)
    : outstanding

  const breadcrumb = (
    <nav className="flex items-center gap-2 text-sm text-[#94A3B8]">
      <Link to="/admin/dashboard" className="hover:text-[#0B2D5C] transition-colors">
        Dashboard
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <Link to="/admin/invoices" className="hover:text-[#0B2D5C] transition-colors">
        Invoices
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Invoice Details</span>
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

  if (error || !invoice) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <PageHeader title="Invoice Details" subtitle="View the full details of this invoice." />
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </AdminLayout>
    )
  }

  const buttonBase =
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[12px] text-sm font-semibold transition-colors"

  const outlineButton = `${buttonBase} border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC]`

  const pdfMenuBase =
    "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"

  const actions = (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => navigate("/admin/invoices")} className={outlineButton}>
        <ArrowLeft size={16} />
        Back to Invoices
      </button>
      <button
        type="button"
        onClick={() => navigate(`/admin/invoices/${invoice._id}/edit`)}
        className={outlineButton}
      >
        <Pencil size={16} />
        Edit Invoice
      </button>
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
      <button
        type="button"
        onClick={handleRecordPayment}
        disabled={isFullyPaid}
        title={isFullyPaid ? "This invoice has been fully paid" : "Record a payment against this invoice"}
        className={`${buttonBase} bg-[#0B2D5C] text-white hover:bg-[#0B2D5C]/90 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Banknote size={16} className="text-[#F4B400]" />
        Record Payment
      </button>
    </div>
  )

  const activities = [
    ...(invoice.quotationId?._id
      ? [
          {
            _id: "converted",
            type: "Converted",
            createdAt: invoice.createdAt,
            quotationNumber: invoice.quotationId.quotationNumber,
          },
        ]
      : []),
    {
      _id: "created",
      type: "Created",
      createdAt: invoice.createdAt,
      newStatus: invoice.paymentStatus,
    },
    ...payments.map((payment) => ({
      _id: `payment-${payment._id}`,
      type: "Payment",
      createdAt: payment.paymentDate,
      user: payment.receivedBy,
      paymentMethod: payment.paymentMethod,
      amount: payment.amount,
      referenceNumber: payment.referenceNumber,
    })),
    ...(new Date(invoice.updatedAt).getTime() - new Date(invoice.createdAt).getTime() > 1000
      ? [{ _id: "updated", type: "Updated", createdAt: invoice.updatedAt }]
      : []),
  ]

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title={invoice.invoiceNumber}
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <InvoiceStatusBadge status={invoice.paymentStatus} />
              <span className="text-sm text-[#64748B]">
                Invoice Date:{" "}
                <span className="font-semibold text-[#0F172A]">
                  {formatDate(invoice.invoiceDate)}
                </span>
              </span>
              <span className="text-sm text-[#64748B]">
                Due Date:{" "}
                <span className="font-semibold text-[#0F172A]">{formatDate(invoice.dueDate)}</span>
              </span>
            </span>
          }
          action={actions}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerInfoCard customer={invoice.customer} />
        <InvoiceInfoCard invoice={invoice} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InvoiceItemsTable items={invoice.items} />
        </div>

        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden h-fit">
          <SectionHeader icon={<Calculator size={16} />} title="Summary" />
          <div className="p-5">
            <SummaryCard
              readOnly
              subtotal={invoice.subtotal}
              discount={invoice.discount}
              gstPercentage={invoice.gstPercentage}
              gstAmount={invoice.gstAmount}
              grandTotal={invoice.grandTotal}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TermsCard text={invoice.termsAndConditions} />
        <NotesCard text={invoice.notes} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentCard invoice={invoice} />
        <TimelineCard activities={activities} type="invoice" />
      </div>

      <div className="mt-6">
        <PaymentHistoryCard
          payments={payments}
          loading={paymentsLoading}
          onEdit={handleEditPayment}
          onDelete={setDeletePaymentTarget}
        />
      </div>

      <PaymentFormModal
        key={`${paymentModalOpen}:${editingPayment?._id || "new"}`}
        open={paymentModalOpen}
        title={editingPayment ? "Edit Payment" : "Record Payment"}
        busy={paymentBusy}
        error={paymentError}
        payment={editingPayment}
        maxAmount={paymentMaxAmount}
        onClose={() => {
          setPaymentModalOpen(false)
          setPaymentError("")
        }}
        onConfirm={handlePaymentSubmit}
      />

      <ConfirmModal
        open={Boolean(deletePaymentTarget)}
        title="Delete Payment?"
        message={
          deletePaymentTarget
            ? `Are you sure you want to delete the payment of ${formatINR(deletePaymentTarget.amount)} received on ${formatDate(deletePaymentTarget.paymentDate)}? The invoice payment status will be recalculated.`
            : ""
        }
        confirmLabel="Delete"
        variant="danger"
        busy={deletePaymentBusy}
        onConfirm={confirmDeletePayment}
        onCancel={() => setDeletePaymentTarget(null)}
      />
    </AdminLayout>
  )
}
