
export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 w-24 h-24 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-green-500"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-red-500"></div>
      </div>
      <h1 className="text-6xl font-bold text-gray-100">Loading...</h1>
    </div>
  )
}
