import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../schemas/auth.schema"
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import "./Auth.css"

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      // Burada API çağrısı yapılacak
      console.log("Register data:", data)
      // Başarılı kayıt sonrası yönlendirme yapılabilir
    } catch (error) {
      console.error("Register error:", error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 bg-opacity-80 bg-[url('/images/auth-bg.jpg')] bg-cover bg-blend-overlay">
      <div className="w-full max-w-md p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">AuMind Muhasebe Sistemi</h1>

        {/* Logo */}
        <div className="w-24 h-24 bg-black mb-8"></div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">Yeni Hesap Oluştur</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* Ad Soyad */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-gray-700 font-medium">
              Ad Soyad
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="fullName"
                type="text"
                {...register("fullName")}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Ad ve soyadınızı giriniz"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* E-posta */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              E-posta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Kullanıcı Adı */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserPlus className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                {...register("username")}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Kullanıcı adınızı giriniz"
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Şifre */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Şifre Tekrarı */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
              Şifre Tekrarı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full pl-10 pr-10 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                placeholder="Şifrenizi tekrar giriniz"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Kullanım Koşulları */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                {...register("terms")}
                className={`h-4 w-4 rounded border ${
                  errors.terms ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-yellow-500`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                <span>
                  <a
                    href="/terms"
                    className="text-yellow-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kullanım koşullarını
                  </a>{" "}
                  okudum ve kabul ediyorum
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
            </div>
          </div>

          {/* Kayıt Ol Butonu */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-700 hover:bg-gray-800 text-yellow-500 font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-6"
          >
            {isSubmitting ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
          </button>

          {/* Giriş Yap Linki */}
          <div className="text-center pt-4 border-t border-gray-300">
            <p className="text-gray-700 text-sm">
              Zaten hesabınız var mı?{" "}
              <Link to="/auth/login" className="text-yellow-600 font-medium hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm

