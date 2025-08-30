export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
