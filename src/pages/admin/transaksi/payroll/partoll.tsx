import { PanelContent } from "@/components";
import { PayRollInterface } from "@/interface";
import {
  AppDispatch,
  actionMaster,
  simpanDataTmp,
  useAppSelector,
} from "@/reduxStore";
import {
  ButtonCustom,
  ReanderField,
  RenderNumber,
  RenderSelect,
} from "@/utils";
import { useDispatch } from "react-redux";
import { ConfigProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import { payrolRedux } from "./redux";
import { GetPayrollPegawaiSummaryDtoProps } from "./dto";
import { useEffect } from "react";

const Payroll = (props: InjectedFormProps<PayRollInterface>) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = payrolRedux();

  const simpan = () => {
    dispatch(proses.saveData());
  };

  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as GetPayrollPegawaiSummaryDtoProps;
  const statusKehadiran =
    datatmp?.status_kehadiran?.is_late_monthly === false &&
    datatmp?.status_kehadiran?.is_late_weekly === false;

  useEffect(() => {
    dispatch(actionMaster.getDataToko());
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);

  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);

  return (
    <PanelContent title="Payroll">
      <form onSubmit={handleSubmit(simpan)}>
        <div className="row">
          <div className="col-3">
            <Field
              label="Kode Toko"
              name="kode_toko"
              options={dataToko.data.map((list) => {
                return {
                  value: list.kode_toko,
                  label: list.kode_toko,
                };
              })}
              placeholder="Pilih Kode Toko"
              component={RenderSelect}
            />
          </div>
          <div className="col-3">
            <Field
              label="Kode Pegawai"
              name="kode_pegawai"
              type="text"
              placeholder="Masukkan Kode Pegawai"
              component={ReanderField}
              right
              inputGroup
              textIconGroup={<i className="fa fa-search"></i>}
              handleClick={() => dispatch(proses.getPayrollSumary())}
            />
          </div>
          <div className="col-3">
            <Field
              label="Nama Pegawai"
              name="nama_pegawai"
              type="text"
              placeholder="Nama Pegawai"
              readOnly
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Jabatan"
              name="jabatan"
              type="text"
              placeholder="Jabatan"
              readOnly
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Gaji Pokok"
              name="gaji_pokok"
              type="text"
              placeholder="Gaji Pokok"
              readOnly
              isRp
              component={RenderNumber}
            />
          </div>
          <div className="col-3">
            <Field
              label="Bonus Sales"
              name="bonus_sales"
              type="text"
              placeholder="Bonus Sales"
              readOnly
              isRp
              component={RenderNumber}
            />
          </div>
          <div className="col-3">
            <Field
              label="Bonus Absen"
              name="bonus_absen"
              type="text"
              placeholder="Bonus Absen"
              isRp
              readOnly={!statusKehadiran}
              onChange={() => dispatch(proses.hitungGajih())}
              component={RenderNumber}
            />
          </div>
          <div className="col-3">
            <Field
              label="Bonus Jabatan"
              name="bonus_jabatan"
              type="text"
              placeholder="Bonus Jabatan"
              isRp
              onChange={() => dispatch(proses.hitungGajih())}
              component={RenderNumber}
            />
          </div>
          <div className="col-3">
            <Field
              label="Potongan"
              name="potongan"
              type="text"
              placeholder="Potongan"
              readOnly
              isRp
              component={RenderNumber}
            />
          </div>
          <div className="col-3">
            <Field
              label="Total Gaji"
              name="total_gajih"
              type="text"
              placeholder="Total Gaji"
              readOnly
              isRp
              component={RenderNumber}
            />
          </div>

          <div className="col-3 mt-4">
            <ButtonCustom
              color="primary"
              block
              disabled={pristine || submitting}
              type="submit"
              className="btn-lg"
            >
              Cetak Struk
            </ButtonCustom>
          </div>
        </div>
      </form>
    </PanelContent>
  );
};

const config: ConfigProps<PayRollInterface> = {
  form: "FormPayroll",
  enableReinitialize: true,
};

export default reduxForm<PayRollInterface>(config)(Payroll);
