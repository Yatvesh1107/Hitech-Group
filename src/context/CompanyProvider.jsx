import { useState, useEffect, useCallback } from "react"
import { CompanyContext } from "./companyContext"
import { useAuth } from "./authContext"
import { getCompanies } from "../services/settings"
import { COMPANIES, DEFAULT_COMPANY, STORAGE_KEY, isCompanyId } from "../constants/companies"

function readStoredCompany() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored && isCompanyId(stored) ? stored : DEFAULT_COMPANY
}

export default function CompanyProvider({ children }) {
  const { token } = useAuth()
  const [companies, setCompanies] = useState([])
  const [activeCompany, setActiveCompanyState] = useState(readStoredCompany)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!token) return

    let cancelled = false

    getCompanies({ token })
      .then((list) => {
        if (cancelled) return
        const mapped = (Array.isArray(list) ? list : []).map((settings) => ({
          id: settings.division,
          name: settings.company?.name || settings.division,
        }))
        setCompanies(mapped.length ? mapped : COMPANIES)
      })
      .catch(() => {
        if (cancelled) return
        setCompanies(COMPANIES)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const setActiveCompany = useCallback((companyId) => {
    if (!isCompanyId(companyId)) return
    localStorage.setItem(STORAGE_KEY, companyId)
    setActiveCompanyState(companyId)
  }, [])

  const activeCompanyName =
    companies.find((company) => company.id === activeCompany)?.name ||
    COMPANIES.find((company) => company.id === activeCompany)?.name ||
    activeCompany

  return (
    <CompanyContext.Provider
      value={{ companies, activeCompany, activeCompanyName, setActiveCompany, loaded }}
    >
      {children}
    </CompanyContext.Provider>
  )
}