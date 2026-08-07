import { Building2, ChevronDown, LoaderCircle } from "lucide-react"
import { useCompany } from "../../context/companyContext"

export default function CompanySwitcher({ variant = "header" }) {
  const { companies, activeCompany, activeCompanyName, setActiveCompany, loaded } = useCompany()

  if (variant === "sidebar") {
    return (
      <div className="px-3 md:px-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 px-1 mb-2">
          <Building2 size={14} className="text-[#F4B400] shrink-0" />
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-white/60">
            Current Company
          </span>
        </div>
        <div className="relative">
          {!loaded ? (
            <div className="flex items-center gap-2 h-11 px-3 rounded-[12px] bg-white/5 text-white/50 text-sm">
              <LoaderCircle size={14} className="animate-spin" />
              Loading...
            </div>
          ) : (
            <>
              <select
                value={activeCompany}
                onChange={(e) => setActiveCompany(e.target.value)}
                aria-label="Current Company"
                className="w-full h-11 pl-3 pr-8 rounded-[12px] bg-white/10 text-white text-sm font-semibold outline-none appearance-none cursor-pointer transition-colors hover:bg-white/15 focus:bg-white/20"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id} className="text-[#0F172A]">
                    {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none"
              />
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2.5 bg-[#F8FAFC] border border-gray-200 rounded-[12px] px-3 py-2">
        <span className="w-8 h-8 rounded-[8px] bg-[#0B2D5C]/10 flex items-center justify-center shrink-0">
          <Building2 size={15} className="text-[#0B2D5C]" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94A3B8]">
            Company
          </p>
          <p className="text-sm font-semibold text-[#0F172A] truncate max-w-[220px]">
            {loaded ? activeCompanyName : "Loading..."}
          </p>
        </div>
      </div>

      <div className="relative">
        <select
          value={activeCompany}
          onChange={(e) => setActiveCompany(e.target.value)}
          aria-label="Switch Company"
          className="h-9 pl-3 pr-8 rounded-[10px] border border-gray-200 bg-white text-sm font-semibold text-[#0B2D5C] outline-none appearance-none cursor-pointer transition-all focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
      </div>
    </div>
  )
}
