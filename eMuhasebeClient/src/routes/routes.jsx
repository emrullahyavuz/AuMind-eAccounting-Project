import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/NotFound";
import { PrivateRoute } from "../components/PrivateRoute";

// Wrap protected routes with PrivateRoute
const protectedMainRoutes = MainRoutes.map(route => ({
    ...route,
    element: <PrivateRoute>{route.element}</PrivateRoute>
}));

const protectedAdminRoutes = AdminRoutes.map(route => ({
    ...route,
    element: <PrivateRoute>{route.element}</PrivateRoute>
}));

const router = createBrowserRouter([
    ...AuthRoutes,
    ...protectedMainRoutes,
    ...protectedAdminRoutes,
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;