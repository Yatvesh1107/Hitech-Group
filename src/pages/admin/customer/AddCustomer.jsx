import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useCompany } from "../../../context/companyContext"
import { useToast } from "../../../context/toastContext"
import { createCustomer } from "../../../services/customers"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import CustomerForm from "../../../components/admin/CustomerForm"

export default function AddCustomer() {
  const { token } = useAuth()
  const { activeCompany } = useCompany()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate("/admin/customers")
  }

  const handleSubmit = async (payload) => {
    await createCustomer({ token, payload: { ...payload, division: activeCompany } })
    showToast("Customer created successfully.")
    navigate("/admin/customers")
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin/customers"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Customer List
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Add Customer</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Add Customer"
          subtitle="Create a new customer that can later be used for quotations, invoices and reports."
        />
      </div>

      <CustomerForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </AdminLayout>
  )
}
