import { useEffect, useRef, useState } from "react"
import { Search, ChevronDown, LoaderCircle, Check } from "lucide-react"
import { getCustomers } from "../../services/customers"

export default function CustomerSelector({ token, division, value, selectedCustomer, onSelect, error, disabled = false }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!open) return

    let cancelled = false

    async function loadCustomers() {
      setLoading(true)

      try {
        const data = await getCustomers({ token, page: 1, limit: 8, search: search.trim(), division })
        if (!cancelled) setCustomers(data.customers || [])
      } catch {
        if (!cancelled) setCustomers([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCustomers()

    return () => {
      cancelled = true
    }
  }, [open, search, token, division])

  const display = selectedCustomer?.companyName || ""

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
        Customer <span className="text-red-500 ml-0.5">*</span>
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        className={`w-full h-[48px] px-4 pr-9 rounded-[12px] border text-left text-sm bg-[#F8FAFC] outline-none transition-all flex items-center ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <Search size={16} className="text-[#94A3B8] mr-2 shrink-0" />
        <span className={`flex-1 truncate ${display ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>
          {display || "Search customer..."}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#94A3B8] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 w-full bg-white border border-gray-200 rounded-[12px] shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              type="search"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, mobile, email..."
              className="w-full h-10 px-3 rounded-[8px] border border-gray-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-[#94A3B8]">
                <LoaderCircle size={16} className="animate-spin" />
                Loading...
              </div>
            ) : customers.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#94A3B8]">No customers found</div>
            ) : (
              customers.map((customer) => (
                <button
                  key={customer._id}
                  type="button"
                  onClick={() => {
                    onSelect?.(customer)
                    setOpen(false)
                    setSearch("")
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left hover:bg-[#F8FAFC] transition-colors ${
                    value === customer._id ? "bg-[#F4B400]/10" : ""
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#0F172A] truncate">
                      {customer.companyName}
                    </span>
                    <span className="block text-xs text-[#94A3B8] truncate">
                      {customer.contactPerson}
                      {customer.city ? ` • ${customer.city}` : ""}
                    </span>
                  </span>
                  {value === customer._id && <Check size={16} className="text-[#F4B400] shrink-0" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
