import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, LoaderCircle, ArrowLeft, ShieldCheck } from "lucide-react"
import { useAuth } from "../../context/authContext"
import heroBg from "@/assets/images/about/hero-bg.png"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const from = location.state?.from?.pathname || "/admin/dashboard"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password) {
      setError("Please enter both email and password.")
      return
    }

    setSubmitting(true)

    try {
      await login(email.trim(), password, remember)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#082A57] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[rgba(8,42,87,0.85)]" />
      </div>

      <Link
        to="/"
        className="absolute top-6 left-5 md:left-8 z-20 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Website
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          <div className="bg-white rounded-[24px] shadow-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#F4B400] rounded-xl flex items-center justify-center text-[#081F3F] font-bold text-2xl">
                H
              </div>
              <div>
                <div className="text-xl font-bold text-[#0B2D5C] leading-none">HITECH</div>
                <div className="text-[11px] text-[#94A3B8] tracking-[0.2em] leading-tight">
                  GROUP ADMIN
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-[#0B2D5C] leading-snug">Admin Sign In</h1>
            <p className="text-sm text-[#334155] mt-1.5">
              Sign in to access the HITECH GROUP admin panel.
            </p>

            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-[12px] px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@hitechgroup.com"
                    className="w-full h-[52px] pl-11 pr-4 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-[52px] pl-11 pr-12 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0B2D5C] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                {/* <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#F4B400] cursor-pointer"
                  />
                  <span className="text-sm text-[#334155]">Remember Me</span>
                </label> */}
                <span className="text-xs text-[#94A3B8]">Admin access only</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-[52px] rounded-[12px] bg-[#F4B400] text-[#0F172A] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#d9a000] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-white/60 mt-6">
            &copy; 2026 HITECH GROUP. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
