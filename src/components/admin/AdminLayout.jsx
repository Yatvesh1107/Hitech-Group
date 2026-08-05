import { useState } from "react"
import { Menu } from "lucide-react"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC] md:flex">
      <div className="md:hidden fixed top-0 inset-x-0 z-50 h-16 bg-[#082A57] flex items-center px-5">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="text-white hover:text-[#F4B400] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <div className="ml-4 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#F4B400] rounded-lg flex items-center justify-center text-[#081F3F] font-bold">
            H
          </div>
          <span className="text-white font-bold text-sm">HITECH GROUP ADMIN</span>
        </div>
      </div>

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 md:h-screen md:overflow-y-auto px-5 md:px-8 py-8 md:py-10 pt-24 md:pt-10">
        <div className="max-w-[1200px] mx-auto">{children}</div>
      </main>
    </div>
  )
}
