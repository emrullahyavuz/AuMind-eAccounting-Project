import * as yup from "yup"

// Login formu için doğrulama şeması
export const loginSchema = yup.object({
  username: yup.string().required("Kullanıcı adı zorunludur").min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  password: yup.string().required("Şifre zorunludur").min(6, "Şifre en az 6 karakter olmalıdır"),
})

// Register formu için doğrulama şeması
export const registerSchema = yup.object({
  fullName: yup.string().required("Ad Soyad zorunludur").min(3, "Ad Soyad en az 3 karakter olmalıdır"),
  email: yup.string().required("E-posta zorunludur").email("Geçerli bir e-posta adresi giriniz"),
  username: yup.string().required("Kullanıcı adı zorunludur").min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"),
  confirmPassword: yup
    .string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor"),
  terms: yup
    .boolean()
    .required("Kullanım koşullarını kabul etmelisiniz")
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz"),
})

