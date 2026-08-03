const SKELETON_ROWS = 6

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-28" />
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-32" />
        <div className="h-3 bg-gray-200 rounded w-20" />
        <div className="h-3 bg-gray-200 rounded w-14 ml-auto" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
      <div className="divide-y divide-gray-50">
        {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-3 w-40">
              <div className="w-9 h-9 bg-gray-200 rounded-[10px] shrink-0" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-3 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-6 w-16 bg-gray-200 rounded-full ml-auto" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-[10px]" />
              <div className="w-8 h-8 bg-gray-200 rounded-[10px]" />
              <div className="w-8 h-8 bg-gray-200 rounded-[10px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
