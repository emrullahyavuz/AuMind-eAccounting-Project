import { useState } from "react";
import { useConfirmEmailMutation } from "../../store/api/authApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

function ConfirmEmail() {
  const [confirmEmail] = useConfirmEmailMutation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      debugger
      const result = await confirmEmail({
        email: email,
        token: localStorage.getItem("token"),
      }).unwrap();

      if (result?.isSuccessful) {
        showToast("Hesabınız başarıyla onaylandı", "success");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Confirm email error:", error);
      showToast(
        error.data?.errorMessages?.[0] || "Hesap onayı başarısız oldu",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 bg-opacity-80 bg-[url('/images/auth-bg.jpg')] bg-cover bg-blend-overlay">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Hesap Onayı</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              E-posta Adresi
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="E-posta adresinizi giriniz"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Onaylanıyor..." : "Hesabı Onayla"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Onay linki e-posta adresinize gönderildi. Lütfen e-postanızı kontrol
          edin.
        </p>
      </div>
    </div>
  );
}

export default ConfirmEmail;
