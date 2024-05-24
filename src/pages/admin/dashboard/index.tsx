import { PanelContent } from "@/components";
import { ColumnGenarator } from "@/interface";
import { AppDispatch, utilityActions } from "@/reduxStore";
import { ExportData } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// interface detailBarang {
//   kode_barcode: string;
//   tgl_system: string;
//   harga: number;
//   berat: number;
//   total: number;
//   diskon: string;
//   input_by: string;
// }
// interface FakturHutang {
//   no_faktur_hutang: string;
//   detail: detailBarang[];
// }
interface FakturHutang {
  no_faktur_hutang: string;
  kode_barcode: string;
  tgl_system: string;
  harga: number;
  berat: number;
  total: number;
  diskon: string;
  input_by: string;
}

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const data: FakturHutang[] = [
  //   {
  //     no_faktur_hutang: "001",
  //     detail: [
  //       {
  //         kode_barcode: "0210293011",
  //         diskon: "rp",
  //         tgl_system: "2022-01-01",
  //         harga: 10000,
  //         berat: 2,
  //         total: 20000,
  //         input_by: "Samsul",
  //       },
  //     ],
  //   },
  //   {
  //     no_faktur_hutang: "001",
  //     detail: [
  //       {
  //         kode_barcode: "0001293011",
  //         diskon: "rp",
  //         tgl_system: "2022-01-01",
  //         harga: 10000,
  //         berat: 2,
  //         total: 20000,
  //         input_by: "Samsul",
  //       },
  //     ],
  //   },
  // ];
  const data: FakturHutang[] = [
    {
      no_faktur_hutang: "001",
      kode_barcode: "1111",
      diskon: "rp",
      tgl_system: "2022-01-01",
      harga: 10000,
      berat: 2,
      total: 20000,
      input_by: "Samsul",
    },
    {
      no_faktur_hutang: "002",
      kode_barcode: "2222",
      diskon: "rp",
      tgl_system: "2022-01-01",
      harga: 10000,
      berat: 2,
      total: 20000,
      input_by: "Rizki",
    },
  ];

  const columns: ColumnGenarator<FakturHutang>[] = [
    {
      label: "Tanngal",
      key: "tgl_system",
    },
    {
      label: "Kode Barcode",
      key: "kode_barcode",
      options: {
        barcodeOption: {
          showText: false,
          format: "code128",
        },
      },
    },
    {
      label: "Diskon",
      key: "diskon",
      options: {
        halign: "center",
      },
    },
    {
      label: "Harga",
      key: "harga",
      options: {
        format: "RP",
      },
    },
    {
      label: "Berat",
      key: "berat",
      options: {
        format: "GR",
      },
    },

    {
      label: "Total",
      key: "total",
      options: {
        format: "RP",
      },
    },
  ];

  useEffect(() => {
    dispatch(
      utilityActions.simpanDataTmp<FakturHutang[]>({
        data: [
          {
            no_faktur_hutang: "PS-1231",
            kode_barcode: "string",
            tgl_system: "string",
            harga: 5,
            berat: 5,
            total: 2,
            diskon: "s",
            input_by: "12",
          },
        ],
      })
    );
  }, [dispatch]);

  // const temp = useAppSelector(
  //   (state) => state.utility.getDataTmp.data as FakturHutang[]
  // );

  // console.log(temp);

  return (
    <PanelContent title="Dashboard">
      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-primary"
            onClick={() =>
              ExportData({
                type: "ALL",
                date: {
                  start_date: "11-01-2024",
                  end_date: "11-01-2024",
                },
                data: data,
                columns: columns,
                grouping: [],
                excelSetting: {
                  titleExcel: "LAPORAN BAYAR BUNGA EXCEL",
                  bgColor: "000000",
                  txtColor: "ffffff",
                  grandTotalSetting: {
                    colSpan: 2,
                  },
                },
                txtSetting: {
                  dataTxt: data,
                  titleTxt: "Slip Txt FIle",
                  templateTxt: `--------------- SLIP ---------------\nFaktur         = {no_faktur_hutang}\nDiskon         = {diskon}\nTanggal System = {tgl_system}\nHarga          = {harga}\nBerat          = {berat}\nTotal          = {total}\nInput_by       = {input_by}`,
                },
                pdfSetting: {
                  titlePdf: "LAPORAN BAYAR BUNGA PDF",
                  orientation: "l",
                  unit: "mm",
                  bgColor: "000000",
                  txtColor: "ffffff",
                  theme: "grid",
                  grandTotalSetting: {
                    colSpan: 2,
                  },
                  openNewTab: true,
                },
              })
            }
          >
            Export Data
          </button>
        </div>
      </div>
    </PanelContent>
  );
};

export default Dashboard;
