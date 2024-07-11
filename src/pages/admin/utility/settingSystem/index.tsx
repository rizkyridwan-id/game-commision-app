import { PanelContent } from "@/components";
import { connect } from "react-redux";
import { FormModuleDto, SystemMockupDto } from "./dto";
import { ConfigProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import { AppDispatch, RootState, utilityActions } from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  postData,
  ReanderField,
  urlApi,
} from "@/utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
type FormProps = {
  moduleSystem: SystemMockupDto[];
};
const CreateSettingSystem = (
  props: InjectedFormProps<FormModuleDto, FormProps, string> & FormProps
) => {
  const { handleSubmit, moduleSystem } = props;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(utilityActions.getModule());
  }, [dispatch]);

  const save = async (data: FormModuleDto) => {
    const module = [
      {
        key: "JAM_DETEKSI_LIBUR",
        value: data.JAM_DETEKSI_LIBUR,
        type: "MODULE",
      },
    ];

    const datakirim = module.filter((listLama) =>
      moduleSystem.find(
        (cek) => cek.key === listLama.key && cek.value !== listLama.value
      )
    );

    try {
      await postData(urlApi.utility.createModule, {
        module: datakirim,
      });
      dispatch(utilityActions.getModule());
      NotifSuccess("Data berhasil disimpan");
    } catch (error) {
      NotifInfo(`${error}`);
    }
  };

  return (
    <PanelContent title="Setting System">
      <form onSubmit={handleSubmit(save)}>
        <div className="row">
          <div className="col-3">
            <Field
              label="Jam Deteksi Libur"
              name="JAM_DETEKSI_LIBUR"
              placeholder="Masukkan Jam Deteksi Libur"
              type="time"
              component={ReanderField}
            />
          </div>
          <div className="col-3 mt-4">
            &nbsp;
            <button className="btn btn-primary"> Simpan </button>
          </div>
        </div>
      </form>
    </PanelContent>
  );
};

const mapState = (state: RootState<FormModuleDto>) => {
  const module = state.utility.getModule?.data as unknown as SystemMockupDto[];
  const cekModuleText = (name: string) => {
    return module.find((cek) => cek.key === name);
  };

  const validModules: SystemMockupDto[] = module.filter(
    (m): m is SystemMockupDto => m !== undefined
  );

  return {
    moduleSystem: validModules,
    initialValues: {
      JAM_DETEKSI_LIBUR: cekModuleText("JAM_DETEKSI_LIBUR")?.value || "",
    } as Partial<FormModuleDto>,
  };
};

const connector = connect(mapState);

const config: ConfigProps<FormModuleDto, FormProps> = {
  form: "CreateSettingSystem",
  enableReinitialize: true,
};

export default connector(
  reduxForm<FormModuleDto, FormProps>(config)(CreateSettingSystem)
);
