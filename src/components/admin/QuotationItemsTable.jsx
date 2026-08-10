import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { getServices } from "../../services/services"

const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100

const inputClass =
  "w-full h-10 px-3 rounded-[10px] border text-sm text-[#0F172A] bg-[#F8FAFC] outline-none transition-all focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"

const catalogSelectClass =
  "w-full h-10 px-3 pr-8 rounded-[10px] border text-sm text-[#0F172A] bg-white outline-none appearance-none cursor-pointer transition-all focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 mb-2"

function inputErrorClass(hasError) {
  return hasError
    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
    : "border-gray-200"
}

export default function QuotationItemsTable({
  items,
  onChange,
  errors = [],
  onAddRow,
  onRemoveRow,
  disabled = false,
  token,
}) {
  const [catalog, setCatalog] = useState([])
  const [catalogLoaded, setCatalogLoaded] = useState(false)

  useEffect(() => {
    if (!token || disabled) return

    let cancelled = false

    getServices({ token, page: 1, limit: 1000, status: "true" })
      .then((data) => {
        if (cancelled) return
        setCatalog(data.services || [])
        setCatalogLoaded(true)
      })
      .catch(() => {
        if (cancelled) return
        setCatalog([])
        setCatalogLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [token, disabled])

  const handleField = (index, field, value) => {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const handleCatalogSelect = (index, productId) => {
    const product = catalog.find((item) => item._id === productId)
    if (!product) return

    onChange(
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              productId: product._id,
              description: product.serviceName,
              unit: product.unit || item.unit || "",
              rate: product.defaultRate != null ? String(product.defaultRate) : item.rate ?? "",
            }
          : item
      )
    )
  }

  const catalogLabel = (product) => {
    const unitSuffix = product.unit ? ` (${product.unit})` : ""
    const rate =
      product.defaultRate != null && product.defaultRate !== ""
        ? ` — ₹${Number(product.defaultRate).toLocaleString("en-IN")}`
        : ""
    return `${product.serviceName}${unitSuffix}${rate}`
  }

  return (
    <div>
      {!disabled && token && catalogLoaded && catalog.length === 0 && (
        <p className="mb-3 text-xs text-[#94A3B8]">
          No saved products yet. Add them once under Products &amp; Services so they auto-fill here.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
              <th className="py-3 pr-4 font-semibold w-[34%]">
                Product / Description
              </th>
              <th className="py-3 pr-4 font-semibold w-[12%]">Qty</th>
              <th className="py-3 pr-4 font-semibold w-[14%]">Unit</th>
              <th className="py-3 pr-4 font-semibold w-[14%]">Rate (₹)</th>
              <th className="py-3 pr-4 font-semibold w-[14%]">Amount</th>
              <th className="py-3 font-semibold w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item, index) => {
              const rowError = errors[index] || {}
              const qty = Number(item.quantity)
              const rate = Number(item.rate)
              const amount =
                Number.isFinite(qty) && Number.isFinite(rate)
                  ? round2((Number.isFinite(qty) ? qty : 0) * (Number.isFinite(rate) ? rate : 0))
                  : 0

              return (
                <tr key={item.key}>
                  <td className="py-3 pr-4 align-top">
                    {!disabled && token && (
                      <select
                        value={item.productId || ""}
                        onChange={(e) => handleCatalogSelect(index, e.target.value)}
                        aria-label="Pick from saved products"
                        className={catalogSelectClass}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1rem",
                        }}
                      >
                        <option value="">Pick from saved products…</option>
                        {catalog.map((product) => (
                          <option key={product._id} value={product._id}>
                            {catalogLabel(product)}
                          </option>
                        ))}
                      </select>
                    )}
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleField(index, "description", e.target.value)}
                      placeholder="Item description"
                      disabled={disabled}
                      className={`${inputClass} ${inputErrorClass(Boolean(rowError.description))} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    {rowError.description && (
                      <p className="mt-1 text-xs text-red-600">{rowError.description}</p>
                    )}
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.quantity}
                      onChange={(e) => handleField(index, "quantity", e.target.value)}
                      disabled={disabled}
                      className={`${inputClass} ${inputErrorClass(Boolean(rowError.quantity))} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    {rowError.quantity && (
                      <p className="mt-1 text-xs text-red-600">{rowError.quantity}</p>
                    )}
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleField(index, "unit", e.target.value)}
                      placeholder="e.g. Sq.M"
                      disabled={disabled}
                      className={`${inputClass} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.rate}
                      onChange={(e) => handleField(index, "rate", e.target.value)}
                      disabled={disabled}
                      className={`${inputClass} ${inputErrorClass(Boolean(rowError.rate))} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    {rowError.rate && <p className="mt-1 text-xs text-red-600">{rowError.rate}</p>}
                  </td>
                  <td className="py-3 pr-4 align-top">
                    <div className="h-10 flex items-center text-sm font-semibold text-[#0F172A]">
                      ₹
                      {amount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </td>
                  <td className="py-3 align-top">
                    <button
                      type="button"
                      onClick={() => onRemoveRow?.(index)}
                      disabled={disabled || items.length <= 1}
                      aria-label="Remove row"
                      title="Remove row"
                      className="p-2 rounded-[10px] text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {!disabled && (
        <button
          type="button"
          onClick={onAddRow}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B2D5C] hover:text-[#F4B400] transition-colors"
        >
          <Plus size={16} />
          Add Row
        </button>
      )}
    </div>
  )
}
