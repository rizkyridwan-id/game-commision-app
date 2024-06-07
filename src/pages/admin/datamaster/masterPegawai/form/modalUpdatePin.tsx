import { PegawaiInterface } from "@/interface";
import { AppDispatch, RootState } from "@/reduxStore";
import { ButtonCustom, NumberOnly, ReanderField, setFocusField } from "@/utils";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ConfigProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import { dataPegawaiRedux } from "../redux";
import { useDispatch } from "react-redux";

// const ModalUpdatePin = () => {
const ModalUpdatePin = (props: InjectedFormProps<PegawaiInterface>) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [isShowPin, setIsShowPin] = useState(true);
  const proses = dataPegawaiRedux();

  const save = () => {
    dispatch(proses.updatePin());
  };

  useEffect(() => {
    setFocusField("pin_change");
  }, []);

  return (
    <form onSubmit={handleSubmit(save)}>
      <div className="row">
        <div className="col-6">
          <Field
            label="Kode Pegawai"
            name="kode_pegawai"
            placeholder="Masukan Kode Pegawai"
            component={ReanderField}
            readOnly
          />
        </div>
        <div className="col-6">
          <Field
            label="Nama Pegawai"
            name="nama_pegawai"
            placeholder="Masukan Kode Pegawai"
            component={ReanderField}
            readOnly
          />
        </div>
        <div className="col-6">
          <Field
            label="PIN"
            id="pin_change"
            name="pin"
            placeholder="Masukan PIN Baru"
            component={ReanderField}
            normalize={NumberOnly}
            right
            inputGroup
            textIconGroup={
              isShowPin ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )
            }
            customeCss={isShowPin ? "password-hide" : ""}
            handleClick={() => setIsShowPin(!isShowPin)}
          />
        </div>
        <div className="col-6 text-end mt-4">
          <ButtonCustom
            disabled={pristine || submitting}
            color="primary"
            block
            type="submit"
            className="btn-lg"
          >
            Update Pin
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

// export default ModalUpdatePin;
const mapState = (state: RootState<PegawaiInterface>) => {
  return {
    initialValues: {
      _id: state?.utility?.getModal?.data?._id,
      kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
      nama_pegawai: state?.utility?.getModal?.data?.nama_pegawai,
    },
  };
};

const connector = connect(mapState);
const config: ConfigProps<PegawaiInterface> = {
  form: "ModalUpdatePin",
  enableReinitialize: true,
};

export default connector(reduxForm<PegawaiInterface>(config)(ModalUpdatePin));
