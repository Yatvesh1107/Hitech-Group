export default function SectionHeader({ icon, title, action }) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-gray-100">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="w-9 h-9 bg-[#0B2D5C]/5 rounded-[10px] flex items-center justify-center text-[#0B2D5C] shrink-0">
            {icon}
          </span>
        )}
        <h2 className="text-base font-bold text-[#0F172A]">{title}</h2>
      </div>
      {action}
    </div>
  )
}
