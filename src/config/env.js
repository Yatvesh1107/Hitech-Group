const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")

export const API_BASE = backendUrl ? `${backendUrl}/api` : "/api"

export function assetUrl(path) {
  if (!path) return ""
  if (/^https?:\/\//.test(path)) return path
  if (!backendUrl) return path
  return `${backendUrl}${path.startsWith("/") ? path : `/${path}`}`
}
