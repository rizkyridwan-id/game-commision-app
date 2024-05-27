import { userData } from "@/utils";
import App from "../App";
import {
  Dashboard,
  DataHariLibur,
  DataJabatan,
  DataTimeKeepingBreak,
  DataTimeKeepingIstirahat,
  DataTimeKeepingKSholat,
  DataTimeKeepingKehadiran,
  DataToko,
  DataUser,
  KasBon,
  LaporanGlobalPayroll,
  LaporanKasBon,
  LaporanPayroll,
  LaporanPelanggaran,
  LaporanPengajuanCuti,
  Login,
  MasterPegawai,
  PageNoteFound,
  ParameterBonusSales,
  ParameterCuti,
  ParameterKonversiCuti,
  ParameterShiftKerja,
  ParameterTagetSales,
  ParameterTargetToko,
  Payroll,
  PelanggaranPegawai,
  PengajuanCuti,
  PotonganLainLain,
  ReviewCuti,
  TimeKeeping,
} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import LaporanPotonganLainLain from "@/pages/admin/laporan/laporanPotonganLainLain/laporanPotonganLainLain";

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
        title: "Halaman Tidak Ditemukan",
        element: <PageNoteFound />,
      },
      {
        path: "/app/data-toko",
        title: "Data Toko",
        element: (
          <ProtectedRoute>
            {userData.level === "SU" ? <DataToko /> : <PageNoteFound />}
          </ProtectedRoute>
        ),
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
      {
        path: "/app/laporan-potongan-lain-lain",
        title: "Laporan Potongan Lain Lain",
        element: (
          <ProtectedRoute>
            <LaporanPotonganLainLain />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/laporan-kas-bon",
        title: "Laporan Kas Bon",
        element: (
          <ProtectedRoute>
            <LaporanKasBon />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/laporan-payroll",
        title: "Laporan Payroll",
        element: (
          <ProtectedRoute>
            <LaporanPayroll />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/laporan-pelangaran-pegawai",
        title: "Laporan Pelanggaran Pegawai",
        element: (
          <ProtectedRoute>
            <LaporanPelanggaran />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/laporan-global-payroll",
        title: "Laporan Global Payroll",
        element: (
          <ProtectedRoute>
            <LaporanGlobalPayroll />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/laporan-global-payroll",
        title: "Laporan Global Payroll",
        element: (
          <ProtectedRoute>
            <LaporanPengajuanCuti />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/pengajuan-cuti",
        title: "Pengajuan Cuti",
        element: (
          <ProtectedRoute>
            <PengajuanCuti />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/review-cuti",
        title: "Review Cuti",
        element: (
          <ProtectedRoute>
            <ReviewCuti />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/kas-bon",
        title: "Kas Bon",
        element: (
          <ProtectedRoute>
            <KasBon />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/potongan-lain",
        title: "Potongan Lain",
        element: (
          <ProtectedRoute>
            <PotonganLainLain />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/pelanggaran-pegawai",
        title: "Pelanggaran Pegawai",
        element: (
          <ProtectedRoute>
            <PelanggaranPegawai />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/payroll",
        title: "Payroll",
        element: (
          <ProtectedRoute>
            <Payroll />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/data-time-keeping-sholat",
        title: "Data Time Keeping Sholat",
        element: (
          <ProtectedRoute>
            <DataTimeKeepingKSholat />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/data-time-keeping-istirahat",
        title: "Data Time Keeping Istirahat",
        element: (
          <ProtectedRoute>
            <DataTimeKeepingIstirahat />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/data-time-keeping-break",
        title: "Data Time Keeping Break",
        element: (
          <ProtectedRoute>
            <DataTimeKeepingBreak />
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/time-keeping",
        title: "Data Time Keeping",
        element: (
          <ProtectedRoute>
            <DataTimeKeepingKehadiran />
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
        path: "/time-keeping",
        title: "Time Keeping",
        element: <TimeKeeping />,
      },
    ],
  },
];

export default AppRoute;
