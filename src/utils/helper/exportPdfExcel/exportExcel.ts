import {
  ColumnGenarator,
  DataItemGenerator,
  DataSystemInterFace,
  GenaratorExportPdfExcel,
} from "@/interface";
import ExcelJS from "exceljs";
import { convertDate, convertDateTime, getItem } from "../helpers";

const ExportExcel = async <T>({
  title,
  columns,
  data,
  grouping,
  date,
  grandTotalSetting,
  dataToko,
}: GenaratorExportPdfExcel<T>): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  columns = columns.filter((item) => !item.options?.disabledColumn);
  const worksheet = workbook.addWorksheet(title);

  const lastUsedColumnIndex = columns.length;
  // Judul
  const judul = worksheet.addRow([]);
  judul.getCell(1).value = title;
  judul.getCell(1).alignment = { horizontal: "center" };
  worksheet.mergeCells(
    `A${judul.number}:${String.fromCharCode(64 + lastUsedColumnIndex)}${
      judul.number
    }`
  );
  judul.eachCell((cell) => {
    cell.font = { color: { argb: "000000" }, bold: true, size: 12 };
  });

  //DataTOko
  const namaTokoRow = worksheet.addRow([]);
  namaTokoRow.getCell(1).value =
    dataToko?.nama_toko ||
    getItem<DataSystemInterFace>("dataSystem").nama_toko ||
    "";
  namaTokoRow.getCell(1).alignment = { horizontal: "center" };
  worksheet.mergeCells(
    `A${namaTokoRow.number}:${String.fromCharCode(64 + lastUsedColumnIndex)}${
      namaTokoRow.number
    }`
  );
  namaTokoRow.eachCell((cell) => {
    cell.font = { color: { argb: "000000" }, bold: true, size: 12 };
  });

  //DataTOko
  const alamatToko = worksheet.addRow([]);
  alamatToko.getCell(1).value =
    dataToko?.alamat_toko ||
    getItem<DataSystemInterFace>("dataSystem").alamat_toko ||
    "";
  alamatToko.getCell(1).alignment = { horizontal: "center" };
  worksheet.mergeCells(
    `A${alamatToko.number}:${String.fromCharCode(64 + lastUsedColumnIndex)}${
      alamatToko.number
    }`
  );
  alamatToko.eachCell((cell) => {
    cell.font = { color: { argb: "000000" }, bold: true, size: 12 };
  });

  // Tanggal
  if (date) {
    const tanggalRow = worksheet.addRow([]);
    tanggalRow.getCell(1).value = `Tanggal : ${convertDate(
      String(date?.start_date || date?.tgl_system || new Date()),
      true
    )} ${
      date?.end_date ? `S/D ${convertDate(String(date?.end_date), true)}` : ""
    }`;
    tanggalRow.getCell(1).alignment = { horizontal: "center" };

    // Menggabungkan sel dari kolom A hingga kolom terakhir yang tidak terpakai pada baris tanggal
    worksheet.mergeCells(
      `A${tanggalRow.number}:${String.fromCharCode(64 + lastUsedColumnIndex)}${
        tanggalRow.number
      }`
    );
    tanggalRow.eachCell((cell) => {
      cell.font = { color: { argb: "000000" }, bold: true, size: 12 };
    });
  }

  // Menambahkan header ke worksheet
  const headerColumn = worksheet.addRow(columns);

  // Menetapkan gaya untuk header
  headerColumn.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E8E5E5" }, // Warna hijau yang diinginkan
      bgColor: { argb: "E8E5E5" },
    };
    cell.font = { color: { argb: "000000" }, bold: true };

    const columnValue = cell.value as unknown as ColumnGenarator<T>;

    if (cell.value) {
      cell.alignment = {
        horizontal: `${
          columnValue?.options?.halign
            ? columnValue?.options?.halign
            : columnValue?.options?.format === "RP" ||
                columnValue?.options?.format === "GR"
              ? "right"
              : "left" || "right"
        }`,
      };

      cell.value = columnValue.label;
    }
  });

  const totals: { [key: string]: number } = {};

  data.forEach((item) => {
    if (grouping.length > 0) {
      const group = grouping.map((column) => ({
        value:
          item[column] !== undefined
            ? `${formatingTitle(column)} : ` + item[column]
            : "",
      }));
      worksheet.addRow(group.map((cellData) => cellData.value));
      const subtotal: { [key: string]: number } = {};

      item.detail.forEach((itemDetail: any) => {
        const rowData = columns.map((column) => {
          const value =
            column?.options?.format === "DATETIME"
              ? itemDetail[column.key as keyof DataItemGenerator] === undefined
                ? convertDateTime(
                    itemDetail[column.key as keyof DataItemGenerator]
                  )
                : ""
              : column?.options?.format === "DATE"
                ? itemDetail[column.key as keyof DataItemGenerator] !==
                  undefined
                  ? convertDate(
                      itemDetail[column.key as keyof DataItemGenerator],
                      true
                    )
                  : ""
                : itemDetail[column.key as keyof DataItemGenerator];
          const alignment = {
            horizontal: column?.options?.halign
              ? column?.options?.halign
              : column?.options?.format === "RP" ||
                  column?.options?.format === "GR"
                ? "right"
                : "left" || "right",
          };
          const columnKey = column.key as keyof DataItemGenerator;
          totals[columnKey] = (totals[columnKey] || 0) + Number(value);
          subtotal[columnKey] = (subtotal[columnKey] || 0) + Number(value);

          return {
            value,
            alignment,
            numFmt:
              column?.options?.format === "RP"
                ? "#,##0"
                : column?.options?.format === "GR"
                  ? "#,##0.000"
                  : undefined,
          };
        });

        const row = worksheet.addRow(rowData.map((cellData) => cellData.value));

        rowData.forEach((cellData, index) => {
          const cell = row.getCell(index + 1);
          cell.alignment = cellData.alignment;

          if (cellData.numFmt) {
            cell.numFmt = cellData.numFmt;
          }
        });
      });
      const subtotalRow = worksheet.addRow(columns.map(() => null)); // Create a row with null values

      columns.forEach((column, columnIndex) => {
        if (
          column?.options?.format === "RP" ||
          column?.options?.format === "GR"
        ) {
          const startRow = 4; // Adjust this based on the starting row for your data
          const endRow = data.length + startRow - 1;
          const totalFormula = `SUM(${String.fromCharCode(
            65 + columnIndex
          )}${startRow}:${String.fromCharCode(65 + columnIndex)}${endRow})`;
          const grandTotalCell = subtotalRow.getCell(columnIndex + 1);
          subtotalRow.getCell(1).value = "SUB TOTAL";
          subtotalRow.getCell(1).alignment = { horizontal: "center" };

          // Explicitly cast the cell to CellValue to set numFmt
          (grandTotalCell as any).numFmt =
            column?.options?.format === "GR" ? "#,##0.000" : "#,##0";
          grandTotalCell.value = { formula: totalFormula };
          subtotalRow.getCell(columnIndex + 1).value = column?.options
            .disabledFooter
            ? ""
            : subtotal[column.key as keyof DataItemGenerator];
        } else {
          subtotalRow.getCell(columnIndex + 1).value = "";
        }
      });
      subtotalRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "E8E5E5" }, // Warna hijau yang diinginkan
          bgColor: { argb: "E8E5E5" },
        };
        cell.font = { color: { argb: "000000" }, bold: true };
      });
    } else {
      const rowData = columns.map((column) => {
        const value =
          column?.options?.format === "DATETIME"
            ? item[column.key as keyof DataItemGenerator] !== undefined
              ? convertDateTime(item[column.key as keyof DataItemGenerator])
              : ""
            : column?.options?.format === "DATE"
              ? item[column.key as keyof DataItemGenerator] !== undefined
                ? convertDate(item[column.key as keyof DataItemGenerator], true)
                : ""
              : item[column.key as keyof DataItemGenerator];
        const alignment = {
          horizontal: column?.options?.halign
            ? column?.options?.halign
            : column?.options?.format === "RP" ||
                column?.options?.format === "GR"
              ? "right"
              : "left" || "right",
        };
        const columnKey = column.key as keyof DataItemGenerator;
        totals[columnKey] = (totals[columnKey] || 0) + Number(value);

        return {
          value,
          alignment,
          numFmt:
            column?.options?.format === "RP"
              ? "#,##0"
              : column?.options?.format === "GR"
                ? "#,##0.000"
                : undefined,
        };
      });

      const row = worksheet.addRow(rowData.map((cellData) => cellData.value));

      rowData.forEach((cellData, index) => {
        const cell = row.getCell(index + 1);
        cell.alignment = cellData.alignment;

        if (cellData.numFmt) {
          cell.numFmt = cellData.numFmt;
        }
      });
    }
  });

  const grandTotalRow = worksheet.addRow(columns.map(() => null)); // Create a row with null values

  columns.forEach((column, columnIndex) => {
    if (column?.options?.format === "RP" || column?.options?.format === "GR") {
      const startRow = 4; // Adjust this based on the starting row for your data
      const endRow = data.length + startRow - 1;
      const totalFormula = `SUM(${String.fromCharCode(
        65 + columnIndex
      )}${startRow}:${String.fromCharCode(65 + columnIndex)}${endRow})`;
      const grandTotalCell = grandTotalRow.getCell(columnIndex + 1);
      grandTotalRow.getCell(1).value = "GRAND TOTAL";
      grandTotalRow.getCell(1).alignment = { horizontal: "center" };

      (grandTotalCell as any).numFmt =
        column?.options?.format === "GR" ? "#,##0.000" : "#,##0";
      grandTotalCell.value = { formula: totalFormula };
      grandTotalRow.getCell(columnIndex + 1).value = column?.options
        .disabledFooter
        ? ""
        : totals[column.key as keyof DataItemGenerator];
    } else {
      grandTotalRow.getCell(columnIndex + 1).value = "";
    }
  });
  if (grandTotalSetting?.colSpan) {
    worksheet.mergeCells(
      `A${grandTotalRow.number}:${String.fromCharCode(
        64 + Number(grandTotalSetting?.colSpan)
      )}${grandTotalRow.number}`
    );
  }
  grandTotalRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E8E5E5" }, // Warna hijau yang diinginkan
      bgColor: { argb: "E8E5E5" },
    };
    cell.font = { color: { argb: "000000" }, bold: true };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default ExportExcel;

const formatingTitle = (title: string): string => {
  // Pisahkan kata-kata menggunakan underscore sebagai pemisah
  const words = title.split("_");

  // Ubah setiap kata menjadi huruf kapital dan gabungkan kembali dengan spasi di antara mereka
  const formattedtitle = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedtitle;
};
