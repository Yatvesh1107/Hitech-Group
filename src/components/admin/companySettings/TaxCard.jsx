import FormSection from "../FormSection"
import InputField from "../InputField"

export default function TaxCard({ values = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title="5. Tax Information"
      description="Tax registration numbers shown on the PDF documents."
    >
      <InputField
        id="gstNumber"
        name="gstNumber"
        label="GST Number"
        required
        value={values.gstNumber || ""}
        onChange={(e) => onChange("gstNumber", e.target.value)}
        error={errors.gstNumber}
        placeholder="e.g. 27ABCDE1234F1Z5"
        maxLength={15}
      />
      <InputField
        id="panNumber"
        name="panNumber"
        label="PAN Number"
        value={values.panNumber || ""}
        onChange={(e) => onChange("panNumber", e.target.value)}
        error={errors.panNumber}
        placeholder="e.g. ABCDE1234F"
        maxLength={10}
      />
    </FormSection>
  )
}
