import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarRange,
  Eye,
  FileDown,
  FileSpreadsheet,
  LayoutList,
  ListTodo,
  LoaderCircle,
  Printer,
  Receipt,
  Search,
  Wallet,
} from "lucide-react"
import { getCustomerLedger, getCustomerLedgerInvoiceWise, getLedgerPdf } from "../../services/ledger"
import { getInvoicePdf } from "../../services/invoices"
import { useCompany } from "../../context/companyContext"
import { useToast } from "../../context/toastContext"
import EmptyState from "./EmptyState"
import ErrorState from "./ErrorState"
import LedgerInvoiceWiseView from "./LedgerInvoiceWiseView"

const PAYMENT_STATUSES = ["Unpaid", "Partially Paid", "Paid"]

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function TransactionTypeBadge({ type }) {
  if (type === "Payment") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-50 border-emerald-200 text-emerald-700">
        <ArrowDownToLine size={12} />
        Payment
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-[#0B2D5C]/5 border-[#0B2D5C]/15 text-[#0B2D5C]">
      <ArrowUpFromLine size={12} />
      Invoice
    </span>
  )
}

const SUMMARY_CARDS = [
  {
    key: "totalInvoiceAmount",
    label: "Total Invoice Amount",
    icon: ArrowUpFromLine,
    iconBg: "bg-[#0B2D5C]/5",
    iconColor: "text-[#0B2D5C]",
    accent: "text-[#0B2D5C]",
    money: true,
  },
  {
    key: "totalPaidAmount",
    label: "Total Paid Amount",
    icon: ArrowDownToLine,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accent: "text-emerald-700",
    money: true,
  },
  {
    key: "outstandingAmount",
    label: "Outstanding Balance",
    icon: Wallet,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    accent: "text-orange-700",
    money: true,
  },
  {
    key: "invoiceCount",
    label: "Number of Invoices",
    icon: Receipt,
    iconBg: "bg-[#0B2D5C]/5",
    iconColor: "text-[#0B2D5C]",
    accent: "text-[#0B2D5C]",
  },
  {
    key: "paymentCount",
    label: "Number of Payments",
    icon: ArrowDownToLine,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accent: "text-emerald-700",
  },
]

function SummaryCards({ summary, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-8">
      {SUMMARY_CARDS.map((card) => {
        const Icon = card.icon
        const value = summary?.[card.key]

        return (
          <div
            key={card.key}
            className="bg-white border border-gray-100 rounded-[22px] shadow-sm p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}
            >
              <Icon size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                {card.label}
              </p>
              {loading ? (
                <div className="mt-2">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                <p className={`text-xl font-extrabold leading-tight truncate ${card.accent}`}>
                  {card.money ? formatINR(value) : Number(value || 0).toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function LedgerTable({ entries, onViewInvoice }) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="No Ledger Entries Found"
        description="No transactions match the current filters for this customer."
        icon={<Receipt size={30} className="text-[#F4B400]" />}
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-[#F8FAFC]">
            {["Date", "Transaction Type", "Reference Number", "Description", "Debit", "Credit", "Running Balance", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#64748B]"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {entries.map((entry, index) => (
            <tr key={`${entry.type}-${entry.invoiceId || entry.paymentId}-${index}`} className="hover:bg-[#F8FAFC] transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-[#334155] whitespace-nowrap">
                {formatDate(entry.date)}
              </td>
              <td className="px-6 py-4">
                <TransactionTypeBadge type={entry.type} />
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-[#0B2D5C] whitespace-nowrap">
                {entry.referenceNumber || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-[#64748B] max-w-[220px] truncate">
                {entry.description || "—"}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#0B2D5C] whitespace-nowrap">
                {entry.debit ? formatINR(entry.debit) : "—"}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-emerald-700 whitespace-nowrap">
                {entry.credit ? formatINR(entry.credit) : "—"}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-[#0F172A] whitespace-nowrap">
                {formatINR(entry.balance)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {entry.invoiceId && (
                    <button
                      type="button"
                      onClick={() => onViewInvoice(entry.invoiceId)}
                      title="View invoice"
                      className="w-9 h-9 rounded-[10px] border border-gray-200 bg-white text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors flex items-center justify-center"
                    >
                      <Receipt size={15} />
                    </button>
                  )}
                  {entry.paymentId && (
                    <button
                      type="button"
                      onClick={() => onViewInvoice(entry.invoiceId)}
                      title="View payment"
                      className="w-9 h-9 rounded-[10px] border border-gray-200 bg-white text-emerald-700 hover:bg-[#F8FAFC] transition-colors flex items-center justify-center"
                    >
                      <Eye size={15} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LedgerTab({ token, customerId }) {
  const { activeCompany } = useCompany()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [view, setView] = useState("invoiceWise")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [pdfBusy, setPdfBusy] = useState(false)
  const [invoicePdfBusyId, setInvoicePdfBusyId] = useState(null)
  const searchDebounce = useRef(null)

  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current)
    searchDebounce.current = setTimeout(() => {
      setSearch(searchInput.trim())
    }, 400)
    return () => {
      if (searchDebounce.current) clearTimeout(searchDebounce.current)
    }
  }, [searchInput])

  useEffect(() => {
    let cancelled = false

    async function loadLedger() {
      setLoading(true)
      setError("")

      try {
        const result =
          view === "invoiceWise"
            ? await getCustomerLedgerInvoiceWise({
                token,
                customerId,
                division: activeCompany,
                dateFrom,
                dateTo,
                paymentStatus,
                search,
              })
            : await getCustomerLedger({
                token,
                customerId,
                division: activeCompany,
                dateFrom,
                dateTo,
                type,
                search,
              })

        if (cancelled) return
        setData(result)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load the ledger. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadLedger()

    return () => {
      cancelled = true
    }
  }, [
    token,
    customerId,
    activeCompany,
    view,
    dateFrom,
    dateTo,
    type,
    paymentStatus,
    search,
    refreshKey,
  ])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleViewInvoice = (invoiceId) => {
    navigate(`/admin/invoices/${invoiceId}`)
  }

  const handleRecordPayment = (invoice) => {
    navigate(`/admin/invoices/${invoice.invoiceId}`)
  }

  const handleDownloadInvoicePdf = async (invoice) => {
    setInvoicePdfBusyId(invoice.invoiceId)

    try {
      const blob = await getInvoicePdf({ token, id: invoice.invoiceId, download: true })
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
      setInvoicePdfBusyId(null)
    }
  }

  const handlePdfAction = async (action) => {
    setPdfBusy(true)

    try {
      const blob = await getLedgerPdf({
        token,
        customerId,
        division: activeCompany,
        view,
      })

      if (action === "download") {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `Ledger_${(data?.customer?.companyName || "Customer").replace(/[^a-zA-Z0-9]+/g, "_")}.pdf`
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
      showToast(err.message || "Failed to generate the ledger PDF. Please try again.", "error")
    } finally {
      setPdfBusy(false)
    }
  }

  const handleExportExcel = () => {
    const isInvoiceWise = view === "invoiceWise"

    if (isInvoiceWise) {
      const invoices = data?.invoices || []
      if (invoices.length === 0) {
        showToast("No invoices to export.")
        return
      }

      const header = [
        "Invoice Number",
        "Invoice Date",
        "Invoice Amount",
        "Paid",
        "Outstanding",
        "Payment Status",
        "Payment Reference",
        "Payment Date",
        "Payment Amount",
        "Payment Mode",
      ]
      const rows = invoices.flatMap((invoice) => {
        const payments = invoice.payments || []
        if (payments.length === 0) {
          return [[
            invoice.invoiceNumber,
            formatDate(invoice.invoiceDate),
            invoice.grandTotal ?? "",
            invoice.paidAmount ?? "",
            invoice.outstandingAmount ?? "",
            invoice.paymentStatus,
            "",
            "",
            "",
            "",
          ]]
        }

        return payments.map((payment) => [
          invoice.invoiceNumber,
          formatDate(invoice.invoiceDate),
          invoice.grandTotal ?? "",
          invoice.paidAmount ?? "",
          invoice.outstandingAmount ?? "",
          invoice.paymentStatus,
          payment.referenceNumber || "",
          formatDate(payment.paymentDate),
          payment.amount ?? "",
          payment.paymentMethod || "",
        ])
      })
      exportCsv(`Ledger_Invoices_${(data?.customer?.companyName || "Customer").replace(/[^a-zA-Z0-9]+/g, "_")}.csv`, header, rows)
      return
    }

    const entries = data?.ledger || []
    if (entries.length === 0) {
      showToast("No ledger entries to export.")
      return
    }

    const header = ["Date", "Transaction Type", "Reference Number", "Description", "Debit", "Credit", "Running Balance"]
    const rows = entries.map((entry) => [
      formatDate(entry.date),
      entry.type,
      entry.referenceNumber || "",
      entry.description || "",
      entry.debit || "",
      entry.credit || "",
      entry.balance ?? "",
    ])
    exportCsv(`Ledger_${(data?.customer?.companyName || "Customer").replace(/[^a-zA-Z0-9]+/g, "_")}.csv`, header, rows)
  }

  const exportCsv = (filename, header, rows) => {
    const escapeCsv = (value) => {
      const text = String(value ?? "")
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
    }

    const csv = [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n")
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const selectClass =
    "h-11 pl-3.5 pr-9 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all appearance-none cursor-pointer"
  const dateClass =
    "h-11 pl-3.5 pr-3 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"

  const tabBase = "inline-flex items-center gap-2 px-5 h-11 rounded-[12px] text-sm font-semibold transition-colors"

  return (
    <div className="mt-8">
      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
        <p className="text-sm text-[#64748B]">
          Ledger for{" "}
          <span className="font-semibold text-[#0F172A]">{data?.customer?.companyName || "Customer"}</span>{" "}
          · <span className="font-semibold text-[#0F172A]">{activeCompany}</span>.
        </p>
        <div className="flex flex-wrap items-center gap-3 xl:ml-auto">
          <button
            type="button"
            onClick={() => handlePdfAction("print")}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
          >
            <Printer size={15} />
            Print
          </button>
          <button
            type="button"
            onClick={() => handlePdfAction("download")}
            disabled={pdfBusy}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pdfBusy ? <LoaderCircle size={15} className="animate-spin" /> : <FileDown size={15} />}
            Export PDF
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
          >
            <FileSpreadsheet size={15} />
            Export Excel
          </button>
        </div>
      </div>

      <SummaryCards summary={data?.summary} loading={loading} />

      <div className="mt-8 flex items-center gap-3 border-b border-gray-100 pb-3">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F172A]">
          <ListTodo size={16} />
          Ledger View
        </span>
        <div className="ml-4 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setView("invoiceWise")}
            className={`${tabBase} ${
              view === "invoiceWise"
                ? "bg-[#0B2D5C] text-white shadow-sm"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#EDF1F7]"
            }`}
          >
            <LayoutList size={15} />
            Invoice-wise View
          </button>
          <button
            type="button"
            onClick={() => setView("timeline")}
            className={`${tabBase} ${
              view === "timeline"
                ? "bg-[#0B2D5C] text-white shadow-sm"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#EDF1F7]"
            }`}
          >
            <ListTodo size={15} />
            Timeline View
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center gap-4">
          <div className="relative w-full sm:w-[320px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={
                view === "invoiceWise"
                  ? "Search invoice number or payment reference..."
                  : "Search by invoice or payment reference..."
              }
              className="w-full h-11 pl-11 pr-4 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {view === "invoiceWise" ? (
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                aria-label="Filter by payment status"
                className={selectClass}
              >
                <option value="">All Payment Status</option>
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                aria-label="Filter by transaction type"
                className={selectClass}
              >
                <option value="">All Transaction Types</option>
                <option value="Invoice">Invoice</option>
                <option value="Payment">Payment</option>
              </select>
            )}

            <div className="flex items-center gap-2">
              <CalendarRange size={16} className="text-[#94A3B8] shrink-0" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                aria-label="Date from"
                className={dateClass}
              />
              <span className="text-xs font-medium text-[#94A3B8]">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                aria-label="Date to"
                className={dateClass}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            view === "invoiceWise" ? (
              <LedgerInvoiceWiseView loading />
            ) : (
              <div className="p-8 space-y-3 animate-pulse">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-10 bg-gray-100 rounded-xl" />
                ))}
              </div>
            )
          ) : error ? (
            <ErrorState message={error} onRetry={handleRetry} />
          ) : view === "invoiceWise" ? (
            <LedgerInvoiceWiseView
              invoices={data?.invoices || []}
              onView={handleViewInvoice}
              onDownloadPdf={handleDownloadInvoicePdf}
              onRecordPayment={handleRecordPayment}
              pdfBusyId={invoicePdfBusyId}
            />
          ) : (
            <LedgerTable entries={data?.ledger || []} onViewInvoice={handleViewInvoice} />
          )}
        </div>

        {!loading && !error && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-[#64748B]">
              {view === "invoiceWise" ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-[#0F172A]">{(data?.invoices || []).length}</span>{" "}
                  invoice(s)
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-[#0F172A]">{(data?.ledger || []).length}</span>{" "}
                  entries
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}