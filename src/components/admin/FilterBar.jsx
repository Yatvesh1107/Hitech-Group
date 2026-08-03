import { ListFilter, CalendarRange } from "lucide-react"

const DIVISIONS = ["Industrial Insulation", "Experts in Ultrasonics", "Precision Tech Engineering"]

const QUOTATION_STATUSES = ["Draft", "Sent", "Approved", "Rejected", "Expired", "Cancelled"]

function optionValue(option) {
  return typeof option === "string" ? option : option.value
}

function optionLabel(option) {
  return typeof option === "string" ? option : option.label
}

const selectClass =
  "h-11 pl-3.5 pr-9 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all appearance-none cursor-pointer"

const dateClass =
  "h-11 pl-3.5 pr-3 rounded-[12px] border border-gray-200 bg-[#F8FAFC] text-sm text-[#0F172A] outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/30 transition-all"

export default function FilterBar({
  status,
  onStatusChange,
  reportType,
  onReportTypeChange,
  division,
  onDivisionChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  statusOptions = QUOTATION_STATUSES,
  statusPlaceholder = "All Status",
  reportTypeOptions = [],
  reportTypePlaceholder = "All Report Types",
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
          {statusOptions.map((option) => (
            <option key={optionValue(option)} value={optionValue(option)}>
              {optionLabel(option)}
            </option>
          ))}
        </select>
      </div>

      {reportTypeOptions.length > 0 && (
        <div className="relative">
          <ListFilter
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
          />
          <select
            value={reportType}
            onChange={(e) => onReportTypeChange?.(e.target.value)}
            aria-label="Filter by report type"
            className={selectClass}
          >
            <option value="">{reportTypePlaceholder}</option>
            {reportTypeOptions.map((option) => (
              <option key={optionValue(option)} value={optionValue(option)}>
                {optionLabel(option)}
              </option>
            ))}
          </select>
        </div>
      )}

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
