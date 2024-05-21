import App from "../App";
import {
  Dashboard,
  DataHariLibur,
  DataJabatan,
  DataUser,
  HomePublic,
  Login,
  MasterPegawai,
  PageNoteFound,
  ParameterBonusSales,
  ParameterCuti,
  ParameterKonversiCuti,
  ParameterShiftKerja,
  ParameterTagetSales,
  ParameterTargetToko,
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
        path: "/app/data-pegawai",
        title: "Data Pegawai",
        element: (
          <ProtectedRoute>
            <MasterPegawai />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/data-user",
        title: "Data User",
        element: (
          <ProtectedRoute>
            <DataUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/data-jabatan",
        title: "Data Jabatan",
        element: (
          <ProtectedRoute>
            <DataJabatan />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/data-hari-libur",
        title: "Data Hari Libur",
        element: (
          <ProtectedRoute>
            <DataHariLibur />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/parameter-bonus",
        title: "Parameter Bonus",
        element: (
          <ProtectedRoute>
            <ParameterBonusSales />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/parameter-cuti",
        title: "Parameter Cuti",
        element: (
          <ProtectedRoute>
            <ParameterCuti />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/parameter-koversi-cuti",
        title: "Parameter Koversi Cuti",
        element: (
          <ProtectedRoute>
            <ParameterKonversiCuti />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/parameter-shift-Kerja",
        title: "Parameter Shift Kerja",
        element: (
          <ProtectedRoute>
            <ParameterShiftKerja />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/parameter-target-sales",
        title: "Target Sales",
        element: (
          <ProtectedRoute>
            <ParameterTagetSales />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/parameter-target-toko",
        title: "Target Toko",
        element: (
          <ProtectedRoute>
            <ParameterTargetToko />
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