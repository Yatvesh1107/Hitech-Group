import InputField from "./InputField"
import TextArea from "./TextArea"
import FormSection from "./FormSection"
import PartTable from "./PartTable"
import InspectionSections from "./InspectionSections"

export default function UltrasonicDpThicknessForm({
  values = {},
  onChange,
  disabled = false,
  errors = {},
}) {
  const update = (field) => (e) => {
    onChange({ ...values, [field]: e.target.value })
  }

  const updateSections = (sections) => {
    onChange({ ...values, sections })
  }

  const parts = Array.isArray(values.parts) ? values.parts : []
  const sections = Array.isArray(values.sections) ? values.sections : []

  return (
    <>
      <FormSection
        title="4. Part Information"
        description="Add the parts inspected under this report."
      >
        <div className="sm:col-span-2">
          <PartTable rows={parts} onChange={(rows) => onChange({ ...values, parts: rows })} disabled={disabled} />
          {errors.parts && <p className="mt-3 text-xs text-red-600">{errors.parts}</p>}
        </div>
      </FormSection>

      <FormSection
        title="5. Testing Details"
        description="Equipment, parameters and conditions used for the inspection."
      >
        <InputField
          id="equipmentUsed"
          label="Equipment Used"
          value={values.equipmentUsed || ""}
          onChange={update("equipmentUsed")}
          disabled={disabled}
        />
        <InputField
          id="placeAndDateOfTesting"
          label="Place & Date of Testing"
          value={values.placeAndDateOfTesting || ""}
          onChange={update("placeAndDateOfTesting")}
          disabled={disabled}
        />
        <InputField
          id="probeFrequency"
          label="Probe / Frequency"
          value={values.probeFrequency || ""}
          onChange={update("probeFrequency")}
          disabled={disabled}
        />
        <InputField
          id="mediumOfCouplant"
          label="Medium Of Couplant"
          value={values.mediumOfCouplant || ""}
          onChange={update("mediumOfCouplant")}
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
          id="procedureAndTechnique"
          label="Procedure & Technique"
          value={values.procedureAndTechnique || ""}
          onChange={update("procedureAndTechnique")}
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
          <TextArea
            id="standardNotes"
            label="Standard Notes"
            rows={3}
            value={values.standardNotes || ""}
            onChange={update("standardNotes")}
            placeholder="Standard notes applicable to this inspection"
            disabled={disabled}
          />
        </div>
        <InputField
          id="engineerName"
          label="Engineer Name"
          value={values.engineerName || ""}
          onChange={update("engineerName")}
          disabled={disabled}
        />
      </FormSection>

      <FormSection
        title="6. Inspection Sections"
        description="Add, delete or reorder inspection sections. Each section contains its own rows."
      >
        <div className="sm:col-span-2">
          <InspectionSections sections={sections} onChange={updateSections} disabled={disabled} />
          {errors.sections && <p className="mt-3 text-xs text-red-600">{errors.sections}</p>}
        </div>
      </FormSection>

      <FormSection
        title="7. Final Notes"
        description="Large text area for final remarks and conclusions."
      >
        <div className="sm:col-span-2">
          <TextArea
            id="finalNotes"
            label="Final Notes"
            rows={5}
            value={values.finalNotes || ""}
            onChange={update("finalNotes")}
            placeholder="Any final remarks, conclusions or acceptance criteria"
            disabled={disabled}
          />
        </div>
      </FormSection>

      <FormSection
        title="8. Prepared By / Authorized By"
        description="Names shown at the bottom of the printed report."
      >
        <InputField
          id="preparedBy"
          label="Prepared By"
          value={values.preparedBy || ""}
          onChange={update("preparedBy")}
          disabled={disabled}
        />
        <InputField
          id="authorizedBy"
          label="Authorized By"
          value={values.authorizedBy || ""}
          onChange={update("authorizedBy")}
          disabled={disabled}
        />
      </FormSection>
    </>
  )
}
