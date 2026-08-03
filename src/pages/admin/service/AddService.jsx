import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { createService } from "../../../services/services"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import ServiceForm from "../../../components/admin/ServiceForm"

export default function AddService() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate("/admin/services")
  }

  const handleSubmit = async (payload) => {
    await createService({ token, payload })
    showToast("Service created successfully.")
    navigate("/admin/services")
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin/services"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Service List
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Add Service</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Add Service"
          subtitle="Create a new business service that can later be used in quotations, invoices and reports."
        />
      </div>

      <ServiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </AdminLayout>
  )
}
