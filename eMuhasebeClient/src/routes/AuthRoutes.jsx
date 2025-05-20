import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Auth/LoginForm";
import Register from "../components/Auth/RegisterForm";
import ConfirmEmail from "../components/Auth/ConfirmEmail";
const AuthRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmail />,
      },
    ],
  },
];

export default AuthRoutes;
