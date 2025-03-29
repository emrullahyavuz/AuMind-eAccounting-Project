import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import PropTypes from "prop-types";

// Auth Context oluşturma
export const AuthContext = createContext();

// Auth Provider bileşeni
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Giriş işlemi
  const login = async (credentials) => {
    try {
      setIsLoading(true);

      // Gerçek uygulamada burada API çağrısı yapılacak
      // Şimdilik basit bir simülasyon yapıyoruz
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Örnek kullanıcı bilgisi
      const userData = {
        id: 1,
        username: credentials.username,
        fullName: "Demo Kullanıcı",
        email: "demo@example.com",
        role: "admin",
      };

      // Kullanıcı bilgilerini state ve localStorage'a kaydet
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));

      // Başarılı giriş mesajı
      showToast("Başarıyla giriş yapıldı", "success");

      // Ana sayfaya yönlendir
      navigate("/", { replace: true });
    } catch (error) {
      showToast("Giriş yapılırken bir hata oluştu", "error");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Çıkış işlemi
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    showToast("Başarıyla çıkış yapıldı", "info");
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };

  // Context values
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
