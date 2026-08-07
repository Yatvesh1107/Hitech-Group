import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { getTechnicalReports } from "../../services/technicalReports"
import { useCompany } from "../../context/companyContext"
import TechnicalReportTable from "./TechnicalReportTable"
import LoadingSkeleton from "./LoadingSkeleton"
import ErrorState from "./ErrorState"
import EmptyState from "./EmptyState"

export default function CustomerTechnicalReportsTab({ token, customerId }) {
  const { activeCompany } = useCompany()
  const [technicalReports, setTechnicalReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadReports() {
      setLoading(true)
      setError("")

      try {
        const result = await getTechnicalReports({
          token,
          customer: customerId,
          division: activeCompany,
          limit: 20,
        })
        if (cancelled) return
        setTechnicalReports(result.technicalReports || [])
      } catch (err) {
        if (cancelled) return
        setError(err.message || "Failed to load technical reports. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadReports()

    return () => {
      cancelled = true
    }
  }, [token, customerId, activeCompany, refreshKey])

  const createButton = (
    <Link
      to={`/admin/technical-reports/new?customer=${customerId}`}
      className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
    >
      <Plus size={18} className="text-[#F4B400]" />
      New Report
    </Link>
  )

  return (
    <div className="mt-8">
      <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => setRefreshKey((k) => k + 1)} />
        ) : technicalReports.length === 0 ? (
          <EmptyState
            title="No Technical Reports Found"
            description="No technical reports have been created for this customer yet."
            icon={<FileText size={30} className="text-[#F4B400]" />}
            action={createButton}
          />
        ) : (
          <>
            <TechnicalReportTable
              technicalReports={technicalReports}
              onView={(report) => {
                window.location.href = `/admin/technical-reports/${report._id}`
              }}
              onEdit={(report) => {
                window.location.href = `/admin/technical-reports/${report._id}/edit`
              }}
            />
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-[#64748B]">
                Showing{" "}
                <span className="font-semibold text-[#0F172A]">{technicalReports.length}</span> report(s)
                for this customer
              </p>
              {createButton}
            </div>
          </>
        )}
      </div>
    </div>
  )
}