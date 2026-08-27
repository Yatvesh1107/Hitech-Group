import { LoaderCircle, X } from "lucide-react"

const CONFIRM_STYLES = {
  danger: {
    backgroundColor: "#EF4444",
    color: "#FFFFFF",
  },
  primary: {
    backgroundColor: "#0B2D5C",
    color: "#FFFFFF",
  },
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  busy = false,
  variant = "danger",
}) {
  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={busy ? undefined : onCancel}
        aria-hidden="true"
      />

      <div
        style={{
          position: "relative",
          width: "100",
          maxWidth: "420px",
          backgroundColor: "#FFFFFF",
          borderRadius: "22px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "24px",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            color: "#94A3B8",
            cursor: busy ? "not-allowed" : "pointer",
            background: "none",
            border: "none",
            padding: "4px",
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A", margin: 0 }}>
          {title}
        </h2>
        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#64748B",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        <div style={{ marginTop: "32px", textAlign: "right" }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            style={{
              marginBottom: "12px",
              width: "100%",
              height: "44px",
              paddingLeft: "24px",
              paddingRight: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              backgroundColor: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              color: "#0B2D5C",
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            style={{
              width: "100%",
              height: "44px",
              paddingLeft: "24px",
              paddingRight: "24px",
              borderRadius: "12px",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.6 : 1,
              ...CONFIRM_STYLES[variant],
            }}
          >
            {busy && <LoaderCircle size={16} className="animate-spin" style={{ marginRight: "8px" }} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
