import TextArea from "./TextArea"

export default function NotesSection({ value, onChange, className = "", disabled = false }) {
  return (
    <div className={className}>
      <TextArea
        id="notes"
        label="Internal Notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add internal notes visible only inside admin. These will not appear in the quotation PDF."
        disabled={disabled}
      />
    </div>
  )
}
