import {
  AppDispatch,
  RootState,
  // actionMaster,
  // useAppSelector,
} from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderNumber,
  // RenderSelect,
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
import { PotonganLainInterFace } from "@/interface";

import { potonganLainRedux } from "../redux";
import { useDispatch } from "react-redux";
type FormProps = {
  isEdit: boolean;
};

const FormPotonganLain = (
  props: InjectedFormProps<PotonganLainInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = potonganLainRedux();

  const simpan = async () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("target");
    // dispatch(actionMaster.getDataToko());
    dispatch(change("FormPotonganLain", "leave_start_date", today));
    dispatch(change("FormPotonganLain", "leave_end_date", today));
  }, [dispatch]);
  // const dataToko = useAppSelector((state) => state.dataMaster.dataToko);

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
            placeholder="Masukan Kode Pegawai"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Qty Cicilan Bulan"
            name="qty_cicil_bulan"
            type="text"
            placeholder="Masukan Qty Cicilan Bulan"
            component={RenderNumber}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Total Rp"
            name="total_rp"
            type="text"
            placeholder="Masukan Total Rp"
            isRp
            component={RenderNumber}
          />
        </div>

        <div className={"col-6"}>
          <Field
            label="Alasan"
            name="alasan"
            type="text"
            placeholder="Masukan Alasan"
            component={ReanderField}
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

const mapState = (state: RootState<PotonganLainInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
        total_rp: state?.utility?.getModal?.data?.total_rp,
        qty_cicil_bulan: state?.utility?.getModal?.data?.qty_cicil_bulan,
        alasan: state?.utility?.getModal?.data?.alasan,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<PotonganLainInterFace, FormProps> = {
  form: "FormPotonganLain",
  enableReinitialize: true,
};

export default connector(
  reduxForm<PotonganLainInterFace, FormProps>(config)(FormPotonganLain)
);
