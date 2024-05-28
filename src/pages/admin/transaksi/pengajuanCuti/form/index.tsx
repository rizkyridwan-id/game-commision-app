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
import { PengajuanCutiInterFace } from "@/interface";

import { pengajuanCutiRedux } from "../redux";
import { useDispatch } from "react-redux";
type FormProps = {
  isEdit: boolean;
};

const FormPengajuanCuti = (
  props: InjectedFormProps<PengajuanCutiInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = pengajuanCutiRedux();

  const simpan = async () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("target");
    // dispatch(actionMaster.getDataToko());
    dispatch(change("FormPengajuanCuti", "leave_start_date", today));
    dispatch(change("FormPengajuanCuti", "leave_end_date", today));
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
        {/* <div className={"col-6"}>
          <Field
            label="Kode Toko"
            name="kode_toko"
            placeholder="Masukan Type Target"
            component={RenderSelect}
            options={dataToko.data.map((list) => {
              return {
                value: list.kode_toko,
                label: list.kode_toko,
              };
            })}
          />
        </div> */}
        <div className={"col-6"}>
          <Field
            label="Cuti Dari"
            name="leave_start_date"
            type="date"
            placeholder="Masukan Target"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Cuti Sampai"
            name="leave_end_date"
            type="date"
            placeholder="Masukan Cuti Dari"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Alasan Cuti"
            name="leave_description"
            type="text"
            placeholder="Masukan Alasan Cuti"
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

const mapState = (state: RootState<PengajuanCutiInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
        leave_description: state?.utility?.getModal?.data?.leave_description,
        leave_start_date: state?.utility?.getModal?.data?.leave_start_date,
        leave_end_date: state?.utility?.getModal?.data?.leave_end_date,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<PengajuanCutiInterFace, FormProps> = {
  form: "FormPengajuanCuti",
  enableReinitialize: true,
};

export default connector(
  reduxForm<PengajuanCutiInterFace, FormProps>(config)(FormPengajuanCuti)
);
