import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-yellow-400 mb-4">404</h1>
        
        {/* Error Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 mb-6">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          
          {/* Decorative Line */}
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          
          {/* Action Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500">
          Yardıma mı ihtiyacınız var?{" "}
          <button
            onClick={() => navigate("/chat")}
            className="text-yellow-500 hover:text-yellow-600 font-medium underline"
          >
            Muhasebe Asistanı
          </button>
          ile iletişime geçin.
        </p>
      </div>
    </div>
  );
};

export default NotFound; 