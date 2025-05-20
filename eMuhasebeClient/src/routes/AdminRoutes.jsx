import AdminLayout from "../layouts/AdminLayout";
import Companies from "../pages/Admin/Companies";
import Users from "../pages/Admin/Users";


const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
];

export default AdminRoutes;
