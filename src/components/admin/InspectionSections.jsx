import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"

const inputClass =
  "w-full h-9 px-3 rounded-[10px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"

const cellClass =
  "w-full h-10 px-3 rounded-[10px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"

function newSection() {
  return { key: `section-${Date.now()}`, title: "", rows: [newRow()] }
}

function newRow() {
  return { key: `row-${Date.now()}`, description: "", remark: "" }
}

export default function InspectionSections({ sections = [], onChange, disabled = false }) {
  const updateSection = (index, patch) => {
    onChange(sections.map((section, i) => (i === index ? { ...section, ...patch } : section)))
  }

  const addSection = () => {
    onChange([...sections, newSection()])
  }

  const removeSection = (index) => {
    onChange(sections.filter((_, i) => i !== index))
  }

  const moveSection = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    const next = [...sections]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    onChange(next)
  }

  const updateRow = (sectionIndex, rowIndex, field, value) => {
    updateSection(sectionIndex, {
      rows: sections[sectionIndex].rows.map((row, i) =>
        i === rowIndex ? { ...row, [field]: value } : row
      ),
    })
  }

  const addRow = (sectionIndex) => {
    updateSection(sectionIndex, { rows: [...sections[sectionIndex].rows, newRow()] })
  }

  const removeRow = (sectionIndex, rowIndex) => {
    updateSection(sectionIndex, {
      rows: sections[sectionIndex].rows.filter((_, i) => i !== rowIndex),
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-[#0F172A]">
          Inspection Sections <span className="text-red-500 ml-0.5">*</span>
        </label>
        <button
          type="button"
          onClick={addSection}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] border border-gray-200 text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={15} />
          Create Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="mt-3 border border-dashed border-gray-200 rounded-[12px] px-5 py-6 text-center text-sm text-[#94A3B8]">
          No sections yet. Click "Create Section" to begin.
        </div>
      ) : (
        <div className="mt-3 space-y-5">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.key}
              className="border border-gray-200 rounded-[16px] p-4 bg-[#FCFDFE]"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  {sectionIndex + 1}.
                </span>
                <input
                  type="text"
                  value={section.title || ""}
                  onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                  disabled={disabled}
                  placeholder={`Section ${sectionIndex + 1} title (e.g. ${sectionTitleHint(sectionIndex)})`}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => moveSection(sectionIndex, -1)}
                  disabled={disabled || sectionIndex === 0}
                  aria-label="Move section up"
                  title="Move up"
                  className="p-2 rounded-[8px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(sectionIndex, 1)}
                  disabled={disabled || sectionIndex === sections.length - 1}
                  aria-label="Move section down"
                  title="Move down"
                  className="p-2 rounded-[8px] text-[#94A3B8] hover:text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  disabled={disabled}
                  aria-label="Delete section"
                  title="Delete section"
                  className="p-2 rounded-[8px] text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="mt-3 overflow-x-auto border border-gray-100 rounded-[12px]">
                <table className="w-full min-w-[520px] text-left">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                      <th className="px-4 py-3 font-semibold w-14">Sr No</th>
                      <th className="px-4 py-3 font-semibold">Description</th>
                      <th className="px-4 py-3 font-semibold">Remark</th>
                      <th className="px-4 py-3 font-semibold w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(Array.isArray(section.rows) ? section.rows : []).map((row, rowIndex) => (
                      <tr key={row.key || rowIndex}>
                        <td className="px-4 py-2 text-sm font-medium text-[#334155]">
                          {rowIndex + 1}
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.description || ""}
                            onChange={(e) => updateRow(sectionIndex, rowIndex, "description", e.target.value)}
                            disabled={disabled}
                            placeholder="Description"
                            className={cellClass}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={row.remark || ""}
                            onChange={(e) => updateRow(sectionIndex, rowIndex, "remark", e.target.value)}
                            disabled={disabled}
                            placeholder="Remark"
                            className={cellClass}
                          />
                        </td>
                        <td className="px-2 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeRow(sectionIndex, rowIndex)}
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

              <button
                type="button"
                onClick={() => addRow(sectionIndex)}
                disabled={disabled}
                className="mt-2 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] border border-gray-200 text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={15} />
                Add Row
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function sectionTitleHint(index) {
  const hints = ["Ultrasonic Testing", "D.P. Testing", "Thickness Testing"]
  return hints[index % hints.length]
}