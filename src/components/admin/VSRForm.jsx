import InputField from "./InputField"
import ParameterTable from "./ParameterTable"

export default function VSRForm({ values = {}, onChange, disabled = false }) {
  const update = (field) => (e) => onChange({ ...values, [field]: e.target.value })

  const parameters = Array.isArray(values.parameters) ? values.parameters : []

  return (
    <>
      <InputField
        id="machineName"
        label="Machine Name"
        value={values.machineName || ""}
        onChange={update("machineName")}
        disabled={disabled}
      />
      <InputField
        id="operator"
        label="Operator"
        value={values.operator || ""}
        onChange={update("operator")}
        disabled={disabled}
      />
      <InputField
        id="startTime"
        label="Start Time"
        type="datetime-local"
        value={values.startTime || ""}
        onChange={update("startTime")}
        disabled={disabled}
      />
      <InputField
        id="endTime"
        label="End Time"
        type="datetime-local"
        value={values.endTime || ""}
        onChange={update("endTime")}
        disabled={disabled}
      />
      <InputField
        id="duration"
        label="Duration (hours)"
        type="number"
        step="any"
        min="0"
        value={values.duration ?? ""}
        onChange={update("duration")}
        disabled={disabled}
      />

      <div className="sm:col-span-2">
        <ParameterTable rows={parameters} onChange={(rows) => onChange({ ...values, parameters: rows })} disabled={disabled} />
      </div>
    </>
  )
}
