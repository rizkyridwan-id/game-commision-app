import {
  AppDispatch,
  RootState,
  actionMaster,
  useAppSelector,
  utilityActions,
} from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
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
} from "@/package";
import { PegawaiInterface } from "../dto";
import { ConfigProps } from "redux-form";
import { validatePegawai } from "../validate";

type FormProps = {
  isEdit: boolean;
};

const FormPegawai = (
  props: InjectedFormProps<PegawaiInterface, FormProps, string> & FormProps
) => {
  const { handleSubmit, pristine, submitting, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();

  const simpan = async (data: PegawaiInterface) => {
    console.log(data);
    dispatch(utilityActions.setLoading({ screen: true }));
  };

  useEffect(() => {
    const kode_jenis = document.getElementById("kode_jenis");
    if (kode_jenis) {
      kode_jenis.focus();
    }
    dispatch(actionMaster.getDataJabatan());
  }, []);

  const dataJabatan = useAppSelector((state) => state.dataMaster.dataJabatan);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="kode_pegawai" type="hidden" component={HiddenField} />
      <div className="row">
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
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
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
            options={[]}
            placeholder="Pilih Kode Toko"
            component={RenderSelect}
          />
        </div>
        <div className="col-12 text-end mt-4">
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
      initialValues: {},
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
