import { ListOrdered } from "lucide-react"
import SectionHeader from "./SectionHeader"

const formatINR = (value) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function ItemsTable({ items = [], title = "Quotation Items" }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<ListOrdered size={16} />} title={title} />

      {items.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-[#94A3B8]">
          No items were saved.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
                <th className="px-6 py-4 font-semibold w-[42%]">Description</th>
                <th className="px-6 py-4 font-semibold">Qty</th>
                <th className="px-6 py-4 font-semibold">Unit</th>
                <th className="px-6 py-4 font-semibold">Rate</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#0F172A]">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#334155]">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-[#334155]">{item.unit || "—"}</td>
                  <td className="px-6 py-4 text-sm text-[#334155]">{formatINR(Number(item.rate) || 0)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#334155] text-right">
                    {formatINR(Number(item.amount) || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
