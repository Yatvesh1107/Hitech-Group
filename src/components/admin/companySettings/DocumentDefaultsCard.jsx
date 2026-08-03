import FormSection from "../FormSection"
import InputField from "../InputField"
import SelectField from "../SelectField"

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED"]
const FY_FORMATS = ["YYYY-YY", "FY YYYY-YY", "YYYY-Y"] 

export default function DocumentDefaultsCard({ values = {}, onChange }) {
  const numGst = Number(values.defaultGst)
  const gstValid = numGst >= 0 && numGst <= 100

  return (
    <FormSection
      title="7. Document Defaults"
      description="Defaults applied when new documents are created."
    >
      <InputField
        id="quotationPrefix"
        name="quotationPrefix"
        label="Quotation Prefix"
        value={values.quotationPrefix || ""}
        onChange={(e) => onChange("quotationPrefix", e.target.value)}
        placeholder="e.g. QT"
      />
      <InputField
        id="invoicePrefix"
        name="invoicePrefix"
        label="Invoice Prefix"
        value={values.invoicePrefix || ""}
        onChange={(e) => onChange("invoicePrefix", e.target.value)}
        placeholder="e.g. INV"
      />
      <InputField
        id="technicalReportPrefix"
        name="technicalReportPrefix"
        label="Technical Report Prefix"
        value={values.technicalReportPrefix || ""}
        onChange={(e) => onChange("technicalReportPrefix", e.target.value)}
        placeholder="e.g. TR"
      />
      <SelectField
        id="defaultCurrency"
        name="defaultCurrency"
        label="Default Currency"
        value={values.defaultCurrency || "INR"}
        onChange={(e) => onChange("defaultCurrency", e.target.value)}
      >
        {CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </SelectField>
      <InputField
        id="defaultGst"
        name="defaultGst"
        label="Default GST (%)"
        type="number"
        min="0"
        max="100"
        value={numGst}
        onChange={(e) => onChange("defaultGst", e.target.value)}
        error={gstValid ? "" : "GST percentage must be between 0 and 100"}
        placeholder="e.g. 18"
      />
      <SelectField
        id="financialYearFormat"
        name="financialYearFormat"
        label="Financial Year Format"
        value={values.financialYearFormat || "YYYY-YY"}
        onChange={(e) => onChange("financialYearFormat", e.target.value)}
      >
        {FY_FORMATS.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </SelectField>
    </FormSection>
  )
}
