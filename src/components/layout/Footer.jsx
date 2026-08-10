import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react"

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Business Divisions", path: "/divisions" },
  { label: "Projects", path: "/projects" },
  { label: "Clients", path: "/clients" },
  { label: "Contact", path: "/contact" },
]

const divisions = [
  "Industrial Insulation",
  "Altron Testing & Allieds",
  "Precision Tech Engineering",
]

function Footer() {
  return (
    <footer className="bg-[#081F3F] text-white border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4B400] rounded-lg flex items-center justify-center text-[#081F3F] font-bold text-xl">
                H
              </div>
              <div>
                <div className="text-xl font-bold text-white leading-none">HITECH</div>
                <div className="text-[11px] text-[#94A3B8] tracking-[0.2em] leading-tight">GROUP</div>
              </div>
            </Link>

            <p className="text-sm text-[rgba(255,255,255,0.7)] leading-relaxed mt-5">
              A multi-disciplinary industrial engineering group delivering insulation,
              non-destructive testing, and precision engineering solutions across India.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#F4B400] hover:text-[#F4B400] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#F4B400] hover:text-[#F4B400] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-[#F4B400] hover:text-[#F4B400] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[1px] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-1 text-sm text-[rgba(255,255,255,0.7)] hover:text-[#F4B400] hover:translate-x-1 transition-all duration-200"
                  >
                    <ChevronRight size={14} className="shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[1px] mb-5">
              Business Divisions
            </h4>
            <ul className="space-y-3">
              {divisions.map((division) => (
                <li key={division}>
                  <Link
                    to="/divisions"
                    className="inline-flex items-center gap-1 text-sm text-[rgba(255,255,255,0.7)] hover:text-[#F4B400] hover:translate-x-1 transition-all duration-200"
                  >
                    <ChevronRight size={14} className="shrink-0" />
                    {division}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[1px] mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.7)]">
                <MapPin size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
                <span>Kolhapur, Maharashtra, India</span>
              </li>
              <li>
                <a
                  href="tel:+919158854848"
                  className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.7)] hover:text-[#F4B400] transition-colors"
                >
                  <Phone size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
                  <span>+91 91588 54848</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto: insulation.hitech777@gmail.com"
                  className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.7)] hover:text-[#F4B400] transition-colors"
                >
                  <Mail size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
                  <span>insulation.hitech777@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.7)]">
                <Clock size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
                <span>
                  Mon&ndash;Sat
                  <br />
                  9 AM &ndash; 6 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-[rgba(255,255,255,0.6)]">
            &copy; 2026 HITECH GROUP. All Rights Reserved.
          </p>
          <p className="text-xs text-[rgba(255,255,255,0.6)]">
            ISO 9001:2015 Certified Company
          </p>
          <p className="text-xs text-[rgba(255,255,255,0.6)]">
            Designed with Engineering Excellence
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
