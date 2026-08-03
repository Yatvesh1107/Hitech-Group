import FormSection from "../FormSection"
import InputField from "../InputField"

export default function BankCard({ values = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title="6. Bank Details"
      description="Bank account details used for payments and shown on invoices."
    >
      <InputField
        id="bankName"
        name="bankName"
        label="Bank Name"
        value={values.bankName || ""}
        onChange={(e) => onChange("bankName", e.target.value)}
        placeholder="e.g. HDFC Bank"
      />
      <InputField
        id="accountName"
        name="accountName"
        label="Account Name"
        value={values.accountName || ""}
        onChange={(e) => onChange("accountName", e.target.value)}
        placeholder="e.g. HITECH GROUP"
      />
      <InputField
        id="accountNumber"
        name="accountNumber"
        label="Account Number"
        value={values.accountNumber || ""}
        onChange={(e) => onChange("accountNumber", e.target.value)}
        placeholder="e.g. 50100234567890"
      />
      <InputField
        id="ifscCode"
        name="ifscCode"
        label="IFSC Code"
        value={values.ifscCode || ""}
        onChange={(e) => onChange("ifscCode", e.target.value)}
        error={errors.ifscCode}
        placeholder="e.g. HDFC0000123"
        maxLength={11}
      />
      <InputField
        id="branch"
        name="branch"
        label="Branch"
        value={values.branch || ""}
        onChange={(e) => onChange("branch", e.target.value)}
        placeholder="e.g. Kolhapur"
      />
      <InputField
        id="upiId"
        name="upiId"
        label="UPI ID"
        value={values.upiId || ""}
        onChange={(e) => onChange("upiId", e.target.value)}
        error={errors.upiId}
        placeholder="e.g. hitechgroup@hdfcbank"
      />
    </FormSection>
  )
}
