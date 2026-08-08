import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronDown,
  ChevronUp,
  Eye,
  FileDown,
  LoaderCircle,
  Receipt,
  Wallet,
  Plus,
} from "lucide-react"
import InvoiceStatusBadge from "./InvoiceStatusBadge"
import EmptyState from "./EmptyState"

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function Stat({ label, value, className = "text-[#0F172A]" }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</p>
      <p className={`mt-1 text-lg font-extrabold leading-tight truncate ${className}`}>{value}</p>
    </div>
  )
}

function PaymentRow({ payment, index }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#F8FAFC] border border-gray-100 rounded-[14px]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-[10px] bg-emerald-50 flex items-center justify-center shrink-0">
          <Wallet size={17} className="text-emerald-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#0F172A]">
            {payment.referenceNumber || "Payment"}
            {index >= 0 ? "" : ""}
          </p>
          <p className="text-xs text-[#64748B] mt-0.5 truncate">
            {formatDate(payment.paymentDate)} · {payment.paymentMethod || "—"}
            {payment.receivedBy ? ` · ${payment.receivedBy}` : ""}
          </p>
          {payment.remarks && (
            <p className="text-xs text-[#94A3B8] mt-0.5 truncate">{payment.remarks}</p>
          )}
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-emerald-700">{formatINR(payment.amount)}</p>
      </div>
    </div>
  )
}

function InvoiceCard({
  invoice,
  onView,
  onDownloadPdf,
  onRecordPayment,
  pdfBusy,
  defaultExpanded = true,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const hasPayments = Array.isArray(invoice.payments) && invoice.payments.length > 0
  const isFullyPaid = invoice.outstandingAmount <= 0

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[#0B2D5C]/5 text-[#0B2D5C] text-sm font-bold">
              <Receipt size={15} />
              {invoice.invoiceNumber}
            </span>
            <InvoiceStatusBadge status={invoice.paymentStatus} />
          </div>
          <p className="mt-2 text-xs text-[#64748B]">
            Invoice Date: <span className="font-semibold text-[#0F172A]">{formatDate(invoice.invoiceDate)}</span>
            {invoice.dueDate && (
              <>
                {" "}
                · Due Date:{" "}
                <span className="font-semibold text-[#0F172A]">{formatDate(invoice.dueDate)}</span>
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onView(invoice.invoiceId)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
          >
            <Eye size={15} />
            View Invoice
          </button>
          <button
            type="button"
            onClick={() => onDownloadPdf(invoice)}
            disabled={pdfBusy}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pdfBusy ? <LoaderCircle size={15} className="animate-spin" /> : <FileDown size={15} />}
            Statement PDF
          </button>
          {!isFullyPaid && (
            <button
              type="button"
              onClick={() => onRecordPayment(invoice)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
            >
              <Plus size={15} className="text-[#F4B400]" />
              Record Payment
            </button>
          )}
        </div>
      </div>

      <div className="px-6 py-5 border-y border-gray-100 bg-[#F8FAFC] grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat label="Invoice Amount" value={formatINR(invoice.grandTotal)} />
        <Stat label="Amount Paid" value={formatINR(invoice.paidAmount)} className="text-emerald-700" />
        <Stat
          label="Outstanding"
          value={formatINR(invoice.outstandingAmount)}
          className={isFullyPaid ? "text-emerald-700" : "text-orange-700"}
        />
        <Stat
          label="Payment Status"
          value={isFullyPaid ? "Paid" : invoice.paymentStatus}
          className="text-[#0B2D5C]"
        />
      </div>

      <div className="px-6 py-4">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full inline-flex items-center justify-between gap-3"
          aria-expanded={expanded}
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F172A]">
            Payment History
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              {hasPayments ? `${invoice.payments.length} payment(s)` : "None"}
            </span>
          </span>
          {expanded ? (
            <ChevronUp size={18} className="text-[#94A3B8]" />
          ) : (
            <ChevronDown size={18} className="text-[#94A3B8]" />
          )}
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            {hasPayments ? (
              invoice.payments.map((payment, index) => (
                <PaymentRow key={payment.paymentId || index} payment={payment} index={index} />
              ))
            ) : (
              <div className="px-6 py-6 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-[14px] text-center">
                <Wallet size={22} className="mx-auto text-[#94A3B8]" />
                <p className="mt-2 text-sm font-semibold text-[#64748B]">No Payments Recorded</p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Outstanding amount is {formatINR(invoice.outstandingAmount)}.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function LedgerInvoiceWiseView({
  invoices = [],
  loading = false,
  onView,
  onDownloadPdf,
  onRecordPayment,
  pdfBusyId,
}) {
  if (loading) {
    return (
      <div className="p-8 space-y-4 animate-pulse">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-40 bg-gray-100 rounded-[22px]" />
        ))}
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <EmptyState
        title="No Invoices Found"
        description="No invoices match the current filters for this customer."
        icon={<Receipt size={30} className="text-[#F4B400]" />}
      />
    )
  }

  return (
    <div className="space-y-6">
      {invoices.map((invoice) => (
        <InvoiceCard
          key={invoice.invoiceId}
          invoice={invoice}
          onView={onView}
          onDownloadPdf={onDownloadPdf}
          onRecordPayment={onRecordPayment}
          pdfBusy={pdfBusyId === invoice.invoiceId}
        />
      ))}
    </div>
  )
}