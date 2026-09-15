import InputField from "./InputField"

const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100

const formatINR = (value) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function SummaryCard({
  readOnly = false,
  items = [],
  discount = "0",
  onDiscountChange,
  errors = {},
  subtotal: savedSubtotal,
  gstAmount: savedGstAmount,
  grandTotal: savedGrandTotal,
}) {
  const discountValue = Number(discount) || 0

  let totals
  if (readOnly) {
    totals = {
      subtotal: Number(savedSubtotal) || 0,
      discount: discountValue,
      gstAmount: Number(savedGstAmount) || 0,
      grandTotal: Number(savedGrandTotal) || 0,
    }
  } else {
    const subtotal = round2(
      items.reduce((sum, item) => {
        const qty = Number(item.quantity)
        const rate = Number(item.rate)
        if (!Number.isFinite(qty) || !Number.isFinite(rate)) return sum
        return sum + qty * rate
      }, 0)
    )
    const taxableValue = subtotal - discountValue

    const totalItemGst = round2(
      items.reduce((sum, item) => {
        const qty = Number(item.quantity)
        const rate = Number(item.rate)
        const gstP = Number(item.gstPercentage)
        if (!Number.isFinite(qty) || !Number.isFinite(rate)) return sum
        if (!Number.isFinite(gstP) || gstP <= 0) return sum
        return sum + qty * rate * (gstP / 100)
      }, 0)
    )
    const gstAmount =
      subtotal > 0 ? round2(totalItemGst * (taxableValue / subtotal)) : round2(totalItemGst)

    totals = {
      subtotal,
      discount: discountValue,
      gstAmount,
      grandTotal: round2(taxableValue + gstAmount),
    }
  }

  return (
    <div>
      {!readOnly ? (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <InputField
              id="discount"
              label="Discount (₹)"
              type="number"
              min="0"
              step="any"
              value={discount}
              onChange={(e) => onDiscountChange?.(e.target.value)}
              error={errors.discount}
              placeholder="0"
            />
            <p className="text-xs leading-relaxed text-[#94A3B8]">
              Row amounts include GST. Subtotal is pre-tax value. Discount applies to
              taxable value, GST is recalculated proportionally.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-gray-100 rounded-[16px] p-5 space-y-3">
            <SummaryRow label="Subtotal" value={formatINR(totals.subtotal)} />
            <SummaryRow label="Discount" value={`- ${formatINR(totals.discount)}`} />
            <SummaryRow label="GST" value={formatINR(totals.gstAmount)} />
            <TotalRow label="Grand Total" value={formatINR(totals.grandTotal)} />
          </div>
        </div>
      ) : (
        <div className="bg-[#F8FAFC] border border-gray-100 rounded-[16px] p-5 space-y-3">
          <SummaryRow label="Subtotal" value={formatINR(totals.subtotal)} />
          <SummaryRow label="Discount" value={`- ${formatINR(totals.discount)}`} />
          <SummaryRow label="GST" value={formatINR(totals.gstAmount)} />
          <TotalRow label="Grand Total" value={formatINR(totals.grandTotal)} />
        </div>
      )}
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm text-[#64748B]">
      <span>{label}</span>
      <span className="font-semibold text-[#0F172A]">{value}</span>
    </div>
  )
}

function TotalRow({ label, value }) {
  return (
    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
      <span className="text-sm font-bold text-[#0F172A]">{label}</span>
      <span className="text-xl font-extrabold text-[#0B2D5C]">{value}</span>
    </div>
  )
}