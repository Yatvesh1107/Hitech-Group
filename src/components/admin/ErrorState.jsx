import { TriangleAlert, RefreshCw } from "lucide-react"

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
        <TriangleAlert size={30} className="text-red-500" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0F172A]">Failed to load data</h3>
      <p className="mt-1.5 text-sm text-[#64748B] max-w-md">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-[12px] bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#0B2D5C]/90 transition-colors"
      >
        <RefreshCw size={16} />
        Retry
      </button>
    </div>
  )
}
