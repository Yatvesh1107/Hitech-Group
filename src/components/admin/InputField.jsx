export default function InputField({ label, error, required, id, className = "", ...props }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#0F172A] mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full h-[48px] px-4 rounded-[12px] border text-sm text-[#0F172A] bg-[#F8FAFC] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
