import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";
import { useAuth } from "../../hooks/useAuth";
import { LogIn } from "lucide-react";

const Header = () => {
  // Get the current location
  const location = useLocation();

  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Get the isAuthenticated state and logout function from the useAuth hook
  const { isAuthenticated, logout } = useAuth();

  // Handle the authentication action
  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/auth/login");
    }
  };

  // Check if the current page is an authentication page
  const isAuthPage = location.pathname.startsWith("/auth") ? true : false;

  return (
    <>
      {/* Header */}
      <header className="bg-gray-800 text-white p-2 px-4 flex justify-between items-center">
        <div className="flex items-center border-l-[3px] ml-[-10px] border-yellow-400">
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

        <div className="flex items-center gap-x-3">
         {/* Home Button */}
         <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400"
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
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="sr-only">Ana Sayfa</span>
            </Button>
          </Link>

          {/* Auth Button */}
          <button
            className={`p-2 text-white rounded-md ${
              isAuthenticated
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleAuthAction}
          >
            <LogIn size={24} />
          </button>
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
            className="rounded-full border bg-yellow-400 border-yellow-300"
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
