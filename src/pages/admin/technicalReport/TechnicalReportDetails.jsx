import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  FileDown,
  FileText,
  LoaderCircle,
  Pencil,
  Printer,
} from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getTechnicalReport, getTechnicalReportPdf } from "../../../services/technicalReports"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import ReportTypeBadge from "../../../components/admin/ReportTypeBadge"
import TechnicalReportStatusBadge from "../../../components/admin/TechnicalReportStatusBadge"
import DivisionBadge from "../../../components/admin/DivisionBadge"
import CustomerInfoCard from "../../../components/admin/CustomerInfoCard"
import QuotationInfoCard from "../../../components/admin/QuotationInfoCard"
import TimelineCard from "../../../components/admin/TimelineCard"
import ErrorState from "../../../components/admin/ErrorState"
import UltrasonicView from "../../../components/admin/UltrasonicView"
import VSRView from "../../../components/admin/VSRView"

const REPORT_TYPE_VIEWS = {
  Ultrasonic: UltrasonicView,
  VSR: VSRView,
}

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
          <div className="h-9 bg-gray-200 rounded w-64" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded-full w-28" />
            <div className="h-6 bg-gray-200 rounded-full w-32" />
            <div className="h-6 bg-gray-200 rounded-full w-28" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-11 bg-gray-200 rounded-[12px] w-32" />
          <div className="h-11 bg-gray-200 rounded-[12px] w-36" />
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
    </div>
  )
}

export default function TechnicalReportDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [pdfBusy, setPdfBusy] = useState(false)
  const [pdfMenuOpen, setPdfMenuOpen] = useState(false)

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

  const handlePdfAction = async (action) => {
    setPdfBusy(true)
    setPdfMenuOpen(false)

    try {
      const blob = await getTechnicalReportPdf({ token, id })

      if (action === "download") {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${report.reportNumber}.pdf`
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
      <span className="text-[#0B2D5C] font-semibold">Technical Report Details</span>
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
            title="Technical Report Details"
            subtitle="View the full details of this technical report."
          />
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
      <button
        type="button"
        onClick={() => navigate(`/admin/technical-reports/${report._id}/edit`)}
        className={outlineButton}
      >
        <Pencil size={16} />
        Edit Report
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
      <button type="button" onClick={() => navigate("/admin/technical-reports")} className={outlineButton}>
        <ArrowLeft size={16} />
        Back to Reports
      </button>
    </div>
  )

  const ReportContentView = REPORT_TYPE_VIEWS[report.reportType]

  const reportRows = [
    { label: "Report Number", value: report.reportNumber },
    { label: "Report Type", value: <ReportTypeBadge reportType={report.reportType} /> },
    { label: "Division", value: <DivisionBadge division={report.division} /> },
    {
      label: "Related Quotation",
      value: report.quotation?._id ? (
        <Link
          to={`/admin/quotations/${report.quotation._id}`}
          className="font-semibold text-[#0B2D5C] hover:underline"
        >
          {report.quotation.quotationNumber}
        </Link>
      ) : (
        "—"
      ),
    },
    { label: "Report Date", value: formatDate(report.reportDate) },
    {
      label: "Created By",
      value: report.createdBy?.name || report.createdBy?.email || "—",
    },
    { label: "Created Date", value: formatDate(report.createdAt) },
    { label: "Last Updated", value: formatDate(report.updatedAt) },
  ]

  const activities = [
    {
      _id: "created",
      type: "Created",
      createdAt: report.createdAt,
      newStatus: report.status,
      user: report.createdBy,
    },
    ...(new Date(report.updatedAt).getTime() - new Date(report.createdAt).getTime() > 1000
      ? [{ _id: "updated", type: "Updated", createdAt: report.updatedAt }]
      : []),
    { _id: "status", type: "StatusChanged", createdAt: report.updatedAt, newStatus: report.status },
  ]

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title={report.reportNumber}
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <ReportTypeBadge reportType={report.reportType} />
              <TechnicalReportStatusBadge status={report.status} />
              <span className="text-sm text-[#64748B]">
                Report Date:{" "}
                <span className="font-semibold text-[#0F172A]">{formatDate(report.reportDate)}</span>
              </span>
            </span>
          }
          action={actions}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerInfoCard customer={report.customer} />

        <QuotationInfoCard
          icon={<Building2 size={16} />}
          title="Report Information"
          rows={reportRows}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {ReportContentView ? (
            <ReportContentView report={report} />
          ) : (
            <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm px-6 py-10 text-center">
              <p className="text-sm font-semibold text-[#0F172A]">
                View for this report type is not available yet
              </p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                The {report.reportType} report view will be added in a future phase.
              </p>
            </div>
          )}
        </div>

        <TimelineCard activities={activities} type="report" />
      </div>
    </AdminLayout>
  )
}
