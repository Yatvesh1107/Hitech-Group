export default function TextArea({ label, error, required, id, className = "", ...props }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#0F172A] mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={id}
        {...props}
        className={`w-full min-h-[120px] px-4 py-3 rounded-[12px] border text-sm text-[#0F172A] bg-[#F8FAFC] outline-none resize-y transition-all ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
