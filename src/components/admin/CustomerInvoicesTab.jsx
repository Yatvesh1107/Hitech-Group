import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, FileText } from "lucide-react"
import { getInvoices } from "../../services/invoices"
import { useCompany } from "../../context/companyContext"
import InvoiceTable from "./InvoiceTable"
import LoadingSkeleton from "./LoadingSkeleton"
import ErrorState from "./ErrorState"
import EmptyState from "./EmptyState"

export default function CustomerInvoicesTab({ token, customerId }) {
  const { activeCompany } = useCompany()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadInvoices() {
      setLoading(true)
      setError("")

      try {
        const result = await getInvoices({
          token,
          customer: customerId,
          division: activeCompany,
          limit: 20,
        })
        if (cancelled) return
        setInvoices(result.invoices || [])
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load invoices. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadInvoices()

    return () => {
      cancelled = true
    }
  }, [token, customerId, activeCompany, refreshKey])

  const createButton = (
    <Link
      to={`/admin/invoices/new?customer=${customerId}`}
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
    >
      <Plus size={18} className="text-[#F4B400]" />
      New Invoice
    </Link>
  )

  return (
    <div className="mt-8">
      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => setRefreshKey((k) => k + 1)} />
        ) : invoices.length === 0 ? (
          <EmptyState
            title="No Invoices Found"
            description="No invoices have been created for this customer yet."
            icon={<FileText size={30} className="text-[#F4B400]" />}
            action={createButton}
          />
        ) : (
          <>
            <InvoiceTable
              invoices={invoices}
              onView={(invoice) => {
                window.location.href = `/admin/invoices/${invoice._id}`
              }}
              onDownloadPdf={() => {}}
            />
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-[#64748B]">
                Showing{" "}
                <span className="font-semibold text-[#0F172A]">{invoices.length}</span> invoice(s) for
                this customer
              </p>
              {createButton}
            </div>
          </>
        )}
      </div>
    </div>
  )
}