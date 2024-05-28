import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderSelect,
  RenderTextArea,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useEffect,
  useState,
} from "@/package";
import { ConfigProps, change } from "redux-form";
import { useDispatch } from "react-redux";
import { ReviewCutiDto } from "../dto";
import { validateReviewCuti } from "../validate";
import { reduxReviewCuti } from "../redux";

const FormReviewCuti = (props: InjectedFormProps<ReviewCutiDto>) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxReviewCuti();

  const simpan = async () => {
    // const hakaskses = utility.getDataTmp.data as HakAksesInterFace[];
    dispatch(proses.validasiCuti());
  };

  useEffect(() => {
    dispatch(change("FormReviewCuti", "status_validasi", "OPEN"));
  }, [dispatch]);

  const [statusValidasi, setstatusValidasi] = useState("OPEN");
  return (
    <form onSubmit={handleSubmit(simpan)}>
      <div className="row">
        <Field name="_id" type="hidden" component={HiddenField} />

        <div className={"col-6"}>
          <Field
            label="Kode Pegawai"
            name="kode_pegawai"
            type="text"
            readOnly
            placeholder="Masukan Kode Pegawai"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Nama Pegawai"
            name="nama_pegawai"
            type="text"
            readOnly
            placeholder="Masukan Nama Pegawai"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Alasan Cuti"
            name="leave_description"
            type="text"
            readOnly
            placeholder="Masukan Alasan Cuti"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Status Validasi"
            name="status_validasi"
            type="text"
            options={[
              {
                value: "REJECT",
                label: "REJECT",
              },
              {
                value: "APPROVE",
                label: "APPROVE",
              },
              {
                value: "OPEN",
                label: "OPEN",
              },
            ]}
            placeholder="Masukan Status Validasi"
            component={RenderSelect}
            onChange={(e: any) => setstatusValidasi(e)}
          />
        </div>
        {statusValidasi === "REJECT" && (
          <div className={`col-12`}>
            <Field
              label="Deskripsi Ditolak"
              name="reject_description"
              placeholder="Masukan Deskripsi Ditolak"
              component={RenderTextArea}
            />
          </div>
        )}
        <div className={`col-12 text-end mt-4`}>
          <ButtonCustom
            disabled={pristine || submitting}
            color="primary"
            block
            type="submit"
            className="btn-lg"
          >
            Simpan
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<ReviewCutiDto>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
        nama_pegawai: state?.utility?.getModal?.data?.nama_pegawai,
        leave_description: state?.utility?.getModal?.data?.leave_description,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ReviewCutiDto> = {
  form: "FormReviewCuti",
  enableReinitialize: true,
  validate: validateReviewCuti,
};

export default connector(reduxForm<ReviewCutiDto>(config)(FormReviewCuti));
