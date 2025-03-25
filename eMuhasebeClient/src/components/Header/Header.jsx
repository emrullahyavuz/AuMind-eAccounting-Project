import { useLocation } from "react-router-dom";
import { Button } from "../UI/Button";

const Header = () => {
  // Get the current location
  const location = useLocation();
  
  // Check if the current page is an authentication page
  const isAuthPage = location.pathname.startsWith("/auth") ? true : false;
  
  return (
    <>
      {/* Header */}
      <header className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <div className="flex items-center border-l-[3px] ml-[-2px] border-yellow-400">
          <div className="ml-4 bg-white text-black rounded px-3 py-2 flex items-center">
            <span className="mr-2">Kardeşler Taşımacılık A.Ş</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="sr-only">Ana Sayfa</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white ml-2 bg-red-600 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span className="sr-only">Çıkış</span>
          </Button>
        </div>
      </header>

      {/* Back Button */}
      {isAuthPage ? (
        ""
      ) : (
        <div className="p-4 flex justify-end bg-gray-100">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span className="sr-only">Geri</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default Header;
