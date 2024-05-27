import {
  DataItemGenerator,
  DataSystemInterFace,
  GenaratorExportPdfExcel,
} from "@/interface";
import { convertDate, convertDateTime, getItem } from "@/utils";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportPDF = <T>({
  title,
  columns,
  data,
  grouping,
  formatPdf,
  date,
  grandTotalSetting,
  dataToko,
}: GenaratorExportPdfExcel<T>): void => {
  const doc: any = new jsPDF(formatPdf.orientation, formatPdf.unit, [
    formatPdf.width || 297,
    formatPdf.height || 210,
  ]);
  const tableRows: any[] = [];
  let finalY = 30;
  columns = columns.filter((item) => !item.options?.disabledColumn);
  const widthPortrait = doc.internal.pageSize.getWidth();

  doc.setFontSize(10);
  doc.text(
    dataToko?.nama_toko || getItem<DataSystemInterFace>("dataSystem").nama_toko,
    15,
    18
  );
  const address =
    dataToko?.alamat_toko ||
    getItem<DataSystemInterFace>("dataSystem").nama_toko;
  const addressLines = doc.splitTextToSize(address, 100); // Adjust width as needed
  doc.text(addressLines, 15, 22);

  // Teks di kanan
  doc.text(title, widthPortrait - 15, 18, { align: "right" });
  if (date) {
    const titleWidth = doc.getTextWidth(title);
    const startX = widthPortrait - 15 - titleWidth;
    doc.text(
      `Tanggal : ${convertDate(String(date?.start_date || date?.tgl_system), true)} ${
        date?.end_date ? `S/D ${convertDate(String(date?.end_date), true)}` : ""
      }`,
      startX + 35,
      22,
      { align: "right" }
    );
  }
  doc.setProperties({
    title: title,
  });

  // Header Tabel
  const tableHeader = columns.map((column) => ({
    content: column.label,
    styles: {
      textColor: "#000",
      fillColor: "#E8E5E5",
      fontStyle: "bold",
      halign: column?.options?.halign
        ? column?.options?.halign
        : column?.options?.format === "RP" || column?.options?.format === "GR"
          ? "right"
          : "left",
    },
  }));

  tableRows.push(tableHeader);

  // Body Tabel
  const totals: { [key: string]: number } = {};

  data.forEach((item) => {
    if (grouping.length > 0) {
      const group = grouping.map((column) => ({
        content:
          item[column] !== undefined
            ? `${formatingTitle(column)} : ` + item[column]
            : "",
      }));
      tableRows.push(group);
      const subtotal: { [key: string]: number } = {};

      item.detail.forEach((list2: any) => {
        const rowData = columns.map((column) => {
          const value = list2[column.key as keyof DataItemGenerator];
          const columnKey = column.key as keyof DataItemGenerator;
          totals[columnKey] = (totals[columnKey] || 0) + Number(value);
          subtotal[columnKey] = (subtotal[columnKey] || 0) + Number(value);
          return {
            content: (() => {
              switch (column?.options?.format) {
                case "RP":
                  return list2[column.key] !== undefined
                    ? Number(list2[column.key] || 0).toLocaleString("kr-ko")
                    : "";
                case "GR":
                  return list2[column.key] !== undefined
                    ? Number(list2[column.key] || 0).toFixed(3)
                    : "";
                case "DATETIME":
                  return list2[column.key] !== undefined
                    ? convertDateTime(list2[column.key] || new Date())
                    : "";
                case "DATE":
                  return list2[column.key] !== undefined
                    ? convertDate(list2[column.key] || new Date(), true)
                    : "";
                default:
                  return list2[column.key] !== undefined
                    ? list2[column.key].toString()
                    : "";
              }
            })(),
            styles: {
              halign: column?.options?.halign
                ? column?.options?.halign
                : column?.options?.format === "RP" ||
                    column?.options?.format === "GR"
                  ? "right"
                  : typeof list2[column.key] === "number"
                    ? "right"
                    : "left",
            },
          };
        });

        tableRows.push(rowData);
      });

      const footersubtotal: any = [];
      columns.forEach((column) => {
        const total = subtotal[column.key as keyof DataItemGenerator];
        if (
          column?.options?.format === "RP" ||
          column?.options?.format === "GR"
        ) {
          const row = {
            content: column?.options?.disabledFooter
              ? ""
              : (() => {
                  switch (column?.options?.format) {
                    case "RP":
                      return total.toLocaleString("kr-ko");
                    case "GR":
                      return total.toFixed(3);
                    default:
                      return total.toString();
                  }
                })(),
            styles: {
              halign: column?.options?.halign
                ? column?.options?.halign
                : column?.options?.format === "RP" ||
                    column?.options?.format === "GR"
                  ? "right"
                  : "left",
              textColor: "#000",
              fillColor: "#E8E5E5",
              fontStyle: "bold",
            },
          };

          footersubtotal.push(row);
        } else {
          footersubtotal.push({
            content: "",
            styles: {
              textColor: "#000",
              fillColor: "#E8E5E5",
              fontStyle: "bold",
            },
          });
        }
      });
      const colSpan = grandTotalSetting?.colSpan
        ? Number(grandTotalSetting?.colSpan || 0) + 1
        : 0;
      footersubtotal[0] = {
        content: "SUB TOTAL",
        colSpan: colSpan,
        styles: {
          textColor: "#000",
          fillColor: "#E8E5E5",
          fontStyle: "bold",
          halign: "center",
        },
      };
      if (grandTotalSetting?.colSpan) {
        footersubtotal.splice(1, grandTotalSetting?.colSpan);
      }
      tableRows.push(footersubtotal);
    } else {
      const rowData = columns.map((column) => {
        const value = item[column.key as keyof DataItemGenerator];
        const columnKey = column.key as keyof DataItemGenerator;
        totals[columnKey] = (totals[columnKey] || 0) + Number(value);
        return {
          content: (() => {
            switch (column?.options?.format) {
              case "RP":
                return item[column.key as keyof DataItemGenerator] !== undefined
                  ? Number(
                      item[column.key as keyof DataItemGenerator] || 0
                    ).toLocaleString("kr-ko")
                  : "";
              case "GR":
                return item[column.key as keyof DataItemGenerator] !== undefined
                  ? Number(
                      item[column.key as keyof DataItemGenerator] || 0
                    ).toFixed(3)
                  : "";
              case "DATETIME":
                return item[column.key as keyof DataItemGenerator] !== undefined
                  ? convertDateTime(
                      item[column.key as keyof DataItemGenerator] || new Date()
                    )
                  : "";
              case "DATE":
                return item[column.key as keyof DataItemGenerator] !== undefined
                  ? convertDate(
                      item[column.key as keyof DataItemGenerator] || new Date(),
                      true
                    )
                  : "";
              default:
                return item[column.key as keyof DataItemGenerator] !== undefined
                  ? item[column.key as keyof DataItemGenerator].toString()
                  : "";
            }
          })(),
          styles: {
            halign: column?.options?.halign
              ? column?.options?.halign
              : column?.options?.format === "RP" ||
                  column?.options?.format === "GR"
                ? "right"
                : typeof item[column.key as keyof DataItemGenerator] ===
                    "number"
                  ? "right"
                  : "left",
          },
        };
      });
      tableRows.push(rowData);
    }
  });

  const grandTotal: any = [];
  columns.forEach((column) => {
    const total = totals[column.key as keyof DataItemGenerator];
    if (column?.options?.format === "RP" || column?.options?.format === "GR") {
      const row = {
        content: column?.options?.disabledFooter
          ? ""
          : (() => {
              switch (column?.options?.format) {
                case "RP":
                  return total.toLocaleString("kr-ko");
                case "GR":
                  return total.toFixed(3);
                default:
                  return total.toString();
              }
            })(),
        styles: {
          halign: column?.options?.halign
            ? column?.options?.halign
            : column?.options?.format === "RP" ||
                column?.options?.format === "GR"
              ? "right"
              : "left",
          textColor: "#000",
          fillColor: "#E8E5E5",
          fontStyle: "bold",
        },
      };

      grandTotal.push(row);
    } else {
      grandTotal.push({
        content: "",
        styles: {
          textColor: "#000",
          fillColor: "#E8E5E5",
          fontStyle: "bold",
        },
      });
    }
  });

  const colSpan = grandTotalSetting?.colSpan
    ? Number(grandTotalSetting?.colSpan || 0) + 1
    : 0;

  if (!grandTotalSetting?.disableGrandTotal) {
    grandTotal[0] = {
      content: "GRAND TOTAL",
      colSpan: colSpan,
      styles: {
        textColor: "#000",
        fillColor: "#E8E5E5",
        fontStyle: "bold",
        halign: "center",
      },
    };
    if (grandTotalSetting?.colSpan) {
      grandTotal.splice(1, grandTotalSetting?.colSpan);
    }

    tableRows.push(grandTotal);
  }

  tableRows.push([
    {
      content: `Print Date : ${convertDateTime(`${new Date()}`)}`,
      colSpan: columns.length,
      styles: {
        textColor: "#000",
        fillColor: "#E8E5E5",
        fontStyle: "italic",
      },
    },
  ]);

  doc.autoTable({
    head: [],
    body: tableRows,
    startY: finalY,
    theme: "plain",
    rowPageBreak: "avoid",
    margin: { top: 10 },
    bodyStyles: { fontSize: formatPdf.fontSIze || 8 },
    headStyles: {
      fontSize: formatPdf.fontSIze || 8,
      textColor: "#000",
      fillColor: "#E8E5E5",
    },
  });

  // finalY = doc.autoTableEndPosY() + 3;
  finalY = doc.lastAutoTable.finalY + 3;

  const pages = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(10);

  for (let j = 1; j < pages + 1; j++) {
    const horizontalPos = pageWidth / 2;
    const verticalPos = pageHeight - 10;
    doc.setPage(j);
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: "center",
    });
  }

  doc.save(`${title}.pdf`);
};

const formatingTitle = (title: string): string => {
  // Pisahkan kata-kata menggunakan underscore sebagai pemisah
  const words = title.split("_");

  // Ubah setiap kata menjadi huruf kapital dan gabungkan kembali dengan spasi di antara mereka
  const formattedtitle = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedtitle;
};
export default ExportPDF;
