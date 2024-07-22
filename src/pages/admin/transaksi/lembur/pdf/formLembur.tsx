import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { VITE_APP_KODE_TOKO, convertDate, filterKodeToko } from "@/utils";
import { LemburInterFace } from "@/interface";
// import { LemburInterFace } from "@/interface";

export const cetakSlipLembur = (data: LemburInterFace) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a5",
    // encryption: {
    //   userPassword: `${data.tgl_lahir || "helpdesknagatechberasputih"}`,
    //   ownerPassword: "helpdesknagatechberasputih",
    //   userPermissions: ["print", "modify", "copy", "annot-forms"],
    // },
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
  doc.text("FORM LEMBUR KARYAWAN", 105, 25, { align: "center" });
  const start_date = new Date().setDate(1);
  const end_date = new Date();
  end_date.setMonth(end_date.getMonth() + 1);
  end_date.setDate(-1);
  doc.text(`TANGGAL ${convertDate(`${new Date(start_date)}`, true)}`, 105, 30, {
    align: "center",
  });

  const tableHead: any[] = [];
  const tableBody: any[] = [];

  const finalY = 34;

  tableHead.push([
    {
      content: "No",
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: "Kode Pegawai",
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: "Nama Pegawai",
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: "Keterangan Lembur",
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: "Jam Lembur",
      styles: {
        halign: "center",
      },
      colSpan: 2,
    },
    {
      content: "Total",
      styles: {
        halign: "center",
      },
      rowSapn: 2,
    },
  ]);
  tableHead.push([
    {
      content: "",
      colSpan: 4,
    },
    {
      content: "Jam Awal",
      styles: {
        halign: "center",
      },
    },
    {
      content: "Jam Akhir",
      styles: {
        halign: "center",
      },
    },
    {
      content: "",
      styles: {
        halign: "center",
      },
    },
  ]);

  tableBody.push([
    {
      content: 1,
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: data.kode_pegawai,
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: data.nama_pegawai,
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: data.keterangan,
      rowSapn: 2,
      styles: {
        valign: "middle",
        halign: "center",
      },
    },
    {
      content: data.jam_awal,
      styles: {
        halign: "center",
      },
    },
    {
      content: data.jam_akhir,
      styles: {
        halign: "center",
      },
    },
    {
      content: data.total_rp.toLocaleString("kr-ko"),
      styles: {
        halign: "center",
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

  doc.save(`FORM LEMBUR .pdf`);
};
