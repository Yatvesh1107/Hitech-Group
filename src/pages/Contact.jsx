import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { API_BASE } from "../config/env"
import heroBg from "@/assets/images/about/hero-bg.png"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  BadgeCheck,
  Factory,
  Users,
  Globe,
} from "lucide-react"

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 91588 54848",
    sub: "Mon–Sat, 9 AM – 6 PM",
    href: "tel:+919158854848",
  },
  {
    icon: Mail,
    label: "Email",
    value: " insulation.hitech777@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto: insulation.hitech777@gmail.com",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "Kolhapur, Maharashtra, India",
    sub: "Serving clients across India",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat",
    sub: "9:00 AM – 6:00 PM",
    href: "#",
  },
]

const divisionOptions = [
  "Industrial Insulation",
  "Altron Testing & Allieds",
  "Precision Tech Engineering",
  "General Enquiry",
]

const divisionEmails = {
  "Industrial Insulation": "insulation.hitech777@gmail.com",
  "Altron Testing & Allieds": "testing.altron@gmail.com",
  "Precision Tech Engineering": "precisiontechenggservices@gmail.com",
}

const bottomStrip = [
  { icon: Factory, label: "Industrial Solutions" },
  { icon: BadgeCheck, label: "Responsive Support" },
  { icon: Users, label: "Expert Team" },
  { icon: Globe, label: "Pan-India Presence" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } },
}

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const gridCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const inputClass =
  "w-full px-4 py-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-[#334155] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent transition-all"

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    division: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        return
      }

      setSubmitted(true)
    } catch {
      setError("Unable to reach the server. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroBg})`,
            }}
          />
          <div className="absolute inset-0 bg-[rgba(8,42,87,0.7)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 min-h-[70vh] flex flex-col justify-center pt-[80px] pb-[140px]">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center lg:text-left">
              <motion.span
                variants={itemVariants}
                className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
              >
                Contact Us
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-white text-[32px] leading-[1.15] sm:text-[38px] sm:leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-3 mx-auto lg:mx-0"
              >
                Let&apos;s Discuss Your Industrial Project
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-5 mx-auto lg:mx-0"
              >
                Whether you need insulation, non-destructive testing, or precision engineering
                support, our team is ready to understand your requirements and recommend the right
                solution.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mt-9 justify-center lg:justify-start"
              >
                <a
                  href="tel:+918767814930"
                  className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
                >
                  Call Now
                </a>
                <Link
                  to="/divisions"
                  className="h-14 px-8 border-2 border-white text-white font-semibold rounded-xl inline-flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  Explore Our Divisions
                </Link>
              </motion.div>
            </div>

            <motion.div variants={cardVariants} className="max-lg:mt-8">
              <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-6 sm:p-8 max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
                <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  {contactCards.slice(0, 1).map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex gap-4 hover:bg-[#F8FAFC] p-2 rounded-xl transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-[#F4B400]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-[#0F172A]">{item.label}</h4>
                          <p className="text-sm text-[#334155] mt-0.5 [overflow-wrap:anywhere]">{item.value}</p>
                          <p className="text-xs text-[#94A3B8] mt-0.5">{item.sub}</p>
                        </div>
                      </a>
                    )
                  })}

                  {(() => {
                    const selectedEmail =
                      divisionEmails[form.division] || " insulation.hitech777@gmail.com"
                    return (
                      <a
                        href={`mailto:${selectedEmail.trim()}`}
                        className="flex gap-4 hover:bg-[#F8FAFC] p-2 rounded-xl transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                          <Mail size={20} className="text-[#F4B400]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-[#0F172A]">
                            {form.division && form.division !== "General Enquiry"
                              ? `${form.division} Email`
                              : "Email"}
                          </h4>
                          <p className="text-sm text-[#334155] mt-0.5 [overflow-wrap:anywhere]">
                            {selectedEmail.trim()}
                          </p>
                          <p className="text-xs text-[#94A3B8] mt-0.5">
                            {form.division && form.division !== "General Enquiry"
                              ? "Direct line for this division"
                              : "We reply within 24 hours"}
                          </p>
                        </div>
                      </a>
                    )
                  })()}
                </div>
                <p className="text-sm text-[#334155] leading-relaxed mt-5">
                  Our team typically responds within 24 hours. For urgent requirements, please call
                  us directly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 py-5">
              {bottomStrip.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 text-white/80">
                    <Icon size={18} className="text-[#F4B400] shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 0)",
            backgroundSize: "50px 50px",
            opacity: 0.03,
          }}
        />

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
          <div className="text-center max-w-[700px] mx-auto mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
            >
              Contact Information
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
            >
              Reach Out to Our Team
            </motion.h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {contactCards.map((item) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={gridCardVariants}
                  className="bg-white border border-gray-100 rounded-[22px] p-7 text-center hover:-translate-y-1.5 hover:border-[#F4B400] hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center mb-5 mx-auto">
                    <Icon size={28} className="text-[#F4B400]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0F172A]">{item.label}</h4>
                  <p className="text-sm font-medium text-[#334155] mt-2 break-words">
                    {item.value}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1">{item.sub}</p>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.04,
          }}
        />

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={gridCardVariants}>
              <span className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase">
                Send a Message
              </span>
              <h2 className="text-[#0B2D5C] text-[30px] md:text-[38px] font-extrabold leading-[1.15] mt-3">
                Tell Us About Your Requirement
              </h2>
              <p className="text-[#334155] text-lg leading-[1.7] mt-4">
                Share your project details and our engineering team will get back to you with the
                right solution for your industrial needs.
              </p>

              <ul className="space-y-3 mt-8">
                {[
                  "Free consultation and requirement analysis",
                  "Tailored solutions across all three divisions",
                  "Prompt response from our engineering team",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F4B400]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#F4B400]" />
                    </div>
                    <span className="text-sm text-[#334155] leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#0B2D5C] rounded-[22px] p-7 mt-10">
                <p className="text-[rgba(255,255,255,0.85)] text-sm leading-relaxed">
                  For urgent on-site requirements or emergency support, call us directly at{" "}
                  <a href="tel:+919158854848" className="text-[#F4B400] font-semibold">
                    +91 91588 54848
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div variants={gridCardVariants}>
              <div className="bg-white border border-gray-100 rounded-[24px] shadow-xl p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-14">
                    <div className="w-20 h-20 rounded-full bg-[#F4B400]/10 flex items-center justify-center mx-auto">
                      <Check size={40} className="text-[#F4B400]" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0B2D5C] mt-6">
                      Thank You for Reaching Out
                    </h3>
                    <p className="text-[#334155] mt-3 leading-relaxed max-w-[380px] mx-auto">
                      Your enquiry has been received. Our team will get back to you within 24 hours
                      to discuss your requirements.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setError("")
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          division: "",
                          message: "",
                        })
                      }}
                      className="h-12 px-6 mt-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-extrabold text-[#0B2D5C]">Get in Touch</h3>
                    <p className="text-[#334155] text-sm mt-2 leading-relaxed">
                      Fill in the form and we&apos;ll respond as soon as possible.
                    </p>

                    <div className="mt-7 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                          >
                            Full Name <span className="text-[#F4B400]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                          >
                            Phone <span className="text-[#F4B400]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 00000 00000"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                        >
                          Email Address <span className="text-[#F4B400]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                        >
                          Company / Organization
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="division"
                          className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                        >
                          I&apos;m Interested In
                        </label>
                        <select
                          id="division"
                          name="division"
                          value={form.division}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none`}
                        >
                          <option value="">Select a service</option>
                          {divisionOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                        >
                          Message <span className="text-[#F4B400]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project or requirement"
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="h-14 w-full bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center gap-2 hover:bg-[#d9a000] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Sending…" : "Send Message"}
                        {!submitting && <Send size={18} />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact
