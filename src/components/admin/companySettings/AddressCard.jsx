import FormSection from "../FormSection"
import InputField from "../InputField"

export default function AddressCard({ values = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title="4. Registered Address"
      description="Office address shown on quotation, invoice and technical report PDFs."
    >
      <InputField
        id="addressLine1"
        name="addressLine1"
        label="Address Line 1"
        value={values.addressLine1 || ""}
        onChange={(e) => onChange("addressLine1", e.target.value)}
        placeholder="e.g. Unit 7, MIDC Area"
      />
      <InputField
        id="addressLine2"
        name="addressLine2"
        label="Address Line 2"
        value={values.addressLine2 || ""}
        onChange={(e) => onChange("addressLine2", e.target.value)}
        placeholder="e.g. Near Highway"
      />
      <InputField
        id="city"
        name="city"
        label="City"
        value={values.city || ""}
        onChange={(e) => onChange("city", e.target.value)}
        placeholder="e.g. Kolhapur"
      />
      <InputField
        id="state"
        name="state"
        label="State"
        value={values.state || ""}
        onChange={(e) => onChange("state", e.target.value)}
        placeholder="e.g. Maharashtra"
      />
      <InputField
        id="country"
        name="country"
        label="Country"
        value={values.country || ""}
        onChange={(e) => onChange("country", e.target.value)}
        placeholder="e.g. India"
      />
      <InputField
        id="pincode"
        name="pincode"
        label="Pincode"
        value={values.pincode || ""}
        onChange={(e) => onChange("pincode", e.target.value)}
        error={errors.pincode}
        placeholder="e.g. 416003"
      />
    </FormSection>
  )
}
