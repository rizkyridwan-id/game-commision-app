import { NotaInterFace } from "@/interface";
import BwipJs from "bwip-js";
import jsPDF from "jspdf";

interface CetakNotaProps<T> {
  title: string;
  data: {
    nota: T[];
    notasetting: NotaInterFace[];
  };
}

const CetakPdf = async <T>({
  title,
  data,
}: CetakNotaProps<T>): Promise<void> => {
  const doc: jsPDF = new jsPDF();

  doc.setProperties({
    title: title || "Cetak PDF",
  });

  const dataJualMapped = data.nota.map((hutang: any) => {
    return data.notasetting.map((nota) => ({
      ...nota,
      value: hutang[nota.name.replace(/(_copy)?/g, "")] || nota.value,
    }));
  });

  for (let nomer = 0; nomer < dataJualMapped.length; nomer++) {
    const nota = dataJualMapped[nomer];
    nota.forEach(async (list) => {
      const posX = list.position_x * 0.2645833333;
      const posY = list.position_y * 0.2645833333;
      const width = list.width * 0.2645833333;
      const height = list.height * 0.2645833333;
      const rotate = Number(list.rotate * -1);

      if (list.jenis === "text") {
        doc.setFont("helvetica", list.font_style || "normal");
        doc.setFontSize(list.font_size || 10);
        doc.text(doc.splitTextToSize(list.value, width), posX, posY, {
          angle: rotate,
        });
      } else if (list.jenis === "line") {
        doc.line(posX, posY + 15, posX + width, posY + 15);
      } else if (list.jenis === "gambar") {
        // Placeholder for image processing logic
      } else {
        const canvas = document.createElement("canvas");
        const barcodeType = list.jenis === "qrcode" ? "qrcode" : "code128";
        BwipJs.toCanvas(canvas, {
          bcid: barcodeType,
          text: String(list.isi),
          scale: 3,
          height: 10,
          includetext: false,
          textxalign: "center",
        });
        const dataURL = canvas.toDataURL();
        // doc.addImage(dataURL, "JPEG", posX, posY, width, height, {
        //   angle: rotate > 0 ? rotate * -1 : undefined,
        // });
        doc.addImage(
          dataURL,
          "JPEG",
          posX,
          posY,
          width,
          height,
          "",
          "MEDIUM",
          Number(list.rotate * -1)
        );
      }
    });

    if (nomer < dataJualMapped.length - 1) {
      doc.addPage();
    }
  }

  // Save or download the PDF
  const blob = doc.output("bloburl");
  window.open(blob);
  // doc.save(`Cetak Faktur Penjualan.pdf`);
};

export default CetakPdf;
