function Spinner({ size = "medium", color = "cyan" }) {
    // Size değerlerine göre boyut belirleme
    const sizeClasses = {
      small: "w-6 h-6",
      medium: "w-10 h-10",
      large: "w-16 h-16",
    }
  
    // Color değerlerine göre renk belirleme
    const colorClasses = {
      cyan: "border-cyan-500",
      blue: "border-blue-600",
      yellow: "border-yellow-400",
      gray: "border-gray-600",
    }
  
    const spinnerSize = sizeClasses[size] || sizeClasses.medium
    const spinnerColor = colorClasses[color] || colorClasses.cyan
  
    return (
      <div className="flex items-center justify-center p-8">
        <div
          className={`${spinnerSize} border-4 border-gray-200 ${spinnerColor} border-t-4 rounded-full animate-spin`}
        ></div>
      </div>
    )
  }
  
  export default Spinner
  
  