import { PanelContent, TokoCabangSelector } from "@/components";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom, ReanderField, RenderNumber } from "@/utils";
import { useDispatch } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { payrolRedux } from "./redux";
import { GetPayrollPegawaiSummaryDtoProps } from "./dto";
import { useEffect } from "react";
import { PayrollInterFace } from "@/interface";
import { validatePayroll } from "./validate";

const Payroll = (props: InjectedFormProps<PayrollInterFace>) => {
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
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);

  return (
    <PanelContent title="Payroll">
      <form onSubmit={handleSubmit(simpan)}>
        <div className="row">
          <TokoCabangSelector className="col-3" />
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
              label="Tunjangan Jabatan"
              name="tunjangan_jabatan"
              type="text"
              placeholder="Tunjangan Jabatan"
              readOnly
              isRp
              component={RenderNumber}
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

export default reduxForm<PayrollInterFace>({
  form: "FormPayroll",
  validate: validatePayroll,
})(Payroll);
