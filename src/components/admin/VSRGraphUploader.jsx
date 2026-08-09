import { useState } from "react"
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react"
import { assetUrl } from "../../config/env"
import { uploadReportImage } from "../../services/settings"

export default function VSRGraphUploader({ value = "", onChange, token, disabled = false }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async (file) => {
    setUploading(true)
    setError("")

    try {
      const result = await uploadReportImage({ token, file })
      onChange(result.url)
    } catch (err) {
      setError(err.message || "Failed to upload the graph image.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
    setError("")
  }

  return (
    <div>
      <p className="text-sm font-semibold text-[#0F172A] mb-1.5">Before & After Stress Relief Graph</p>

      <div className="flex items-start gap-4 rounded-[16px] border border-dashed border-gray-200 bg-[#F8FAFC] p-4">
        {value ? (
          <div className="relative w-36 h-24 shrink-0 rounded-[12px] border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
            <img
              src={assetUrl(value)}
              alt="Before & after stress relief graph"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="w-36 h-24 shrink-0 rounded-[12px] border border-gray-200 bg-white flex items-center justify-center text-[#94A3B8]">
            <ImagePlus size={24} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-xs text-[#94A3B8]">
            Upload the Before & After Stress Relief graph for this shaft. It is reproduced in the
            PDF exactly as uploaded.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <label className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-[10px] bg-[#0B2D5C] text-white text-xs font-semibold hover:bg-[#0B2D5C]/90 cursor-pointer transition-colors disabled:opacity-50">
              {uploading ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <ImagePlus size={14} />
              )}
              {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/bmp"
                className="hidden"
                disabled={disabled || uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(file)
                  e.target.value = ""
                }}
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled || uploading}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-[10px] border border-red-200 bg-white text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 size={14} />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}