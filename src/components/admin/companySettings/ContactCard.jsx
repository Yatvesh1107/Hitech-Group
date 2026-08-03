import FormSection from "../FormSection"
import InputField from "../InputField"

export default function ContactCard({ values = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title="3. Contact Information"
      description="Primary contact details printed on PDF documents."
    >
      <InputField
        id="phone"
        name="phone"
        label="Phone Number"
        required
        value={values.phone || ""}
        onChange={(e) => onChange("phone", e.target.value)}
        error={errors.phone}
        placeholder="e.g. +91 98765 43210"
      />
      <InputField
        id="alternatePhone"
        name="alternatePhone"
        label="Alternate Phone"
        value={values.alternatePhone || ""}
        onChange={(e) => onChange("alternatePhone", e.target.value)}
        placeholder="e.g. +91 91234 56780"
      />
      <InputField
        id="email"
        name="email"
        label="Email Address"
        required
        type="email"
        value={values.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        placeholder="e.g. info@hitechgroup.com"
      />
      <InputField
        id="website"
        name="website"
        label="Website"
        type="url"
        value={values.website || ""}
        onChange={(e) => onChange("website", e.target.value)}
        error={errors.website}
        placeholder="e.g. https://www.hitechgroup.com"
      />
    </FormSection>
  )
}
