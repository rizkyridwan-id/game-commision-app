import { PanelContent } from "@/components";
import { LaporanDataPegawaiDto } from "./dtto";
import {
  ConfigProps,
  Field,
  InjectedFormProps,
  change,
  reduxForm,
} from "redux-form";
import { ButtonCustom, RenderSelect } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, actionMaster, useAppSelector } from "@/reduxStore";
import { useEffect } from "react";
import { reduxLaporanPegawai } from "./redux";
import TableLaporanDataPegawai from "./table";

const LaporanDataPegawai = (
  props: InjectedFormProps<LaporanDataPegawaiDto>
) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();

  const filterLaporan = () => {
    dispatch(reduxLaporanPegawai());
  };

  useEffect(() => {
    dispatch(actionMaster.getDataToko());
    dispatch(change("LaporanDataPegawai", "kode_toko", "SEMUA"));
  }, [dispatch]);

  const datatoko = useAppSelector((state) => state.dataMaster.dataToko);

  return (
    <PanelContent title="Laporan Data Pegawai">
      <form onSubmit={handleSubmit(filterLaporan)}>
        <div className="row">
          <div className="col-4">
            <Field
              label="Kode Toko"
              name="kode_toko"
              options={[
                {
                  value: "SEMUA",
                  label: "SEMUA",
                },
                ...datatoko.data.map((list) => {
                  return {
                    value: list.kode_toko,
                    label: list.kode_toko,
                  };
                }),
              ]}
              placeholder="Pilih Kode Toko"
              component={RenderSelect}
            />
          </div>

          <div className="col-4 mt-4">
            <ButtonCustom
              color="primary"
              block
              type="submit"
              className="btn-lg"
            >
              Cari Laporan
            </ButtonCustom>
          </div>

          <div className="col-12 mt-4">
            <TableLaporanDataPegawai />
          </div>
        </div>
      </form>
    </PanelContent>
  );
};

const config: ConfigProps<LaporanDataPegawaiDto> = {
  form: "LaporanDataPegawai",
  enableReinitialize: true,
};

export default reduxForm<LaporanDataPegawaiDto>(config)(LaporanDataPegawai);
