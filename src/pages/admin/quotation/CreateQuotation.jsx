import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { createQuotation } from "../../../services/quotations"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import QuotationForm from "../../../components/admin/QuotationForm"

export default function CreateQuotation() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (payload) => {
    await createQuotation({ token, payload })
    showToast(
      payload.status === "Sent"
        ? "Quotation saved and marked as sent."
        : "Quotation saved as draft."
    )
    navigate("/admin/quotations")
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin/quotations"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Quotation List
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Create Quotation</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Create Quotation"
          subtitle="Create a new quotation for a customer following the business workflow."
        />
      </div>

      <QuotationForm token={token} onSubmit={handleSubmit} onCancel={() => navigate("/admin/quotations")} />
    </AdminLayout>
  )
}
