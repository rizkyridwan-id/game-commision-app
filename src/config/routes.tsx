import App from "../App";
import { Dashboard, Login, MasterUsesr, PageNoteFound } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoute = [
  {
    path: "/admin/",
    element: <App />,
    children: [
      {
        path: "*",
        title: "Halaman Tidak Ditemukan",
        element: <PageNoteFound />,
      },
      {
        path: "",
        title: "Dashboard",
        element: <PageNoteFound />,
      },
      {
        path: "/admin/dashboard",
        title: "Dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/master-user",
        title: "Master User",
        element: (
          <ProtectedRoute>
            <MasterUsesr />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        title: "Login",
        element: <Login />,
      },
      {
        path: "*",
        title: "Halaman Tidak Ditemukan",
        element: <PageNoteFound />,
      },
      {
        path: "",
        title: "Login",
        element: <Login />,
      },
    ],
  },
];

export default AppRoute;
