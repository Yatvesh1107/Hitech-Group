import { Search } from "lucide-react"

export default function SearchBar({ value, onChange, placeholder = "Search customers..." }) {
  return (
    <div className="relative w-full sm:w-[320px]">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-11 pr-4 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
      />
    </div>
  )
}
