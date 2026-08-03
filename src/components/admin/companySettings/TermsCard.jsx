import FormSection from "../FormSection"
import TextArea from "../TextArea"

const TERM_FIELDS = [
  { key: "quotation", label: "Quotation Terms", placeholder: "1. Validity of quotation: 15 days from the date of quotation.\n2. Payment terms: 50% advance and balance before dispatch.\n3. Taxes as applicable." },
  { key: "invoice", label: "Invoice Terms", placeholder: "1. Goods once sold will not be taken back or exchanged.\n2. Payment due within 15 days of invoice date.\n3. Interest @ 18% p.a. on delayed payments." },
  { key: "technicalReport", label: "Technical Report Terms", placeholder: "1. Findings based on the information provided by the client.\n2. Report valid for 6 months from the date of issue." },
]

export default function TermsCard({ values = {}, onChange }) {
  return (
    <FormSection
      title="8. Default Terms & Conditions"
      description="Standard terms pre-filled on new documents. You can still edit them per document."
    >
      {TERM_FIELDS.map(({ key, label, placeholder }) => (
        <TextArea
          key={key}
          id={`term-${key}`}
          name={key}
          label={`${label} Terms`}
          value={values[key] || ""}
          onChange={(e) => onChange(key, e.target.value)}
          placeholder={placeholder}
          className="sm:col-span-2"
        />
      ))}
    </FormSection>
  )
}
