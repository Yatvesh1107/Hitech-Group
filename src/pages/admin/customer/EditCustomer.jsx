import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, LoaderCircle } from "lucide-react"
import { useAuth } from "../../../context/authContext"
import { useToast } from "../../../context/toastContext"
import { getCustomer, updateCustomer } from "../../../services/customers"
import AdminLayout from "../../../components/admin/AdminLayout"
import PageHeader from "../../../components/admin/PageHeader"
import CustomerForm from "../../../components/admin/CustomerForm"
import ErrorState from "../../../components/admin/ErrorState"

export default function EditCustomer() {
  const { id } = useParams()
  const { token } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadCustomer() {
      setLoading(true)
      setError("")

      try {
        const data = await getCustomer({ token, id })
        if (cancelled) return
        setCustomer(data)
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load customer. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCustomer()

    return () => {
      cancelled = true
    }
  }, [token, id, refreshKey])

  const handleRetry = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleCancel = () => {
    navigate("/admin/customers")
  }

  const handleSubmit = async (payload) => {
    await updateCustomer({ token, id, payload })
    showToast("Customer updated successfully.")
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
        <span className="text-[#0B2D5C] font-semibold">Edit Customer</span>
      </div>

      <div className="mt-6">
        <PageHeader
          title="Edit Customer"
          subtitle="Update the details of this customer. Changes are saved to the backend."
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
        <CustomerForm
          key={customer._id}
          initialValues={customer}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Update Customer"
        />
      )}
    </AdminLayout>
  )
}
