import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  setFocusField,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useEffect,
} from "@/package";
import { ConfigProps } from "redux-form";
import { DataTokoInterFace } from "@/interface";
import { validateToko } from "../validate";

import { dataTokoRedux } from "../redux";
import { useDispatch } from "react-redux";
type FormProps = {
  isEdit: boolean;
};

const FormDataToko = (
  props: InjectedFormProps<DataTokoInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const proses = dataTokoRedux();
  const dispatch = useDispatch<AppDispatch>();

  const simpan = () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("Toko");
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <div className={"col-6"}>
          <Field
            id="Toko"
            label="Kode Toko"
            name="kode_toko"
            type="text"
            placeholder="Masukan Kode Toko"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Nama Toko"
            name="nama_toko"
            type="text"
            placeholder="Masukan Nama Toko"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Alamat Toko"
            name="alamat_toko"
            type="text"
            placeholder="Masukan Alamat Toko"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Portal"
            name="portal"
            type="text"
            noUpperCase
            placeholder="Masukan Portal"
            component={ReanderField}
          />
        </div>

        <div className={`col-12 text-end mt-4`}>
          {isEdit && <> &nbsp;</>}
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<DataTokoInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        kode_toko: state?.utility?.getModal?.data?.kode_toko,
        alamat_toko: state?.utility?.getModal?.data?.alamat_toko,
        portal: state?.utility?.getModal?.data?.portal,
        nama_toko: state?.utility?.getModal?.data?.nama_toko,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<DataTokoInterFace, FormProps> = {
  form: "FormDataToko",
  enableReinitialize: true,
  validate: validateToko,
};

export default connector(
  reduxForm<DataTokoInterFace, FormProps>(config)(FormDataToko)
);
