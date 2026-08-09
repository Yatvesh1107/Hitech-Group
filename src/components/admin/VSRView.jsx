import { ClipboardList, FileImage } from "lucide-react"
import SectionHeader from "./SectionHeader"
import { assetUrl } from "../../config/env"

function InfoItem({ label, value }) {
  const isEmpty = value === null || value === undefined || value === ""

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">{isEmpty ? "—" : value}</dd>
    </div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mt-6 mb-3">
      <h3 className="text-sm font-bold text-[#0F172A]">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-[#94A3B8]">{subtitle}</p>}
    </div>
  )
}

function InfoGrid({ title, items = [] }) {
  return (
    <div className="px-6">
      <SectionTitle title={title} />
      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {items.map((item) => (
          <InfoItem key={item.label} label={item.label} value={item.value} />
        ))}
      </dl>
    </div>
  )
}

function formatDateTime(value) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timePart = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

  return `${datePart} · ${timePart}`
}

function toNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function formatNumber(value) {
  const number = toNumber(value)
  if (number === null) return "—"
  return Number.isInteger(number) ? String(number) : String(Math.round(number * 100) / 100)
}

function shaftFrequencySummary(shaft) {
  const readings = Array.isArray(shaft.frequencyReadings) ? shaft.frequencyReadings : []
  const numbers = readings
    .map((reading) => toNumber(reading?.frequency))
    .filter((value) => value !== null)

  if (numbers.length > 0) {
    const average = numbers.reduce((sum, value) => sum + value, 0) / numbers.length
    return {
      min: formatNumber(Math.min(...numbers)),
      max: formatNumber(Math.max(...numbers)),
      avg: formatNumber(average),
    }
  }

  return {
    min: formatNumber(shaft.frequencyMin),
    max: formatNumber(shaft.frequencyMax),
    avg: formatNumber(shaft.frequencyAvg),
  }
}

function SummaryTable({ rows }) {
  if (rows.length === 0) {
    return <p className="text-sm text-[#94A3B8]">No values recorded.</p>
  }

  return (
    <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
      <table className="w-full min-w-[360px] text-left">
        <thead>
          <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
            <th className="px-4 py-3 font-semibold">Parameter</th>
            <th className="px-4 py-3 font-semibold">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row) => (
            <tr key={row.parameter}>
              <td className="px-4 py-3 text-sm text-[#334155]">{row.parameter}</td>
              <td className="px-4 py-3 text-sm font-medium text-[#334155]">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ShaftSection({ shaft, index }) {
  const frequency = shaftFrequencySummary(shaft)
  const readings = Array.isArray(shaft.frequencyReadings)
    ? shaft.frequencyReadings.filter((reading) => reading?.time || reading?.frequency !== "")
    : []

  return (
    <div className="mt-4 rounded-[16px] border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 bg-[#F8FAFC] border-b border-gray-100">
        <h4 className="text-sm font-bold text-[#0F172A]">Shaft {index}</h4>
        <p className="mt-0.5 text-sm font-medium text-[#334155]">{shaft.shaftName || "—"}</p>
      </div>

      <div className="px-5 py-5">
        <dl className="grid sm:grid-cols-3 gap-x-6 gap-y-4">
          <InfoItem label="Start Time" value={formatDateTime(shaft.startTime)} />
          <InfoItem label="End Time" value={formatDateTime(shaft.endTime)} />
          <InfoItem label="Duration" value={shaft.duration || "—"} />
        </dl>

        <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <SectionTitle title="Frequency Summary" subtitle="Calculated from the readings below." />
            <SummaryTable
              rows={[
                { parameter: "Frequency Min", value: frequency.min },
                { parameter: "Frequency Max", value: frequency.max },
                { parameter: "Frequency Avg", value: frequency.avg },
              ]}
            />
          </div>
          <div>
            <SectionTitle title="Amplitude Summary" />
            <SummaryTable
              rows={[
                { parameter: "Amplitude Min", value: formatNumber(shaft.amplitudeMin) },
                { parameter: "Amplitude Max", value: formatNumber(shaft.amplitudeMax) },
                { parameter: "Amplitude Avg", value: formatNumber(shaft.amplitudeAvg) },
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <SectionTitle title="Frequency Readings" subtitle="Time / Frequency values used for the graph." />
          {readings.length === 0 ? (
            <p className="text-sm text-[#94A3B8]">No frequency readings recorded.</p>
          ) : (
            <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
              <table className="w-full min-w-[360px] text-left">
                <thead>
                  <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                    <th className="px-4 py-3 font-semibold">Time</th>
                    <th className="px-4 py-3 font-semibold">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {readings.map((reading, readingIndex) => (
                    <tr key={reading.key || readingIndex}>
                      <td className="px-4 py-3 text-sm text-[#334155]">{reading.time || "—"}</td>
                      <td className="px-4 py-3 text-sm font-medium text-[#334155]">
                        {formatNumber(reading.frequency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6">
          <SectionTitle title="Before & After Stress Relief Graph" />
          {shaft.beforeAfterGraph ? (
            <div className="rounded-[12px] border border-gray-100 bg-[#F8FAFC] p-4 flex items-center justify-center">
              <img
                src={assetUrl(shaft.beforeAfterGraph)}
                alt="Before & after stress relief graph"
                className="max-h-72 max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="rounded-[12px] border border-dashed border-gray-200 bg-[#F8FAFC] px-5 py-8 text-center">
              <FileImage size={20} className="mx-auto text-[#94A3B8]" />
              <p className="mt-2 text-sm text-[#94A3B8]">No graph uploaded for this shaft.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LegacyVSRView({ report }) {
  const data = report?.reportData || {}
  const parameters = Array.isArray(data.parameters) ? data.parameters : []

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<ClipboardList size={16} />} title="VSR Report Content" />

      <div className="px-6 py-5">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <InfoItem label="Machine Name" value={data.machineName} />
          <InfoItem label="Operator" value={data.operator} />
          <InfoItem label="Start Time" value={formatDateTime(data.startTime)} />
          <InfoItem label="End Time" value={formatDateTime(data.endTime)} />
          <InfoItem label="Duration" value={data.duration == null || data.duration === "" ? "—" : `${data.duration} hrs`} />
        </dl>
      </div>

      <div className="px-6 pb-5">
        <h3 className="text-sm font-bold text-[#0F172A] mb-3">Parameters</h3>
        {parameters.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No parameters recorded.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-100 rounded-[12px]">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="px-4 py-3 font-semibold">Parameter</th>
                  <th className="px-4 py-3 font-semibold">Minimum</th>
                  <th className="px-4 py-3 font-semibold">Maximum</th>
                  <th className="px-4 py-3 font-semibold">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {parameters.map((row, index) => (
                  <tr key={row.key || index}>
                    <td className="px-4 py-3 text-sm text-[#334155]">{row.parameter || "—"}</td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.minimum === "" || row.minimum == null ? "—" : row.minimum}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.maximum === "" || row.maximum == null ? "—" : row.maximum}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#334155]">
                      {row.average === "" || row.average == null ? "—" : row.average}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="px-6 py-5 border-t border-gray-100">
        <dt className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Remarks</dt>
        <dd className="mt-1.5 text-sm font-medium text-[#334155] break-words">
          {report?.remarks || "—"}
        </dd>
      </div>
    </div>
  )
}

export default function VSRView({ report }) {
  const data = report?.reportData || {}

  if (!Array.isArray(data.shafts) || data.shafts.length === 0) {
    return <LegacyVSRView report={report} />
  }

  const shafts = data.shafts

  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<ClipboardList size={16} />} title="VSR Report Content" />

      <InfoGrid
        title="Customer & Job Details"
        items={[
          { label: "Customer Name", value: data.customerJobDetails?.customerName },
          { label: "Purchase Order No.", value: data.customerJobDetails?.purchaseOrderNo },
          { label: "Component Description", value: data.customerJobDetails?.componentDescription },
          { label: "Material Specification", value: data.customerJobDetails?.materialSpecification },
          { label: "Quantity", value: data.customerJobDetails?.quantity },
          { label: "Weight per Unit (kg)", value: data.customerJobDetails?.weightPerUnit },
          { label: "Overall Dimensions", value: data.customerJobDetails?.overallDimensions },
        ]}
      />

      <InfoGrid
        title="Pre-VSR Inspection"
        items={[
          { label: "Visual Inspection", value: data.preInspection?.visualInspection },
          { label: "Surface Condition", value: data.preInspection?.surfaceCondition },
        ]}
      />

      <InfoGrid
        title="VSR Process Parameters"
        items={[
          { label: "Vibratory Machine ID", value: data.processParameters?.vibratoryMachineId },
          { label: "Fixture Type", value: data.processParameters?.fixtureType },
          { label: "Frequency Range", value: data.processParameters?.frequencyRange },
          { label: "Amplitude Range", value: data.processParameters?.amplitudeRange },
          { label: "Duration", value: data.processParameters?.duration },
          { label: "Mode of Excitation", value: data.processParameters?.modeOfExcitation },
          { label: "Sensor", value: data.processParameters?.sensor },
        ]}
      />

      <InfoGrid
        title="Monitoring & Control"
        items={[
          { label: "Dynamic Response Monitoring", value: data.monitoringControl?.dynamicResponseMonitoring },
          { label: "Resonance Achieved", value: data.monitoringControl?.resonanceAchieved },
          { label: "Frequency Shift Observed", value: data.monitoringControl?.frequencyShiftObserved },
          { label: "Graph Recorded", value: data.monitoringControl?.graphRecorded },
        ]}
      />

      <InfoGrid
        title="Post-VSR Inspection"
        items={[
          { label: "Visual Inspection", value: data.postInspection?.visualInspection },
          { label: "Method Used", value: data.postInspection?.methodUsed },
          { label: "Dimensional Check", value: data.postInspection?.dimensionalCheck },
          { label: "Final Comments / Defects", value: data.postInspection?.finalComments },
        ]}
      />

      <div className="px-6">
        <SectionTitle title="Operator Remarks" />
        <p className="text-sm font-medium text-[#334155] break-words">
          {data.operatorRemarks || "—"}
        </p>
      </div>

      <InfoGrid
        title="Conclusion"
        items={[
          { label: "Conclusion", value: data.conclusion?.conclusion },
          { label: "Result", value: data.conclusion?.result },
        ]}
      />

      <InfoGrid
        title="Sign-Off"
        items={[
          { label: "Name", value: data.signOff?.name },
          { label: "Designation", value: data.signOff?.designation },
          { label: "Signature", value: data.signOff?.signature },
        ]}
      />

      <div className="px-6 pb-6">
        <SectionTitle title="Shafts" subtitle={`${shafts.length} shaft${shafts.length === 1 ? "" : "s"} treated under this report.`} />
        {shafts.map((shaft, index) => (
          <ShaftSection key={shaft.key || index} shaft={shaft} index={index + 1} />
        ))}
      </div>
    </div>
  )
}