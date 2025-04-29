import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/auth.schema";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useLoginMutation } from "../../store/api";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  // AuthContext'ten login fonksiyonunu al
  const { login } = useAuth();

  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      emailOrUserName: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await loginMutation(data).unwrap();
      console.log("Login response:", result);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        // Token'ı store'a da kaydet

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  // Şifre görünürlüğünü değiştirme
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 bg-opacity-80 bg-[url('/images/auth-bg.jpg')] bg-cover bg-blend-overlay">
      <div className="w-full max-w-md p-8 flex flex-col items-center">
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          AuMind Muhasebe Sistemi
        </h1>

        {/* Logo */}
        <div className="w-24 h-24 bg-black mb-8"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          {/* Kullanıcı Adı */}
          <div className="space-y-2">
            <label
              htmlFor="emailOrUserName"
              className="block text-gray-700 font-medium"
            >
              Kullanıcı Adı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="emailOrUserName"
                type="text"
                {...register("emailOrUserName")}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.emailOrUserName ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Kullanıcı adınızı giriniz"
              />
            </div>
            {errors.emailOrUserName && (
              <p className="text-red-500 text-sm">
                {errors.emailOrUserName.message}
              </p>
            )}
          </div>

          {/* Şifre */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full pl-10 pr-10 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Şifrenizi giriniz"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Giriş Yap Butonu */}
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-gray-700 hover:bg-gray-800 text-yellow-500 font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {isLoading || isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          {/* Onay Maili Linki */}
          <div className="text-center">
            <Link
              to="/resend-verification"
              className="text-gray-700 text-sm hover:text-yellow-600"
            >
              Onay Mailini Tekrar Gönder
            </Link>
          </div>

          {/* Kayıt Ol Linki */}
          <div className="text-center pt-4 border-t border-gray-300">
            <p className="text-gray-700 text-sm">
              Hesabınız yok mu?{" "}
              <Link
                to="/auth/register"
                className="text-yellow-600 font-medium hover:underline"
              >
                Kayıt Ol
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
