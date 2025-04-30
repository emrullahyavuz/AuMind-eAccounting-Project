import * as yup from "yup"

// Login formu için doğrulama şeması
export const loginSchema = yup.object({
  emailOrUserName: yup.string().required("Kullanıcı adı zorunludur").min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  password: yup.string().required("Şifre zorunludur").min(6, "Şifre en az 6 karakter olmalıdır"),
})

// Register formu için doğrulama şeması
export const registerSchema = yup.object({
  firstName: yup.string().required("Ad zorunludur").min(3, "Ad en az 3 karakter olmalıdır"),
  lastName: yup.string().required("Soyad zorunludur").min(3, "Soyad en az 3 karakter olmalıdır"),
  username: yup.string().required("Kullanıcı adı zorunludur").min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  email: yup.string().required("E-posta zorunludur").email("Geçerli bir e-posta adresi giriniz"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"),
  confirmPassword: yup
    .string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor"),
  companyIds: yup.array().min(1, "En az bir şirket seçmelisiniz").required("Şirket zorunludur"),
  terms: yup
    .boolean()
    .required("Kullanım koşullarını kabul etmelisiniz")
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz"),
})

