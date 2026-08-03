import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getQuotation, updateQuotation } from "../../../services/quotations"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import QuotationForm from "../../../components/admin/QuotationForm"
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

export default function EditQuotation() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [quotation, setQuotation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

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

  const handleSubmit = async (payload) => {
    await updateQuotation({ token, id, payload })
    showToast("Quotation updated successfully.")
    navigate(`/admin/quotations/${id}`)
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
      <Link to={`/admin/quotations/${id}`} className="hover:text-[#0B2D5C] transition-colors">
        Quotation Details
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-[#0B2D5C] font-semibold">Edit Quotation</span>
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

  if (error || !quotation) {
    return (
      <AdminLayout>
        {breadcrumb}
        <div className="mt-6">
          <PageHeader title="Edit Quotation" subtitle="Modify the details of this quotation." />
        </div>
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </AdminLayout>
    )
  }

  const readOnly = !["Draft", "Sent"].includes(quotation.status)

  const readOnlyMessages = {
    Approved: "This quotation has been approved and can no longer be edited.",
    Rejected: "This quotation has been rejected and can no longer be edited.",
    Expired: "This quotation has expired and can no longer be edited.",
    Cancelled: "This quotation has been cancelled and can no longer be edited.",
  }

  const readOnlyMessage =
    readOnlyMessages[quotation.status] || "This quotation can no longer be edited."

  return (
    <AdminLayout>
      {breadcrumb}

      <div className="mt-6">
        <PageHeader
          title="Edit Quotation"
          subtitle={
            <span className="inline-flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-[#0F172A]">
                {quotation.quotationNumber || "—"}
              </span>
              <span className="text-sm text-[#64748B]">
                {readOnly ? readOnlyMessage : "Modify the details of this quotation."}
              </span>
            </span>
          }
          action={
            <button
              type="button"
              onClick={() => navigate(`/admin/quotations/${id}`)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Quotation
            </button>
          }
        />
      </div>

      <QuotationForm
        token={token}
        mode="edit"
        initialValues={quotation}
        readOnly={readOnly}
        readOnlyMessage={readOnlyMessage}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/quotations")}
        onBack={() => navigate(`/admin/quotations/${id}`)}
      />
    </AdminLayout>
  )
}
