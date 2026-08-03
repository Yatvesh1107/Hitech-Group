import { useEffect, useState } from "react"
import { getServices } from "../../services/services"

export default function ServiceSelector({ token, division, value, onSelect, error, disabled = false }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!division) return

    let cancelled = false

    async function loadServices() {
      setLoading(true)

      try {
        const data = await getServices({ token, page: 1, limit: 100, division, status: "true" })
        if (!cancelled) setServices(data.services || [])
      } catch {
        if (!cancelled) setServices([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadServices()

    return () => {
      cancelled = true
    }
  }, [token, division])

  const handleChange = (e) => {
    const id = e.target.value
    const service = services.find((s) => s._id === id)
    onSelect?.(service || null)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
        Service <span className="text-red-500 ml-0.5">*</span>
      </label>
      <select
        value={value || ""}
        onChange={handleChange}
        disabled={disabled || !division || loading}
        className={`w-full h-[48px] px-4 pr-9 rounded-[12px] border text-sm bg-[#F8FAFC] outline-none appearance-none cursor-pointer transition-all ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"
        } ${!division ? "text-[#94A3B8]" : "text-[#0F172A]"} disabled:cursor-not-allowed`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1rem",
        }}
      >
        {!division ? (
          <option value="">Select a division first</option>
        ) : loading ? (
          <option value="">Loading services...</option>
        ) : services.length === 0 ? (
          <option value="">No active services in this division</option>
        ) : (
          <>
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.serviceName}
                {service.serviceCode ? ` (${service.serviceCode})` : ""}
              </option>
            ))}
          </>
        )}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
