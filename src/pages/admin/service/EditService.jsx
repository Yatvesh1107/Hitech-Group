import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getService, updateService } from "../../../services/services"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import ServiceForm from "../../../components/admin/ServiceForm"
import ErrorState from "../../../components/admin/ErrorState"

export default function EditService() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadService() {
      setLoading(true)
      setError("")

      try {
        const data = await getService({ token, id })
        if (cancelled) return
        setService(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load service. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadService()

    return () => {
      cancelled = true
    }
  }, [token, id, refreshKey])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleCancel = () => {
    navigate("/admin/services")
  }

  const handleSubmit = async (payload) => {
    await updateService({ token, id, payload })
    showToast("Service updated successfully.")
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
        <span className="text-[#0B2D5C] font-semibold">Edit Service</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Edit Service"
          subtitle="Update the details of this service. Changes are saved to the backend."
        />
      </div>

      {loading ? (
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8 flex items-center justify-center py-24">
          <LoaderCircle size={28} className="text-[#F4B400] animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm mt-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      ) : (
        <ServiceForm
          key={service._id}
          initialValues={service}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Update Service"
        />
      )}
    </AdminLayout>
  )
}
