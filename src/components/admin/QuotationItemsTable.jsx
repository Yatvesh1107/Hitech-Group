import { Plus, Trash2 } from "lucide-react"

const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100

const inputClass =
  "w-full h-10 px-3 rounded-[10px] border text-sm text-[#0F172A] bg-[#F8FAFC] outline-none transition-all focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"

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
}) {
  const handleField = (index, field, value) => {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
              <th className="py-3 pr-4 font-semibold w-[34%]">Description</th>
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
