import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getInvoice, updateInvoice } from "../../../services/invoices"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import InvoiceStatusBadge from "../../../components/admin/InvoiceStatusBadge"
import InvoiceForm from "../../../components/admin/InvoiceForm"
import ErrorState from "../../../components/admin/ErrorState"

function EditSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div
          key={sectionIndex}
          className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="h-4 bg-gray-200 rounded w-40" />
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, fieldIndex) => (
              <div key={fieldIndex}>
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="mt-2 h-12 bg-gray-200 rounded-[12px] w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <div className="h-11 bg-gray-200 rounded-[12px] w-28" />
        <div className="h-11 bg-gray-200 rounded-[12px] w-40" />
      </div>
    </div>
  )
}

export default function EditInvoice() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadInvoice() {
      setLoading(true)
      setError("")

      try {
        const data = await getInvoice({ token, id })
        if (cancelled) return
        setInvoice(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load invoice. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
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

  const handleSubmit = async (payload) => {
    await updateInvoice({ token, id, payload })
    showToast("Invoice updated successfully.")
    navigate(`/admin/invoices/${id}`)
  }

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
      <Link to={`/admin/invoices/${id}`} className="hover:text-[#0B2D5C] transition-colors">
        Invoice Details
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Edit Invoice</span>
    </nav>
  )

  if (loading) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <EditSkeleton />
        </div>
      </AdminLayout>
    )
  }

  if (error || !invoice) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <PageHeader title="Edit Invoice" subtitle="Modify the details of this invoice." />
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </AdminLayout>
    )
  }

  const readOnly = invoice.paymentStatus === "Paid"

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title="Edit Invoice"
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-[#0F172A]">
                {invoice.invoiceNumber || "—"}
              </span>
              <InvoiceStatusBadge status={invoice.paymentStatus} />
              <span className="text-sm text-[#64748B]">
                {readOnly
                  ? "This invoice has been fully paid and can no longer be edited."
                  : "Modify the details of this invoice."}
              </span>
            </span>
          }
          action={
            <button
              type="button"
              onClick={() => navigate(`/admin/invoices/${id}`)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Invoice
            </button>
          }
        />
      </div>

      <InvoiceForm
        token={token}
        mode="edit"
        initialValues={invoice}
        readOnly={readOnly}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/invoices")}
        onBack={() => navigate(`/admin/invoices/${id}`)}
      />
    </AdminLayout>
  )
}
