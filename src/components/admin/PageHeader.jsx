export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-[28px] md:text-[34px] font-extrabold text-[#0B2D5C] leading-[1.1]">{title}</h1>
        <p className="text-[#334155] text-base mt-1.5">{subtitle}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
