import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Business Divisions",
    path: "/divisions",
    dropdown: [
      { label: "Industrial Insulation", path: "/divisions/industrial-insulation" },
      { label: "Experts in Ultrasonics", path: "/divisions/experts-in-ultrasonics" },
      { label: "Precision Tech Engineering", path: "/divisions/precision-tech" },
    ],
  },
  { label: "Projects", path: "/projects" },
  { label: "Clients", path: "/clients" },
  { label: "Contact", path: "/contact" },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileDropdown(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`h-[84px] bg-white sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="mx-auto h-full max-w-[1280px] flex items-center justify-between px-5 md:px-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#0B2D5C] rounded-lg flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <div>
              <div className="text-xl font-bold text-[#0B2D5C] leading-none">HITECH</div>
              <div className="text-[11px] text-[#334155] tracking-[0.2em] leading-tight">GROUP</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdown(true)}
                  onMouseLeave={() => setDesktopDropdown(false)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-base font-medium transition-colors ${
                        isActive ? "text-[#F4B400]" : "text-[#0F172A] hover:text-[#F4B400]"
                      }`
                    }
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        desktopDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </NavLink>
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 transition-all duration-200 ${
                      desktopDropdown
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1"
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="block px-5 py-3 text-sm text-[#334155] hover:text-[#F4B400] hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors ${
                      isActive ? "text-[#F4B400]" : "text-[#0F172A] hover:text-[#F4B400]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center justify-center h-12 px-6 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors shrink-0"
          >
            Get a Quote
          </Link>

          <button
            className="lg:hidden p-2 text-[#0F172A]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center h-full px-6 gap-2">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.path}
                    className="flex-1 py-3 text-lg font-medium text-[#0F172A]"
                  >
                    {link.label}
                  </Link>
                  <button
                    onClick={() => setMobileDropdown(!mobileDropdown)}
                    className="p-2 text-[#0F172A]"
                    aria-label={`${mobileDropdown ? "Close" : "Open"} ${link.label} menu`}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${
                        mobileDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown ? "max-h-60" : "max-h-0"
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block py-3 pl-4 text-base text-[#334155] hover:text-[#F4B400] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `py-3 text-lg font-medium transition-colors ${
                    isActive ? "text-[#F4B400]" : "text-[#0F172A]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}

          <Link
            to="/contact"
            className="flex items-center justify-center h-12 mt-4 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
