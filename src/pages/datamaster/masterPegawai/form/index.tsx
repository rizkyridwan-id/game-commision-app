import {
  AppDispatch,
  RootState,
  actionMaster,
  actionParameter,
  useAppSelector,
} from "@/reduxStore";
import {
  ButtonCustom,
  ReanderField,
  RenderNumber,
  RenderSelect,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useDispatch,
  useEffect,
  useState,
} from "@/package";
import { ConfigProps } from "redux-form";
import { validatePegawai } from "../validate";
import { NumberOnly } from "@/utils";
import { PegawaiInterface } from "@/interface";
import { dataPegawaiRedux } from "../redux";

type FormProps = {
  isEdit: boolean;
};

const FormPegawai = (
  props: InjectedFormProps<PegawaiInterface, FormProps, string> & FormProps
) => {
  const { handleSubmit, pristine, submitting, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = dataPegawaiRedux();
  const simpan = async () => {
    dispatch(proses.prosesData());
  };
  const [isShowPassword, setIsShowPassword] = useState(true);

  useEffect(() => {
    const kode_jenis = document.getElementById("kode_jenis");
    if (kode_jenis) {
      kode_jenis.focus();
    }
    dispatch(actionMaster.getDataJabatan());
    dispatch(actionMaster.getDataToko());
    dispatch(actionParameter.getParameterShiftKerja());
  }, []);

  const dataJabatan = useAppSelector((state) => state.dataMaster.dataJabatan);
  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);
  const dataShiftKerja = useAppSelector(
    (state) => state.parameter.parameterShiftKerja
  );

  // console.log(dataToko);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <div className="row">
        <div className="col-3">
          <Field
            label="Kode Pegawai"
            id="kode_pegawai"
            name="kode_pegawai"
            type="text"
            placeholder="Masukan Kode Pegawai"
            component={ReanderField}
          />
        </div>
        <div className="col-3">
          <Field
            label="Nama Pegawai"
            id="nama_pegawai"
            name="nama_pegawai"
            type="text"
            placeholder="Masukan Nama Pegawai"
            component={ReanderField}
          />
        </div>
        <div className="col-3">
          <Field
            label="Tgl Lahir"
            id="tgl_lahir"
            name="tgl_lahir"
            type="date"
            placeholder="Masukan Jabatan"
            component={ReanderField}
          />
        </div>
        <div className="col-3">
          <Field
            label="Jabatan"
            id="jabatan"
            name="jabatan"
            placeholder="Pilih Jabatan"
            options={dataJabatan.data.map((list) => {
              return {
                value: list.jabatan,
                label: list.jabatan,
              };
            })}
            component={RenderSelect}
          />
        </div>
        <div className="col-3">
          <Field
            label="Shift"
            id="shift"
            name="shift"
            placeholder="Pilih Shift"
            options={dataShiftKerja.data.map((list) => {
              return {
                value: list.type_shift,
                label: list.type_shift,
              };
            })}
            component={RenderSelect}
          />
        </div>
        <div className="col-3">
          <Field
            label="Hari Libur"
            id="hari_libur"
            name="hari_libur"
            placeholder="Masukan Hari Libur"
            options={[
              {
                value: "SUNDAY",
                label: "MINGGU",
              },
              {
                value: "MONDAY",
                label: "SENIN",
              },
              {
                value: "TUESDAY",
                label: "SELASA",
              },
              {
                value: "WEDNESDAY",
                label: "RABU",
              },
              {
                value: "THURSDAY",
                label: "KAMIS",
              },
              {
                value: "FRIDAY",
                label: "JUMAT",
              },
              {
                value: "SATURDAY",
                label: "SABTU",
              },
            ]}
            component={RenderSelect}
          />
        </div>
        <div className="col-3">
          <Field
            label="Jam Istirahat"
            id="jam_istirahat"
            name="jam_istirahat"
            placeholder="Masukan Jam Istirahat"
            component={RenderNumber}
          />
        </div>
        <div className="col-3">
          <Field
            label="Jam Sholat"
            id="jam_sholat"
            name="jam_sholat"
            placeholder="Masukan Jam Sholat"
            component={RenderNumber}
          />
        </div>
        <div className="col-3">
          <Field
            label="Jam Break"
            id="jam_break"
            name="jam_break"
            placeholder="Masukan Jam Break"
            component={RenderNumber}
          />
        </div>
        <div className="col-3">
          <Field
            label="Jatah Cuti"
            id="jatah_cuti"
            name="jatah_cuti"
            placeholder="Masukan Jatah Cuti"
            component={RenderNumber}
          />
        </div>
        <div className="col-3">
          <Field
            label="Gaji Pokok"
            id="gaji_pokok"
            name="gaji_pokok"
            placeholder="Masukan Gaji Pokok"
            isRp
            component={RenderNumber}
          />
        </div>
        <div className="col-3">
          <Field
            label="Tunjangan Jabatan"
            id="tunjangan_jabatan"
            name="tunjangan_jabatan"
            placeholder="Masukan Tunjangan Jabatan"
            isRp
            component={RenderNumber}
          />
        </div>
        <div className="col-3">
          <Field
            label="Kode Sales"
            id="kode_sales"
            name="kode_sales"
            placeholder="Masukan Kode Sales"
            component={ReanderField}
          />
        </div>
        <div className="col-3">
          <Field
            label="Kode Toko"
            id="kode_toko"
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
            label="PIN"
            id="pin"
            name="pin"
            placeholder="Masukan PIN"
            component={ReanderField}
            normalize={NumberOnly}
            right
            inputGroup
            textIconGroup={
              isShowPassword ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )
            }
            customeCss={isShowPassword ? "password-hide" : ""}
            handleClick={() => setIsShowPassword(!isShowPassword)}
          />
        </div>
        <div className="col-3 text-end mt-4">
          <ButtonCustom
            disabled={pristine || submitting}
            color="primary"
            block
            type="submit"
            className="btn-lg"
          >
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<PegawaiInterface>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
        nama_pegawai: state?.utility?.getModal?.data?.nama_pegawai,
        tgl_lahir: state?.utility?.getModal?.data?.tgl_lahir,
        jabatan: state?.utility?.getModal?.data?.jabatan,
        shift: state?.utility?.getModal?.data?.shift,
        jam_istirahat: state?.utility?.getModal?.data?.jam_istirahat,
        jam_sholat: state?.utility?.getModal?.data?.jam_sholat,
        jam_break: state?.utility?.getModal?.data?.jam_break,
        jatah_cuti: state?.utility?.getModal?.data?.jatah_cuti,
        gaji_pokok: state?.utility?.getModal?.data?.gaji_pokok,
        tunjangan_jabatan: state?.utility?.getModal?.data?.tunjangan_jabatan,
        kode_sales: state?.utility?.getModal?.data?.kode_sales,
        kode_toko: state?.utility?.getModal?.data?.kode_toko,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<PegawaiInterface, FormProps> = {
  form: "FormPegawai",
  enableReinitialize: true,
  validate: validatePegawai,
};

export default connector(
  reduxForm<PegawaiInterface, FormProps>(config)(FormPegawai)
);
