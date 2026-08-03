import { Link } from "react-router-dom"
import { LayoutDashboard, ArrowLeft } from "lucide-react"
import { useAuth } from "../../context/authContext"
import AdminLayout from "../../components/admin/AdminLayout"
import PageHeader from "../../components/admin/PageHeader"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
        <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#0B2D5C] transition-colors">
          <ArrowLeft size={14} />
          Back to Website
        </Link>
        <span>/</span>
        <span className="inline-flex items-center gap-1.5 text-[#0B2D5C] font-semibold">
          <LayoutDashboard size={14} />
          Dashboard
        </span>
      </div>

      <div className="mt-6">
        <PageHeader
          title={`Welcome, ${user?.name?.split(" ")[0] || "Admin"}`}
          subtitle="This is your admin dashboard. Quotations, invoices, reports and other management features will be added here soon."
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="bg-white border border-gray-100 rounded-[22px] p-7">
          <h3 className="text-lg font-bold text-[#0F172A]">Signed in as Admin</h3>
          <p className="text-sm text-[#334155] mt-3 leading-relaxed">
            You have the <span className="font-semibold text-[#0B2D5C]">{user?.role}</span> role
            with full access to the panel.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[22px] p-7">
          <h3 className="text-lg font-bold text-[#0F172A]">Account Details</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#334155]">
            <li>
              <span className="text-[#94A3B8]">Name:</span> {user?.name}
            </li>
            <li>
              <span className="text-[#94A3B8]">Email:</span> {user?.email}
            </li>
            <li>
              <span className="text-[#94A3B8]">Status:</span> Active
            </li>
          </ul>
        </div>

        <div className="bg-[#0B2D5C] rounded-[22px] p-7 sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-bold text-white">What's Available</h3>
          <p className="text-sm text-white/70 mt-3 leading-relaxed">
            Quotations, customers, services and invoices are all live. Reports are planned for a
            later phase.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
