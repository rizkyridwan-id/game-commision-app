import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FormPayrollInterFace } from "../dto";
import { VITE_APP_KODE_TOKO, convertDate, filterKodeToko } from "@/utils";

export const cetakSlipGajih = (data: FormPayrollInterFace) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a5",
    encryption: {
      userPassword: `${data.tgl_lahir || "helpdesknagatechberasputih"}`,
      ownerPassword: "helpdesknagatechberasputih",
      userPermissions: ["print", "modify", "copy", "annot-forms"],
    },
  });

  const datatoko = filterKodeToko(`${VITE_APP_KODE_TOKO}`);
  const companyDetails = {
    name: datatoko?.nama_toko || "",
    address: datatoko?.alamat_toko || "",
    // phone: "021271144",
  };

  doc.setFontSize(12);

  // Company Info
  doc.text(companyDetails.name, 105, 10, { align: "center" });
  doc.text(companyDetails.address, 105, 16, { align: "center" });
  // doc.text(`Telepon: ${companyDetails.phone}`, 105, 22, { align: "center" });

  doc.line(10, 20, 200, 20); // Adjusted for A5 landscape width

  // Slip Title
  doc.text("SLIP GAJI KARYAWAN", 105, 25, { align: "center" });
  const start_date = new Date().setDate(1);
  const end_date = new Date();
  end_date.setMonth(end_date.getMonth() + 1);
  end_date.setDate(-1);
  doc.text(
    `Periode ${convertDate(`${new Date(start_date)}`, true)} ${convertDate(`${new Date(end_date)}`, true)}`,
    105,
    30,
    {
      align: "center",
    }
  );

  const tableHead: any[] = [];
  const tableBody: any[] = [];

  doc.text("Kode Pegawai", 14, 40);
  doc.text(`: ${data.kode_pegawai}`, 50, 40);
  doc.text("Nama Pegawai", 14, 45);
  doc.text(`: ${data.nama_pegawai}`, 50, 45);
  doc.text("Jabatan", 14, 50);
  doc.text(`: ${data.jabatan}`, 50, 50);
  const finalY = 55;

  tableHead.push([
    {
      content: "PENDAPATAN",
    },
    {
      content: "NOMINAL",
    },
  ]);

  tableBody.push([
    {
      content: "GAJIH POKOK",
    },
    {
      content: Number(data.gajih_pokok || 0).toLocaleString("kr-ko"),
    },
  ]);
  tableBody.push([
    {
      content: "BONUS SALES",
    },
    {
      content: Number(data.bonus_sales || 0).toLocaleString("kr-ko"),
    },
  ]);
  tableBody.push([
    {
      content: "BONUS ABSEN",
    },
    {
      content: Number(data.bonus_absen || 0).toLocaleString("kr-ko"),
    },
  ]);
  tableBody.push([
    {
      content: "BONUS JABATAN",
    },
    {
      content: Number(data.bonus_jabatan || 0).toLocaleString("kr-ko"),
    },
  ]);
  tableBody.push([
    {
      content: "POTONGAN",
    },
    {
      content: Number(data.potongan || 0).toLocaleString("kr-ko"),
    },
  ]);

  tableBody.push([
    {
      content: "TOTAL GAJI",
      styles: {
        fontSize: 8,
        textColor: "#000",
        fillColor: "#E8E5E5",
      },
    },
    {
      content: Number(data.total_gajih || 0).toLocaleString("kr-ko"),
      styles: {
        fontSize: 8,
        textColor: "#000",
        fillColor: "#E8E5E5",
      },
    },
  ]);

  autoTable(doc, {
    head: tableHead,
    body: tableBody,
    startY: finalY,
    theme: "plain",
    rowPageBreak: "avoid",
    margin: { top: 10 },
    bodyStyles: {
      fontSize: 8,
    },
    headStyles: {
      fontSize: 8,
      textColor: "#000",
      fillColor: "#E8E5E5",
    },
  });

  doc.save(`SLIP GAJI ${data.kode_pegawai}_${data.nama_pegawai}.pdf`);
};
