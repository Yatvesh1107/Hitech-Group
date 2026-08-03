import TextArea from "./TextArea"

export default function TermsSection({ value, onChange, className = "", disabled = false }) {
  return (
    <div className={className}>
      <TextArea
        id="termsAndConditions"
        label="Terms & Conditions"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter terms and conditions for this quotation"
        disabled={disabled}
      />
    </div>
  )
}
