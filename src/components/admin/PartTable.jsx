import { Plus, Trash2 } from "lucide-react"

const cellClass =
  "w-full h-10 px-3 rounded-[10px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"

export default function PartTable({ rows = [], onChange, disabled = false }) {
  const updateRow = (index, field, value) => {
    onChange(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  const addRow = () => {
    onChange([...rows, { key: `part-${Date.now()}`, partName: "", materialSpecification: "", drawingNumber: "" }])
  }

  const removeRow = (index) => {
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-[#0F172A]">
          Part Information <span className="text-red-500 ml-0.5">*</span>
        </label>
        <button
          type="button"
          onClick={addRow}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] border border-gray-200 text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={15} />
          Add Row
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="mt-3 border border-dashed border-gray-200 rounded-[12px] px-5 py-6 text-center text-sm text-[#94A3B8]">
          No parts yet. Click "Add Row" to begin.
        </div>
      ) : (
        <div className="mt-3 overflow-x-auto border border-gray-100 rounded-[12px]">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                <th className="px-4 py-3 font-semibold w-14">Sr No</th>
                <th className="px-4 py-3 font-semibold w-[32%]">Part Name</th>
                <th className="px-4 py-3 font-semibold w-[32%]">Material Specification</th>
                <th className="px-4 py-3 font-semibold">Drawing Number</th>
                <th className="px-4 py-3 font-semibold w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((row, index) => (
                <tr key={row.key || index}>
                  <td className="px-4 py-2 text-sm font-medium text-[#334155]">{index + 1}</td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.partName || ""}
                      onChange={(e) => updateRow(index, "partName", e.target.value)}
                      disabled={disabled}
                      placeholder="e.g. Pump Shaft"
                      className={cellClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.materialSpecification || ""}
                      onChange={(e) => updateRow(index, "materialSpecification", e.target.value)}
                      disabled={disabled}
                      placeholder="e.g. SS 316"
                      className={cellClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.drawingNumber || ""}
                      onChange={(e) => updateRow(index, "drawingNumber", e.target.value)}
                      disabled={disabled}
                      placeholder="e.g. DRG-102"
                      className={cellClass}
                    />
                  </td>
                  <td className="px-2 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      disabled={disabled}
                      aria-label="Remove row"
                      title="Remove row"
                      className="p-2 rounded-[8px] text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-1.5 text-xs text-[#94A3B8]">Add at least one part row.</p>
    </div>
  )
}
