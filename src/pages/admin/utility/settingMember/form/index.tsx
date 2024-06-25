import { ReanderField, ReplaceValue } from "@/utils";
import { ConfigProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import { FormTambahLabelDto } from "../dto";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reduxStore";
import { simpanLabel } from "../redux";

const ModalTambahLabel = (props: InjectedFormProps<FormTambahLabelDto>) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();

  const simpan = async () => {
    dispatch(simpanLabel());
  };

  return (
    <form onSubmit={handleSubmit(simpan)} autoComplete="off">
      <div className="row">
        <div className="col-12">
          <Field
            name="label"
            label="Label"
            nouperCase
            normalize={ReplaceValue}
            placeholder="Masukkan Label"
            component={ReanderField}
            noUpperCase
          />
        </div>
        <div className="col-12">
          <Field
            name="value"
            label="value"
            placeholder="Masukkan Isi"
            component={ReanderField}
            noUpperCase
          />
        </div>
        <div className="col-12">
          <button
            id="simpan"
            name="simpan"
            type="submit"
            disabled={pristine || submitting}
            className="btn btn-primary btn-block"
          >
            Simpan Data
          </button>
        </div>
      </div>
    </form>
  );
};

const config: ConfigProps<FormTambahLabelDto> = {
  form: "ModalTambahLabel",
  enableReinitialize: true,
};

export default reduxForm<FormTambahLabelDto>(config)(ModalTambahLabel);
