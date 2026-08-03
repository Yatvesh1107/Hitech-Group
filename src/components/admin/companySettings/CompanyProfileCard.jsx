import FormSection from "../FormSection"
import InputField from "../InputField"
import TextArea from "../TextArea"

export default function CompanyProfileCard({ values = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title="1. Company Information"
      description="Basic details used to identify the company on documents."
    >
      <InputField
        id="companyName"
        name="companyName"
        label="Company Name"
        required
        value={values.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        error={errors.companyName}
        placeholder="e.g. HITECH GROUP"
      />
      <InputField
        id="companyTagline"
        name="companyTagline"
        label="Company Tagline"
        value={values.tagline || ""}
        onChange={(e) => onChange("tagline", e.target.value)}
        placeholder="e.g. Engineering Excellence"
      />
      <TextArea
        id="companyDescription"
        name="companyDescription"
        label="Company Description"
        value={values.description || ""}
        onChange={(e) => onChange("description", e.target.value)}
        placeholder="Short description of what the company does"
        className="sm:col-span-2"
      />
    </FormSection>
  )
}
