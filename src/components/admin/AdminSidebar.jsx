import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, FileText, Settings, LogOut, X, ChevronDown } from "lucide-react"
import { useAuth } from "../../context/authContext"
import { useCompany } from "../../context/companyContext"
import { companyUsesTechnicalReports } from "../../constants/companies"
import CompanySwitcher from "./CompanySwitcher"

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: false },
  { to: "/admin/customers", label: "Customers", icon: Users, end: false },
]

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3.5 py-3 rounded-[12px] text-sm font-semibold transition-colors ${
    isActive
      ? "bg-[#F4B400] text-[#081F3F]"
      : "text-white/70 hover:text-white hover:bg-white/10"
  }`

export default function AdminSidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const { activeCompany } = useCompany()
  const navigate = useNavigate()
  const [documentsOpen, setDocumentsOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const showTechnicalReports = companyUsesTechnicalReports(activeCompany)

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#082A57] flex flex-col transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F4B400] rounded-xl flex items-center justify-center text-[#081F3F] font-bold text-xl">
              H
            </div>
            <div>
              <div className="text-base font-bold text-white leading-none">HITECH GROUP</div>
              <div className="text-[10px] text-white/60 tracking-[0.2em] leading-tight mt-1">
                ADMIN PANEL
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 md:px-4 py-6 space-y-1">
          <div className="mb-4">
            <CompanySwitcher variant="sidebar" />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={navLinkClass}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}

          <div>
            <button
              type="button"
              onClick={() => setDocumentsOpen((openValue) => !openValue)}
              className="flex w-full items-center gap-3 px-3.5 py-3 rounded-[12px] text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FileText size={18} />
              Business Documents
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform duration-200 ${
                  documentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {documentsOpen && (
              <div className="mt-1 mb-1 ml-5 pl-3 border-l border-white/15 space-y-1">
                <NavLink
                  to="/admin/quotations"
                  end
                  onClick={onClose}
                  className={navLinkClass}
                >
                  Quotations
                </NavLink>
                <NavLink
                  to="/admin/invoices"
                  end
                  onClick={onClose}
                  className={navLinkClass}
                >
                  Invoices
                </NavLink>
                {showTechnicalReports && (
                  <NavLink
                    to="/admin/technical-reports"
                    end
                    onClick={onClose}
                    className={navLinkClass}
                  >
                    Technical Reports
                  </NavLink>
                )}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setSettingsOpen((openValue) => !openValue)}
              className="flex w-full items-center gap-3 px-3.5 py-3 rounded-[12px] text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Settings size={18} />
              Settings
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform duration-200 ${
                  settingsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {settingsOpen && (
              <div className="mt-1 mb-1 ml-5 pl-3 border-l border-white/15 space-y-1">
                <NavLink
                  to="/admin/settings/company"
                  end
                  onClick={onClose}
                  className={navLinkClass}
                >
                  Company Settings
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center gap-3 px-1 mb-4">
            <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-white/50 truncate">{user?.email}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-[12px] bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
