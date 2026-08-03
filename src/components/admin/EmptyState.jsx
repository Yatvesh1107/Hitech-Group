import { UsersRound } from "lucide-react"

export default function EmptyState({ title = "No Customers Found", description, action, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-[#F4B400]/10 rounded-2xl flex items-center justify-center">
        {icon || <UsersRound size={30} className="text-[#F4B400]" />}
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-1.5 text-sm text-[#64748B] max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
