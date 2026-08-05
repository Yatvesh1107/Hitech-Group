import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { createInvoice } from "../../../services/invoices"
import { createPayment } from "../../../services/payments"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import InvoiceForm from "../../../components/admin/InvoiceForm"

export default function CreateInvoice() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (payload, advancePayment) => {
    const created = await createInvoice({ token, payload })

    if (advancePayment) {
      await createPayment({ token, id: created._id, payload: advancePayment })
    }

    showToast(`Invoice ${created.invoiceNumber || ""} created successfully.`.trim())
    navigate(`/admin/invoices/${created._id}`)
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin/invoices"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Invoice List
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Create Invoice</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Create Invoice"
          subtitle="Create an invoice for an existing customer or a walk-in customer."
        />
      </div>

      <InvoiceForm token={token} mode="create" onSubmit={handleSubmit} onCancel={() => navigate("/admin/invoices")} />
    </AdminLayout>
  )
}