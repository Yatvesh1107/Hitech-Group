import { Plus } from "lucide-react"
import InputField from "./InputField"
import SelectField from "./SelectField"
import TextArea from "./TextArea"
import FormSection from "./FormSection"
import ShaftEditor from "./ShaftEditor"

function newShaft() {
  return {
    key: `shaft-${Date.now()}`,
    shaftName: "",
    startTime: "",
    endTime: "",
    duration: "",
    frequencyMin: "",
    frequencyMax: "",
    frequencyAvg: "",
    amplitudeMin: "",
    amplitudeMax: "",
    amplitudeAvg: "",
    beforeAfterGraph: "",
    frequencyReadings: [{ key: `reading-${Date.now()}`, time: "", frequency: "" }],
  }
}

const YES_NO_OPTIONS = [
  { value: "", label: "Select…" },
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
]

export default function VSRForm({ values = {}, onChange, disabled = false, token }) {
  const updateGroup = (group, field) => (e) => {
    onChange({
      ...values,
      [group]: { ...(values[group] || {}), [field]: e.target.value },
    })
  }

  const updateField = (field) => (e) => {
    onChange({ ...values, [field]: e.target.value })
  }

  const shafts = Array.isArray(values.shafts) ? values.shafts : []

  const updateShaft = (index, shaft) => {
    onChange({
      ...values,
      shafts: shafts.map((item, i) => (i === index ? shaft : item)),
    })
  }

  const addShaft = () => {
    onChange({ ...values, shafts: [...shafts, newShaft()] })
  }

  const removeShaft = (index) => {
    onChange({
      ...values,
      shafts: shafts.filter((_, i) => i !== index),
    })
  }

  const monitoring = values.monitoringControl || {}
  const signOff = values.signOff || {}

  return (
    <>
      <FormSection
        title="2. Customer & Job Details"
        description="Information about the customer and the job covered by this VSR report."
      >
        <InputField
          id="customerName"
          label="Customer Name"
          value={(values.customerJobDetails || {}).customerName || ""}
          onChange={updateGroup("customerJobDetails", "customerName")}
          disabled={disabled}
        />
        <InputField
          id="purchaseOrderNo"
          label="Purchase Order No."
          value={(values.customerJobDetails || {}).purchaseOrderNo || ""}
          onChange={updateGroup("customerJobDetails", "purchaseOrderNo")}
          disabled={disabled}
        />
        <InputField
          id="componentDescription"
          label="Component Description"
          value={(values.customerJobDetails || {}).componentDescription || ""}
          onChange={updateGroup("customerJobDetails", "componentDescription")}
          disabled={disabled}
        />
        <InputField
          id="materialSpecification"
          label="Material Specification"
          value={(values.customerJobDetails || {}).materialSpecification || ""}
          onChange={updateGroup("customerJobDetails", "materialSpecification")}
          disabled={disabled}
        />
        <InputField
          id="quantity"
          label="Quantity"
          value={(values.customerJobDetails || {}).quantity || ""}
          onChange={updateGroup("customerJobDetails", "quantity")}
          disabled={disabled}
        />
        <InputField
          id="weightPerUnit"
          label="Weight per Unit (kg)"
          value={(values.customerJobDetails || {}).weightPerUnit || ""}
          onChange={updateGroup("customerJobDetails", "weightPerUnit")}
          disabled={disabled}
        />
        <InputField
          id="overallDimensions"
          label="Overall Dimensions"
          value={(values.customerJobDetails || {}).overallDimensions || ""}
          onChange={updateGroup("customerJobDetails", "overallDimensions")}
          placeholder="e.g. Ø 900 × 2500 mm"
          disabled={disabled}
        />
      </FormSection>

      <FormSection
        title="3. Pre-VSR Inspection"
        description="Condition recorded before the vibratory stress relief process."
      >
        <InputField
          id="preVisualInspection"
          label="Visual Inspection"
          value={(values.preInspection || {}).visualInspection || ""}
          onChange={updateGroup("preInspection", "visualInspection")}
          disabled={disabled}
        />
        <InputField
          id="surfaceCondition"
          label="Surface Condition"
          value={(values.preInspection || {}).surfaceCondition || ""}
          onChange={updateGroup("preInspection", "surfaceCondition")}
          disabled={disabled}
        />
      </FormSection>

      <FormSection
        title="4. VSR Process Parameters"
        description="Settings used for the vibratory stress relieving process of this job."
      >
        <InputField
          id="vibratoryMachineId"
          label="Vibratory Machine ID"
          value={(values.processParameters || {}).vibratoryMachineId || ""}
          onChange={updateGroup("processParameters", "vibratoryMachineId")}
          disabled={disabled}
        />
        <InputField
          id="fixtureType"
          label="Fixture Type"
          value={(values.processParameters || {}).fixtureType || ""}
          onChange={updateGroup("processParameters", "fixtureType")}
          disabled={disabled}
        />
        <InputField
          id="fetchFrequencyRange"
          label="Frequency Range"
          value={(values.processParameters || {}).frequencyRange || ""}
          onChange={updateGroup("processParameters", "frequencyRange")}
          placeholder="e.g. 0 - 30 Hz"
          disabled={disabled}
        />
        <InputField
          id="frequencyAmplitudeRange"
          label="Amplitude Range"
          value={(values.processParameters || {}).amplitudeRange || ""}
          onChange={updateGroup("processParameters", "amplitudeRange")}
          placeholder="e.g. 0 - 266 micron"
          disabled={disabled}
        />
        <InputField
          id="processDuration"
          label="Duration"
          value={(values.processParameters || {}).duration || ""}
          onChange={updateGroup("processParameters", "duration")}
          placeholder="Report-level duration of the VSR process"
          disabled={disabled}
        />
        <InputField
          id="modeOfExcitation"
          label="Mode of Excitation"
          value={(values.processParameters || {}).modeOfExcitation || ""}
          onChange={updateGroup("processParameters", "modeOfExcitation")}
          disabled={disabled}
        />
        <InputField
          id="sensor"
          label="Sensor"
          value={(values.processParameters || {}).sensor || ""}
          onChange={updateGroup("processParameters", "sensor")}
          disabled={disabled}
        />
      </FormSection>

      <FormSection
        title="5. Monitoring & Control"
        description="Monitor the vibration response during the process."
      >
        {[
          { field: "dynamicResponseMonitoring", label: "Dynamic Response Monitoring" },
          { field: "resonanceAchieved", label: "Resonance Achieved" },
          { field: "frequencyShiftObserved", label: "Frequency Shift Observed" },
          { field: "graphRecorded", label: "Graph Recorded" },
        ].map(({ field, label }) => (
          <SelectField
            key={field}
            id={field}
            label={label}
            value={monitoring[field] || ""}
            onChange={updateGroup("monitoringControl", field)}
            disabled={disabled}
          >
            {YES_NO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        ))}
      </FormSection>

      <FormSection
        title="6. Post-VSR Inspection"
        description="Checks performed after the vibratory stress relief treatment."
      >
        <InputField
          id="postVisualInspection"
          label="Visual Inspection"
          value={(values.postInspection || {}).visualInspection || ""}
          onChange={updateGroup("postInspection", "visualInspection")}
          disabled={disabled}
        />
        <InputField
          id="methodUsed"
          label="Method Used"
          value={(values.postInspection || {}).methodUsed || ""}
          onChange={updateGroup("postInspection", "methodUsed")}
          disabled={disabled}
        />
        <InputField
          id="dimensionalCheck"
          label="Dimensional Check"
          value={(values.postInspection || {}).dimensionalCheck || ""}
          onChange={updateGroup("postInspection", "dimensionalCheck")}
          disabled={disabled}
        />
        <InputField
          id="finalComments"
          label="Final Comments / Defects"
          value={(values.postInspection || {}).finalComments || ""}
          onChange={updateGroup("postInspection", "finalComments")}
          disabled={disabled}
        />
      </FormSection>

      <FormSection
        title="7. Shafts"
        description="Add every shaft treated under this VSR report. Each shaft keeps its own schedule, measurements, readings and graphs."
      >
        <div className="sm:col-span-2 space-y-5">
          {shafts.map((shaft, index) => (
            <ShaftEditor
              key={shaft.key || index}
              shaft={shaft}
              shaftIndex={index + 1}
              onChange={(updated) => updateShaft(index, updated)}
              onRemove={shafts.length > 1 ? () => removeShaft(index) : null}
              token={token}
              disabled={disabled}
            />
          ))}

          <button
            type="button"
            onClick={addShaft}
            disabled={disabled}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[12px] border border-dashed border-gray-300 text-sm font-semibold text-[#0B2D5C] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add Shaft
          </button>
        </div>
      </FormSection>

      <FormSection
        title="8. Operator Remarks"
        description="Any remarks from the operator who ran the VSR process."
      >
        <div className="sm:col-span-2">
          <TextArea
            label="Operator Remarks"
            rows={3}
            value={values.operatorRemarks || ""}
            onChange={updateField("operatorRemarks")}
            disabled={disabled}
          />
        </div>
      </FormSection>

      <FormSection
        title="9. Conclusion"
        description="Overall conclusion and result of the stress relieving treatment."
      >
        <div className="sm:col-span-2">
          <TextArea
            label="Conclusion"
            rows={4}
            value={(values.conclusion || {}).conclusion || ""}
            onChange={updateGroup("conclusion", "conclusion")}
            disabled={disabled}
          />
        </div>
        <InputField
          label="Result"
          value={(values.conclusion || {}).result || ""}
          onChange={updateGroup("conclusion", "result")}
          placeholder="e.g. Accepted"
          disabled={disabled}
        />
      </FormSection>

      <FormSection
        title="10. Sign-Off"
        description="Details of the person signing off on this report."
      >
        <InputField
          label="Name"
          value={signOff.name || ""}
          onChange={updateGroup("signOff", "name")}
          disabled={disabled}
        />
        <InputField
          label="Designation"
          value={signOff.designation || ""}
          onChange={updateGroup("signOff", "designation")}
          disabled={disabled}
        />
        <InputField
          label="Signature"
          value={signOff.signature || ""}
          onChange={updateGroup("signOff", "signature")}
          placeholder="Name or reference used as signature"
          disabled={disabled}
        />
      </FormSection>
    </>
  )
}