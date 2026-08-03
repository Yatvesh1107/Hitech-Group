import { FileText } from "lucide-react"
import SectionHeader from "./SectionHeader"

export default function TermsCard({ text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<FileText size={16} />} title="Terms & Conditions" />
      <div className="px-6 py-5">
        <p className="text-sm font-medium text-[#334155] leading-relaxed whitespace-pre-line">
          {text || "No terms and conditions were saved."}
        </p>
      </div>
    </div>
  )
}
