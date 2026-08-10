import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import QuickAddProducts from "../../../components/admin/QuickAddProducts"

export default function AddProduct() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate("/admin/products")
  }

  const handleSubmitted = ({ created, failed }) => {
    const createdCount = created.length
    const failedCount = failed.length

    if (failedCount === 0) {
      showToast(`${createdCount} product${createdCount === 1 ? "" : "s"} added successfully.`)
      navigate("/admin/products")
      return
    }

    const failedDetails = failed
      .map((item) => `${item.name} (${item.message})`)
      .join("; ")

    if (createdCount === 0) {
      showToast(`No products added. ${failedDetails}`, "error")
    } else {
      showToast(
        `Added ${createdCount} product${createdCount === 1 ? "" : "s"}, but ${failedCount} failed: ${failedDetails}`,
        "error"
      )
    }

    navigate("/admin/products")
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors"
        >
          <ArrowLeft size={14} />
          Products & Services
        </Link>
        <span>/</span>
        <span className="text-[#0B2D5C] font-semibold">Add Products</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Add Products & Services"
          subtitle="Set division and GST once, then type the name and rate for as many products as you need and save them all at once."
        />
      </div>

      <QuickAddProducts
        token={token}
        onSubmitted={handleSubmitted}
        onCancel={handleCancel}
      />
    </AdminLayout>
  )
}