export default function SelectField({ label, error, required, id, className = "", children, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0F172A] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        {...props}
        className={`w-full h-[48px] px-4 pr-9 rounded-[12px] border text-sm text-[#0F172A] bg-[#F8FAFC] outline-none appearance-none cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1rem",
        }}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
