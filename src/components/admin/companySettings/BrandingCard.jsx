import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react"
import FormSection from "../FormSection"

const IMAGE_FIELDS = [
  { key: "logo", label: "Company Logo", hint: "Shown on the PDF letterhead. Recommended 300×300px." },
  { key: "seal", label: "Company Seal (Optional)", hint: "Circular seal shown on the signatory block." },
  { key: "signature", label: "Authorized Signature Image", hint: "Signature shown above the signatory line." },
]

export default function BrandingCard({ values = {}, onUpload, onRemove, uploadingKey = "" }) {
  return (
    <FormSection
      title="2. Branding"
      description="Upload the images that appear on quotation, invoice and technical report PDFs."
    >
      {IMAGE_FIELDS.map(({ key, label, hint }) => {
        const url = values[key] || ""
        const uploading = uploadingKey === key

        return (
          <div key={key} className="sm:col-span-2">
            <p className="text-sm font-semibold text-[#0F172A] mb-1.5">{label}</p>

            <div className="flex items-center gap-4 rounded-[16px] border border-dashed border-gray-200 bg-[#F8FAFC] p-4">
              {url ? (
                <div className="relative w-20 h-20 shrink-0 rounded-[12px] border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
                  <img src={url} alt={label} className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <div className="w-20 h-20 shrink-0 rounded-[12px] border border-gray-200 bg-white flex items-center justify-center text-[#94A3B8]">
                  <ImagePlus size={24} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-xs text-[#94A3B8]">{hint}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <label className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-[10px] bg-[#0B2D5C] text-white text-xs font-semibold hover:bg-[#0B2D5C]/90 cursor-pointer transition-colors disabled:opacity-50">
                    {uploading ? (
                      <LoaderCircle size={14} className="animate-spin" />
                    ) : (
                      <ImagePlus size={14} />
                    )}
                    {uploading ? "Uploading…" : url ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/bmp"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onUpload(key, file)
                        e.target.value = ""
                      }}
                    />
                  </label>
                  {url && (
                    <button
                      type="button"
                      onClick={() => onRemove(key)}
                      disabled={uploading}
                      className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-[10px] border border-red-200 bg-white text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </FormSection>
  )
}
