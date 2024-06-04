import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderTextArea,
  setFocusField,
  today,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useEffect,
} from "@/package";
import { ConfigProps, change } from "redux-form";

import { reduxPelanggaranPegawai } from "../redux";
import { useDispatch } from "react-redux";
import { PelanggaranPegawaiInterFace } from "@/interface";
type FormProps = {
  isEdit: boolean;
};

const FormPelanggaranPegawai = (
  props: InjectedFormProps<PelanggaranPegawaiInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxPelanggaranPegawai();

  const simpan = async () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("kode_pegawai");
    dispatch(change("FormPelanggaranPegawai", "tgl_system", today));
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <div className={"col-6"}>
          <Field
            label="Kode Pegawai"
            id="kode_pegawai"
            name="kode_pegawai"
            type="text"
            readOnly={isEdit}
            placeholder="Masukan Target"
            component={ReanderField}
          />
        </div>

        <div className={"col-6"}>
          <Field
            label="Tanggal"
            name="tgl_system"
            type="date"
            readOnly={isEdit}
            placeholder="Masukan Tanggal"
            component={ReanderField}
          />
        </div>
        <div className={"col-12"}>
          <Field
            label="Deskripsi"
            name="deskripsi"
            placeholder="Masukan Deskripsi"
            component={RenderTextArea}
          />
        </div>

        <div className={`col-12 text-end mt-4`}>
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<PelanggaranPegawaiInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    // console.log(state?.utility?.getModal?.data);
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
        tgl_system: state?.utility?.getModal?.data?.tgl_system,
        deskripsi: state?.utility?.getModal?.data?.deskripsi,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<PelanggaranPegawaiInterFace, FormProps> = {
  form: "FormPelanggaranPegawai",
  enableReinitialize: true,
};

export default connector(
  reduxForm<PelanggaranPegawaiInterFace, FormProps>(config)(
    FormPelanggaranPegawai
  )
);
