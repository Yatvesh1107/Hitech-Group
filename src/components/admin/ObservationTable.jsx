import { Plus, Trash2 } from "lucide-react"

const cellClass =
  "w-full h-10 px-3 rounded-[10px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"

export default function ObservationTable({ rows = [], onChange, disabled = false }) {
  const updateRow = (index, field, value) => {
    onChange(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  const addRow = () => {
    onChange([
      ...rows,
      { key: `obs-${Date.now()}`, location: "", observation: "", result: "", remarks: "" },
    ])
  }

  const removeRow = (index) => {
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-[#0F172A]">
          Observations <span className="text-red-500 ml-0.5">*</span>
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
          No observations yet. Click "Add Row" to begin.
        </div>
      ) : (
        <div className="mt-3 overflow-x-auto border border-gray-100 rounded-[12px]">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                <th className="px-4 py-3 font-semibold w-[22%]">Location</th>
                <th className="px-4 py-3 font-semibold w-[30%]">Observation</th>
                <th className="px-4 py-3 font-semibold w-[22%]">Result</th>
                <th className="px-4 py-3 font-semibold">Remarks</th>
                <th className="px-4 py-3 font-semibold w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((row, index) => (
                <tr key={row.key || index}>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.location || ""}
                      onChange={(e) => updateRow(index, "location", e.target.value)}
                      disabled={disabled}
                      placeholder="e.g. Weld A"
                      className={cellClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.observation || ""}
                      onChange={(e) => updateRow(index, "observation", e.target.value)}
                      disabled={disabled}
                      placeholder="e.g. No detectable flaw"
                      className={cellClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.result || ""}
                      onChange={(e) => updateRow(index, "result", e.target.value)}
                      disabled={disabled}
                      placeholder="e.g. Accepted"
                      className={cellClass}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.remarks || ""}
                      onChange={(e) => updateRow(index, "remarks", e.target.value)}
                      disabled={disabled}
                      placeholder="Optional"
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

      <p className="mt-1.5 text-xs text-[#94A3B8]">Add at least one observation row.</p>
    </div>
  )
}
