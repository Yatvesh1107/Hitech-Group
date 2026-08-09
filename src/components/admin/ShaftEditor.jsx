import { Trash2 } from "lucide-react"
import InputField from "./InputField"
import FrequencyReadingsTable from "./FrequencyReadingsTable"
import VSRGraphUploader from "./VSRGraphUploader"

const readOnlyClass =
  "w-full h-[48px] px-4 rounded-[12px] border border-gray-200 bg-gray-50 text-sm text-[#334155] cursor-not-allowed"

function toReadableNumber(value) {
  if (value === "" || value === null || value === undefined) return ""
  const number = Number(value)
  if (Number.isNaN(number)) return value
  return Number.isInteger(number) ? String(number) : String(Math.round(number * 100) / 100)
}

function computeDuration(startTime, endTime) {
  if (!startTime || !endTime) return ""
  const start = new Date(startTime)
  const end = new Date(endTime)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return ""

  const diffMs = Math.max(0, end.getTime() - start.getTime())
  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")
}

function computeFrequencySummary(readings) {
  const numbers = (Array.isArray(readings) ? readings : [])
    .map((reading) => reading?.frequency)
    .filter((value) => value !== "" && value != null && !Number.isNaN(Number(value)))
    .map(Number)

  if (numbers.length === 0) return { min: "", max: "", avg: "" }

  const average = numbers.reduce((sum, value) => sum + value, 0) / numbers.length

  return {
    min: toReadableNumber(Math.min(...numbers)),
    max: toReadableNumber(Math.max(...numbers)),
    avg: toReadableNumber(average),
  }
}

export default function ShaftEditor({
  shaft = {},
  shaftIndex,
  onChange,
  onRemove,
  token,
  disabled = false,
}) {
  const updateField = (field, value) => {
    onChange({ ...shaft, [field]: value })
  }

  const duration = computeDuration(shaft.startTime, shaft.endTime)

  const handleReadingsChange = (readings) => {
    const summary = computeFrequencySummary(readings)
    onChange({
      ...shaft,
      frequencyReadings: readings,
      frequencyMin: summary.min,
      frequencyMax: summary.max,
      frequencyAvg: summary.avg,
    })
  }

  const minMaxAvgFields = [
    { key: "min", label: "Min", value: toReadableNumber(shaft.frequencyMin) },
    { key: "max", label: "Max", value: toReadableNumber(shaft.frequencyMax) },
    { key: "avg", label: "Avg", value: toReadableNumber(shaft.frequencyAvg) },
  ]

  return (
    <div className="border border-gray-100 rounded-[18px] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#F8FAFC] border-b border-gray-100">
        <h3 className="text-sm font-bold text-[#0F172A]">Shaft {shaftIndex}</h3>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-[10px] border border-red-200 bg-white text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={14} />
            Remove Shaft
          </button>
        )}
      </div>

      <div className="px-5 py-5">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <div className="sm:col-span-2">
            <InputField
              id={`shaftName-${shaftIndex}`}
              label="Shaft Name"
              required
              value={shaft.shaftName || ""}
              onChange={(e) => updateField("shaftName", e.target.value)}
              placeholder="e.g. MILL ROLLER NO 1 TOP"
              disabled={disabled}
            />
          </div>
          <InputField
            id={`shaftStart-${shaftIndex}`}
            label="Start Time"
            type="datetime-local"
            value={shaft.startTime || ""}
            onChange={(e) => updateField("startTime", e.target.value)}
            disabled={disabled}
          />
          <InputField
            id={`shaftEnd-${shaftIndex}`}
            label="End Time"
            type="datetime-local"
            value={shaft.endTime || ""}
            onChange={(e) => updateField("endTime", e.target.value)}
            disabled={disabled}
          />
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Duration</label>
            <input
              type="text"
              readOnly
              tabIndex={-1}
              value={duration}
              placeholder="Auto-calculated from start/end time"
              className={readOnlyClass}
            />
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-5">
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold text-[#0F172A] mb-1.5">Frequency Summary</p>
            <p className="text-xs text-[#94A3B8] mb-3">
              Calculated automatically from the frequency readings below.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {minMaxAvgFields.map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold text-[#64748B] mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    readOnly
                    tabIndex={-1}
                    value={field.value || "—"}
                    className={readOnlyClass}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#0F172A] mb-1.5">Amplitude Summary</p>
          <p className="text-xs text-[#94A3B8] mb-3">
            Enter these values manually. No amplitude-reading dataset is required.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { field: "amplitudeMin", label: "Min" },
              { field: "amplitudeMax", label: "Max" },
              { field: "amplitudeAvg", label: "Avg" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-[#64748B] mb-1">{label}</label>
                <input
                  type="number"
                  step="any"
                  value={shaft[field] ?? ""}
                  onChange={(e) => updateField(field, e.target.value)}
                  disabled={disabled}
                  placeholder="0.00"
                  className="w-full h-[42px] px-3 rounded-[10px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:col-span-2">
          <FrequencyReadingsTable
            rows={Array.isArray(shaft.frequencyReadings) ? shaft.frequencyReadings : []}
            onChange={handleReadingsChange}
            disabled={disabled}
          />
        </div>

        <div className="mt-6">
          <VSRGraphUploader
            value={shaft.beforeAfterGraph || ""}
            onChange={(url) => updateField("beforeAfterGraph", url)}
            token={token}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}