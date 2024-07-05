import {
  actionMaster,
  actionTransaksi,
  AppDispatch,
  useAppSelector,
} from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderSelect,
  today,
} from "@/utils";
import { Field, InjectedFormProps, reduxForm, useEffect } from "@/package";
import { ConfigProps, change } from "redux-form";
import { useDispatch } from "react-redux";
import { FilterReviewCuti } from "../dto/filterReviewCuti";

const FilterCuti = (props: InjectedFormProps<FilterReviewCuti>) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();

  const cari = async (data: FilterReviewCuti) => {
    console.log(data);
    dispatch(
      actionTransaksi.getReviewPengajuanCuti({
        ...data,
        status_validasi:
          data.status_validasi !== "ALL" ? data.status_validasi : undefined,
      })
    );
  };

  useEffect(() => {
    dispatch(change("FilterCuti", "start_date", today));
    dispatch(change("FilterCuti", "end_date", today));
    dispatch(change("FilterCuti", "status_validasi", "ALL"));
    dispatch(actionMaster.getDataToko());
  }, [dispatch]);

  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);
  return (
    <form onSubmit={handleSubmit(cari)}>
      <div className="row">
        <Field name="_id" type="hidden" component={HiddenField} />

        <div className={"col-2"}>
          <Field
            label="Tanggal Awal"
            name="start_date"
            type="date"
            placeholder="Masukan Tanggal Awal"
            component={ReanderField}
          />
        </div>
        <div className={"col-2"}>
          <Field
            label="Emd Awal"
            name="end_date"
            type="date"
            placeholder="Masukan Emd Awal"
            component={ReanderField}
          />
        </div>

        <div className={"col-2"}>
          <Field
            label="Status"
            name="status_validasi"
            type="text"
            options={[
              {
                value: "ALL",
                label: "SEMUA",
              },
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
            placeholder="Masukan Status"
            component={RenderSelect}
          />
        </div>
        <div className={"col-3"}>
          <Field
            label="Kode Toko"
            name="kode_toko"
            type="text"
            options={dataToko.data?.map((list) => {
              return {
                value: list.kode_toko,
                label: list.kode_toko,
              };
            })}
            placeholder="Masukan Kode Toko"
            component={RenderSelect}
          />
        </div>

        <div className={`col-3 text-end mt-4`}>
          <ButtonCustom
            disabled={pristine || submitting}
            color="primary"
            block
            type="submit"
            className="btn-lg"
          >
            Cari
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const config: ConfigProps<FilterReviewCuti> = {
  form: "FilterCuti",
  enableReinitialize: true,
};

export default reduxForm<FilterReviewCuti>(config)(FilterCuti);
