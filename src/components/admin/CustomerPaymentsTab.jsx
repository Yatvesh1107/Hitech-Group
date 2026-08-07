import { useEffect, useState } from "react"
import { Wallet } from "lucide-react"
import { getCustomerLedger } from "../../services/ledger"
import { useCompany } from "../../context/companyContext"
import LoadingSkeleton from "./LoadingSkeleton"
import ErrorState from "./ErrorState"
import EmptyState from "./EmptyState"

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function formatDate(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export default function CustomerPaymentsTab({ token, customerId }) {
  const { activeCompany } = useCompany()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadPayments() {
      setLoading(true)
      setError("")

      try {
        const result = await getCustomerLedger({
          token,
          customerId,
          division: activeCompany,
          type: "Payment",
          limit: 50,
        })
        if (cancelled) return
        setPayments((result.ledger || []).filter((entry) => entry.type === "Payment"))
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load payments. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPayments()

    return () => {
      cancelled = true
    }
  }, [token, customerId, activeCompany, refreshKey])

  return (
    <div className="mt-8">
      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-50 rounded-[10px] flex items-center justify-center">
            <Wallet size={16} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A]">Payment History</p>
            <p className="text-xs text-[#64748B]">
              All payments received from this customer for {activeCompany}.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => setRefreshKey((k) => k + 1)} />
        ) : payments.length === 0 ? (
          <EmptyState
            title="No Payments Found"
            description="No payments have been received from this customer yet."
            icon={<Wallet size={30} className="text-[#F4B400]" />}
          />
        ) : (
          <ul className="divide-y divide-gray-50">
            {payments.map((payment, index) => (
              <li key={`${payment.paymentId}-${index}`} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[10px] bg-emerald-50 flex items-center justify-center shrink-0">
                    <Wallet size={17} className="text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {payment.referenceNumber || "Payment reference"}
                    </p>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {formatDate(payment.date)} · {payment.description || "Payment"}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-700 whitespace-nowrap">
                  +{formatINR(payment.credit)}
                </span>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && (
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-[#64748B]">
              Showing <span className="font-semibold text-[#0F172A]">{payments.length}</span> payment(s)
              for this customer
            </p>
          </div>
        )}
      </div>
    </div>
  )
}