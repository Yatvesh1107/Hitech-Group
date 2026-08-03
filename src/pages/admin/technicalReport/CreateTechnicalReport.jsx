import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { createTechnicalReport } from "../../../services/technicalReports"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import TechnicalReportForm from "../../../components/admin/TechnicalReportForm"

export default function CreateTechnicalReport() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (payload) => {
    await createTechnicalReport({ token, payload })
    showToast(
      payload.status === "Completed"
        ? "Technical report created and marked as completed."
        : "Technical report saved as draft."
    )
    navigate("/admin/technical-reports")
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin/technical-reports"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Technical Report List
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Create Technical Report</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Create Technical Report"
          subtitle="Create a new engineering or inspection report following the report workflow."
        />
      </div>

      <TechnicalReportForm
        token={token}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/technical-reports")}
      />
    </AdminLayout>
  )
}
