import { ListFilter, CalendarRange } from "lucide-react"

const DIVISIONS = ["Industrial Insulation", "Experts in Ultrasonics", "Precision Tech Engineering"]

const QUOTATION_STATUSES = ["Draft", "Sent", "Approved", "Rejected", "Expired", "Cancelled"]

const selectClass =
  "h-11 pl-3.5 pr-9 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all appearance-none cursor-pointer"

const dateClass =
  "h-11 pl-3.5 pr-3 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"

export default function FilterBar({
  status,
  onStatusChange,
  division,
  onDivisionChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  statusOptions = QUOTATION_STATUSES,
  statusPlaceholder = "All Status",
}) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
      <div className="relative">
        <ListFilter
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <select
          value={status}
          onChange={(e) => onStatusChange?.(e.target.value)}
          aria-label="Filter by status"
          className={selectClass}
        >
          <option value="">{statusPlaceholder}</option>
          {statusOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <ListFilter
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <select
          value={division}
          onChange={(e) => onDivisionChange?.(e.target.value)}
          aria-label="Filter by division"
          className={selectClass}
        >
          <option value="">All Divisions</option>
          {DIVISIONS.map((divisionName) => (
            <option key={divisionName} value={divisionName}>
              {divisionName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <CalendarRange size={16} className="text-[#94A3B8] shrink-0" />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange?.(e.target.value)}
          aria-label="Date from"
          className={dateClass}
        />
        <span className="text-xs font-medium text-[#94A3B8]">to</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange?.(e.target.value)}
          aria-label="Date to"
          className={dateClass}
        />
      </div>
    </div>
  )
}
