import Spinner from "./Spinner"

function LoadingOverlay({ message = "Yükleniyor...", isFullScreen=true }) {
  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
        <Spinner size="large" color="yellow" />
        <p className="mt-4 text-white font-medium text-lg">{message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Spinner size="medium" color="cyan" />
      <p className="mt-4 text-gray-700 font-medium">{message}</p>
    </div>
  )
}

export default LoadingOverlay

