export default function FormSection({ title, description, children, className = "" }) {
  return (
    <section className={`bg-white border border-gray-100 rounded-[22px] shadow-sm p-6 md:p-8 ${className}`}>
      <h2 className="text-lg font-bold text-[#0F172A]">{title}</h2>
      {description && <p className="text-sm text-[#64748B] mt-1.5">{description}</p>}
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mt-6">{children}</div>
    </section>
  )
}
