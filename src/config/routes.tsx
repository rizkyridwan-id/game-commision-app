import App from "../App";
import {
  Dashboard,
  HomePublic,
  Login,
  MasterUsesr,
  PageNoteFound,
} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoute = [
  {
    path: "/app/",
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
        path: "/app/dashboard",
        title: "Dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/master-user",
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
      {
        path: "absen",
        title: "Login",
        element: <HomePublic />,
      },
    ],
  },
];

export default AppRoute;
