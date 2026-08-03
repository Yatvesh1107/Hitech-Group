import { useState, useEffect, useCallback } from "react"
import { CheckCircle2, XCircle, X } from "lucide-react"
import { ToastContext } from "./toastContext"

const TOAST_DURATION_MS = 4000

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type })
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  useEffect(() => {
    if (!toast) return undefined

    const timer = setTimeout(() => {
      setToast(null)
    }, TOAST_DURATION_MS)

    return () => clearTimeout(timer)
  }, [toast])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {toast && (
        <div
          role="status"
          className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-[#0B2D5C] text-white pl-4 pr-3 py-3 rounded-[12px] shadow-2xl animate-[slideIn_0.3s_ease-out]"
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={20} className="text-[#F4B400] shrink-0" />
          ) : (
            <XCircle size={20} className="text-red-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={hideToast}
            className="ml-2 text-white/60 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  )
}
