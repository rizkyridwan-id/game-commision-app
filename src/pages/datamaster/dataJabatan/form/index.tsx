import { RootState } from "@/reduxStore";
import { ButtonCustom, HiddenField, ReanderField } from "@/utils";
import { Field, InjectedFormProps, reduxForm, connect } from "@/package";
import { ConfigProps } from "redux-form";
import { DataJabatanInterFace } from "@/interface";

// import { datauserController } from "../redux";
type FormProps = {
  isEdit: boolean;
};

const FormDataJabatan = (
  props: InjectedFormProps<DataJabatanInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit } = props;

  const simpan = async () => {
    // const hakaskses = utility.getDataTmp.data as HakAksesInterFace[];
    // dispatch(proses.prosesData(data, hakaskses));
  };

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <div className={"col-6"}>
          <Field
            label="Jabatan"
            name="jabatan"
            type="text"
            noUpperCase
            placeholder="Masukan Jabatan"
            component={ReanderField}
          />
        </div>

        <div className={`col-6 text-end mt-4`}>
          {isEdit && <> &nbsp;</>}
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<DataJabatanInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        jabatan: state?.utility?.getModal?.data?.jabatan,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<DataJabatanInterFace, FormProps> = {
  form: "FormDataJabatan",
  enableReinitialize: true,
};

export default connector(
  reduxForm<DataJabatanInterFace, FormProps>(config)(FormDataJabatan)
);
