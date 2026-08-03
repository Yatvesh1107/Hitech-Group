import { StickyNote } from "lucide-react"
import SectionHeader from "./SectionHeader"

export default function NotesCard({ text }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[22px] shadow-sm overflow-hidden">
      <SectionHeader icon={<StickyNote size={16} />} title="Internal Notes" />
      <div className="px-6 py-5">
        <p className="text-sm font-medium text-[#334155] leading-relaxed whitespace-pre-line">
          {text || "No internal notes were saved."}
        </p>
        <p className="mt-4 text-xs text-[#94A3B8]">
          Visible only inside admin. This will not appear in the quotation PDF.
        </p>
      </div>
    </div>
  )
}
