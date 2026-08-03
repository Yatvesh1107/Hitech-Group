import InputField from "./InputField"
import ObservationTable from "./ObservationTable"

export default function UltrasonicForm({ values = {}, onChange, disabled = false }) {
  const update = (field) => (e) => onChange({ ...values, [field]: e.target.value })

  const observations = Array.isArray(values.observations) ? values.observations : []

  return (
    <>
      <InputField
        id="jobLocation"
        label="Job Location"
        value={values.jobLocation || ""}
        onChange={update("jobLocation")}
        disabled={disabled}
      />
      <InputField
        id="equipmentName"
        label="Equipment Name"
        value={values.equipmentName || ""}
        onChange={update("equipmentName")}
        disabled={disabled}
      />
      <InputField
        id="equipmentUsed"
        label="Equipment Used"
        value={values.equipmentUsed || ""}
        onChange={update("equipmentUsed")}
        disabled={disabled}
      />
      <InputField
        id="probeType"
        label="Probe Type"
        value={values.probeType || ""}
        onChange={update("probeType")}
        disabled={disabled}
      />
      <InputField
        id="frequency"
        label="Frequency"
        value={values.frequency || ""}
        onChange={update("frequency")}
        disabled={disabled}
      />
      <InputField
        id="couplant"
        label="Couplant"
        value={values.couplant || ""}
        onChange={update("couplant")}
        disabled={disabled}
      />
      <InputField
        id="standardSpecification"
        label="Standard Specification"
        value={values.standardSpecification || ""}
        onChange={update("standardSpecification")}
        disabled={disabled}
      />
      <InputField
        id="scanningMethod"
        label="Scanning Method"
        value={values.scanningMethod || ""}
        onChange={update("scanningMethod")}
        disabled={disabled}
      />

      <div className="sm:col-span-2">
        <ObservationTable rows={observations} onChange={(rows) => onChange({ ...values, observations: rows })} disabled={disabled} />
      </div>

      <InputField
        id="overallResult"
        label="Overall Result"
        value={values.overallResult || ""}
        onChange={update("overallResult")}
        disabled={disabled}
      />
      <InputField
        id="recommendations"
        label="Recommendations"
        value={values.recommendations || ""}
        onChange={update("recommendations")}
        disabled={disabled}
      />
    </>
  )
}
